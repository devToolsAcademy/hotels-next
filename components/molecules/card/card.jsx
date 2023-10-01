import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './card.module.css';
import {MainButton} from '../../atoms/button/Button';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {addReservation} from '@/store/reservasSlice';
import {Alert, Snackbar} from '@mui/material';
import {useState} from 'react';

export const CardHotel = ({
  hotel,
  snackbar,
  onRemove,
  isReservashotelsPage
}) => {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const listHotelsReservation = useSelector(
    (state) => state.reservation.hotelsReservation
  );

  const handleClick = () => {
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));
  };

  const hadleReservation = () => {
    const hotelExists = listHotelsReservation.some(
      (hotels) => hotels.name === hotel.name
    );
    if (hotelExists) {
      // Muestra una alerta o notificación de que el hotel ya está reservado
      setSnackbarOpen(true);
    } else {
      console.log('Hotel agregado');
      dispatch(addReservation(hotel));
      snackbar(true);
    }
  };
  const handleRemoveReservation = () => {
    // Llama a la función onRemove para notificar a Reservashotels que quieres eliminar esta tarjeta.
    onRemove(hotel);
  };
  return (
    <>
      <Card sx={{maxWidth: 345}}>
        <CardMedia
          className={styles.imageHotel}
          sx={{height: 140}}
          image={hotel.photo}
          title={hotel.name}
        />

        <CardContent className={styles.containerInfo}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styles.titleHotel}
          >
            {hotel.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            className={styles.descriptionHotel}
          >
            {hotel.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.coutryCityHotel}
          >
            Country: {hotel.country}, City: {hotel.city}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.priceHotel}
          >
            Price: ${hotel.price}
          </Typography>
        </CardContent>
        <CardActions className={styles.containerButton}>
          <Link href={`detail/${hotel.name}`}>
            <MainButton
              className={styles.buttonCardHotel}
              onClick={handleClick}
            >
              Detalles
            </MainButton>
          </Link>
          {isReservashotelsPage ? (
            <MainButton
              className={styles.buttonCardHotel}
              onClick={handleRemoveReservation}
            >
              Eliminar
            </MainButton>
          ) : (
            <MainButton
              className={styles.buttonCardHotel}
              onClick={hadleReservation}
            >
              Reservas
            </MainButton>
          )}
        </CardActions>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)} // Cerrar la Snackbar cuando se hace clic en ella
      >
        <Alert severity="error" sx={{width: '100%'}}>
          El hotel ya esta reservado
        </Alert>
      </Snackbar>
    </>
  );
};
