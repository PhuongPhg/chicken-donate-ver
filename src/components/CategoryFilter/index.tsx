import clsx from 'clsx';
import React, { useCallback } from 'react';
import { ECategoryTypes } from 'types/organisation';
import { CATEGORY_LIST } from 'utils/constant';
import classes from './style.module.scss';

interface IProps {
  categoryFilters?: ECategoryTypes[];
  onSelect: (e: ECategoryTypes) => void;
}
function CategoryFilter({ categoryFilters = [], onSelect }: IProps) {
  const isSelected = useCallback((value: ECategoryTypes) => categoryFilters.includes(value), [categoryFilters]);

  return (
    <div className={classes.filterContainer}>
      {CATEGORY_LIST.map(({ title, value }) => (
        <button
          className={clsx(classes.filterItem, isSelected(value) && classes.selectedFilterItem)}
          onClick={() => onSelect(value)}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
