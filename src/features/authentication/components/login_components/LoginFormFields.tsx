import { CoupledInput, CoupledTextField } from "../../../../common";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { changeStep, setFreeTrail } from "@myCash/lib";

import Button from "../../../../components/form/Button";
import CheckBox from "../../../../components/form/CheckBox";
import { CoupledButton } from "../../../../common/coupledButton";
import EyeIcon from "../../../../components/ui/icons/EyeIcon";
import LockIcon from "../../../../components/ui/icons/LockIcon";
import TextField from "../../../../components/form/TextField";
import saudiFlag from "../../../../assets/icons/flag.svg";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAuthValidation } from "../../../../utils/validation/auth";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../../hooks/auth-hooks";
import { useTranslation } from "react-i18next";


const LoginFormFields = () => {
  // const [menuItems, setMenuItems] = useState<GetCountriesResponseData[]>([]);
  const { t } = useTranslation();

  const initialValues = {
    phone: "",
    password: "",
    country_id: "",
  };

  const { mutate, isPending } = useLogin();
  const { loginSchema } = useAuthValidation();
  const navigate = useNavigate();
  //get countries codes
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getData(`client/general_data/get_countries`);
  //     setMenuItems(result?.data);
  //   };

  //   fetchData();
  // }, []);
  // const renderMenuItems = () => {
  //   return menuItems.map((item, index) => (
  //     <MenuItem key={index} value={item.id}>
  //       {item.countryCode}
  //     </MenuItem>
  //   ));
  // };
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        mutate(values);
      }}
      validationSchema={toFormikValidationSchema(loginSchema)}
    >
      {() => (
        <Form>
          <Stack spacing={3}>
            <Stack spacing={1.75}>
              <Stack spacing={1.5}>
                <CoupledInput
                  leftField={
                    <CoupledButton
                      title={t("+966")}
                      icon={<img src={saudiFlag} alt="saudi-flag" />}
                      disabled
                    />
                  }
                  rightField={
                    <CoupledTextField
                      order="second"
                      name="phone"
                      // placeholder={t("login.form.phone")}
                      placeholder=""
                      key="phone"
                    />
                  }
                />
                <TextField
                  name="password"
                  label={t("login.form.password")}
                  startIcon={<LockIcon color="var(--primary-main)" />}
                  endIcon={<EyeIcon color="var(--primary-main)" />}
                  type="password"
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <CheckBox label={t("login.form.remember")} />
                <Typography
                  variant="h6"
                  component={Link}
                  to={"/forget-password"}
                  sx={{
                    textDecoration: "none",
                    color: "grey.800",
                  }}
                >
                  {t("login.form.forgot")}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={1.5}>
              <Button
                text={t("login.form.submit")}
                variant="contained"
                type="submit"
                loading={isPending}
              />
              <Button
                text={t("login.form.free")}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch(setFreeTrail(true));
                  dispatch(changeStep(1));
                  navigate("/sign-up");
                }}
              />
              <Stack direction={"row"} justifyContent={"center"} spacing={1}>
                <Typography variant="h6" sx={{ color: "grey.800" }}>
                  {t("login.form.noAccount")}
                </Typography>
                <Typography
                  variant="h6"
                  onClick={() => {
                    dispatch(setFreeTrail(false));
                    dispatch(changeStep(1));
                    navigate("/sign-up");
                  }}
                  sx={{
                    textDecoration: "none",
                    cursor:"pointer",
                    color: "secondary.main",
                  }}
                >
                  {t("login.form.register")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginFormFields;
