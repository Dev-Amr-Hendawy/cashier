import "./styles.scss";

import { AdminIconLabel, IconLabelValueField } from "@myCash/common";
import { Shop, TagUser } from "iconsax-react";
import { Stack, Typography } from "@mui/material";

import { Employee } from "@myCash/types";

interface UserGridCardProps {
  onClick?: (data: Employee) => void;
  employee: Employee;
}

export const UserGridCard: React.FC<UserGridCardProps> = ({
  employee,
  onClick,
}) => {
  return (
    <Stack
      className="user-gird-card"
      onClick={() => onClick && onClick(employee)}
    >
      <Stack className="user-card-content">
        {employee.has_permission ? (
          <AdminIconLabel
            label={employee.name}
            icon={<TagUser size="24" color="#2D2D2DCC" />}
          />
        ) : (
          <IconLabelValueField
            label={employee.name}
            icon={<TagUser size="24" color="#2D2D2DCC" />}
          />
        )}

        <Stack padding={"0 2.5rem"}>
          <Typography variant="h6" color={"#2D2D2DCC"}>
            {employee.email}
          </Typography>
          <Typography variant="subtitle2">{employee.phone}</Typography>
        </Stack>
      </Stack>
      <Stack className="user-card-appendix">
        <Shop
          size="24"
          color={employee?.mainBranch?.isMain === 1 ? "#232773" : "#2D2D2DCC"}
        />
        <Typography
          color={employee?.mainBranch?.isMain === 1 ? "#232773" : "#2D2D2DCC"}
        >
          {employee.mainBranch.name}
        </Typography>
      </Stack>
    </Stack>
  );
};
