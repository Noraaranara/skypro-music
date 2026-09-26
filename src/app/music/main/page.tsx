'use client';

import './page.module.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response) {
            const message = err.response.data?.message;
            setError(message || 'Произошла ошибка при загрузке треков');
          } else if (err.request) {
            setError('Что-то не так с интернетом');
          } else {
            setError('Произошла неизвестная ошибка');
          }
        } else {
          setError('Произошла неизвестная ошибка');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Centerblock tracks={tracks} loading={loading} error={error}/>;
    </>
  );
}
