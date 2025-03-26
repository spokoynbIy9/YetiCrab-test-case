import { Button, Icon } from '@gravity-ui/uikit';
import { FC } from 'react';
import classes from './AddAttractionButton.module.scss';
import { Plus } from '@gravity-ui/icons';

interface AddAttractionButtonProps {
  isHovered: boolean;
  onCreateAttraction: () => void;
}

export const AddAttractionButton: FC<AddAttractionButtonProps> = ({
  isHovered,
  onCreateAttraction,
}) => {
  return (
    <Button
      className={`${classes.addButton} ${isHovered ? classes.visible : ''}`}
      size="l"
      onClick={onCreateAttraction}
    >
      <Icon data={Plus} size={20} />
    </Button>
  );
};
