// // eslint-disable-next-line
// // @ts-ignore

import { api } from './index';
import { toast } from 'react-toastify';

// In below function we are displaying toast messages

const notify = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

// Below we are getting cars list from the server

export const getCarsList = async () => {
  try {
    const { data } = await api.get('/car');
    return data;
  } catch ({ response }) {
    notify(response.data.message);
    return response.data;
  }
};

// Below we are getting related data of car which we are using in car form.

export const getCarsRelatedData = async () => {
  const { data } = await api.get('car/related/');
  return data;
};

// Below we are getting single car by IDt from the server

export const getCar = async (id: string) => {
  try {
    const { data } = await api.get(`/car/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

// Below we are updating single car by ID

export const updateCar = async ({ id, car }: { id: string; car: any }) => {
  try {
    const { data } = await api.patch(`/car/${id}`, car);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

// Below we are delete single car by ID

export const deleteCar = async (id: string) => {
  try {
    const { data } = await api.delete(`/car/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};
