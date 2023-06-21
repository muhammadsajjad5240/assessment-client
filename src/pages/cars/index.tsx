import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CarForm from '../../components/CarForm';
import { getCarsList, deleteCar, getCar } from '../../api/cars';
import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { getCarsRelatedData } from '../../api/cars';

const Tables = () => {
  const [cars, setCars] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getCarsList();
      if (data?.code === 401) {
        navigate('/signin');
      } else {
        setCars(data);
      }
    })();
  }, [tableKey]);

  const updateComponnet = () => {
    setTableKey((preVal) => preVal + 1);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
    updateComponnet();
  };

  const handleClickOpen = async () => {
    const data = await getCarsRelatedData();
    setCategories(data);

    setOpen(true);
  };

  const columns = [
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <div>{value?.name}</div>;
        },
      },
    },
    {
      name: 'color',
      label: 'Color',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'make',
      label: 'Make',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'model',
      label: 'Model',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'registrationNo',
      label: 'Registration No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: '_id',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <ModeEditIcon
            onClick={async () => {
              const data = await getCar(value);
              setEditData(data);
              handleClickOpen();
            }}
          />
        ),
      },
    },
    {
      name: '_id',
      label: 'Delete',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any) => (
          <DeleteForeverIcon
            color="error"
            onClick={async () => {
              console.log('value', value);
              await deleteCar(value);
              await updateComponnet();
            }}
          />
        ),
      },
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Cars" />
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={true}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          {editData ? 'Update' : 'Add'}Car
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'red',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CarForm
            categories={categories}
            handleClose={handleClose}
            editData={editData}
          />
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-10">
        <TableOne
          addBtnText="Car"
          columns={columns}
          data={cars}
          key={tableKey}
          handleClickOpen={handleClickOpen}
        />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
