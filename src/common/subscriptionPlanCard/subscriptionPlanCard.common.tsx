import { Stack } from "@mui/material";
import {
  Description,
  Price,
  Subscription,
} from "@myCash/features/authentication";
import "./styles.scss";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Button from "@myCash/components/form/Button";

interface IOptionalSubscription {
  desc_ar: string;
  desc_en: string;
  name_ar: string;
  name_en: string;
  finalPrice: string;
  id: number;
}
interface SubscriptionPlanCardProps extends IOptionalSubscription {
  handleClick: () => void;
  isCurrent?: boolean;
  buttonName: string;
  isPending?: boolean;
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  finalPrice,
  id,
  desc_ar,
  desc_en,
  name_ar,
  name_en,
  handleClick,
  isCurrent,
  buttonName,
  isPending,
}) => {
  const dir = i18next.dir();
  const { t } = useTranslation();
  return (
    <Stack className="subscription-plan-card">
      <Subscription
        subscription={dir == "rtl" ? name_ar : name_en}
        isCurrent={isCurrent}
      />
      <Stack spacing={4} alignItems={"center"}>
        <Price price={finalPrice} />
        <Stack spacing={0.5}>
          <Description description={dir == "rtl" ? desc_ar : desc_en} id={id} />
        </Stack>
        <Button
          variant="outlined"
          text={t(buttonName)}
          onClick={handleClick}
          loading={isPending}
        ></Button>
      </Stack>
    </Stack>
  );
};
