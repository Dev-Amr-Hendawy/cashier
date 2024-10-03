import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ToastAlert from "./common/toastAlert/toastAlert.common";
import useScrollToTop from "./hooks/useScrollToTop";
import "./i18n";
import { RootState, ThemeProvider } from "./lib";
import Router from "./routes/Router";
import { logout } from "./lib/store/slices/user-slice";

function App() {
  useScrollToTop();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = i18n.language;
  axios.defaults.headers.lang = language;
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string;

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return Promise.reject(error);
    }
  );

  const token = useSelector((state: RootState) => state.user.token);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AnimatePresence mode="wait">
          <Router />
        </AnimatePresence>
        <ToastAlert />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
