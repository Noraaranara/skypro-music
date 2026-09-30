import classNames from 'classnames';
import style from './Filteritem.module.css';

type filterItemsProps = {
  activeFilter: null | string;
  changeActiveFilter: (n: string) => void;
  nameFilter: string;
  list: string[];
  titleFilter: string;
  onselect: (value: string) => void;
  selectedValues: string[];
};

export default function FilterItem({
  activeFilter,
  changeActiveFilter,
  nameFilter,
  list,
  titleFilter,
  onselect,
  selectedValues,
}: filterItemsProps) {
  const selectedCount = selectedValues.length;

  return (
    <div
      className={classNames(style.filter__button, {
        [style.active]: activeFilter === nameFilter,
        [style.selected]: selectedCount > 0,
      })}
      onClick={() => changeActiveFilter(nameFilter)}
    >
      {titleFilter}

      {selectedCount > 0 && (
        <span className={style.filter__count}>
          {selectedCount}
        </span>
      )}

      {activeFilter === nameFilter && (
        <div className={style.filter__wrapper}>
          <ul className={style.filter__list}>
            {list.map((el, index) => (
              <li
                key={index}
                className={classNames({
                  [style.selectedItem]: selectedValues.includes(el),
                })}
                onClick={() => onselect(el)}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}