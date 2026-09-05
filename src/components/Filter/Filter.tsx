'use client';

import { useState } from 'react';
import style from './Filter.module.css';
import { getUniqueValuesByKey } from '@/utils/helpers';
import classNames from 'classnames';
import FilterItem from '../Filteritem/Filteritem';
import { Props } from '../Centerblock/Centerblock';

export default function Filter({ tracks }: Props) {
  type FilterType = 'author' | 'year' | 'genre' | null;

  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const toggleFilter = (name: FilterType) => {
    setActiveFilter(activeFilter === name ? null : name);
  };

  const authors = getUniqueValuesByKey(tracks, 'author');
  const years = [
    ...new Set(
      getUniqueValuesByKey(tracks, 'release_date').map((date) =>
        date.slice(0, 4),
      ),
    ),
  ].sort((a, b) => Number(b) - Number(a));
  const genres = getUniqueValuesByKey(tracks, 'genre');
  return (
    <div className={style.centerblock__filter}>
      <div className={style.filter__title}>Искать по:</div>

      <div className={style.filter__wrapper}>
        <div
          className={classNames(style.filter__button, {
            [style.active]: activeFilter === 'author',
          })}
          onClick={() => toggleFilter('author')}
        >
          исполнителю
        </div>
        {activeFilter === 'author' && (
          <FilterItem type="author" options={authors} />
        )}
      </div>

      <div className={style.filter__wrapper}>
        <div
          className={classNames(style.filter__button, {
            [style.active]: activeFilter === 'year',
          })}
          onClick={() => toggleFilter('year')}
        >
          году выпуска
        </div>
        {activeFilter === 'year' && <FilterItem type="year" options={years} />}
      </div>

      <div className={style.filter__wrapper}>
        <div
          className={classNames(style.filter__button, {
            [style.active]: activeFilter === 'genre',
          })}
          onClick={() => toggleFilter('genre')}
        >
          жанру
        </div>
        {activeFilter === 'genre' && (
          <FilterItem type="genre" options={genres} />
        )}
      </div>
    </div>
  );
}
