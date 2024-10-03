import { Stack, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import "./styles.scss";

interface InvoiceQrCodeProps {
  value: string;
  label?: string;
}

export const InvoiceQrCode: React.FC<InvoiceQrCodeProps> = ({
  value,
  label,
}) => {
  return (
    <Stack className="qr-code-container">
      <QRCodeSVG
        value={value}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        // imageSettings={{
        //   //   src: "https://static.zpao.com/favicon.png",
        //   x: undefined,
        //   y: undefined,
        //   height: 24,
        //   width: 24,
        //   excavate: true,
        // }}
      />
      <Typography>{label && label}</Typography>
    </Stack>
  );
};
