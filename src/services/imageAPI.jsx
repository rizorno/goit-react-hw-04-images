import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const imageService = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '32692148-893493904108f813cf446c93e',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});

export const getImages = async params => {
  Loading.pulse({
    svgColor: 'orange',
  });
  const { data } = await imageService.get('', {
    params,
  });
  Loading.remove();
  return data;
};
