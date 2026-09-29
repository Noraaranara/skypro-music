'use client';
import Centerblock from '@/components/Centerblock/Centerblock';
import { getSelection, getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { allTracks, fetchIsLoading, fetchError } = useAppSelector((state) => state.tracks);
  const [isLoading, setIsLoading] = useState(true);
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [tracks, setTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    if (fetchIsLoading || allTracks.length === 0) {
      return;
    }

      getSelection(id)
        .then((res) => {
          setTitle(res.name);
          const tracksId = res.items;
          const selectionTracks = allTracks.filter((el) =>
            tracksId.includes(el._id),
          );
          setTracks(selectionTracks);
        })
        .catch((err) => {
          if (err instanceof AxiosError)
            if (err.response) {
              setErrorRes(err.response.data);
            } else if (err.request) {
              setErrorRes('Что-то не так с интернетом');
            }
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [id, fetchIsLoading, allTracks]);
  return (
    <>
      <Centerblock
        tracks={tracks}
        isLoading={isLoading}
        errorRes={errorRes || fetchError}
        title={title}
      />
    </>
  );
}
