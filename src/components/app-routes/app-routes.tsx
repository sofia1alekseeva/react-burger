import { Routes, Route, useLocation } from "react-router-dom"
import Layout from "../layout/layout"
import { NotFound, MainPage, LoginPage, IngredientPage, RegisterPage, ResetPasswordPage, ProfilePage, OrdersPage, ForgotPasswordPage } from "../../pages"
import IngredientModal from "../ingredient-modal/ingredient-modal";
import { OnlyAuth, OnlyUnAuth } from "../auth-route/auth-route";
import ProfileMenu from "../profile-menu/profile-menu";

const AppRoutes = () => {
    const { state } = useLocation();

    return (
        <>
            <Routes location={state?.isOpenModal}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="ingredients/:id" element={<IngredientPage />} />
                    <Route path="login" element={<OnlyUnAuth component={<LoginPage />} />} />
                    <Route path="register" element={<OnlyUnAuth component={<RegisterPage />} />} />
                    <Route path="forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                    <Route path="reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                    <Route path="profile" element={<OnlyAuth component={<ProfileMenu />} />} >
                        <Route index element={<ProfilePage />} />
                        <Route
                        path='orders'
                        element={<OnlyAuth component={<OrdersPage />} />}>
                        <Route path=':id' element={<div></div>} />
                    </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            {state?.isOpenModal && <Routes>
                <Route path="ingredients/:id" element={<IngredientModal />} />
            </Routes>}
        </>
    )
}

export default AppRoutes
