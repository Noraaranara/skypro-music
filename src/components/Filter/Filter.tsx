'use client';

import { useState } from 'react';
import style from './Filter.module.css';
import { getUniqueValuesByKey } from '@/utils/helpers';
import FilterItem from '../Filteritem/Filteritem';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import { setFilterAuthors, setFilterGenres, setFilterYears } from '@/store/features/trackSlice';

type filterProp = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: filterProp) {
  const [activeFilter, setActiveFilter] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const changeActiveFilter = (nameFilter: string) => {
    if (activeFilter === nameFilter) {
      return setActiveFilter(null);
    }
    setActiveFilter(nameFilter);
  };

  const authors = getUniqueValuesByKey(tracks, 'author');
  const genres = getUniqueValuesByKey(tracks, 'genre');
  const years = ['Сначала новые', 'Сначала старые', 'По умолчанию'];

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };
  const onSelectGenre = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };
  const onSelectYear = (year: string) => {
    dispatch(setFilterYears(year));
  };
  return (
    <div className={style.centerblock__filter}>
      <div className={style.filter__title}>Искать по:</div>
      <FilterItem
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'author'}
        list={authors}
        titleFilter={'исполнителю'}
        onselect={onSelectAuthor}
      />
      <FilterItem
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'year'}
        list={years}
        titleFilter={'году выпуска'}
        onselect={onSelectYear}
      />
      <FilterItem
        activeFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'genre'}
        list={genres}
        titleFilter={'жанру'}
        onselect={onSelectGenre}
      />
    </div>
  );
}
