import {CardsFilterTemplate} from '../../components/template/cardsFilter-template/CardsFilterTemplate';
import {hotelData} from '../../services/getHotelsServices';
import styles from './page.module.css';
export default async function Home() {
  const getDataHotels = await hotelData();
  console.log(getDataHotels);
  return (
    <div className={styles.containerPageReservas}>
      <CardsFilterTemplate getDataHotels={getDataHotels} />
    </div>
  );
}
