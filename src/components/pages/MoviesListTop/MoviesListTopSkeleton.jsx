import { Container, Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function MovieListTopSkeleton() {
   return (
      <Container>
         <Skeleton
            animation="wave"
            variant="rounded"
            width="225px"
            height="42px"
            sx={{ mb: '16px', mt: '16px' }}
         />
         <Stack
            flexDirection="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={2}
         >
            {new Array(20).fill(null).map((_, index) => (
               <Stack key={index}>
                  <Skeleton
                     animation="wave"
                     variant="rounded"
                     width="215px"
                     height="300px"
                  />
                  <Skeleton
                     animation="wave"
                     variant="rounded"
                     width="200px"
                     height="24px"
                     sx={{ mt: '8px' }}
                  />
               </Stack>
            ))}
         </Stack>
         <Skeleton
            animation="wave"
            variant="rounded"
            height="40px"
            sx={{
               maxWidth: { xs: '100%', sm: '300px' },
               width: { xs: '100%', sm: '300px' },
               margin: '0 auto',
               mt: '24px',
            }}
         />
      </Container>
   );
}
