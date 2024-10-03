import { Autocomplete, Chip, CircularProgress, Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

import { Category } from "../../types/types";
import { StyledCoupledTextField } from "../coupledTextField/styles";
import { StyledPaper } from "./styles";
import { useDebounce } from "@myCash/hooks";
import { useFormikContext } from "formik";
import { useGetCategoriesSearch } from "../../hooks/use-get-categories-search";
import { useTranslation } from "react-i18next";

type Props = {
  initialItem?: Category;
  disableNotchedOutline?: boolean;
};

export const AddCategoriesInput: React.FC<Props> = ({ initialItem, disableNotchedOutline }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Category[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [searchText, setSearchText] = useState<string>("" as string);
  const debouncedSearch = useDebounce(searchText, 500);
  const { data, isPending, isRefetching, hasNextPage, fetchNextPage } = useGetCategoriesSearch(debouncedSearch);
  const { setFieldValue } = useFormikContext();
  const [selectedItem, setSelectedItem] = useState<Category | undefined>(initialItem || undefined);
  useEffect(() => {
    const temp: Category[] = [];
    if (isPending) return;

    data?.pages?.map((page, pageIndex) => {
      return page?.map((category, index) => {
        // if last item add a key to it for ref
        if (pageIndex === data.pages.length - 1 && index === page.length - 1) {
          temp.push({ ...category, last: true });
        } else {
          temp.push(category);
        }
      });
    });

    setItems(temp);
  }, [data, isPending]);
  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const lastOptionElementRef = useCallback(
    (node: Element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasNextPage, fetchNextPage]
  );

  return (
    <Autocomplete
      readOnly={disabled}
      multiple
      id="tags-filled"
      freeSolo
      clearIcon={null}
      options={items}
      filterOptions={(x) => x}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
      value={selectedItem ? [selectedItem] : []}
      onInputChange={(_, value) => {
        setSearchText(value);
      }}
      onChange={(_, value) => {
        const firstValue = value[0] as Category;
        setSelectedItem(firstValue);
        setFieldValue("cat_id", firstValue.id);
        setDisabled(true);
      }}
      PaperComponent={(props) => <StyledPaper {...props} />}
      renderOption={(props, option) => {
        return (
          <Stack spacing={1} key={option.id}>
            {/* @ts-expect-error: This is necessary to suppress the TypeScript error */}
            <li {...props} ref={option.last ? lastOptionElementRef : undefined}>
              {option.name}
            </li>
            {isRefetching && option.last && (
              <Stack sx={{ width: "100%" }} alignItems="center">
                <CircularProgress size={14} />
              </Stack>
            )}
          </Stack>
        );
      }}
      renderTags={() => {
        if (selectedItem)
          return (
            <Chip
              label={selectedItem.name}
              onDelete={() => {
                setSelectedItem(undefined);
                setSearchText("");
                setDisabled(false);
              }}
            />
          );
      }}
      renderInput={(params) => (
        <StyledCoupledTextField
          {...params}
          name=""
          placeholder={selectedItem ? "" : t("productModal.form.category")}
          order="second"
          disableNotchedOutline={disableNotchedOutline}
        />
      )}
    />
  );
};
