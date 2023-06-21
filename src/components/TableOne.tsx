import MUIDataTable from 'mui-datatables';

const TableOne = ({ columns, data, handleClickOpen, addBtnText }) => {
  const options = {
    selectableRows: 'none',
  };

  return (
    <>
      <div className="flex justify-end p-4 md:p-0 xl:p-0">
        <button
          onClick={handleClickOpen}
          className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add {addBtnText}
        </button>
      </div>
      <MUIDataTable
        title={`${addBtnText} List`}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default TableOne;
