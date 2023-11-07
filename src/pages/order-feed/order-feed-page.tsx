import { useEffect } from "react";
import styles from "./order-feed-page.module.css";
import OrdersFeedList from "../../components/orders-feed-list/orders-feed-list";
import { useAppDispatch } from "../../hooks";
import {
  wsOrdersInit,
  wsOrdersClose,
} from "../../services/reducers/orders-feed";
import OrderStatistics from "../../components/order-statistics/order-statistics";

const OrderFeedPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(wsOrdersInit("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsOrdersClose());
    };
  }, []);
  return (
    <div className={`${styles.mainBlock}`}>
      <h1>Лента заказов</h1>
      <div className={`${styles.container}`}>
        <OrdersFeedList />
        <OrderStatistics />
      </div>
    </div>
  );
};
export default OrderFeedPage;
