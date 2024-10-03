import {
  Autocomplete,
  Stack,
  CircularProgress,
  Popper,
  Chip,
  InputAdornment,
} from "@mui/material";
import { useProducts } from "@myCash/hooks";
import { Product } from "@myCash/types";
import { Field, FieldProps, FormikValues, useFormikContext } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledPaper } from "../addCategoriesInput/styles";
import { useDebounce } from "@uidotdev/usehooks";
import { StyledTextField } from "@myCash/components";

interface ProductAutoSearchProps {
  label?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  name: string;
  selectedItem?: Product;
  setSelectedItem?: (value?: Product) => void;
  isBarCode?: boolean;
}

export const ProductAutoSearch: React.FC<ProductAutoSearchProps> = ({
  label,
  placeholder,
  startIcon,
  name,
  selectedItem,
  setSelectedItem,
  isBarCode,
}) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Product[]>([]);
  const [searchByName, setSearchByName] = useState<string>("" as string);
  const debouncedSearch = useDebounce(searchByName, 500);
  const { setFieldValue } = useFormikContext<FormikValues>();
  const {
    data,
    isPending,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProducts(debouncedSearch);
  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const lastOptionElementRef = useCallback(
    (node: Element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasNextPage, fetchNextPage]
  );
  const lastItemScroll = document.querySelector("#last-item-scroll");

  useEffect(() => {
    const temp: Product[] = [];
    if (isPending) return;
    data?.pages?.map((page, pageIndex) => {
      return page?.map((product, index) => {
        // if last item add a key to it for ref
        if (
          pageIndex === data.pages?.length - 1 &&
          index === page?.length - 1
        ) {
          temp.push({ ...product, last: true });
        } else {
          temp.push(product);
        }
      });
    });

    setItems(temp);
    if (lastItemScroll && isRefetching) {
      window.scrollTo(0, lastItemScroll.scrollHeight);
    }
  }, [data, isPending, isRefetching]);
  return (
    <Field name={name}>
      {({ field }: FieldProps) => {
        return (
          <Autocomplete
            multiple
            id="tags-filled"
            options={items}
            sx={{ width: "100%" }}
            clearIcon={null}
            freeSolo
            readOnly={false}
            onInputChange={(event, value) => {
              setSearchByName(value);
              if (event.type == "keydown") {
                event.preventDefault();
                value = searchByName;
                console.log("val", value);
              }
            }}
            filterOptions={(x) => x}
            value={selectedItem ? [selectedItem] : []}
            onChange={(event, value) => {
              console.log(value);
              event.preventDefault();
              if (event.type !== "keydown") {
                setFieldValue(
                  name,
                  typeof value === "object" ? (value[0] as Product)?.id : ""
                );
                setSelectedItem && setSelectedItem(value[0] as Product);
              }
              if (event.type == "keydown") {
                event.preventDefault();
                const product = items.find(
                  (item) => item?.barCode === value[0]
                ) as Product;
                if (!product) return;
                setFieldValue(
                  name,
                  typeof value === "object" ? product?.id : ""
                );
                setSelectedItem && setSelectedItem(product as Product);
              }
            }}
            getOptionLabel={(option) => {
              return typeof option === "string"
                ? option
                : isBarCode
                ? option?.barCode
                  ? option.barCode
                  : // TODO: Fix doesn't show the fallout
                    "No Barcode Assigned"
                : option?.name;
            }}
            disabled={selectedItem ? true : false}
            renderTags={() => {
              if (selectedItem?.name)
                return (
                  <Chip
                    label={
                      isBarCode
                        ? selectedItem.barCode || "No Barcode Assigned"
                        : selectedItem.name
                    }
                    onDelete={() => {
                      setSearchByName("");
                      setFieldValue(name, "");
                      setSelectedItem && setSelectedItem(undefined);
                    }}
                  />
                );
            }}
            PopperComponent={(props) => <Popper {...props} />}
            PaperComponent={(props) => <StyledPaper {...props} />}
            renderOption={(props, option) => {
              return (
                <Stack spacing={1} key={option.id}>
                  <li
                    {...props}
                    // @ts-expect-error: Don't touch
                    ref={option.last ? lastOptionElementRef : undefined}
                    id={option.last ? "last-item-scroll" : ""}
                  >
                    {isBarCode ? option.barCode : option.name}
                  </li>
                  {isFetchingNextPage && option.last && (
                    <Stack sx={{ width: "100%" }} alignItems="center">
                      <CircularProgress
                        size={50}
                        sx={{
                          color: "red",
                          bgcolor: "green",
                        }}
                      />
                    </Stack>
                  )}
                </Stack>
              );
            }}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                {...field}
                sx={{ width: "100%" }}
                name={name}
                label={label ? t(label) : ""}
                placeholder={!selectedItem && placeholder ? t(placeholder) : ""}
                disabled={selectedItem ? true : false}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start" sx={{ m: 2 }}>
                        {startIcon}
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    </Field>
  );
};
