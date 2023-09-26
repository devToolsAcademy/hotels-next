'use client';
import {Header} from '../../molecules/header/header';
import {CardHotel} from '../../molecules/card/card';
import styles from './CardsFilter.module.css';
import {useState, useEffect, useContext} from 'react';
import {hotelSize} from '../../../src/utils/helper';
import {Alert, AlertTitle, Snackbar} from '@mui/material';
import {AppContext} from '@/store/CurrentProvider';

export const CardsFilter = ({getDataHotels}) => {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [dateHotelFrom, setDateFrom] = useState('all');
  const [dateHotelTo, setDateTo] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [filterHotels, setFilterHotels] = useState([]);
  const [setshowSnackbar, setShowSnackbar] = useState(false);
  const {setHomePage} = useContext(AppContext);

  useEffect(() => {
    setHomePage();
  }, []);

  // const [hotelsData, setHotelsData] = useState([]);

  // const fetchHotels = async () => {
  //   try {
  //     const data = await hotelData();
  //     setHotelsData(data);
  //   } catch (error) {
  //     console.error("erro en los hoteles");
  //   }
  // };

  // useEffect(() => {
  //   fetchHotels();
  // }, []);

  useEffect(() => {
    const dateFrom = new Date(dateHotelFrom);
    const dateTo = new Date(dateHotelTo);
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const dateCheckInLocal = new Date(
      dateFrom.getTime() + dateFrom.getTimezoneOffset() * 60000
    );
    const dateCheckOutLocal = new Date(
      dateTo.getTime() + dateTo.getTimezoneOffset() * 60000
    );

    const filteredHotels = getDataHotels.filter((hotel) => {
      const availabilityHotels = todayDate + hotel.availabilityFrom;
      const availabilityDays = availabilityHotels + hotel.availabilityTo;

      const isCountryMatch =
        selectedCountry === 'all' ||
        hotel.country.toLowerCase() === selectedCountry.toLowerCase();

      const isPriceMatch =
        selectedPrice === 'all' || hotel.price.toString() === selectedPrice;

      const isSizeMatch =
        selectedSize === 'all' ||
        hotelSize(hotel.rooms).toLowerCase() == selectedSize.toLowerCase();

      const availability =
        (dateHotelFrom === 'all' && dateHotelTo === 'all') ||
        (dateCheckInLocal.getTime() >= availabilityHotels &&
          dateCheckOutLocal.getTime() <= availabilityDays);

      return isCountryMatch && isPriceMatch && isSizeMatch && availability;
    });
    setFilterHotels(filteredHotels);
  }, [
    selectedCountry,
    dateHotelFrom,
    dateHotelTo,
    selectedPrice,
    selectedSize
  ]);

  // const filterHotels = () => {
  //   const dateFrom = new Date(dateHotelFrom);
  //   const dateTo = new Date(dateHotelTo);
  //   const todayDate = new Date().setHours(0, 0, 0, 0);
  //   const dateCheckInLocal = new Date(
  //     dateFrom.getTime() + dateFrom.getTimezoneOffset() * 60000
  //   );
  //   const dateCheckOutLocal = new Date(
  //     dateTo.getTime() + dateTo.getTimezoneOffset() * 60000
  //   );

  //   const filteredHotels = getDataHotels.filter((hotel) => {
  //     const availabilityHotels = todayDate + hotel.availabilityFrom;
  //     const availabilityDays = availabilityHotels + hotel.availabilityTo;

  //     const isCountryMatch =
  //       selectedCountry === "all" ||
  //       hotel.country.toLowerCase() === selectedCountry.toLowerCase();

  //     const isPriceMatch =
  //       selectedPrice === "all" || hotel.price.toString() === selectedPrice;

  //     const isSizeMatch =
  //       selectedSize === "all" ||
  //       hotelSize(hotel.rooms).toLowerCase() == selectedSize.toLowerCase();

  //     const availability =
  //       (dateHotelFrom === "all" && dateHotelTo === "all") ||
  //       (dateCheckInLocal.getTime() >= availabilityHotels &&
  //         dateCheckOutLocal.getTime() <= availabilityDays);

  //     return isCountryMatch && isPriceMatch && isSizeMatch && availability;
  //   });

  //   return filteredHotels;
  // };

  return (
    <>
      <Header
        updateCountry={setSelectedCountry}
        updateDateFrom={setDateFrom}
        updateDateTo={setDateTo}
        updateSize={setSelectedSize}
        updatePrice={setSelectedPrice}
      />
      {filterHotels.length > 0 ? (
        <div className={styles.cardsContainer}>
          {filterHotels.map((hotel, index) => (
            <CardHotel key={index} hotel={hotel} snackbar={setShowSnackbar} />
          ))}
        </div>
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          No hemos encontrado resultado para su busqueda —
          <strong>Por favor utilice otros filtros</strong>
        </Alert>
      )}
      <Snackbar
        open={setshowSnackbar}
        autoHideDuration={2000}
        onClose={setShowSnackbar}
      >
        <Alert severity="success" sx={{width: '100%'}}>
          Hotel agregado correctamente
        </Alert>
      </Snackbar>
    </>
  );
};
