import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useOrderIngredients } from "../../hooks/useOrderIngredients";
import { TOrderFeed, TOrderFeedItemData } from "../../interfaces/IOrderFeed";
import { ordersFeedDataSelector } from "../../services/reducers/orders-feed/selectors";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";
import styles from "./orders-feed-list.module.css";

const OrdersFeedList = () => {
  const ordersFeedData = useAppSelector(ordersFeedDataSelector);
  const { getOrderFeedInfo } = useOrderIngredients();
  const location = useLocation();

  // const {} = getOrderFeedInfo(ordersFeedData?.orders)
  // console.log("ordersFeedData", ordersFeedData);
  console.log("location.pathname", location.pathname);
  return (
    <div className={`${styles.mainBlock} custom-scroll`}>
      {ordersFeedData?.orders?.map((item: TOrderFeed) => {
        const orderFeedInfo = getOrderFeedInfo(item.ingredients);
        const orderFeedItemInfo: TOrderFeedItemData & TOrderFeed = {
          ...item,
          ...orderFeedInfo,
        };
        return (
          <OrdersFeedItem
            isShowStatus={location.pathname === "/profile/orders"}
            orderFeedItem={orderFeedItemInfo}
            key={item._id}
          />
        );
      })}
    </div>
  );
};

export default OrdersFeedList;
