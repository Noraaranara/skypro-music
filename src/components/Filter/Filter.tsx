'use client'

import { useState } from 'react'
import style from './Filter.module.css'
import { getUniqueValuesByKey } from '@/utils/helpers'
import { data } from '@/data'
import classNames from 'classnames'
import FilterItem from '../Filteritem/Filteritem'

export default function Filter() {
    type FilterType = 'author' | 'year' | 'genre' | null

    const [activeFilter, setActiveFilter] = useState<FilterType>(null)

    const toggleFilter = (name: FilterType) => {
        setActiveFilter(activeFilter === name ? null : name)
    }

    const authors = getUniqueValuesByKey(data, 'author')
    const years = getUniqueValuesByKey(data, 'release_date').map(date =>
    date.slice(0, 4),)
    const genres = getUniqueValuesByKey(data, 'genre')
    return(
        <div className={style.centerblock__filter}>
            <div className={style.filter__title}>Искать по:</div>

            <div className={style.filter__wrapper}>
                <div className={classNames(style.filter__button, {
                    [style.active]: activeFilter === 'author',
                    })} onClick={() => toggleFilter('author')}>исполнителю</div>
                {activeFilter === 'author' && (
                <FilterItem type="author" options={authors} />
                )}
            </div>

            <div className={style.filter__wrapper}>
                <div className={classNames(style.filter__button, {
                    [style.active]: activeFilter === 'year',
                    })} onClick={() => toggleFilter('year')}>году выпуска</div>
                {activeFilter === 'year' && (
                <FilterItem type="year" options={years} />
                )}
            </div>

            <div className={style.filter__wrapper}>
                <div className={classNames(style.filter__button, {
                    [style.active]: activeFilter === 'genre',
                    })} onClick={() => toggleFilter('genre')}>жанру</div>
                {activeFilter === 'genre' && (
                <FilterItem type="genre" options={genres} />
                )}
            </div>
        </div>
    )
}