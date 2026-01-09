import {
   Box,
   CircularProgress,
   Container,
   Grid,
   Stack,
   Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
   useGetFilmQuery,
   useGetSequelsAndPrequelsQuery,
   useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import SequelsAndPrequelsCard from '../../ui/SequelsAndPrequelsCard/SequelsAndPrequelsCard';
import VideoPlayer from '../../ui/VideoPlayer/VideoPlayer';

export default function MovieDetail() {
   const { id } = useParams();

   const responseFilm = useGetFilmQuery(id);
   const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
   const responseStaff = useGetStaffQuery(id);

   if (
      responseFilm.isLoading ||
      responseSequelsAndPrequels.isLoading ||
      responseStaff.isLoading
   ) {
      return (
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="79vh"
         >
            <CircularProgress size="8rem" />
         </Box>
      );
   }
   if (responseFilm.error || responseStaff.error) {
      return <ErrorMessage />;
   }

   return (
      <Container>
         <Grid mt={3} mb={3} container spacing={2}>
            <Grid
               size={{ sm: 8, md: 3.5 }}
               sx={{
                  order: { sm: 1, md: 1 },
               }}
            >
               <img
                  src={responseFilm.data.posterUrl}
                  alt={responseFilm.data.nameRu}
                  width="302px"
                  height="453px"
               />
            </Grid>
            <Grid
               size={{ sm: 12, md: 6.5 }}
               sx={{ fontSize: '15px', order: { sm: 3, md: 2 } }}
            >
               <Typography variant="h4">{responseFilm.data.nameRu}</Typography>
               <Typography mt={2} mb={0.5} variant="h5">
                  О фильме
               </Typography>
               <Grid container>
                  <Grid size={6}>Год производства</Grid>
                  <Grid size={6}>{responseFilm.data.year}</Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Страна</Grid>
                  <Grid size={6}>
                     {responseFilm.data.countries
                        .map((country) => country.country)
                        .toString()
                        .split(',')
                        .join(', ')}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Жанр</Grid>
                  <Grid size={6}>
                     {responseFilm.data.genres
                        .map((genre) => genre.genre)
                        .toString()
                        .split(',')
                        .join(', ')}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Слоган</Grid>
                  <Grid size={6}>{responseFilm.data.slogan}</Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Режиссер</Grid>
                  <Grid size={6}>
                     {(() => {
                        const designers = responseStaff.data
                           .filter((el) => el.professionKey === 'DIRECTOR')
                           .map(({ nameRu }) => nameRu);

                        const displayed = designers.slice(0, 3).join(', ');
                        const hasMore = designers.length > 3;

                        return hasMore ? `${displayed} ...` : displayed;
                     })()}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Сценарий</Grid>
                  <Grid size={6}>
                     {(() => {
                        const designers = responseStaff.data
                           .filter((el) => el.professionKey === 'WRITER')
                           .map(({ nameRu }) => nameRu);

                        const displayed = designers.slice(0, 3).join(', ');
                        const hasMore = designers.length > 3;

                        return hasMore ? `${displayed} ...` : displayed;
                     })()}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Продюсер</Grid>
                  <Grid size={6}>
                     {(() => {
                        const designers = responseStaff.data
                           .filter((el) => el.professionKey === 'PRODUCER')
                           .map(({ nameRu }) => nameRu);

                        const displayed = designers.slice(0, 3).join(', ');
                        const hasMore = designers.length > 3;

                        return hasMore ? `${displayed} ...` : displayed;
                     })()}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Оператор</Grid>
                  <Grid size={6}>
                     {(() => {
                        const designers = responseStaff.data
                           .filter((el) => el.professionKey === 'OPERATOR')
                           .map(({ nameRu }) => nameRu);

                        const displayed = designers.slice(0, 3).join(', ');
                        const hasMore = designers.length > 3;

                        return hasMore ? `${displayed} ...` : displayed;
                     })()}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Композитор</Grid>
                  <Grid size={6}>
                     {(() => {
                        const designers = responseStaff.data
                           .filter((el) => el.professionKey === 'COMPOSER')
                           .map(({ nameRu }) => nameRu);

                        const displayed = designers.slice(0, 3).join(', ');
                        const hasMore = designers.length > 3;

                        return hasMore ? `${displayed} ...` : displayed;
                     })()}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Художник</Grid>
                  <Grid size={6}>
                     {(() => {
                        const designers = responseStaff.data
                           .filter((el) => el.professionKey === 'DESIGN')
                           .map(({ nameRu }) => nameRu);

                        const displayed = designers.slice(0, 3).join(', ');
                        const hasMore = designers.length > 3;

                        return hasMore ? `${displayed} ...` : displayed;
                     })()}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Возраст</Grid>
                  <Grid size={6}>
                     {responseFilm.data.ratingAgeLimits
                        ? responseFilm.data.ratingAgeLimits.replace('age', '') +
                          '+'
                        : '—'}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={6}>Время</Grid>
                  <Grid size={6}>
                     {responseFilm.data.filmLength
                        ? responseFilm.data.filmLength + ' мин.'
                        : '—'}
                  </Grid>
               </Grid>
               <Grid container>
                  <Grid size={12} mt={2}>
                     Описание
                  </Grid>
                  <Grid size={12}>
                     {responseFilm.data.description
                        ? responseFilm.data.description
                        : 'Описание отсутствует'}
                  </Grid>
               </Grid>
            </Grid>
            <Grid size={{ sm: 4, md: 2 }} sx={{ order: { sm: 2, md: 3 } }}>
               <Typography variant="h6">В главных ролях</Typography>
               <Grid container>
                  {responseStaff.data
                     .filter((el) => el.professionKey === 'ACTOR')
                     .map(({ nameRu }) => (
                        <Grid size={12} key={nameRu}>
                           {nameRu}
                        </Grid>
                     ))
                     .slice(0, 10)}
                  <Typography mt={0.5}>
                     {
                        responseStaff.data.filter(
                           (el) => el.professionKey === 'ACTOR',
                        ).length
                     }{' '}
                     актер
                  </Typography>
               </Grid>
            </Grid>
         </Grid>
         <Grid container>
            <VideoPlayer kinopoiskId={responseFilm.data.kinopoiskId} />
         </Grid>
         {responseSequelsAndPrequels.data && (
            <Stack>
               <Typography textAlign="center" variant="h5" mt={3} mb={1}>
                  <b>Сиквелы и приквелы</b>{' '}
               </Typography>
               <Stack
                  flexDirection="row"
                  gap={2}
                  flexWrap="wrap"
                  justifyContent="center"
               >
                  {responseSequelsAndPrequels.data.map((el) => (
                     <Grid size={{ sm: 4, xs: 12, md: 2.5 }} key={el.filmId}>
                        <SequelsAndPrequelsCard movie={el} reload />
                     </Grid>
                  ))}
               </Stack>
            </Stack>
         )}
      </Container>
   );
}
