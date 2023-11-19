import { HashRouter } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "../app-routes/app-routes";
import { getIngredientsThunk } from "../../services/reducers/ingredients";
import { getUserThunk, resetUser } from "../../services/reducers/profile";
import { user } from "../../services/reducers/profile/selectors";
import { loading as loginLoading } from "../../services/reducers/auth/login/selectors";
import { loading as registerLoading } from "../../services/reducers/auth/register/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks";

function App() {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userData = useAppSelector(user);
  const loadingLoginStatus = useAppSelector(loginLoading);
  const loadingRegisterStatus = useAppSelector(registerLoading);

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  useEffect(() => {
    if (
      loadingLoginStatus === "succeeded" ||
      loadingRegisterStatus === "succeeded" ||
      accessToken
    ) {
      dispatch(getUserThunk());
    }
  }, [dispatch, loadingLoginStatus, accessToken]);

  useEffect(() => {
    !refreshToken && !accessToken && userData && dispatch(resetUser());
  }, [refreshToken, accessToken, userData, dispatch]);

  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
