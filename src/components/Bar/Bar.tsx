'use client';

import Link from 'next/link';
import style from './Bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { formatTime, getTimePanel } from '@/utils/helpers';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const currentPlaying = useAppSelector((state) => state.tracks.isPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dispatch = useAppDispatch();

  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(10);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  const onTogglePlay = () => {
    if (!audioRef.current) return;

    if (currentPlaying) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    } else {
      audioRef.current.play().catch(() => {});
      dispatch(setIsPlay(true));
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const getTimePanel = (currentTime: number, totalTime: number | undefined) => {
    if (!totalTime || !Number.isFinite(totalTime)) {
      return '0:00 / 0:00';
    }

    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  };

  const onLoadMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
    setCurrentTime(0);
    setIsLoadedTrack(true);

    if (currentPlaying) {
      audioRef.current.play().catch(() => {});
    }
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTime = Number(e.target.value);

    setCurrentTime(inputTime);

    if (audioRef.current) {
      audioRef.current.currentTime = inputTime;
    }
  };

  const onNextTrack = () => {
    setIsLoadedTrack(false);
    setCurrentTime(0);
    setDuration(0);

    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    setIsLoadedTrack(false);
    setCurrentTime(0);
    setDuration(0);

    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
    setShuffle(!shuffle);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume / 100;
  }, [volume, currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (currentPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [currentPlaying, currentTrack]);

  if (!currentTrack) return <></>;
  return (
    <div className={style.bar}>
      <audio
        key={currentTrack._id}
        ref={audioRef}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadMetadata}
        // onEnded={() => }
        src={currentTrack?.track_file}
      ></audio>
      <div className={style.bar__content}>
        <ProgressBar
          max={duration}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />
        <div className={style.bar__playerBlock}>
          <div className={style.bar__player}>
            <div className={style.player__controls}>
              <div onClick={onPrevTrack} className={style.player__btnPrev}>
                <svg className={style.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              {!isLoadedTrack ? (
                <div className={style.loader}></div>
              ) : currentPlaying ? (
                <div
                  className={classNames(style.player__btnPlay, style.btn)}
                  onClick={onTogglePlay}
                >
                  <svg className={style.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  </svg>
                </div>
              ) : (
                <div
                  className={classNames(style.player__btnPlay, style.btn)}
                  onClick={onTogglePlay}
                >
                  <svg className={style.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
              )}
              <div onClick={onNextTrack} className={style.player__btnNext}>
                <svg className={style.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={classNames(style.player__btnRepeat, style.btnIcon, {
                  [style.active]: isLoop,
                })}
              >
                <svg className={style.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                onClick={onToggleShuffle}
                className={classNames(style.player__btnShuffle, style.btnIcon, {
                  [style.active]: shuffle,
                })}
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
                {/* <div
                  className={classNames(
                    style.trackPlay__dislike,
                    style.btnIcon,
                  )}
                >
                  <svg className={style.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div> */}
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
                  min="0"
                  max="100"
                  value={volume}
                  onChange={onVolume}
                />
              </div>
            </div>
            <div className={style.bar__time}>
              {getTimePanel(currentTime, duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
