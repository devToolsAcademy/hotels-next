'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Menus.module.css';
import Link from 'next/link';
import {useContext} from 'react';
import {AppContext} from '@/store/CurrentProvider';
export const Menu = () => {
  const {currentPage} = useContext(AppContext);

  const title = (current) => {
    switch (current) {
      case 'Detail':
        return 'Detalle del Hotel';
      case 'Home':
        return 'Buscar Hotel';
      default:
        return 'Bienvenidos';
    }
  };
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" className={styles.containerMenu}>
        <Toolbar variant="dense" className={styles.menu}>
          <Typography variant="h3">{title(currentPage)}</Typography>
          <div className={styles.contentOptionMenu}>
            <Typography
              variant="h6"
              component="div"
              // className={styles.labelMenu}
            >
              <Link href={'/'} className={styles.labelMenu}>
                Home
              </Link>
            </Typography>

            <Typography
              variant="h6"
              component="div"
              // className={styles.labelMenu}
            >
              <Link href={'/reservas'} className={styles.labelMenu}>
                Reservas
              </Link>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
