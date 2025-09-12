import { ArrowBack } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TOP_LISTS } from '../../../constants';
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList/MoviesList';
import MovieListTopSkeleton from './MoviesListTopSkeleton';

export default function MoviesListTop() {
   const [page, setPage] = React.useState(1);
   const location = useLocation();
   const navigate = useNavigate();
   const movieType = TOP_LISTS.find((el) => el.url === location.pathname);
   const { data, error, isLoading } = useGetFilmsTopQuery({
      type: movieType.value,
      page,
   });

   React.useEffect(() => {
      setPage(1);
   }, [location]);

   if (error) return <ErrorMessage />;

   if (isLoading) return <MovieListTopSkeleton />;

   console.log(isLoading);

   return (
      <Container>
         <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
            <Typography variant="h4" textAlign="center">
               {movieType.title}
            </Typography>
         </Stack>
         <MoviesList
            movies={data.items}
            totalPages={data.totalPages}
            page={page}
            setPage={setPage}
         />
      </Container>
   );
}
