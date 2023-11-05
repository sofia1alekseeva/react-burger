import { useEffect, useState } from "react";
import styles from "./order-feed-details.module.css";
import { orderFeedDetailsSelector } from "../../services/reducers/orders-feed/selectors";
import { useAppSelector } from "../../hooks";
import { useOrderIngredients } from "../../hooks/use-order-ingredients";
import { STATUSES } from "../../utils/constants/statuses";
import {
  IOrderDetailsIngredientsData,
} from "../../interfaces/IOrderFeed";
import { formatOrderTime } from "../../utils/functions/format-order-time";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderFeedDetails = () => {
  const orderFeedDetails = useAppSelector(orderFeedDetailsSelector);
  const { getOrderIngredientsTotalData } = useOrderIngredients();
  const [ingredientsData, setIngredientsData] =
    useState<Array<IOrderDetailsIngredientsData> | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (orderFeedDetails?.ingredients) {
      const orderInfo = getOrderIngredientsTotalData(
        orderFeedDetails?.ingredients
      );
      setIngredientsData(orderInfo.ingredientsInfo);
      setTotalPrice(orderInfo.totalPrice);
    }
  }, [orderFeedDetails?.ingredients]);

  return (
    <div className={`${styles.mainBlock} mr-10 ml-10`}>
      <h1 className={`text text_type_main-medium mb-2 mt-5`}>
        {orderFeedDetails?.name}
      </h1>
      <span
        className={`text text_type_main-default mb-15 ${
          orderFeedDetails?.status === "done" && styles.orderStatusDone
        }`}
      >
        {STATUSES[`${orderFeedDetails?.status}`]}
      </span>
      <span className={` text text_type_main-medium`}>Состав:</span>
      <div className={`${styles.ingredientsBlock} custom-scroll mt-6`}>
        {ingredientsData &&
          ingredientsData.map((item, index) => {
            return (
              <div className={`${styles.ingredientBlock} mr-6`} key={index}>
                <div className={`${styles.ingredientImageNameBlock}`}>
                  <div className={`${styles.ingredientImageBlock}`}>
                    <div className={`${styles.ingredientImageRound}`} />
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`${styles.ingredientImage}`}
                    />
                  </div>
                  <span className={`text text_type_main-default`}>
                    {item.name}
                  </span>
                </div>
                <div className={`${styles.priceBlock}`}>
                  <span
                    className={`text text_type_digits-default mr-2`}
                  >{`${item.count} x ${item.price}`}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
      </div>
      <div className={`${styles.bottomBlock}`}>
        <span className={`text text_type_main-default text_color_inactive`}>
          {formatOrderTime(orderFeedDetails?.createdAt)}
        </span>
        <div className={`${styles.priceBlock}`}>
          <span className={`text text_type_digits-default mr-2`}>
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFeedDetails;
