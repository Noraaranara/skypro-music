'use client';

import style from './Filteritem.module.css';

type Props = {
  type: 'author' | 'year' | 'genre';
  options: string[];
};

export default function FilterItem({ type, options }: Props) {
  return (
    <div className={style.filter__box}>
      <div className={style.filter__list}>
        {options.map((item) => (
          <div key={item} className={style.filter__item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
