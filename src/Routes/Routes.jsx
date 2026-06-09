import { Route, Routes } from "react-router-dom";
import {
    HomePage
} from "../Helpers/Components"
const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    )
}
export default Router;