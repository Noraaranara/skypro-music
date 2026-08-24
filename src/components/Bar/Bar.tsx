'use client';

import Link from 'next/link';
import style from './Bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef } from 'react';
import { setIsPlay } from '@/store/features/trackSlice';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const currentPlaying = useAppSelector((state) => state.tracks.isPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dispatch = useAppDispatch();

  
  const playTrack = () => {
      if (audioRef.current) {
          audioRef.current.play();
          dispatch(setIsPlay(true));
        }
    };
    
    const pauseTrack = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            dispatch(setIsPlay(false));
        }
    };

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.volume = 0.1;
            if (currentPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentPlaying, currentTrack]);



    if (!currentTrack) return <></>;
  return (
    <div className={style.bar}>
      <audio ref={audioRef} src={currentTrack?.track_file}></audio>
      <div className={style.bar__content}>
        <div className={style.bar__playerProgress}></div>
        <div className={style.bar__playerBlock}>
          <div className={style.bar__player}>
            <div className={style.player__controls}>
              <div className={style.player__btnPrev}>
                <svg className={style.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              {currentPlaying ? (
                <div
                  className={classNames(style.player__btnPlay, style.btn)}
                  onClick={pauseTrack}
                >
                  <svg className={style.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  </svg>
                </div>
              ) : (
                <div
                  className={classNames(style.player__btnPlay, style.btn)}
                  onClick={playTrack}
                >
                  <svg className={style.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
              )}
              <div className={style.player__btnNext}>
                <svg className={style.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(style.player__btnRepeat, style.btnIcon)}
              >
                <svg className={style.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(style.player__btnShuffle, style.btnIcon)}
              >
                <svg className={style.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={style.player__trackPlay}>
              <div className={style.trackPlay__contain}>
                <div className={style.trackPlay__image}>
                  <svg className={style.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={style.trackPlay__author}>
                  <Link className={style.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={style.trackPlay__album}>
                  <Link className={style.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={style.trackPlay__dislike}>
                <div
                  className={classNames(
                    style.player__btnShuffle,
                    style.btnIcon,
                  )}
                >
                  <svg className={style.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    style.trackPlay__dislike,
                    style.btnIcon,
                  )}
                >
                  <svg className={style.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={style.bar__volumeBlock}>
            <div className={style.volume__content}>
              <div className={style.volume__image}>
                <svg className={style.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(style.volume__progress, style.btn)}>
                <input
                  className={classNames(style.volume__progressLine, style.btn)}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
