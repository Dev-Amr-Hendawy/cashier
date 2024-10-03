import { Form, Formik } from "formik";
import { StyledContainer, StyledIconButton } from "./styles";
import { FiSearch } from "react-icons/fi";
import TextField from "../../components/form/TextField";
import { useTranslation } from "react-i18next";
import { Barcode } from "iconsax-react";

interface SearchFieldProps {
  label?: string;
  disableSearchIcon?: boolean;
  disableBarcodeIcon?: boolean;
  handleSubmit?: (v: string) => void;
  value?:string|number|null;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  label = "search",
  disableSearchIcon,
  disableBarcodeIcon,
  handleSubmit,value
}) => {
  const { t } = useTranslation();
  
  return (
    <StyledContainer>
      <Formik
        initialValues={{
          search:value?String(value): "",
        }}
        onSubmit={(v) => {
          if (handleSubmit) {
            handleSubmit(v.search);
          }
        }}
      >
        {() => (
          <Form>
            <TextField
              name="search"
              label={t(label)}
              startIcon={disableSearchIcon ? null : <FiSearch />}
              endIcon={
                !disableBarcodeIcon && (
                  <StyledIconButton>
                    <Barcode color="var(--primary-main)" />
                  </StyledIconButton>
                )
              }
            />
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};
