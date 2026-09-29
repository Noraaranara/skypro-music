'use client'

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function FavoritePlaylist() {
  const {
    favoriteTracks,
    fetchError,
    fetchIsLoading,
  } = useAppSelector((state) => state.tracks);

  return (
    <Centerblock
    pagePlaylist={favoriteTracks}
      tracks={favoriteTracks}
      errorRes={fetchError}
      isLoading={fetchIsLoading}
      title="Мои треки"
    />
  );
}