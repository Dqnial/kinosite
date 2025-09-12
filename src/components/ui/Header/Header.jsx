import CloseIcon from '@mui/icons-material/Close';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Link, Modal } from '@mui/material';
import {
   AppBar,
   Box,
   Container,
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Stack,
   Toolbar,
   Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { MOVIE_LISTS, TOP_LISTS, iconComponents } from '../../../constants';
import Search from '../../ui/Search/Search';

const Icon = ({ iconName }) => {
   const IconComponent = iconComponents[iconName];
   return <IconComponent />;
};

export default function Header() {
   const [isMobileOpen, setIsMobileOpen] = React.useState(false);
   const [openModal, setOpenModal] = React.useState(false);
   const handleOpenModal = () => setOpenModal(true);
   const handleCloseModal = () => setOpenModal(false);

   const handleDrawerToggle = () => {
      setIsMobileOpen((prevState) => !prevState);
   };

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" sx={{ padding: '2px 0' }}>
            <Container>
               <Toolbar>
                  <Box>
                     <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerToggle}
                     >
                        <MenuIcon />
                     </IconButton>
                  </Box>

                  <Stack
                     direction="row"
                     alignItems="center"
                     justifyContent="space-between"
                     width="100%"
                     spacing={2}
                  >
                     <Typography
                        component={RouterLink}
                        to="/"
                        display="flex"
                        alignItems="center"
                        gap={1}
                        variant="h4"
                        paddingRight="16px"
                        sx={{
                           color: 'white',
                           textDecoration: 'none',
                        }}
                     >
                        <LiveTvIcon></LiveTvIcon>
                        KinoSite
                     </Typography>
                     <Button onClick={handleOpenModal}>
                        <SearchIcon sx={{ cursor: 'pointer' }} />
                     </Button>
                     <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                     >
                        <Box
                           sx={{
                              position: 'absolute',
                              top: '1px',
                              left: '50%',
                              transform: 'translate(-50%, -0%)',
                              width: { xs: '100%', md: 'auto' },
                              bgcolor: 'background.paper',
                              border: '2px solid #000',
                              boxShadow: 24,
                              p: 4,
                           }}
                        >
                           <CloseIcon
                              onClick={handleCloseModal}
                              sx={{
                                 position: 'absolute',
                                 top: '4px',
                                 right: '8px',
                                 cursor: 'pointer',
                                 fontSize: '1.7rem',
                              }}
                           />
                           <Search />
                        </Box>
                     </Modal>
                  </Stack>

                  <Drawer open={isMobileOpen} onClose={handleDrawerToggle}>
                     <List>
                        {TOP_LISTS.map((item) => (
                           <Link
                              component={RouterLink}
                              key={item.title}
                              onClick={handleDrawerToggle}
                              to={item.url}
                              sx={{ textDecoration: 'none' }}
                           >
                              <ListItem>
                                 <ListItemIcon>
                                    <Icon iconName={item.icon} />
                                 </ListItemIcon>
                                 <ListItemButton>
                                    <ListItemText>{item.title}</ListItemText>
                                 </ListItemButton>
                              </ListItem>
                           </Link>
                        ))}
                     </List>
                     <Divider />
                     <List>
                        {MOVIE_LISTS.map((item) => (
                           <Link
                              component={RouterLink}
                              key={item.title}
                              onClick={handleDrawerToggle}
                              to={item.url}
                              sx={{ textDecoration: 'none' }}
                           >
                              <ListItem>
                                 <ListItemIcon>
                                    <Icon iconName={item.icon} />
                                 </ListItemIcon>
                                 <ListItemButton>
                                    <ListItemText>{item.title}</ListItemText>
                                 </ListItemButton>
                              </ListItem>
                           </Link>
                        ))}
                     </List>
                  </Drawer>
               </Toolbar>
            </Container>
         </AppBar>
      </Box>
   );
}
