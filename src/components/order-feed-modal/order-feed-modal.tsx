import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { Modal } from "../modal/modal";
import { ordersFeedDataSelector } from "../../services/reducers/orders-feed/selectors";
import { getOrderInfo } from "../../utils/api/orders";
import { setOrderFeedDetails } from "../../services/reducers/orders-feed";
import OrderFeedDetails from "../order-feed-details/order-feed-details";

const OrderFeedModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ordersFeedData = useAppSelector(ordersFeedDataSelector);
  const [orderNumber, setOrderNumber] = useState(0);

  const { id } = useParams();
  useEffect(() => {
    if (id && ordersFeedData) {
      const order = ordersFeedData?.orders.find((item) => item._id === id);
      if (order?.number) {
        setOrderNumber(order?.number);
        getOrderInfo(order?.number)
          .then((data: any) => dispatch(setOrderFeedDetails(data)))
          .catch((err) => {
            throw new Error(err);
          });
      }
    }
  }, [id, ordersFeedData, dispatch]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal
      active={true}
      setActive={handleClose}
      title={`#${orderNumber}`}
      titleExtraClass="text text_type_digits-default"
    >
      <OrderFeedDetails />
    </Modal>
  );
};

export default OrderFeedModal;
