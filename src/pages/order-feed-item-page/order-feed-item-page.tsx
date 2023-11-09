import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles from "./order-feed-item-page.module.css";
import { useParams } from "react-router-dom";
import { getOrderFeedDetailsThunk } from "../../services/reducers/order-feed-details";
import OrderFeedDetails from "../../components/order-feed-details/order-feed-details";
import * as orderFeedDetailsSelector from "../../services/reducers/order-feed-details/selectors";
import Loader from "../../components/loader/loader";

const OrderFeedItemPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(orderFeedDetailsSelector.loading);
  const isLoading: boolean = loading === "pending";
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      dispatch(getOrderFeedDetailsThunk(number));
    }
  }, [number, dispatch]);

  return (
    <div className={`${styles.mainBlock}`}>
      {isLoading ? (
        <Loader extraClass="mt-30" />
      ) : (
        <>
          <span
            className={`${styles.orderNumber} text text_type_digits-default`}
          >{`#${number}`}</span>
          <OrderFeedDetails />
        </>
      )}
    </div>
  );
};

export default OrderFeedItemPage;
