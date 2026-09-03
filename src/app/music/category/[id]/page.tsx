'use client';
import Centerblock from '@/components/Centerblock/Centerblock';
import { getSelection, getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSelection(id), getTracks()])
      .then(([selection, allTracks]) => {
        const selectionTracks = allTracks.filter((track) =>
          selection.items.includes(track._id),
        );

        setTracks(selectionTracks);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response) {
            setError(err.response.data);
          } else if (err.request) {
            setError('Что-то не так с интернетом');
          } else {
            setError('Неизвестная ошибка');
          }
        }
      }).finally(() => {
        setLoading(false)
      })
  }, [id]);
  return (
      <>
        {error}
        <Centerblock tracks={tracks} loading={loading} />;
      </>
    );
}
