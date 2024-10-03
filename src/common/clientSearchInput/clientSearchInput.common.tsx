import {
  Autocomplete,
  Chip,
  CircularProgress,
  Popper,
  Stack,
} from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { AddClientFormContext } from "../../context";
import { Client } from "../../types/types";
import { StyledCoupledTextField } from "../coupledTextField/styles";
import { StyledPaper } from "../addCategoriesInput/styles";
import { useDebounce } from "@uidotdev/usehooks";
import { useFormikContext } from "formik";
import { useGetClients } from "@myCash/hooks";

interface ClientSearchInputProps {
  disableNotchedOutline?: boolean;
  defaultValue?: string;
}

// TODO::recheck types
export const ClientSearchInput: React.FC<ClientSearchInputProps> = ({
  disableNotchedOutline,
  defaultValue,
}) => {
  const [items, setItems] = useState<Client[]>([]);
  const [searchByPhone, setSearchByPhone] = useState<string>("" as string);
  const debouncedSearch = useDebounce(searchByPhone, 500);

  const { data, isPending, isRefetching, hasNextPage, fetchNextPage } =
    useGetClients(debouncedSearch);
  const { setFieldValue, resetForm } = useFormikContext();
  const [selectedItem, setSelectedItem] = useState<Client | undefined>(
    undefined
  );

  useEffect(() => {
    const temp: Client[] = [];
    if (isPending) return;

    data?.pages?.map((page, pageIndex) => {
      return page?.map((client, index) => {
        // if last item add a key to it for ref
        if (
          pageIndex === data.pages?.length - 1 &&
          index === page?.length - 1
        ) {
          temp.push({ ...client, last: true });
        } else {
          temp.push(client);
        }
      });
    });

    setItems(temp);
  }, [data, isPending]);
  // const [myValue, setMyValue] = useState<Client | null>(null);
  const { setDisabled, disabled } = useContext(AddClientFormContext);
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
      multiple
      readOnly={disabled}
      clearIcon={null}
      id="tags-filled"
      options={items}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      // remove auto complete search by default
      value={selectedItem ? [selectedItem] : defaultValue ? [defaultValue] : []}
      // inputValue={selectedItem?.phone || searchByPhone}
      onInputChange={(_, value) => {
        setSearchByPhone(value);
        setFieldValue("phone", value);
      }}
      filterOptions={(x) => x}
      // value={myValue?.id}
      onChange={(_, values) => {
        if (typeof values[0] === "string") {
          setFieldValue("phone", values[0]);

          const newClient: Client = {
            name: "",
            phone: values[0],
            email: "",
            taxRecord: "",
            commercialRecord: "",
            address: "",
            notes: "",
            type: "1",
            // TODO::needs fix and remove unnecessary key
            payment_status: 1,
          };
          setSelectedItem(newClient);
          return;
        }
        setDisabled(true);
        setSelectedItem(values[0] as Client);
        const firstItem = values[0] as Client;
        setFieldValue("name", firstItem?.name);
        setFieldValue("email", firstItem?.email);
        setFieldValue("taxRecord", firstItem?.taxRecord);
        setFieldValue("commercialRecord", firstItem?.commercialRecord);
        setFieldValue("address", firstItem?.address);
        setFieldValue("notes", firstItem?.notes);
        setFieldValue("type", firstItem?.type);
        setFieldValue("id", firstItem?.id);
        setFieldValue("phone", firstItem?.phone);
      }}
      freeSolo
      PopperComponent={(props) => <Popper {...props} />}
      PaperComponent={(props) => <StyledPaper {...props} />}
      renderOption={(props, option) => {
        return (
          <Stack spacing={1} key={option.id}>
            {/* @ts-expect-error: This is necessary to suppress the TypeScript error */}

            <li {...props} ref={option.last ? lastOptionElementRef : undefined}>
              {option.phone || option.name}
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
              label={selectedItem.phone || selectedItem.name}
              onDelete={() => {
                setDisabled(false);
                setSelectedItem(undefined);
                setSearchByPhone("");
                resetForm();
              }}
            />
          );
      }}
      renderInput={(params) => (
        <StyledCoupledTextField
          {...params}
          name="phone"
          placeholder={selectedItem ? "" : ""}
          order="second"
          disableNotchedOutline={disableNotchedOutline && disableNotchedOutline}
          //TODO: handleFocus
        />
      )}
    />
  );
};
