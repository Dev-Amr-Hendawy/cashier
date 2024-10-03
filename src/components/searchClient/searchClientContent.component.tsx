import { memo } from "react";
import { useTranslation } from "react-i18next";
import saudiFlag from "../../assets/icons/flag.svg";
import { CoupledInput } from "../../common";
import { ClientSearchInput } from "../../common/clientSearchInput";
import { CoupledButton } from "../../common/coupledButton";

interface SearchClientContentProps {
  disableNotchedOutline?: boolean;
  defaultValue?: string;
}

const SearchClientContentComponent: React.FC<SearchClientContentProps> = ({
  disableNotchedOutline,
  defaultValue,
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
        <ClientSearchInput
          disableNotchedOutline={disableNotchedOutline}
          defaultValue={defaultValue}
        />
      }
    />
  );
};

export const SearchClientContent = memo(SearchClientContentComponent);
