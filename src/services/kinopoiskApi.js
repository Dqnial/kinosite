import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kinopoiskApi = createApi({
   reducerPath: 'kinopoiskApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://kinopoiskapiunofficial.tech/api',
      prepareHeaders: (headers) => {
         headers.set('X-API-KEY', 'd26e9822-daf8-4341-a450-fa422613acda'); // acbd7803-8d3f-40f7-b1f6-81c173ff4ab9
         headers.set('Content-Type', 'application/json');
      },
   }),
   endpoints: (builder) => ({
      getFilmsTop: builder.query({
         query: ({ type, page }) =>
            `/v2.2/films/collections?type=${type}&page=${page}`,
      }),
      getFilms: builder.query({
         query: ({
            countries,
            genreId,
            order = 'NUM_VOTE',
            type = 'FILM',
            year,
            page,
            keyword = '',
         }) =>
            `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo=${year}&page=${page}&keyword=${keyword}`,
      }),
      getGenreAndCountries: builder.query({
         query: () => `/v2.2/films/filters`,
      }),
      getFilm: builder.query({
         query: (id) => `/v2.2/films/${id}`,
      }),
      getSequelsAndPrequels: builder.query({
         query: (id) => `/v2.1/films/${id}/sequels_and_prequels`,
      }),
      getStaff: builder.query({
         query: (id) => `/v1/staff?filmId=${id}`,
      }),
   }),
});

export const {
   useGetFilmsTopQuery,
   useGetFilmsQuery,
   useGetGenreAndCountriesQuery,
   useGetFilmQuery,
   useGetSequelsAndPrequelsQuery,
   useGetStaffQuery,
} = kinopoiskApi;
