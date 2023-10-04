import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppRoutes from '../app-routes/app-routes';
import { getIngredientsThunk } from '../../services/reducers/ingredients';
import { getUserThunk, resetUser } from '../../services/reducers/profile';
import { error, user } from '../../services/reducers/profile/selectors';
import { updateTokenThunk } from '../../services/reducers/auth';
import { loading } from '../../services/reducers/auth/selectors';


function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userData = useSelector(user);
  const loadingStatus = useSelector(loading);
  const errorUserData = useSelector(error)

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  useEffect(() => {

    if (loadingStatus === "succeded" || accessToken) {
      console.log("accessToken", accessToken)
      dispatch(getUserThunk())
    }

  }, [dispatch, loadingStatus])

  useEffect(() => {
    console.log("errorUserData", errorUserData)
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
