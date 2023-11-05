import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  orderFeedDetailsSelector,
  ordersFeedDataSelector,
} from "../../services/reducers/orders-feed/selectors";
import styles from "./order-feed-item-page.module.css";
import { getAllOrdersInfo, getOrderInfo } from "../../utils/api/orders";
import { useParams } from "react-router-dom";
import { setOrderFeedDetails } from "../../services/reducers/orders-feed";
import OrderFeedDetails from "../../components/order-feed-details/order-feed-details";

const OrderFeedItemPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const ordersFeedData = useAppSelector(ordersFeedDataSelector);
  const orderFeedItemData = useAppSelector(orderFeedDetailsSelector);
  const [orderNumber, setOrderNumber] = useState(0)
  const getOrderData = async () => {
    const { data } = await getAllOrdersInfo();
    if (data.orders) {
      const orderData = {
        data: { ...data, orders: [data?.orders.find((item) => {
            setOrderNumber(item.number);
            return item._id === id})] },
      };
      dispatch(setOrderFeedDetails(orderData));
      //   if (orderData?.number) {
      //     // const { data } = await getOrderInfo(orderData?.number);
      //   }
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);
  console.log("orderFeedItemData", orderFeedItemData);

  return (
    <div className={`${styles.mainBlock}`}>
        <span className={`${styles.orderNumber} text text_type_digits-default`}>{`#${orderNumber}`}</span>
      <OrderFeedDetails />
    </div>
  );
};

export default OrderFeedItemPage;
