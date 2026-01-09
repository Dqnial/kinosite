import { Box, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from '../MovieCard/MovieCard.module.css';

export default function SequelsAndPrequelsCard({ movie, reload = false }) {
   const linkProps = reload
      ? { component: 'a', href: `/movie/${movie.filmId}` }
      : { component: RouterLink, href: `/movie/${movie.filmId}` };

   return (
      <Stack>
         <Link {...linkProps}>
            <Box sx={{ position: 'relative' }}>
               <img
                  className={styles.img}
                  src={movie.posterUrlPreview}
                  alt={movie.nameRu}
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

            <Typography
               textAlign="center"
               marginTop={1}
               sx={{ width: '200px' }}
            >
               {movie.nameRu ? movie.nameRu : movie.nameEn}
            </Typography>
         </Link>
      </Stack>
   );
}
