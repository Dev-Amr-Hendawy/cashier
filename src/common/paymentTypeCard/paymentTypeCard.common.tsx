import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import "./styles.scss";

interface PaymentTypeCardProps {
  active?: boolean;
  title: string;
  icon?: ReactNode;
  iconImages?: string[];
}

export const PaymentTypeCard: React.FC<PaymentTypeCardProps> = ({
  active,
  title,
  icon,
  iconImages,
}) => {
  return (
    <Stack
      className={`payment-type-card ${
        active ? "active-payment-card" : "disabled-payment-card"
      }`}
    >
      {icon}
      {iconImages && (
        <Stack direction={"row"} gap={"4px"}>
          {iconImages.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={title}
              style={{ width: "2rem", height: "2rem" }}
            />
          ))}
        </Stack>
      )}
      <Typography variant="h6">{title}</Typography>
    </Stack>
  );
};
