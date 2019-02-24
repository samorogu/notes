import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
//axios.interceptors.response.use(success,error)//for  now we only want intercept errors
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //console.log("Loggin the error", error);
    logger.log(error);
    toast.error("An unexpected error ocurred.");

    //toast.success toast.info or only toast
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
