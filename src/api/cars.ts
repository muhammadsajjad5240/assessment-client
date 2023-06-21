// // eslint-disable-next-line
// // @ts-ignore

import { api } from './index';
import { toast } from 'react-toastify';

const notify = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const getCarsList = async () => {
  try {
    const { data } = await api.get('/car');
    return data;
  } catch ({ response }) {
    notify(response.data.message);
    return response.data;
  }
};

export const getCarsRelatedData = async () => {
  const { data } = await api.get('car/related/');
  return data;
};

export const getCar = async (id: string) => {
  try {
    const { data } = await api.get(`/car/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export const updateCar = async ({ id, car }: { id: string; car: any }) => {
  try {
    const { data } = await api.patch(`/car/${id}`, car);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteCar = async (id: string) => {
  console.log('id', id);
  try {
    const { data } = await api.delete(`/car/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};
