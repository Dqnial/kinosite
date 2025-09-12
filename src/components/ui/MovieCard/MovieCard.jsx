import { Box, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
   return (
      <Stack>
         <RouterLink to={`/movie/${movie.kinopoiskId}`}>
            <Box sx={{ position: 'relative' }}>
               <img
                  src={movie.posterUrlPreview}
                  alt={movie.nameRu}
                  className={styles.img}
               />
               {movie.ratingKinopoisk && (
                  <Typography
                     sx={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        minWidth: '38px',
                        borderRadius: '4px',
                        fontSize: '15px',
                        bgcolor:
                           movie.ratingKinopoisk >= 7
                              ? '#3bb33b'
                              : movie.ratingKinopoisk < 7
                                ? '#777'
                                : 'red',
                        color: '#fff',
                        textAlign: 'center',
                     }}
                  >
                     {movie.ratingKinopoisk}
                  </Typography>
               )}
            </Box>
         </RouterLink>
         <Link
            component={RouterLink}
            to={`/movie/${movie.kinopoiskId}`}
            textAlign="center"
            marginTop={1}
            sx={{ width: '200px' }}
         >
            {movie.nameRu ? movie.nameRu : movie.nameEn}
         </Link>
      </Stack>
   );
}
