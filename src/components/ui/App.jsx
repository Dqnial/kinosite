import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MOVIE_LISTS, TOP_LISTS } from '../../constants';
import ActorDetail from '../pages/ActorDetail/ActorDetail';
import MovieDetail from '../pages/MovieDetail/MovieDetail';
import Movies from '../pages/Movies/Movies';
import MoviesListMain from '../pages/MoviesListMain/MoviesListMain';
import MoviesListTop from '../pages/MoviesListTop/MoviesListTop';
import Layout from './Layout';

function App() {
   const router = createBrowserRouter(
      [
         {
            path: '/',
            element: <Layout />,
            children: [
               {
                  path: '/',
                  element: <Movies />,
               },
               ...TOP_LISTS.map((el) => ({
                  path: el.url,
                  element: <MoviesListTop />,
               })),
               ...MOVIE_LISTS.map((el) => ({
                  path: el.url,
                  element: <MoviesListMain />,
               })),
               {
                  path: '/movie/:id',
                  element: <MovieDetail />,
               },
               {
                  path: '/actor/:id',
                  element: <ActorDetail />,
               },
            ],
         },
      ],
      {
         basename: '/kinosite/',
      },
   );

   return (
      <React.StrictMode>
         <RouterProvider router={router} />
      </React.StrictMode>
   );
}

export default App;
