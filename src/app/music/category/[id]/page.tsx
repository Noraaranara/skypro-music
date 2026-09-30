'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getSelection } from '@/services/tracks/tracksApi';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setPagePlaylist, resetFilters } from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const dispatch = useAppDispatch();

  const {
    allTracks,
    fetchIsLoading,
    fetchError,
    filterTracks,
    pagePlaylist
  } = useAppSelector((state) => state.tracks);

  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (fetchIsLoading || allTracks.length === 0) {
      return;
    }

    dispatch(resetFilters());

    getSelection(id)
      .then((res) => {
        setTitle(res.name);

        const selectionTracks = allTracks.filter((track) =>
          res.items.includes(track._id),
        );

        dispatch(setPagePlaylist(selectionTracks));
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response) {
            setErrorRes(
              typeof err.response.data === 'string'
                ? err.response.data
                : 'Ошибка загрузки подборки',
            );
          } else if (err.request) {
            setErrorRes('Что-то не так с интернетом');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, fetchIsLoading, allTracks, dispatch]);

  return (
  <Centerblock
    pagePlaylist={pagePlaylist}
    tracks={filterTracks}
    isLoading={isLoading}
    errorRes={errorRes || fetchError}
    title={title}
  />
);
}