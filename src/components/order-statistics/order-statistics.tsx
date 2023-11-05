import { useAppSelector } from "../../hooks";
import { ordersFeedDataSelector } from "../../services/reducers/orders-feed/selectors";
import styles from "./order-statistics.module.css";

const OrderStatistics = () => {
  const ordersFeedData = useAppSelector(ordersFeedDataSelector);

  const ordersNumberDone = ordersFeedData?.orders
    .filter((item) => item.status === "done")
    .slice(0, 10)
    .map((item) => item.number);
  const ordersNumberPending = ordersFeedData?.orders
    .filter((item) => item.status === "pending")
    .slice(0, 10)
    .map((item) => item.number);
  console.log("ordersFeedData", ordersFeedData);
  return (
    <div className={`${styles.mainBlock} ml-15`}>
      <div className={`${styles.statusBlocksContainer}`}>
        <div className={`${styles.statusBlock} mr-9`}>
          <span className={`text text_type_main-medium`}>Готовы:</span>
          <div className={`${styles.numberBlock} mt-6`}>
            {ordersNumberDone?.map((number) => (
              <div key={number} className={`${styles.numberDone} text text_type_digits-default`}>
                {number}
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.statusBlock}`}>
          <span className={`text text_type_main-medium`}>В работе:</span>
          <div className={`${styles.numberBlock} mt-6`}>
            {ordersNumberPending?.map((number) => (
              <div key={number} className={`${styles.numberItem} text text_type_digits-default`}>
                {number}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.totalBlock}`}>
        <span className={`text text_type_main-medium`}>
          Выполнено за все время:
        </span>
        <span className={`${styles.totalOrders} text text_type_digits-large`}>{ordersFeedData?.total}</span>
      </div>
      <div className={`${styles.totalBlock}`}>
        <span className={`text text_type_main-medium`}>
          Выполнено за сегодня:
        </span>
        <span className={`${styles.totalOrders} text text_type_digits-large`}>{ordersFeedData?.totalToday}</span>
      </div>
    </div>
  );
};

export default OrderStatistics;
