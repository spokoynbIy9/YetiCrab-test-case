import { useState } from 'react';
import { useGetAttractionsQuery } from '../../api/attractionApi';
import { AttractionEditModal } from '../AttractionEditModal/AttractionEditModal';
import { AttractionsTable } from '../AttractionsTable/AttractionsTable';
import classes from './AttractionsPanel.module.scss';
import { AttractionDto } from '../../model/types/attractionDto';
import { AttractionCreateModal } from '../AttractionCreateModal/AttractionCreateModal';
import { AddAttractionButton } from '../AddAttractionButton/AddAttractionButton';

const AttractionsPanel = () => {
  const [editingAttraction, setEditingAttraction] =
    useState<AttractionDto | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { data, isLoading } = useGetAttractionsQuery();

  const onEditAttraction = (attraction: AttractionDto) => {
    setEditingAttraction(attraction);
    setOpenEditModal(true);
  };
  const closeEditModal = () => setOpenEditModal(false);

  const onCreateAttraction = () => {
    setOpenCreateModal(true);
  };
  const closeCreateModal = () => {
    setOpenCreateModal(false);
  };

  const onMouseEnterTable = () => {
    if (!openEditModal && !openCreateModal) setIsHovered(true);
  };
  const onMouseLeaveTable = () => {
    if (!openEditModal && !openCreateModal) setIsHovered(false);
  };

  if (isLoading) {
    return (
      <div className={classes.container}>
        <span>...Loading</span>
      </div>
    );
  }
  if (data) {
    return (
      <div className={classes.container}>
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
