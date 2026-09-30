'use client';

import { getTracks } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import axios from 'axios';
import { useEffect } from 'react';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();

  const { allTracks, fetchIsLoading } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (allTracks.length > 0 || fetchIsLoading) {
      return;
    }

    dispatch(setFetchIsLoading(true));

    getTracks()
      .then((res) => {
        dispatch(setAllTracks(res));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const message =
              typeof error.response.data === 'string'
                ? error.response.data
                : error.response.data?.message || 'Ошибка загрузки треков';

            dispatch(setFetchError(message));
          } else if (error.request) {
            dispatch(setFetchError('Произошла ошибка, попробуйте позже'));
          } else {
            dispatch(setFetchError('Неизвестная ошибка'));
          }
        }
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false));
      });
  }, [allTracks.length, fetchIsLoading, dispatch]);

  return null;
}
