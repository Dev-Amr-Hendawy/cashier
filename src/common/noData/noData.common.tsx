// import { useTranslation } from "react-i18next";
import NoDataIcon from "@myCash/assets/icons/no-data-icon.svg";
import "./styles.scss";

export const NoData: React.FC = () => {
  // const { t } = useTranslation();
  return (
    <div className="no-data-container">
      {/* <h2>{t("noData")}</h2> */}
      <img src={NoDataIcon} height={"50%"} width={"50%"} loading="lazy" />
    </div>
  );
};
