import { Box, Button, Stack, Typography } from "@mui/material";
import { NewLayout } from "@myCash/common";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useSystemInfoValidation } from "@myCash/utils";
import TextFieldNew from "../form/TextFieldNew";
import {
  ArrowLeft,
  Building,
  Location,
  ReceiptDisscount,
  ReceiptEdit,
  ShieldSecurity,
  TableDocument,
} from "iconsax-react";
import { IUser } from "@myCash/types";

interface SystemInfoContentProps {
  handleSubmit: (value: { [key: string]: string  }) => void;
  data: IUser;
}

const initialValues = {
  commercialRecordName: "",
  commercialRecord: "",
  taxRecord: "",
  tax: "",
  branch_name: "",
  branch_address: "",
};

export const SystemInfoContent: React.FC<SystemInfoContentProps> = ({
  handleSubmit,data
}) => {
  const { systemInfoSchema } = useSystemInfoValidation();
  const { t, i18n } = useTranslation();

  const fields = [
    {
      label: t("settings.commercialRecord"),
      name: "commercialRecordName",
      startIcon: <ReceiptEdit size="32" />,
    },
    {
      label: t("settings.commercialRecordNumber"),
      name: "commercialRecord",
      inputType: "string",
      startIcon: <TableDocument size="32" />,
      maxLength: 10,
    },
    {
      label: t("settings.taxRecord"),
      name: "taxRecord",
      inputType: "string",
      startIcon: <ShieldSecurity size="32" />,
      maxLength: 15,
    },
    {
      label: t("settings.taxVat_1"),
      name: "tax",
      inputType: "string",
      startIcon: <ReceiptDisscount size="32" />,
     isPercent:true
    },
    {
      label: t("settings.nameStore"),
      name: "branch_name",
      startIcon: <Building size="32" />,
    },
    {
      label: t("settings.AddressStore"),
      name: "branch_address",
      startIcon: <Location size="32" />,
    },
  ];
  const defaultData=data.accountInfo.commercialRecord?
   {
          commercialRecordName: data.accountInfo.commercialRecordName || "",
          commercialRecord: data.accountInfo.commercialRecord || "",
          taxRecord: data.accountInfo.taxRecord || "",
          tax: data.accountInfo.tax || "",
          branch_name: data.mainBranch?.name || "",
          branch_address: data.mainBranch?.address || "",
        }
    : initialValues ;
  return (
    <Box>
      <NewLayout>
        <Stack gap={"12px"} width={"90%"} className="secondary-main-container">
          <Typography variant="h4" paddingBottom={"40px"}>
            {t("systemInfo.title")}
          </Typography>
          <Formik
            initialValues={defaultData}
            validationSchema={toFormikValidationSchema(systemInfoSchema)}
            onSubmit={handleSubmit}
          >
            {({  isValid }) => (
              <Form>
                <Stack gap={"25px"}>
                  {fields.map((field, index) => (
                    <TextFieldNew
                      key={field.name + index}
                      label={field.label}
                      mainLabel={field.label}
                      name={field.name}
                      startIcon={field.startIcon}
                      maxLength={field.maxLength} 
                       isPercent={field.isPercent}
                      type={field.inputType || "text"}
                    />
                  ))}
                  <Button
                    type="submit"
                    disabled={!isValid} // Button disabled if form is not valid
                    fullWidth
                    style={{
                      backgroundColor: isValid ? "#232773" : "#cccccc", // Change color if disabled
                      height: "60px",
                      borderRadius: "40px",
                      marginTop: "2rem",
                    }}
                  >
                    <Typography
                      color="white"
                      variant="h5"
                      textAlign="center"
                      mx="20px"
                    >
                      {t("settings.submit")}
                    </Typography>
                    <ArrowLeft
                      size="32"
                      color="#FFF"
                      style={{
                        transform: `rotate(${
                          i18n.language === "ar" ? "0deg" : "180deg"
                        })`,
                      }}
                    />
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </NewLayout>
    </Box>
  );
};
