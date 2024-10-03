import { AccordionSummary, Radio, Stack } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useFormikContext } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FaHeadphones } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import saudiFlag from "../../../../assets/icons/flag.svg";
import { CoupledInput, CoupledTextField } from "../../../../common";
import { CoupledButton } from "../../../../common/coupledButton";
import TextField from "../../../../components/form/TextField";
import { ICheckCodeInputs } from "@myCash/types";
import { checkCodeInputs } from "@myCash/constants";
// TODO::reface to folder structure

interface ForgetAccordionProps {
  inputs?: ICheckCodeInputs;
  showBoth?: boolean;
}
export default function ForgetAccordion({
  inputs,
  showBoth,
}: ForgetAccordionProps) {
  const { t } = useTranslation();
  const options = [
    {
      title: t("forgetPassword.stepOne.options.email.title"),
      description: t("forgetPassword.stepOne.options.email.description"),
      id: "2",
      textfield: (
        <TextField
          name="key"
          label={t("forgetPassword.stepOne.options.email.textfield")}
          startIcon={<FaHeadphones />}
        />
      ),
    },
    {
      title: t("forgetPassword.stepOne.options.phone.title"),
      description: t("forgetPassword.stepOne.options.phone.description"),
      id: "1",
      textfield: (
        <CoupledInput
          leftField={
            <CoupledButton
              title={t("966+")}
              icon={<img src={saudiFlag} alt="saudi-flag" />}
              disabled
            />
          }
          rightField={
            <CoupledTextField
              order="second"
              name="key"
              placeholder={t("login.form.phone")}
              key="phone"
            />
          }
        />
      ),
    },
  ];
  const settingsCycleInputs = checkCodeInputs(t);
  const [searchParams] = useSearchParams();
  const [expanded, setExpanded] = React.useState<string | false>(
    searchParams.get("type") || "2"
  );
  // TODO:: refactor
  return (
    <Stack spacing={1.5}>
      {showBoth ? (
        settingsCycleInputs.map((option, index) => (
          <SingleAccordion
            key={index}
            title={option.title}
            description={option.description}
            expanded={expanded}
            setExpanded={setExpanded}
            id={option.id}
            textfield={option.textfield}
          />
        ))
      ) : inputs ? (
        <SingleAccordion
          // key={index}
          title={inputs.title}
          description={inputs.description}
          expanded={expanded}
          setExpanded={setExpanded}
          id={inputs.id}
          textfield={inputs.textfield}
        />
      ) : (
        options.map((option, index) => (
          <SingleAccordion
            key={index}
            title={option.title}
            description={option.description}
            expanded={expanded}
            setExpanded={setExpanded}
            id={option.id}
            textfield={option.textfield}
          />
        ))
      )}
    </Stack>
  );
}

type SingleAccordionProps = {
  title: string;
  description: string;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  id: string;
  textfield: JSX.Element;
};

const SingleAccordion = ({
  title,
  description,
  expanded,
  setExpanded,
  id,
  textfield,
}: SingleAccordionProps) => {
  const { setFieldValue } = useFormikContext();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Accordion
      expanded={expanded === id}
      onChange={() => {
        setExpanded(id);
        setFieldValue("key", "");
        setFieldValue("type", id);
        setSearchParams({ ...searchParams, type: id });
      }}
      sx={{
        border: `1px solid`,
        borderColor: expanded === id ? "secondary.main" : "grey.800",
        borderRadius: "1.5rem",
        bgcolor: "var(--background-color)",
      }}
    >
      <AccordionSummary
        sx={{
          flexDirection: "row-reverse",
        }}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Stack direction={"row"} alignItems={"flex-start"}>
          <Radio
            checked={expanded === id}
            color="secondary"
            sx={{
              padding: "0 .5rem",
            }}
          />
          <Stack spacing={1}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2" color="grey.800" maxWidth={"90%"}>
              {description}
            </Typography>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: `1px solid`,
          borderColor: "secondary.main",
        }}
      >
        {textfield}
      </AccordionDetails>
    </Accordion>
  );
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,

  "&::before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));
