import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useOrderIngredients } from "../../hooks/use-order-ingredients";
import { TOrderFeed, TOrderFeedItemData } from "../../interfaces/IOrderFeed";
import { ordersFeedDataSelector } from "../../services/reducers/orders-feed/selectors";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";
import styles from "./orders-feed-list.module.css";
import Loader from "../loader/loader";

const OrdersFeedList = () => {
  const ordersFeedData = useAppSelector(ordersFeedDataSelector);
  const { getOrderFeedItemData } = useOrderIngredients();
  const location = useLocation();

  return (
    <div className={`${styles.mainBlock} custom-scroll`}>
      {ordersFeedData ? ordersFeedData?.orders?.map((item: TOrderFeed) => {
        const orderFeedInfo = getOrderFeedItemData(item.ingredients);
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
      }) : <Loader extraClass="mt-30"/>
      
      }
    </div>
  );
};

export default OrdersFeedList;
