import { useAxiosQuery, useAxiosMutation } from "../ConfigApi";

export const CheckToken = ({ onSuccess, onError, enable }) => {
  const useQuery = useAxiosQuery({
    key: ["checkToken"],
    enable: enable,
    method: "GET",
    url: `checkToken`,
    onSuccess,
    onError,
  });
  return useQuery;
};