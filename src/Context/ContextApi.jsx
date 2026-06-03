import { createContext, useContext, useEffect, useState } from "react";
// import { CheckToken } from "../API/EndPoints/Auth/Auth";
import { useLocation } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const user = JSON?.parse(localStorage?.getItem("user"));
    const token = localStorage?.getItem("authToken");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userStatus, setUserStatus] = useState("");
    const [roles, setRoles] = useState(undefined);
    const [alert, setAlert] = useState({
        type: "success",
        message: "",
        open: false,
    });

    useEffect(() => {
        if (user)
            setRoles((preState) => ({
                ...preState,
                isAdmin: user?.roles?.length && user?.roles[0]?.name === "admin",
                isSuperAdmin: user?.roles?.length && user?.roles === "SuperAdmin",
                isPersonnel:
                    user?.roles?.length && user?.roles[0]?.name === "personnel",
            }));
    }, [user?.id]);

    const resetRoles = () => {
        setRoles({
            isAdmin: false,
            isSuperAdmin: false,
            isPersonnel: false,
        });
    };

    // const { isLoading: checkTokenLoading } = CheckToken({
    //     enable: !!token && location.pathname !== "/login",
    //     onSuccess: ({ data }) => {
    //         if (data?.permissions?.length) {
    //             localStorage.setItem("permissions", data?.permissions);
    //             // SetItem("user", JSON?.stringify(data?.user))
    //         }
    //     },
    // });

    // useEffect(() => {
    //     setIsLoading(checkTokenLoading);
    // }, [checkTokenLoading]);

    return (
        <div style={{ direction: "rtl" }}>
            <AuthContext.Provider
                value={{
                    setIsLoading,
                    isLoading,
                    isOpen,
                    setIsOpen,
                    userStatus,
                    setUserStatus,
                    setAlert,
                    alert,
                    resetRoles,
                    roles,
                }}
            >
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};


// userInfo
// setUserInfo