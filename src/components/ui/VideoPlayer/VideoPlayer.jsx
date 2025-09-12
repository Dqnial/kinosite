import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

export default function VideoPlayer({ title }) {
   React.useEffect(() => {
      const script = document.createElement('script');
      script.src = '//kinobd.net/js/player_.js';
      script.async = true;

      document.body.appendChild(script);

      // Очистка скрипта при размонтировании компонента
      return () => {
         document.body.removeChild(script);
      };
   }, []);
   return (
      <Grid size={12}>
         <Typography textAlign="center" variant="h5" mb={1}>
            <b>Смотреть онлайн</b>
         </Typography>
         <Box sx={{ width: '100%', height: '75vh' }}>
            <div id="kinobd" data-title={title}></div>
         </Box>
      </Grid>
   );
}
