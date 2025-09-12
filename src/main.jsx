import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import 'bear-react-carousel/dist/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store.js';
import './assets/css/index.css';
import App from './components/ui/App.jsx';

const darkTheme = createTheme({
   palette: {
      primary: {
         main: '#ffffff',
      },
      secondary: {
         main: '#ffffff',
      },
      mode: 'dark',
   },
});

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <App />
      </ThemeProvider>
   </Provider>,
);
