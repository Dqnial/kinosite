import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
   return (
      <Container>
         <Stack
            component="footer"
            sx={{
               paddingBottom: 4,
               paddingTop: 4,
               flexDirection: { sm: 'row' },
               justifyContent: { sm: 'space-between' },
               alignItems: { sm: 'center' },
            }}
         >
            <Typography>
               &copy; {new Date().getFullYear()} &laquo;KinoSite&raquo;
               <br />
               Данный сайт создан исключительно в обучающих целях <br /> Все
               права принадлежат правообладателям
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
               <Typography
                  component={Link}
                  to="/"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  variant="h4"
                  paddingRight="16px"
                  sx={{
                     color: '#fff',
                     textDecoration: 'none',
                  }}
               >
                  <LiveTvIcon></LiveTvIcon>
                  KinoSite
               </Typography>
            </Stack>
         </Stack>
      </Container>
   );
}
