import { baseApi } from '@/shared/api';
import { AttractionDto } from '../model/types/attractionDto';
import { Attraction } from '../model/types/attraction';

const attractionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAttractions: build.query<AttractionDto[], void>({
      query: () => ({
        url: '/attractions',
      }),
      providesTags: ['Attractions'],
    }),
    deleteAttraction: build.mutation<void, string>({
      query: (id) => ({
        url: `/attractions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Attractions'],
    }),
    updateAttraction: build.mutation<void, Attraction>({
      query: ({ id, ...body }) => ({
        url: `/attractions/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Attractions'],
    }),
    createAttraction: build.mutation<void, Attraction>({
      query: (body) => ({
        url: `/attractions`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Attractions'],
    }),
  }),
});

export const {
  useGetAttractionsQuery,
  useDeleteAttractionMutation,
  useUpdateAttractionMutation,
  useCreateAttractionMutation,
} = attractionApi;
