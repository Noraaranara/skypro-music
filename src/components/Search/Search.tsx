'use client'

import { useState } from "react"
import style from "./Search.module.css"

export default function Search() {
    const [searchInput, setSearchInput] = useState('')
    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }
    return (
        <div className={style.centerblock__search}>
                <svg className={style.search__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>
                {searchInput}
                <input
                    className={style.search__text}
                    type="search"
                    placeholder="Поиск"
                    name="search"
                    value={searchInput}
                    onChange={onSearchInput}
                />
            </div>
    )
}