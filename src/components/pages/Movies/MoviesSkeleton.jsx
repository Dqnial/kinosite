import { Container, Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

export default function MoviesSkeleton() {
   const isMobile = useMediaQuery('(max-width: 600px)');

   return (
      <Container>
         {new Array(5).fill(null).map((_, index) => (
            <React.Fragment key={index}>
               <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="200px"
                  height="42px"
                  sx={{ mt: 1, mb: 1 }}
               />
               <Stack
                  display="flex"
                  gap={1}
                  flexDirection="row"
                  flexWrap="wrap"
               >
                  {new Array(5).fill(null).map((_, index) => (
                     <Skeleton
                        key={index}
                        variant="rounded"
                        animation="wave"
                        width={isMobile ? '100%' : '220px'}
                        height={isMobile ? '520px' : '330px'}
                     />
                  ))}
               </Stack>
            </React.Fragment>
         ))}
      </Container>
   );
}
