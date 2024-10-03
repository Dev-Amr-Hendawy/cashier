import { Typography } from "@mui/material";
import { StyledClientTypeContainer } from "./styles";
import { useFormikContext } from "formik";

type ClientTypeProps = {
  icon: React.ReactNode;
  text: string;
  id: number;
  name: string;
  disabled?: boolean;
};

export const ClientType: React.FC<ClientTypeProps> = ({ icon, text, id, name, disabled }) => {
  const { setFieldValue, values } = useFormikContext<{
    [key: string]: string;
  }>();
  const handleChange = () => {
    setFieldValue(name, String(id));
  };
  return (
    <StyledClientTypeContainer active={values[name] === String(id)} onClick={handleChange} disabled={disabled}>
      {icon}
      <Typography variant="h5">{text}</Typography>
    </StyledClientTypeContainer>
  );
};
