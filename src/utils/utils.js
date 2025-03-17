import axios from "axios";
import { toast } from "react-toastify";

export const axiosApiCall = async (url, method, body = {}, params = {}) => {
  return await axios({
    method,
    url: `${import.meta.env.VITE_BASE_URL}${url}`,
    data: body,
    withCredentials: true,
    params,
  });
};

export const errorToast = (errorMsg, toastId = "") => {
  toast.error(errorMsg, {
    toastId: toastId,
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
