import { Formik } from 'formik';
import * as Yup from 'yup';
import { api } from '../api/index';

const CarForm = ({ categories, handleClose, editData }) => {
  return (
    <Formik
      initialValues={{
        category: editData?.category ? editData.category : '',
        color: editData?.color ? editData.color : '',
        model: editData?.model ? editData.model : '',
        make: editData?.make ? editData.make : '',
        registrationNo: editData?.registrationNo ? editData.registrationNo : '',
      }}
      onSubmit={async (values: any, { setFieldError }) => {
        console.log('values', values);
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
          const request = {
            method: editData ? 'put' : 'post',
            url: `/car${editData ? `/${editData._id}` : ''}`,
            data: values,
          };
          await api(request)
            .then(({ data }) => {
              handleClose();
              // alert('Confirmation email send successfully.');
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
        category: Yup.string().required('Required'),
        color: Yup.string().required('Required'),
        model: Yup.string().required('Required'),
        make: Yup.string().required('Required'),
        registrationNo: Yup.string().required('Required'),
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
              <div className="flex flex-col gap-9">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Category
                  </label>
                  <div className=" bg-white dark:bg-form-input">
                    <select
                      id="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className=" w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category: any) => {
                          return (
                            <option value={category._id} key={category._id}>
                              {category.name}
                            </option>
                          );
                        })}
                    </select>
                    {errors.category && touched.category && (
                      <div className="text-red">{errors.category}</div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Color
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  id="color"
                  value={values.color}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.color && touched.color && (
                  <div className="text-red">{errors.color}</div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Make
                </label>
                <input
                  type="text"
                  placeholder="Make"
                  id="make"
                  value={values.make}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.make && touched.make && (
                  <div className="text-red">{errors.make}</div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Model
                </label>
                <input
                  type="text"
                  placeholder="Model"
                  id="model"
                  value={values.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.model && touched.model && (
                  <div className="text-red">{errors.model}</div>
                )}
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Registration No
                </label>
                <input
                  type="text"
                  placeholder="Registration No"
                  id="registrationNo"
                  value={values.registrationNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.registrationNo && touched.registrationNo && (
                  <div className="text-red">{errors.registrationNo}</div>
                )}
              </div>
              <input
                type="submit"
                disabled={isSubmitting}
                value={`${editData ? 'Update' : 'Create'} Car`}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default CarForm;
