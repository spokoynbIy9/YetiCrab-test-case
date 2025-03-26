import { useDeleteAttractionMutation } from '../../api/attractionApi';
import {
  Button,
  Icon,
  Link,
  Table,
  TableColumnConfig,
  withTableSorting,
} from '@gravity-ui/uikit';

import classes from './AttractionsTable.module.scss';

import {
  LocationArrowFill,
  Pencil,
  StarFill,
  Tag,
  TrashBin,
} from '@gravity-ui/icons';
import { AttractionDto } from '../../model/types/attractionDto';
import { FC } from 'react';

interface AttractionsTableProps {
  attractions: AttractionDto[];
  onEdit: (attraction: AttractionDto) => void;
}

export const AttractionsTable: FC<AttractionsTableProps> = ({
  attractions,
  onEdit,
}) => {
  const EnhancedTable = withTableSorting<AttractionDto>(Table);
  const [deleteAttraction] = useDeleteAttractionMutation();

  const columns: TableColumnConfig<AttractionDto>[] = [
    {
      id: 'photo',
      name: 'Фото',
      align: 'center',
      template: (item) => (
        <div>
          <img src={item.photo} alt={item.title} width={200} height={200} />
        </div>
      ),
    },
    {
      id: 'title',
      name: 'Название',
      align: 'center',
      template: (item: AttractionDto) => (
        <span className={classes.titleCell}>{item.title}</span>
      ),
    },
    {
      id: 'location',
      name: 'Локация',
      align: 'center',
      template: (item) => item.location,
    },
    {
      id: 'rating',
      name: 'Рейтинг',
      align: 'center',
      template: (item) => (
        <div className={classes.ratingCell}>
          <Icon data={StarFill} size={16} />
          <span>{item.rating}</span>
        </div>
      ),
      meta: { sort: true },
    },
    {
      id: 'status',
      name: 'Статус',
      align: 'center',
      template: (item) => (
        <Tag
          className={
            item.status === 'посетил' ? classes.visited : classes.planned
          }
        />
      ),
    },
    {
      id: 'mapLink',
      name: 'Карта',
      align: 'center',
      template: (item) => (
        <Link href={item.mapLink} className={classes.mapLink} target="_blank">
          <Icon data={LocationArrowFill} size={18} />
        </Link>
      ),
    },
    {
      id: 'actions',
      name: '',
      width: 120,
      align: 'center',
      template: (item) => (
        <div className={classes.actionsCell}>
          <Button
            title="Редактировать"
            className={classes.editButton}
            onClick={() => onEdit(item)}
          >
            <Icon data={Pencil} />
          </Button>
          <Button
            title="Удалить"
            onClick={() => deleteAttraction(item.id)}
            className={classes.deleteButton}
          >
            <Icon data={TrashBin} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <EnhancedTable
      data={attractions}
      columns={columns}
      edgePadding={true}
      verticalAlign="middle"
      className={classes.table}
      getRowDescriptor={() => ({
        classNames: [classes.tableRow],
      })}
    />
  );
};
