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

// Below we are getting categories list from the server

export const getCategoriesList = async () => {
  try {
    const { data } = await api.get('/category');
    return data;
  } catch ({ response }) {
    notify(response.data.message);
    return response.data;
  }
};

// Below we are getting single category by IDt from the server

export const getCategory = async (id: string) => {
  try {
    const { data } = await api.get(`/category/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

// Below we are updating single category by ID

export const updateCategory = async ({ id, car }: { id: string; car: any }) => {
  try {
    const { data } = await api.patch(`/category/${id}`, car);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

// Below we are delete single category by ID

export const deleteCategory = async (id: string) => {
  try {
    const { data } = await api.delete(`/category/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};
