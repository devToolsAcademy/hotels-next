"use client";
import { Header } from "../../molecules/header/header";
import { hotelData } from "../../../services/getHotelsServices";
import { CardHotel } from "../../molecules/card/card";
import styles from "./CardsFilter.module.css";
import { useState } from "react";
import { hotelSize } from "../../../src/utils/helper";

export const CardsFilter = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [dateHotelFrom, setDateFrom] = useState("all");
  const [dateHotelTo, setDateTo] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");

  const filterHotels = (hotels) => {
    const dateFrom = new Date(dateHotelFrom);
    const dateTo = new Date(dateHotelTo);
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const dateCheckInLocal = new Date(
      dateFrom.getTime() + dateFrom.getTimezoneOffset() * 60000
    );
    const dateCheckOutLocal = new Date(
      dateTo.getTime() + dateTo.getTimezoneOffset() * 60000
    );

    const filteredHotels = hotels.filter((hotel) => {
      const availabilityHotels = todayDate + hotel.availabilityFrom;
      const availabilityDays = availabilityHotels + hotel.availabilityTo;

      const isCountryMatch =
        selectedCountry === "all" ||
        hotel.country.toLowerCase() === selectedCountry.toLowerCase();

      const isPriceMatch =
        selectedPrice === "all" || hotel.price.toString() === selectedPrice;

      const isSizeMatch =
        selectedSize === "all" ||
        hotelSize(hotel.rooms).toLowerCase() == selectedSize.toLowerCase();

      const availability =
        (dateHotelFrom === "all" && dateHotelTo === "all") ||
        (dateCheckInLocal.getTime() >= availabilityHotels &&
          dateCheckOutLocal.getTime() <= availabilityDays);

      return isCountryMatch && isPriceMatch && isSizeMatch && availability;
    });

    return filteredHotels;
  };

  return (
    <>
      <Header
        updateCountry={setSelectedCountry}
        updateDateFrom={setDateFrom}
        updateDateTo={setDateTo}
        updateSize={setSelectedSize}
        updatePrice={setSelectedPrice}
      />
      {filterHotels(hotelData).length > 0 ? (
        <div className={styles.cardsContainer}>
          {filterHotels(hotelData).map((hotel, index) => (
            <CardHotel key={index} hotel={hotel} />
          ))}
        </div>
      ) : (
        <h1>No hay hoteles</h1>
      )}
    </>
  );
};
