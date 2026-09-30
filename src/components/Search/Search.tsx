'use client';

import style from './Search.module.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/store';
import { setSearch } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useDispatch()

   const search = useAppSelector(
    (state) => state.tracks.filters.search,
  );
  
  const onSearchInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <div className={style.centerblock__search}>
      <svg className={style.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={style.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={search}
        onChange={onSearchInput}
      />
    </div>
  );
}
