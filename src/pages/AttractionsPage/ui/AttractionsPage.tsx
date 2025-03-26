import AttractionsPanel from '@/features/attractions/ui/AttractionsPanel/AttractionsPanel';
import classes from './AttractionPage.module.scss';

const AttractionsPage = () => {
  return (
    <div className={classes.container}>
      <AttractionsPanel />
    </div>
  );
};

export default AttractionsPage;
