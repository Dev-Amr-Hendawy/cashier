import {
  Document,
  Location,
  NoteAdd,
  People,
  Profile,
  Profile2User,
  ShieldSecurity,
  Sms,
} from "iconsax-react";
import { memo, useContext, useEffect } from "react";

import { ActionsContainer } from "../../common/modal/styles";
import { AddClientFormContext } from "../../context";
import Button from "../form/Button";
import { ClientType, PhoneCoupledTextfield } from "../../common";
import { SearchClientContent } from "..";
import { Stack } from "@mui/material";
import TextField from "../form/TextField";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

type ClientFormContentProps = {
  isSubmitting: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
  notAutoComplete?: boolean;
};

const ClientFormContentNotMemoized: React.FC<ClientFormContentProps> = ({
  isSubmitting,
  handleSubmit,
  handleReset,
  notAutoComplete,
}) => {
  const { t } = useTranslation();
  const { disabled, setDisabled } = useContext(AddClientFormContext);
  const { values } = useFormikContext<{
    [key: string]: string;
  }>();
  useEffect(() => {
    return () => {
      handleReset();
      setDisabled(false);
    };
  }, []);
  const clientFields = [
    {
      label:
        values?.type === "1"
          ? t("client.form.name")
          : t("client.form.supplierName"),
      name: "name",
      startIcon: <Profile variant="TwoTone" />,
    },
    {
      label: t("client.form.phone"),
      name: "phone",
    },
    {
      label: t("client.form.email"),
      name: "email",
      startIcon: <Sms variant="TwoTone" />,
    },
    {
      label: t("client.form.taxRecord"),
      name: "taxRecord",
      startIcon: <ShieldSecurity variant="TwoTone" />,
    },
    {
      label: t("client.form.commercialRecord"),
      name: "commercialRecord",
      startIcon: <Document variant="TwoTone" />,
    },
    {
      label: t("client.form.address"),
      name: "address",
      startIcon: <Location variant="TwoTone" />,
    },
    {
      label: t("client.form.notes"),
      name: "notes",
      startIcon: <NoteAdd variant="TwoTone" />,
    },
  ];

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1}>
        <ClientType
          name="type"
          id={1}
          text={t("client.form.clients")}
          icon={<Profile2User variant="TwoTone" />}
          disabled={disabled}
        />
        <ClientType
          name="type"
          id={2}
          text={t("client.form.suppliers")}
          icon={<People />}
          disabled={disabled}
        />
      </Stack>
      {clientFields.map((field) => {
        if (field.name === "phone") {
          if (notAutoComplete) {
            return <PhoneCoupledTextfield key={field.name} />;
          }
          return <SearchClientContent key={field.name} />;
        } else {
          return <TextField key={field.name} {...field} disabled={disabled} />;
        }
      })}
      <ActionsContainer spacing={2} direction="row">
        <Button
          text={t("continue")}
          variant="contained"
          color="primary"
          loading={isSubmitting}
          onClick={handleSubmit}
        />
        <Button
          text={t("cancel")}
          variant="outlined"
          color="primary"
          onClick={() => {
            setDisabled(false);
            handleReset();
          }}
        />
      </ActionsContainer>
    </Stack>
  );
};

export const ClientFormContent = memo(ClientFormContentNotMemoized);
