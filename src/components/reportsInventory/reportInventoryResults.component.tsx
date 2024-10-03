import { useState } from "react";

import { Stack } from "@mui/material";
import { Clock, More } from "iconsax-react";
import { InventoryReport } from "@myCash/types";
import { useTranslation } from "react-i18next";
import { ReportsProductSettingsModal } from "@myCash/components";
import {
  ActionsContainer,
  AsideTitle,
  IconLabelValueField,
} from "@myCash/common";

import Button from "../form/Button";
import { Formik } from "formik";

interface ReportInventoryResultProps {
  children: React.ReactNode;
  handleClose: () => void;
  data: InventoryReport | Record<string, never>;
}

export const ReportInventoryResult: React.FC<ReportInventoryResultProps> = ({
  children,
  handleClose,
  data,
}) => {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <>
          <Stack>
            <AsideTitle
              title={t("reports.report")}
              value={data?.id ? `${data.id}#` : ""}
            />
            <Stack p={"1rem"}>
              <IconLabelValueField
                label={t("timing")}
                icon={<Clock color="var(--grey-900)" size={24} />}
                value={data?.created_at || ""}
              />
            </Stack>
            <AsideTitle title="reports.reportResult" />
            {/* report results */}
            {children}
          </Stack>
          {/* actions */}
          <ActionsContainer spacing={2} direction="row" padding={"0 1.5rem"}>
            <Button
              text={t("signUp.stepTwo.continue")}
              variant="contained"
              color="primary"
              onClick={() => {
                handleClose();
              }}
            />
            <Button
              text={t("more")}
              variant="outlined"
              color="primary"
              onClick={() => {
                setSettingsOpen(true);
              }}
              startIcon={<More color="var(--primary-main)" size={24} />}
            />
          </ActionsContainer>
          <ReportsProductSettingsModal
            handleClose={() => setSettingsOpen(false)}
            open={settingsOpen}
          />
        </>
      )}
    </Formik>
  );
};
