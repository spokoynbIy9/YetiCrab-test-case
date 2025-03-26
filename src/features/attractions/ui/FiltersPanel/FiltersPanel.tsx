import { Button, TextInput } from '@gravity-ui/uikit';
import { FC, useEffect, useMemo } from 'react';
import classes from './FiltersPanel.module.scss';
import { debounce } from '@/shared/libs/helpers/debounce';

interface FiltersPanelProps {
  hideVisited: boolean;
  toggleHideVisited: () => void;
  handleSearch: (text: string) => void;
}

export const FiltersPanel: FC<FiltersPanelProps> = ({
  hideVisited,
  handleSearch,
  toggleHideVisited,
}) => {
  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 1000),
    [handleSearch]
  );

  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel?.();
    };
  }, [debouncedHandleSearch]);

  return (
    <div className={classes.container}>
      <TextInput
        className={classes.searchBar}
        placeholder="Введите название достопримечательности..."
        onUpdate={(value) => {
          debouncedHandleSearch(value);
        }}
      />
      <Button onClick={toggleHideVisited}>
        {hideVisited ? 'Вернуть просмотренные' : 'Скрыть просмотренные'}
      </Button>
    </div>
  );
};
