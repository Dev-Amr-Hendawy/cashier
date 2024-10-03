import {
  Coin1,
  DiscountCircle,
  MoneyRecive,
  MoneySend,
  Sort,
  Star,
} from "iconsax-react";
import { useTranslation } from "react-i18next";
import { FilterItem } from "../types/types";

export const useFilterItems = () => {
  const { t } = useTranslation();
  const filterItems: FilterItem[] = [
    {
      name: t("filter.leastPrice"),
      // id: 1,
      id: 4,
      icon: <MoneyRecive color="var(--grey-900)" />,
    },
    {
      name: t("filter.mostPrice"),
      icon: <MoneySend color="var(--grey-900)" />,
      // id: 2,
      id: 3,
    },
    {
      name: t("filter.newest"),
      // id: 3,
      id: 5,
      icon: <Star color="var(--grey-900)" variant="TwoTone" />,
    },
    {
      name: t("filter.name"),
      // id: 4,
      id: 6,
      icon: <Sort color="var(--grey-900)" variant="TwoTone" />,
    },
    {
      name: t("filter.discountPercent"),
      id: 7,
      icon: <DiscountCircle variant="TwoTone" color="var(--grey-900)" />,
    },
    {
      name: t("filter.discountPrice"),
      id: 8,
      icon: <Coin1 variant="TwoTone" color="var(--grey-900)" />,
    },
  ];
  return { filterItems };
};
