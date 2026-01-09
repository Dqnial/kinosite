import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kinopoiskApi = createApi({
   reducerPath: 'kinopoiskApi',
   baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
      prepareHeaders: (headers) => {
         headers.set('X-API-KEY', import.meta.env.VITE_KINOPOISK_KEY1);
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
