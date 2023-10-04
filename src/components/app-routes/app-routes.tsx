import { Routes, Route, useLocation } from "react-router-dom"
import Layout from "../layout/layout"
import { NotFound, MainPage, LoginPage, IngredientPage, RegisterPage, ResetPasswordPage, ProfilePage, OrdersPage, ForgotPasswordPage } from "../../pages"
import IngredientModal from "../ingredient-modal/ingredient-modal";
import { ProtectedRoute } from "../protected-route/protected-route";
import ProfileMenu from "../profile-menu/profile-menu";

const AppRoutes = () => {
    const { state } = useLocation();

    return (
        <>
            <Routes location={state?.isOpenModal || state}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="ingredients/:id" element={<IngredientPage />} />
                    <Route path="login" element={<ProtectedRoute redirect='/' auth={true} element={<LoginPage />} />} />
                    <Route path="register" element={<ProtectedRoute redirect='/' auth={true} element={<RegisterPage />} />} />
                    <Route path="forgot-password" element={<ProtectedRoute redirect='/' auth={true} element={<ForgotPasswordPage />} />} />
                    <Route path="reset-password" element={<ProtectedRoute redirect='/' auth={true} element={<ResetPasswordPage />} />} />
                    <Route path="profile" element={<ProtectedRoute redirect='/login' auth={false} element={<ProfileMenu />} />} >
                        <Route index element={<ProfilePage />} />
                        <Route
                        path='orders'
                        element={<ProtectedRoute redirect='/login' auth={false} element={<OrdersPage />} />}>
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
