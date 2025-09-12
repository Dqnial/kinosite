import { Container, Link, Stack } from '@mui/material';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import useMoviesQuery from '../../../hooks/useMoviesQuery';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesSkeleton from './MoviesSkeleton';

export default function Movies() {
   const {
      isLoading,
      hasError,
      responsePopular,
      responseBest,
      responseFilms,
      responseSerials,
      responseCartoons,
   } = useMoviesQuery();

   if (isLoading) return <MoviesSkeleton />;

   if (hasError) return <ErrorMessage />;

   const serializeDataForCarousel = (data) =>
      data.map((row) => (
         <BearSlideImage
            key={row.id}
            imageUrl={row.posterUrlPreview}
         ></BearSlideImage>
      ));

   const carouselArray = [
      {
         title: 'Популярные фильмы',
         url: '/popular',
         data: serializeDataForCarousel(responsePopular.data.items),
      },
      {
         title: 'Лучшие фильмы',
         url: '/best',
         data: serializeDataForCarousel(responseBest.data.items),
      },
      {
         title: 'Фильмы',
         url: '/films',
         data: serializeDataForCarousel(responseFilms.data.items),
      },
      {
         title: 'Сериалы',
         url: '/serials',
         data: serializeDataForCarousel(responseSerials.data.items),
      },
      {
         title: 'Мультфильмы',
         url: '/cartoons',
         data: serializeDataForCarousel(responseCartoons.data.items),
      },
   ];

   return (
      <Container>
         {carouselArray.map((carousel) => (
            <Stack key={carousel.title}>
               <Link
                  sx={{ mt: 2, mb: 2 }}
                  component={RouterLink}
                  variant="h4"
                  to={carousel.url}
               >
                  {carousel.title}
               </Link>
               <BearCarousel
                  data={carousel.data}
                  slidesPerView={1}
                  slidesPerGroup={1}
                  isEnableNavButton
                  spaceBetween={10}
                  breakpoints={{
                     768: {
                        slidesPerView: 5,
                     },
                  }}
               />
            </Stack>
         ))}
      </Container>
   );
}
