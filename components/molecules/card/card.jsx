import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./card.module.css";
import { MainButton } from "../../atoms/button/Button";

export const CardHotel = ({ hotel, snackbar }) => {
  // const handleClick = () => {};
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          className={styles.imageHotel}
          sx={{ height: 140 }}
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
          <MainButton className={styles.buttonCardHotel}>Detalles</MainButton>
          <MainButton
            className={styles.buttonCardHotel}
            onClick={() => snackbar(true)}
          >
            Reservas
          </MainButton>
        </CardActions>
      </Card>
    </>
  );
};
