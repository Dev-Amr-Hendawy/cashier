import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastAlert = () => {
  const { i18n } = useTranslation();
  const direction = i18n.dir();
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={direction === "rtl" ? true : false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      role="alert"
    />
  );
};

export default ToastAlert;
