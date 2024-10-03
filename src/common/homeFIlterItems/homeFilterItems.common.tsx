import { Stack } from "@mui/material";
import { HomeFilterItem } from "..";
import { FilterItem } from "../../types/types";
import { FilterContainer } from "./styles";
import DatePicker from "../../components/form/DatePicker";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../lib";
type Props = {
  items: FilterItem[];
  handleDateFrom: (date: Date) => void;
  handleDateTo: (date: Date) => void;
  sortClickHandler: (index: number, id: number) => void;
};

export const HomeFilterItems = ({
  items,
  handleDateFrom,
  handleDateTo,
  sortClickHandler,
}: Props) => {
  const { t } = useTranslation();
  const productState = useSelector((state: RootState) => state.products);

  return (
    <FilterContainer spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1.5}>
        <DatePicker
          value={
            productState?.filter?.date_from
              ? new Date(productState?.filter?.date_from)
              : undefined
          }
          onChange={handleDateFrom}
          title={t("from")}
        />
        <DatePicker
          value={
            productState?.filter?.date_to
              ? new Date(productState?.filter?.date_to)
              : undefined
          }
          onChange={handleDateTo}
          title={t("to")}
        />
      </Stack>
      <Stack spacing={1.5}>
        {items.map((item, index) => (
          <HomeFilterItem
            key={item.id}
            {...item}
            clickHandler={() => sortClickHandler(index, Number(item.id))}
          />
        ))}
      </Stack>
    </FilterContainer>
  );
};
