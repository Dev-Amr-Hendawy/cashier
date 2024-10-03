import { Stack } from "@mui/material";
import { ShiftModalBranch, ShiftModalInfo } from "..";
import "./styles.scss";

type UserInfoCardProps = {
  userName: string;
  userRole: string;
  logo: string;
};

export const UserInfoCard: React.FC<UserInfoCardProps> = ({
  userName,
  userRole,
  logo,
}) => {
  return (
    <div className="user-card-container">
      <img src={logo || "https://via.placeholder.com/150"} alt="user" />
      <Stack width="100%" spacing={2}>
        <ShiftModalInfo
          userName={userName}
          userRole={userRole}
          shiftType="end"
          info
        />
        <ShiftModalBranch shiftType="end" info />
      </Stack>
    </div>
  );
};
