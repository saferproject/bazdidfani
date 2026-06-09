import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckToken } from "../API/Auth/Auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const user = JSON?.parse(localStorage?.getItem("user"));
    const token = localStorage?.getItem("authToken");
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    // const [userStatus, setUserStatus] = useState(null);
    // const [roles, setRoles] = useState(undefined);
    // const [currentCash, setCurrentCash] = useState(null)
    // const [stepperData, setStepperData] = useState([])
    const [alert, setAlert] = useState({
        type: "success",
        message: "",
        open: false,
    });
    const [globalDialog, setGlobalDialog] = useState({
        isOpen: false,
        size: "sm",
        contentType: "",
        selectedItem: null,
        loading: false,
        callBackMethod: null,
    });

    const { isLoading: checkTokenLoading } = CheckToken({
        enable: !!localStorage.getItem("authToken") && location.pathname !== "/login",
        // enable: true,
        onSuccess: ({ data }) => {
            // if (data?.user) {
            //     localStorage.setItem("user", JSON?.stringify(data?.user))
            //     setUserStatus(data?.user)
            // }
            // if (data?.permissions?.length) {
            //     localStorage.setItem("permissions", data?.permissions);
            // }
        },
    });

    useEffect(() => {
        setIsLoading(checkTokenLoading);
    }, [checkTokenLoading]);


    // useEffect(() => {
    //     const user = JSON?.parse(localStorage?.getItem("user"));
    //     const token = localStorage?.getItem("authToken");
    //     if (user) {
    //         const roleName = user.role;

    //         setRoles({
    //             isAdmin: roleName === "admin",
    //             isSuperAdmin: roleName === "superAdmin",
    //             isUser: !["admin", "superAdmin"].includes(roleName),
    //         });
    //     } else {
    //         resetRoles();
    //     }
    // }, []);

    // const resetRoles = () => {
    //     setRoles({
    //         isAdmin: false,
    //         isSuperAdmin: false,
    //         isUser: false,
    //     });
    // };

    return (
        <div style={{ direction: "rtl" }}>
            <AuthContext.Provider
                value={{
                    user,
                    setIsLoading,
                    isLoading,
                    globalDialog,
                    setGlobalDialog,
                    setAlert,
                    alert,
                    // resetRoles,
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

