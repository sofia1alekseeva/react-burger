import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import styles from "./order-feed-item-page.module.css";
import { getAllOrdersInfo } from "../../utils/api/orders";
import { useParams } from "react-router-dom";
import { setOrderFeedDetails } from "../../services/reducers/orders-feed";
import OrderFeedDetails from "../../components/order-feed-details/order-feed-details";

const OrderFeedItemPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [orderNumber, setOrderNumber] = useState(0);
  const getOrderData = async () => {
    const { data } = await getAllOrdersInfo();
    if (data.orders) {
      const orderData = {
        data: {
          ...data,
          orders: [
            data?.orders.find((item) => {
              setOrderNumber(item.number);
              return item._id === id;
            }),
          ],
        },
      };
      dispatch(setOrderFeedDetails(orderData));
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div className={`${styles.mainBlock}`}>
      <span
        className={`${styles.orderNumber} text text_type_digits-default`}
      >{`#${orderNumber}`}</span>
      <OrderFeedDetails />
    </div>
  );
};

export default OrderFeedItemPage;
