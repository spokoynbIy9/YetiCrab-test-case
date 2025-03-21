import { baseApi } from '@/shared/api';
import { AttractionDto } from '../model/types/attractionDto';

const attractionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAttractions: build.query<AttractionDto, void>({
      query: () => ({
        url: '/attractions',
      }),
    }),
  }),
});

export const { useGetAttractionsQuery } = attractionApi;
