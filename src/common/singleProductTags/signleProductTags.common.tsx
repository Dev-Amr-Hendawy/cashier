import { Stack } from "@mui/material";
import { SingleProductBadge } from "../singleProductBadge";
import { Forbidden, Tag } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface SingleProductTagsProps {
  hasDiscount: number;
  discount: string;
  discountType: string;
  quantity: string;
}

export const SingleProductTags: React.FC<SingleProductTagsProps> = ({
  hasDiscount,
  discount,
  discountType,
  quantity,
}) => {
  const { t } = useTranslation();
  return (
    <Stack gap={"0.5rem"}>
      {hasDiscount ? (
        <SingleProductBadge
          backgroundColor="var(--secondary-main)"
          label={`${discount} ${
            Number(discountType) == 2 ? "%" : t("currency")
          }`}
          icon={<Tag size={16} />}
        />
      ):null}
      {Number(quantity) <= 10 && Number(quantity) !== 0 && (
        <SingleProductBadge
          backgroundColor="#232773"
          label={t("nearSold")}
          icon={<Forbidden size={16} />}
        />
      )}
      {Number(quantity) === 0 && (
        <SingleProductBadge
          backgroundColor="#797979"
          label={t("soldOut")}
          icon={<Forbidden size={16} />}
        />
      )}
    </Stack>
  );
};
