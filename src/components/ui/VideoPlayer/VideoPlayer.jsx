import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function VideoPlayer({ kinopoiskId }) {
   const playerContainerRef = useRef(null);

   useEffect(() => {
      if (!kinopoiskId || !playerContainerRef.current) return;

      const oldScripts = document.querySelectorAll('script[src*="kinobd.net"]');
      oldScripts.forEach((s) => s.remove());

      playerContainerRef.current.innerHTML = `<div id="kinobd" data-kinopoisk="${kinopoiskId}"></div>`;

      const script = document.createElement('script');
      script.src = 'https://kinobd.net/js/player_.js';
      script.async = true;

      const timer = setTimeout(() => {
         document.body.appendChild(script);
      }, 100);

      return () => {
         clearTimeout(timer);
         if (document.body.contains(script)) {
            script.remove();
         }
         if (playerContainerRef.current) {
            playerContainerRef.current.innerHTML = '';
         }
      };
   }, [kinopoiskId]);

   return (
      <Grid size={12}>
         <Typography textAlign="center" variant="h5" mb={1}>
            <b>Смотреть онлайн</b>
         </Typography>
         <Box
            sx={{
               width: '100%',
               height: '75vh',
               bgcolor: '#000',
               position: 'relative',
               '& #kinobd, & #kinobd-iframe, & #kinobd-iframe > body': {
                  height: '100% !important',
                  width: '100% !important',
                  minHeight: '100% !important',
               },
            }}
         >
            <div
               ref={playerContainerRef}
               style={{ width: '100%', height: '100%' }}
            />
         </Box>
      </Grid>
   );
}
