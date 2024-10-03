import { CoupledInput, CoupledTextField } from "../../../../common";
import { FormikErrors, FormikTouched } from "formik";
import {  useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import Button from "../../../../components/form/Button";
import CheckBox from "../../../../components/form/CheckBox";
import { CoupledButton } from "../../../../common/coupledButton";
import EmailIcon from "../../../../components/ui/icons/EmailIcon";
import EyeIcon from "../../../../components/ui/icons/EyeIcon";
import LockIcon from "../../../../components/ui/icons/LockIcon";
import { SignUpData } from "../../../../apis";
import TextField from "../../../../components/form/TextField";
import { changeStep } from "../../../../lib/store/slices/form-step";
import saudiFlag from "../../../../assets/icons/flag.svg";
import { setFreeTrail } from "@myCash/lib";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NewBackButtonV2 from "@myCash/components/ui/NewBackButtonV2";
import AuthFormLayoutNew from "../AuthFormLayoutNew";

interface Props {
  errors: FormikErrors<SignUpData>;
  touched: FormikTouched<SignUpData>;
  isPending?: boolean;
}

const SignUpStepForm: React.FC<Props> = ({ errors, touched, isPending }) => {
  const navigate = useNavigate();
  // const [menuItems, setMenuItems] = useState<GetCountriesResponseData[]>([]);
  const { t } = useTranslation();
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleCheckBox = () => {
    setIsTermsChecked(!isTermsChecked);
  };
  const highlightedTextAction = () => {
    window.open("/privacy", "_blank");
  };
  // check fields validation
  const handleFieldsValidation = () => {
    if (errors.email || errors.phone || errors.password || !touched) {
      return true;
    }
    return false;
  };
  const handleBack = () => {
    // TODO:: recheck
    dispatch(changeStep(1));
    dispatch(setFreeTrail(false));
    navigate("/login");
  };

  // //get countries codes
  // // TODO::optimize
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getData(`client/general_data/get_countries`);
  //     setMenuItems(result?.data);
  //   };

  //   fetchData();
  // }, []);
  // // TODO::optimize
  // const renderMenuItems = () => {
  //   return menuItems.map((item, index) => (
  //     <MenuItem key={index} value={item.id}>
  //       {item.countryCode}
  //     </MenuItem>
  //   ));
  // };
  return (
    <AuthFormLayoutNew>
      <NewBackButtonV2 onClick={handleBack} />
      <Stack spacing={3}>
        <Stack spacing={1.75}>
          <Stack spacing={1.5}>
            <TextField
              name="email"
              label={t("signUp.stepThree.form.email")}
              startIcon={<EmailIcon color="var(--primary-main)" />}
            />
            <CoupledInput
              gridStyle={"0.8fr 3fr"}
              leftFieldStyle={{
                maxWidth: "150px",  // Limit width for leftField (button)
                minWidth: "100px",  // Set minimum width
                width: "100%",      // Responsive width
              }}
              leftField={
                <CoupledButton
                  title={t("966+")}
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
          <CheckBox
            label={t("signUp.stepThree.form.privacyStart")}
            highlightedText={t("signUp.stepThree.form.privacyEnd")}
            highlightedTextAction={highlightedTextAction}
            onChange={handleCheckBox}
          />
        </Stack>
        <Stack spacing={1.5}>
          <Button
            // touched fields
            loading={isPending}
            disabled={!isTermsChecked || handleFieldsValidation()}
            text={t("signUp.stepThree.continue")}
            variant="contained"
            type="submit"
          // onClick={() => {
          //   dispatch(changeStep(3));
          // }}
          />

          <Button
            // touched fields
            loading={isPending}
            text={t("signUp.stepThree.login")}
            variant="outlined"
            type="button" onClick={handleBack}
            color={"primary"}
           
          />
        
        </Stack>
      </Stack>
    </AuthFormLayoutNew>
  );
};

export default SignUpStepForm;
