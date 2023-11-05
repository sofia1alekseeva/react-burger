import { FC } from "react";
import styles from "./orders-feed-item.module.css";
import { TOrderFeed, TOrderFeedItemData } from "../../interfaces/IOrderFeed";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatOrderTime } from "../../utils/functions/format-order-time";
import { useLocation, useNavigate } from "react-router-dom";
import { STATUSES } from "../../utils/constants/statuses";

const OrdersFeedItem: FC<{
  orderFeedItem: TOrderFeedItemData & TOrderFeed;
  isShowStatus: boolean;
}> = ({ orderFeedItem, isShowStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = () => {
    let path: string;
    if (location.pathname === "/feed") {
      path = "/feed";
    } else if (location.pathname === "/profile/orders") {
      path = "/profile/orders";
    } else {
      path = "/";
    }
    navigate(`${path}/${orderFeedItem._id}`, {
      state: { background: location },
    });
  };
  return (
    <div
      className={`${styles.mainBlock} pr-6 pl-6 pt-6 pb-6`}
      onClick={onClick}
    >
      <div className={`${styles.topBlock}`}>
        <span
          className={`${styles.number} text text_type_digits-default`}
        >{`#${orderFeedItem.number}`}</span>
        <span
          className={`${styles.createdAt} text text_type_main-default text_color_inactive`}
        >
          {formatOrderTime(orderFeedItem.createdAt)}
        </span>
      </div>
      <div className={`${styles.nameStatusBlock}`}>
        <h1 className={`text text_type_main-medium`}>{orderFeedItem.name}</h1>
        {isShowStatus && (
          <span
            className={`${
              orderFeedItem?.status === "done" && styles.orderStatusDone
            }`}
          >
            {STATUSES[`${orderFeedItem.status}`]}
          </span>
        )}
      </div>
      <div className={`${styles.bottomBlock}`}>
        <div className={`${styles.ingredientsImages}`}>
          {orderFeedItem.ingredientsInfo.map((item, index) => {
            return (
              <div className={`${styles.ingredientImageBlock}`} key={index}>
                <div className={`${styles.ingredientImageRound}`} />
                <img
                  src={item.image}
                  alt={item.name}
                  className={`${styles.ingredientImage} ${
                    item.hiddenIngredientsNumber &&
                    index === 0 &&
                    styles.imageOverlay
                  }`}
                />
                {item.hiddenIngredientsNumber && index === 0 && (
                  <span
                    className={`${styles.nextCount} text text_type_digits-default`}
                  >
                    {`+${item.hiddenIngredientsNumber}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className={`${styles.priceBlock}`}>
          <span
            className={`${styles.totalPrice} mr-2 text text_type_digits-default`}
          >
            {orderFeedItem.totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrdersFeedItem;
