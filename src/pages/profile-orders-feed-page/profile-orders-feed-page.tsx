import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import styles from "./orders-history-page.module.css";
import { wsClose, wsInit } from "../../services/reducers/orders-feed";
import OrdersFeedList from "../../components/orders-feed-list/orders-feed-list";

const ProfileOrdersFeedPage = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const sliceToken = (token: string | null) => {
    if (token) {
      const tokenArr = token?.split(" ");
      return tokenArr[1];
    }
  };
  useEffect(() => {
    dispatch(
      wsInit(
        `wss://norma.nomoreparties.space/orders?token=${sliceToken(
          accessToken
        )}`
      )
    );
    return () => {
      dispatch(wsClose());
    };
  }, []);
  return (
    <div>
      <OrdersFeedList />
    </div>
  );
};

export default ProfileOrdersFeedPage;
