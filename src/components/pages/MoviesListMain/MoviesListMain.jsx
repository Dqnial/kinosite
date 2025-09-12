import { ArrowBack } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { MOVIE_LISTS } from '../../../constants';
import {
   useGetFilmsQuery,
   useGetGenreAndCountriesQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList/MoviesList';
import SelectMovies from '../../ui/SelectMovies/SelectMovies';
import MovieListMainSkeleton from './MoviesListMainSkeleton';

export default function MoviesListMain() {
   const [page, setPage] = React.useState(1);
   const location = useLocation();
   const { countries, order, year, genreId } = useSelector(
      (state) => state.currentQuery,
   );
   const navigate = useNavigate();
   const movieType = MOVIE_LISTS.find((el) => el.url === location.pathname);
   const myGenreId = movieType.url === '/cartoons' ? 18 : genreId;

   const responseFilms = useGetFilmsQuery({
      type: movieType.value,
      countries,
      order,
      year,
      genreId: myGenreId,
      page,
   });

   const responseGenreAndCountries = useGetGenreAndCountriesQuery();

   React.useEffect(() => {
      setPage(1);
   }, [location]);

   if (responseFilms.error || responseGenreAndCountries.error)
      return <ErrorMessage />;

   if (responseFilms.isLoading || responseGenreAndCountries.isLoading)
      return <MovieListMainSkeleton />;

   console.log(responseGenreAndCountries);

   return (
      <Container>
         <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
            <Typography variant="h4" textAlign="center">
               {movieType.title}
            </Typography>
         </Stack>
         {responseGenreAndCountries.isSuccess ? (
            <SelectMovies
               countriesList={responseGenreAndCountries.data.countries}
               genresList={responseGenreAndCountries.data.genres}
               countries={countries}
               order={order}
               year={year}
               genreId={myGenreId}
            />
         ) : null}
         <MoviesList
            movies={responseFilms.data.items}
            totalPages={responseFilms.data.totalPages}
            page={page}
            setPage={setPage}
         />
      </Container>
   );
}
