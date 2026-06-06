import { Navigate, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute/ProtectedRoutes";
import MainLayout from "../Layouts/MainLayout";
import { useAuthContext } from "../Context/ContextApi";
import {
    Home,
    RegisterPage,
    LoginPage,
} from "../Helpers/Components";
import AuthLayout from "../Layouts/AuthLayout";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route index element={<Navigate to={"login"} replace />} />
                <Route path="/login" element={
                    <AuthLayout>
                        <LoginPage />
                    </AuthLayout>
                } />

            </Routes>
        </>
    );
};
export default Router;
