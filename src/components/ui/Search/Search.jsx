import {
   Autocomplete,
   CircularProgress,
   Stack,
   TextField,
   Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSearchQuery } from '../../../features/searchQuerySlice';
import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

export default function Search() {
   const [searchValue, setSearchValue] = React.useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { countries, genreId, order, type, year, page, keyword } = useSelector(
      (state) => state.searchQuerySlice,
   );

   React.useEffect(() => {
      const setTimeoutId = setTimeout(() => {
         dispatch(setSearchQuery({ keyword: searchValue }));
      }, 500);

      return () => clearTimeout(setTimeoutId);
   }, [searchValue, dispatch]);

   const { data, isFetching } = useGetFilmsQuery({
      countries,
      genreId,
      order,
      type,
      year,
      page,
      keyword,
   });

   return (
      <Autocomplete
         freeSolo
         sx={{ width: { xs: '100%', md: '400px' } }}
         options={Array.isArray(data?.items) ? data.items : []}
         getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.nameRu || ''
         }
         renderOption={(props, option) => (
            <li {...props} key={option.kinopoiskId || option.nameRu}>
               <img
                  src={option.posterUrl}
                  alt={option.nameRu}
                  style={{
                     width: 40,
                     height: 60,
                     objectFit: 'cover',
                     marginRight: 10,
                  }}
               />
               <Stack>
                  <Typography variant="body1">{option.nameRu}</Typography>
                  <Stack flexDirection="row" gap="4px" alignItems="center">
                     <Typography
                        variant="body2"
                        sx={{
                           borderRadius: '4px',
                           fontSize: '15px',
                           color:
                              option.ratingKinopoisk >= 7
                                 ? '#3bb33b'
                                 : option.ratingKinopoisk < 7
                                   ? '#777'
                                   : 'red',
                        }}
                     >
                        {option.ratingKinopoisk}
                     </Typography>
                     <Typography
                        variant="body2"
                        sx={{ fontSize: '13px', color: '#B0B0B0' }}
                     >
                        {option.genres
                           ?.map((genre) => genre.genre)
                           .slice(0, 3)
                           .join(', ')}
                     </Typography>
                  </Stack>
               </Stack>
            </li>
         )}
         renderInput={(params) => (
            <TextField
               {...params}
               label="Поиск"
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <React.Fragment>
                        {isFetching ? (
                           <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                     </React.Fragment>
                  ),
               }}
            />
         )}
         onInputChange={(_, value) => setSearchValue(value)}
         onChange={(_, value) => {
            if (value && typeof value !== 'string' && value.kinopoiskId) {
               navigate(`/movie/${value.kinopoiskId}`);
               setSearchValue('');
            }
         }}
      />
   );
}
