import { useAxiosQuery, useAxiosMutation } from "../../ConfigApi";

export const SendOtp = ({ onSuccess, onError }) => {
  const useMutation = useAxiosMutation({
    // queryKeyToInvalidate: ["sendOtp"],
    method: "POST",
    url: "auth/otp/send",
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    onSuccess,
    onError,
  });
  return useMutation;
};

export const CheckOtpCode = ({ onSuccess, onError }) => {
  const useMutation = useAxiosMutation({
    method: "POST",
    url: "auth/verify",
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    onSuccess,
    onError,
  });
  return useMutation;
};

export const CheckToken = ({ onSuccess, onError, enable }) => {
  const useQuery = useAxiosQuery({
    key: ["checkToken"],
    enable: enable,
    method: "GET",
    url: `profile/checkToken`,
    onSuccess,
    onError,
  });
  return useQuery;
};

export const Logout = ({ onSuccess, onError }) => {
  const useMutation = useAxiosMutation({
    method: "POST",
    url: "auth/logout",
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    onSuccess,
    onError,
  });
  return useMutation;
};
