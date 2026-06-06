import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../Context/ContextApi";

export const BASE_URL = "http://192.168.100.200:8000/core"; //local
// export const BASE_URL = "https://api.peykad.ir/api"; //server

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const fetcher = async ({
  method,
  url,
  data,
  headers = null,
  params = null,
  noHeader = false,
  customHeader = false,
  pagination = false,
  page = null,
  perPage = null,
  order = null,
  timing = false,
  start_date = null,
  end_date = null,
  responseType,
  authToken = '', // پارامتر جدید برای توکن دستی
}) => {
  const token = authToken ? `Bearer ${authToken}` : `Bearer ${localStorage.getItem("authToken")}`;
  const config = {
    method,
    responseType: responseType,
    headers: !noHeader
      ? {
        "content-type": "application/json",
        Authorization: token,
      }
      : customHeader
        ? headers
        : {
          ...headers,
          Authorization: token,
          // "content-type": "application/json",
        },
    params,
    url: pagination
      ? `${url}/?page=${page}&perPage=${perPage}&order=${order}`
      : timing
        ? `${url}/?start_date=${start_date}&end_date=${end_date}&page=${page}&perPage=${perPage}&order=${order}`
        : url,
    data,
  };
  const response = await axiosInstance(config);
  return response.data;
};

const useAxiosQuery = ({
  key,
  enable,
  method = "GET",
  url,
  config = {},
  select,
  staleTime,
  onSuccess,
  onError,
  refetchInterval,
  showAlert = true,

}) => {
  const { setAlert } = useAuthContext();
  const navigate = useNavigate();
  const handleErrors = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
      navigate("/login");

    }
  };
  return useQuery(key, () => fetcher({ method, url, ...config }), {
    enabled: enable,
    ...(staleTime ? { staleTime: staleTime } : {}),
    ...(select ? { select: select } : {}),
    retry: (failureCount, err) => {
      if (
        err.response?.status === 401 ||
        err.response?.status === 404 ||
        err.response?.status === 403
      ) {
        return false;
      }
      return failureCount < 4;
    },
    refetchInterval: refetchInterval ? refetchInterval : false,
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      handleErrors(error);
      if (showAlert) {
        setAlert({
          type: "error",
          message: error?.response?.data?.message || error?.message,
          open: true,
        });
      }
      onError && onError();
    },
  });
};

const useAxiosMutation = ({
  queryKeyToInvalidate,
  method = "POST",
  url,
  config = {},
  onSuccess,
  onError,
  showAlert = true,
}) => {
  const { setAlert } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleErrors = (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
      navigate("/login");
      // window.location.replace("https://client.shahrebar.ir/login");

    }
  };
  let msg =
    method === "POST"
      ? "اطلاعات با موفقیت ثبت شد"
      : method === "PATCH"
        ? "آیتم انتخابی با موفقیت ویرایش شد"
        : method === "DELETE"
          ? "آیتم انتخابی با موفقیت حذف شد"
          : "";

  return useMutation((data) => fetcher({ method, url, data, ...config }), {
    onSuccess: (data) => {
      if (queryKeyToInvalidate) {
        if (Array.isArray(queryKeyToInvalidate)) {
          queryKeyToInvalidate.forEach((key) => {
            queryClient.invalidateQueries(key);
          });
        } else {
          queryClient.invalidateQueries(queryKeyToInvalidate);
        }
      }

      setAlert({
        type: data.success ? "success" : "error",
        message: data?.message || msg,
        open: true,
      });
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      handleErrors(error);
      onError && onError(error);
      if (error?.response?.status !== 499)
        if (showAlert) {
          setAlert({
            type: "error",
            message: error?.response?.data?.message || "سامانه به مشکل خورده است لطفا مجدد تکرار فرمایید.",
            open: true,
          });
        }
    },
  });
};

export { useAxiosQuery, useAxiosMutation };