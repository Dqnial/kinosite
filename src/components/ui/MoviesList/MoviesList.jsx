import { Pagination, Stack } from '@mui/material';
import React from 'react';

import MovieCard from '../MovieCard/MovieCard';

export default function MoviesList({ movies, totalPages, page, setPage }) {
   return (
      <>
         <Stack
            flexDirection="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={2}
         >
            {movies.map((movie) => (
               <MovieCard movie={movie} key={movie.kinopoiskId} />
            ))}
         </Stack>
         <Stack alignItems="center" marginTop={3}>
            <Pagination
               count={totalPages}
               color="primary"
               variant="outlined"
               shape="rounded"
               size="large"
               onChange={(_, value) => setPage(value)}
            />
         </Stack>
      </>
   );
}
