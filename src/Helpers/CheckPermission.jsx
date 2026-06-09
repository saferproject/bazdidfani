import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin" || user?.role === "superAdmin";
};

export const checkPermission = (requiredPermission) => {
  return requiredPermission;
};

const WithAuth = (Component, requiredPermission) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const role =
      JSON.parse(localStorage.getItem("user"))?.roles?.length &&
      JSON.parse(localStorage.getItem("user"))?.roles[0]?.name;
    const permissions = localStorage.getItem("permissions")?.split(",");

    useEffect(() => {
      if (!token) {
        navigate("/login", { replace: false });
      } else if (
        requiredPermission &&
        !permissions.filter((permission) =>
          requiredPermission.includes(permission)
        )?.length
      ) {
        navigate("/not-access", { replace: false });
      }
    }, [token, permissions, navigate, requiredPermission]);

    if (
      !token ||
      (requiredPermission &&
        !permissions.filter((permission) =>
          requiredPermission.includes(permission)
        )?.length)
    ) {
      return <p>loading ...</p>;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default WithAuth;
