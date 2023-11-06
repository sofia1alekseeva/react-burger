import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { Modal } from "../modal/modal";
import * as orderFeedDetailsSelector from "../../services/reducers/order-feed-details/selectors";
import { getOrderFeedDetails } from "../../utils/api/orders";
import {
  clearOrderFeedDetailsData,
  setOrderFeedDetails,
} from "../../services/reducers/order-feed-details";
import OrderFeedDetails from "../order-feed-details/order-feed-details";
import Loader from "../loader/loader";

const OrderFeedModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(orderFeedDetailsSelector.loading);
  const isLoading: boolean = loading === "pending";

  const { number } = useParams();
  useEffect(() => {
    if (number) {
      getOrderFeedDetails(number)
        .then((data: any) => dispatch(setOrderFeedDetails(data)))
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [number, dispatch]);

  const handleClose = () => {
    dispatch(clearOrderFeedDetailsData());
    navigate(-1);
  };

  return (
    <Modal
      active={true}
      setActive={handleClose}
      title={`#${number}`}
      titleExtraClass="text text_type_digits-default"
    >
      {isLoading ? <Loader extraClass="mt-30" /> : <OrderFeedDetails />}
    </Modal>
  );
};

export default OrderFeedModal;
