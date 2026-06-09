import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import {
    HomePage,
    LoginPage,
} from "../Helpers/Components"
const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={
                    <AuthLayout>
                        <LoginPage />
                     </AuthLayout>
                } />
                <Route index element={<Navigate to={"login"} replace />} />
            </Routes>
        </>
    )
}
export default Router;