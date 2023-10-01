'use client';
import {useSelector} from 'react-redux';
import {CardHotel} from '../../molecules/card/card';
import styles from './hotelsresevaation.module.css';

export const HotelsReservation = () => {
  const listHotelsReservation = useSelector(
    (state) => state.reservation.hotelsReservation
  );

  return (
    <section className={styles.containerHotelsResevados}>
      <h2 className={styles.titleReservas}>Reservas:</h2>
      <div className={styles.cardsContainerReservas}>
        {listHotelsReservation.map((hotel, index) => (
          <CardHotel
            key={index}
            hotel={hotel}
            isReservashotelsPage={true} // Indica que estás en la página de Reservashotels
            onRemove={() => handleRemoveCard(index)}
          />
        ))}
      </div>
    </section>
  );
};
