import { ButtonBase, Stack, Typography } from "@mui/material";
import { CoupledButton, CoupledInput, CoupledTextField } from "@myCash/common";
import { InventoryReport } from "@myCash/types";
import { useFormikContext } from "formik";
import { BoxRemove } from "iconsax-react";
import { useTranslation } from "react-i18next";

interface DamagedQuantityInputProps {
  item: { id: string; title: string };
  data: InventoryReport | Record<string, never>;
  haveDamaged: boolean;
  setHaveDamaged: (value: boolean) => void;
}

export const DamagedQuantityInput: React.FC<DamagedQuantityInputProps> = ({
  item,
  data,
  haveDamaged,
  setHaveDamaged,
}) => {
  const { t } = useTranslation();
  const { setFieldValue, setFieldTouched } =
    useFormikContext<InventoryReport>();
  return (
    <CoupledInput
      key={item.id}
      gridStyle="5fr 8fr"
      leftField={
        <CoupledButton
          title={
            <Stack direction={"row"} gap={"14px"} alignItems={"center"}>
              <BoxRemove size="24" color="var(--grey-900)" />
              <Typography variant={"h6"} color="grey.900">
                {t(item.title)}
              </Typography>
            </Stack>
          }
          disabled
        />
      }
      rightField={
        <CoupledTextField
          name={item.id}
          placeholder={
            (
              data && (data[item.id as keyof typeof data] as unknown as string)
            )?.toString() || "0.0"
          }
          order="second"
          disableNotchedOutline
          disabled
          endIcon={
            haveDamaged && !data?.id ? (
              <ButtonBase
                color="secondary"
                onClick={() => {
                  setHaveDamaged(false);
                  setFieldValue("damageQuantity", 0);
                  setFieldValue("quantity", 0);
                  setFieldTouched("quantity", false);
                }}
                className="end-icon-button"
              >
                {t("cancel")}
              </ButtonBase>
            ) : null
          }
        />
      }
    />
  );
};
