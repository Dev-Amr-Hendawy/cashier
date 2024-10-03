import { useTranslation } from "react-i18next";
import { CoupledTextField, CoupledButton, CoupledInput } from "@myCash/common";
import saudiFlag from "../../assets/icons/flag.svg";

interface PhoneCoupledTextfieldProps {
  disableNotchedOutline?: boolean;
  defaultValue?: string;
}

export const PhoneCoupledTextfield: React.FC<PhoneCoupledTextfieldProps> = ({
  disableNotchedOutline,
}) => {
  const { t } = useTranslation();

  return (
    <CoupledInput
      key={"phone"}
      leftField={
        <CoupledButton
          title={t("966+")}
          icon={<img src={saudiFlag} alt="saudi-flag" />}
          disabled
        />
      }
      rightField={
        <CoupledTextField
          name="phone"
          order="second"
          placeholder=""
          disableNotchedOutline={disableNotchedOutline}
          // type="number"
          // defaultValue={defaultValue}
        />
      }
    />
  );
};
