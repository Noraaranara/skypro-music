import style from './Centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import SkeletonTrack from '../Loading/Loading';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { likedTracks } from '@/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { withReauth } from '@/utils/withReAuth';

export type CenterBlockProps = {
  tracks: TrackType[];
  isLoading: boolean;
  errorRes: string | null;
  title: string;
};

export default function Centerblock({
  tracks,
  isLoading,
  errorRes,
  title,
}: CenterBlockProps) {
  const access = useAppSelector((state) => state.auth.access);
  const refresh = useAppSelector((state) => state.auth.access);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!access || !refresh) return;

    const getLikedTracks = async () => {
      try {
        const res = await withReauth(
          (newAccess) => likedTracks(newAccess),
          access,
          refresh,
          dispatch,
        );

        dispatch(setFavoriteTracks(res.data.data));
      } catch (error) {
        console.error(error);
      }
    };

    getLikedTracks();
  }, [access, refresh, dispatch]);
  return (
    <div className={style.centerblock}>
      <Search />
      <h2 className={style.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={style.centerblock__content}>
        <div className={style.content__title}>
          <div className={classNames(style.playlistTitle__col, style.col01)}>
            Трек
          </div>
          <div className={classNames(style.playlistTitle__col, style.col02)}>
            Исполнитель
          </div>
          <div className={classNames(style.playlistTitle__col, style.col03)}>
            Альбом
          </div>
          <div className={classNames(style.playlistTitle__col, style.col04)}>
            <svg className={style.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={style.content__playlist}>
          {errorRes ? (
            <div className={style.error}>{errorRes}</div>
          ) : isLoading ? (
            <>
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
            </>
          ) : (
            tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
