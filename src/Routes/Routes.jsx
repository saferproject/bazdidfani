import { Navigate, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute/ProtectedRoutes";
import { useAuthContext } from "../Context/ContextApi";
import {
    Home,
} from "../Helpers/Components";
const Router = () => {
    // const { roles } = useAuthContext();
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={
                    <AuthLayout>
                        <Login />
                    </AuthLayout>
                } />
                <Route index element={<Navigate to={"login"} replace />} /> */}

            </Routes>
        </>
    );
};
export default Router;
