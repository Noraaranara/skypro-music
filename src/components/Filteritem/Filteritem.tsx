'use client';

import { useState } from 'react';
import classNames from 'classnames';
import style from './Filteritem.module.css';

type Props = {
  type: 'author' | 'year' | 'genre';
  options: string[];
};

export default function FilterItem({ type, options }: Props) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClick = (item: string) => {
    setActiveItem(item);
  };
  return (
    <div className={style.filter__box}>
      <div className={style.filter__list}>
        {options.map((item) => (
          <div
            key={item}
            className={classNames(style.filter__item, {
              [style.active]: activeItem === item,
            })}
            onClick={() => handleClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
