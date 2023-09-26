import {CardsFilterTemplate} from '../../components/template/cardsFilter-template/CardsFilterTemplate';
import {hotelData} from '../../services/getHotelsServices';

export default async function Home() {
  const getDataHotels = await hotelData();
  console.log(getDataHotels);
  return (
    <>
      <CardsFilterTemplate getDataHotels={getDataHotels} />
    </>
  );
}
