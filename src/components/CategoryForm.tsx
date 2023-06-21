import { Formik } from 'formik';
import * as Yup from 'yup';
import { api } from '../api/index';

const CategoryForm = ({ handleClose, editData }) => {
  return (
    <Formik
      initialValues={{
        name: editData?.name ? editData.name : '',
      }}
      onSubmit={async (values: any, { setFieldError }) => {
        console.log('values', values);
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
          const request = {
            method: editData ? 'put' : 'post',
            url: `/category${editData ? `/${editData._id}` : ''}`,
            data: values,
          };
          await api(request)
            .then(({ data }) => {
              handleClose();
              return data;
            })
            .catch(({ response }) => {
              const errors = response.data.message.split(',');
              for (var error of errors) {
                const err = error.split(':');
                setFieldError(
                  err[0].replace(/["' ]/g, ''),
                  err[1].replace(/["']/g, '')
                );
              }
            });
        } catch (err) {}
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Required'),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Category Name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.name && touched.name && (
                  <div className="text-red">{errors.name}</div>
                )}
              </div>
              <input
                type="submit"
                disabled={isSubmitting}
                value={`${editData ? 'Update' : 'Create'} Category`}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default CategoryForm;
