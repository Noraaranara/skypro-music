'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { setPagePlaylist } from '@/store/features/trackSlice';
import { useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch()
  const { fetchError, fetchIsLoading, allTracks, filterTracks } =
    useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (allTracks.length > 0) {
      dispatch(setPagePlaylist(allTracks));
    }
  }, [allTracks, dispatch]);

  return (
    <>
      <Centerblock
        pagePlaylist={allTracks}
        tracks={filterTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
        title={'Треки'}
      />
      ;
    </>
  );
}
