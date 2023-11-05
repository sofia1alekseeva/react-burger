import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "../layout/layout";
import {
  NotFound,
  MainPage,
  LoginPage,
  IngredientPage,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  OrdersPage,
  ForgotPasswordPage,
} from "../../pages";
import IngredientModal from "../ingredient-modal/ingredient-modal";
import { OnlyAuth, OnlyUnAuth } from "../auth-route/auth-route";
import ProfileMenu from "../profile-menu/profile-menu";
import OrderFeedPage from "../../pages/order-feed/order-feed-page";
import OrderFeedModal from "../order-feed-modal/order-feed-modal";
import OrderFeedItemPage from "../../pages/ order-feed-item-page/order-feed-item-page";

const AppRoutes = () => {
  const location = useLocation();
  const background = location?.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="feed" element={<OrderFeedPage />} />
          <Route path="feed/:id" element={<OrderFeedItemPage />} />
          <Route
            path="profile/orders/:id"
            element={<OnlyAuth children={<OrderFeedItemPage />} />}
          />
          <Route
            path="login"
            element={<OnlyUnAuth children={<LoginPage />} />}
          />
          <Route
            path="register"
            element={<OnlyUnAuth children={<RegisterPage />} />}
          />
          <Route
            path="forgot-password"
            element={<OnlyUnAuth children={<ForgotPasswordPage />} />}
          />
          <Route
            path="reset-password"
            element={<OnlyUnAuth children={<ResetPasswordPage />} />}
          />
          <Route
            path="profile"
            element={<OnlyAuth children={<ProfileMenu />} />}
          >
            <Route index element={<ProfilePage />} />
            <Route
              path="orders"
              element={<OnlyAuth children={<OrdersPage />} />}
            >
              <Route path=":id" element={<div></div>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="ingredients/:id" element={<IngredientModal />} />
          <Route path="feed/:id" element={<OrderFeedModal />} />
          <Route path="profile/orders/:id" element={<OrderFeedModal />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
