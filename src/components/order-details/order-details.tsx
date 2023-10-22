import styles from "./order-details.module.css";
import done from "../../images/done.svg";
import * as orderDetailsSelector from "../../services/reducers/order-details/selectors";
import Loader from "../loader/loader";
import { useAppSelector } from "../../hooks";

export const OrderDetails = () => {
  const orderDetails = useAppSelector(orderDetailsSelector.orderDetails);
  const loading = useAppSelector(orderDetailsSelector.loading);
  const isLoading: boolean = loading === "pending";
  return (
    <section className={styles.mainBlock}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className={`${styles.orderId} text text_type_digits-large`}>
            {orderDetails.order.number}
          </h1>
          <h2
            className={`${styles.orderIdText} text text_type_main-medium mt-8 mb-15`}
          >
            идентификатор заказа
          </h2>
          <img className={`${styles.done} mb-15`} src={done} alt="Галочка" />
          <h3
            className={`${styles.orderStatus} text text_type_main-small mb-2`}
          >
            Ваш заказ начали готовить
          </h3>
          <h4
            className={`${styles.orderText} text text_type_main-default text_color_inactive`}
          >
            Дождитесь готовности на орбитальной станции
          </h4>{" "}
        </>
      )}
    </section>
  );
};
