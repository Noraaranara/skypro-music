import { TrackType } from '@/sharedTypes/sharedTypes';
import axios from 'axios';
import { BASE__URL } from '../constants';

type playlistReturn = {
  _id: number;
  name: string;
  items: number[];
};

export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE__URL + '/catalog/track/all/').then((res) => {
    return res.data.data;
  });
};

export const getSelection = (_id: number): Promise<playlistReturn> => {
  return axios(BASE__URL + '/catalog/selection/' + _id).then((res) => {
    return res.data.data;
  });
};

export const addLike = (access: string, _id: number) => {
  return axios.post(BASE__URL + '/catalog/track/' + _id + '/favorite/', null, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const removeLike = (access: string, _id: number) => {
  return axios.delete(BASE__URL + '/catalog/track/' + _id + '/favorite/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const likedTracks =(access: string) => {
  return axios(BASE__URL + '/catalog/track/favorite/all', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
}