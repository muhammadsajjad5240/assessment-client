import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CategoryForm from '../../components/CategoryForm';
import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  getCategoriesList,
  deleteCategory,
  getCategory,
} from '../../api/category';

const Tables = () => {
  const [tableKey, setTableKey] = useState(0);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getCategoriesList();
      if (data?.code === 401) {
        navigate('/signin');
      } else {
        setCategories(data);
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
    setOpen(true);
  };

  // Columns that will show in table

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'slug',
      label: 'Slug',
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
              const data = await getCategory(value);
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
              await deleteCategory(value);
              await updateComponnet();
            }}
          />
        ),
      },
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />
      {/* Model in which create and update form show */}
      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={true}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          {editData ? 'Update' : 'Add'} Category
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
          <CategoryForm handleClose={handleClose} editData={editData} />
        </DialogContent>
      </Dialog>
      {/*  */}
      <div className="flex flex-col gap-10">
        <TableOne
          addBtnText="Category"
          columns={columns}
          data={categories}
          key={tableKey}
          handleClickOpen={handleClickOpen}
        />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
