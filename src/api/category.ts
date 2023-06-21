// // eslint-disable-next-line
// // @ts-ignore

import { api } from './index';
import { toast } from 'react-toastify';

const notify = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
export const getCategoriesList = async () => {
  try {
    const { data } = await api.get('/category');
    return data;
  } catch ({ response }) {
    notify(response.data.message);
    return response.data;
  }
};

export const getCategory = async (id: string) => {
  try {
    const { data } = await api.get(`/category/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export const updateCategory = async ({ id, car }: { id: string; car: any }) => {
  try {
    const { data } = await api.patch(`/category/${id}`, car);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { data } = await api.delete(`/category/${id}`);
    return data;
  } catch (e) {
    console.error(e.message);
  }
};
