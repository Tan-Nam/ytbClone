import axiosClient from './axios-client';

export const Command = {
  channel: {
    subscribe: () => Promise.resolve(),
    unsubscribe: () => Promise.resolve(),
  },
  trending: {
    add: (data: any) => {
      const url = `${process.env.REACT_APP_API_URL}/trending`;
      return axiosClient.post(url, data);
    },
    update: (data: any) => {
      const { id } = data;
      const url = `${process.env.REACT_APP_API_URL}/trending/${id}`;
      return axiosClient.put(url, data);
    },
  },
};
