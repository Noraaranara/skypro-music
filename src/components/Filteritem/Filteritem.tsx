import classNames from 'classnames';
import style from './Filteritem.module.css';

type filterItemsProps = {
  activeFilter: null | string;
  changeActiveFilter: (n: string) => void;
  nameFilter: string;
  list: string[];
  titleFilter: string;
  onselect: (value: string) => void;
};

export default function FilterItem({
  activeFilter,
  changeActiveFilter,
  nameFilter,
  list,
  titleFilter,
  onselect,
}: filterItemsProps) {
  return (
    <div
      className={classNames(style.filter__button, {
        [style.active]: activeFilter === nameFilter,
      })}
      onClick={() => changeActiveFilter(nameFilter)}
    >
      {titleFilter}
      {activeFilter === nameFilter && (
        <div className={style.filter__wrapper}>
          <ul className={style.filter__list}>
            {list.map((el, index) => (
              <li key={index} onClick={() => onselect(el)}>
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
