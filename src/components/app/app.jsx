import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppRoutes from '../app-routes/app-routes';
import { getIngredientsThunk } from '../../services/reducers/ingredients';
import { getUserThunk, resetUser } from '../../services/reducers/profile';
import { error, user } from '../../services/reducers/profile/selectors';
import { updateTokenThunk } from '../../services/reducers/auth/update-token';
import { loading as loginLoading } from '../../services/reducers/auth/login/selectors';
import { loading as registerLoading } from '../../services/reducers/auth/register/selectors';


function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userData = useSelector(user);
  const loadingLoginStatus = useSelector(loginLoading);
  const loadingRegisterStatus = useSelector(registerLoading);
  const errorUserData = useSelector(error)

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  useEffect(() => {

    if (loadingLoginStatus === "succeeded" || loadingRegisterStatus  === "succeeded" || accessToken) {
      dispatch(getUserThunk())
    }

  }, [dispatch, loadingLoginStatus, accessToken])

  useEffect(() => {
    if (errorUserData === "jwt expired") {
      dispatch(updateTokenThunk()).then(() =>
        dispatch(getUserThunk()));

    }
  }, [dispatch, errorUserData])

  useEffect(
    () => {
      !refreshToken && !accessToken && userData && dispatch(resetUser());
    },
    [
      refreshToken,
      accessToken,
      userData,
      dispatch,
    ],
  );

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
