import { Stack, Typography } from "@mui/material";

interface InvoiceClientTitleProps {
  title: string;
}

export const InvoiceClientTitle: React.FC<InvoiceClientTitleProps> = ({ title }) => {
  return (
    <Stack className="client-title">
      <Typography variant="h5" color={"#2D2D2D99"}>
        {title}
      </Typography>
    </Stack>
  );
};
