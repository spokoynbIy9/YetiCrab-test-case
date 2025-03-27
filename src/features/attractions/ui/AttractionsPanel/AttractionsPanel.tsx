import { useCallback, useState } from 'react';
import { useGetAttractionsQuery } from '../../../../entities/Attraction/api/attractionApi';
import { AttractionEditModal } from '../Modals/AttractionEditModal/AttractionEditModal';
import { AttractionsTable } from '../../../../entities/Attraction/ui/AttractionsTable/AttractionsTable';
import classes from './AttractionsPanel.module.scss';
import { AttractionDto } from '../../../../entities/Attraction/model/types/attractionDto';
import { AttractionCreateModal } from '../Modals/AttractionCreateModal/AttractionCreateModal';
import { AddAttractionButton } from '../AddAttractionButton/AddAttractionButton';
import { FiltersPanel } from '@/features/attractions/ui/FiltersPanel/FiltersPanel';

const AttractionsPanel = () => {
  const [editingAttraction, setEditingAttraction] =
    useState<AttractionDto | null>(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    hideVisited: false,
  });

  const { data, isLoading } = useGetAttractionsQuery(filters);

  const onEditAttraction = useCallback((attraction: AttractionDto) => {
    setEditingAttraction(attraction);
    setOpenEditModal(true);
  }, []);

  const closeEditModal = () => setOpenEditModal(false);

  const onCreateAttraction = useCallback(() => {
    setOpenCreateModal(true);
  }, []);

  const closeCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleSearch = useCallback((text: string) => {
    setFilters((prev) => ({ ...prev, search: text }));
  }, []);

  const toggleHideVisited = useCallback(() => {
    setFilters((prev) => ({ ...prev, hideVisited: !prev.hideVisited }));
  }, []);

  const onMouseEnterTable = useCallback(() => {
    if (!openEditModal && !openCreateModal) setIsHovered(true);
  }, [openCreateModal, openEditModal]);

  const onMouseLeaveTable = useCallback(() => {
    if (!openEditModal && !openCreateModal) setIsHovered(false);
  }, [openCreateModal, openEditModal]);

  if (isLoading) {
    return (
      <div className={classes.container}>
        <p className={classes.loading}>Loading...</p>
      </div>
    );
  }
  if (data) {
    return (
      <div className={classes.container}>
        <FiltersPanel
          hideVisited={filters.hideVisited}
          toggleHideVisited={toggleHideVisited}
          handleSearch={handleSearch}
        />
        <div
          className={classes.wrapper}
          onMouseEnter={onMouseEnterTable}
          onMouseLeave={onMouseLeaveTable}
        >
          <AttractionsTable attractions={data} onEdit={onEditAttraction} />
          <AddAttractionButton
            isHovered={isHovered}
            onCreateAttraction={onCreateAttraction}
          />
          <AttractionEditModal
            open={openEditModal}
            close={closeEditModal}
            initialValues={editingAttraction}
          />
          <AttractionCreateModal
            open={openCreateModal}
            close={closeCreateModal}
          />
        </div>
      </div>
    );
  }
};

export default AttractionsPanel;
