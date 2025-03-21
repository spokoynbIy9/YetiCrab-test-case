import { useEffect } from 'react';
import { useGetAttractionsQuery } from '../api/attractionApi';

export const AttractionList = () => {
  const { data } = useGetAttractionsQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div>AttractionList</div>;
};
