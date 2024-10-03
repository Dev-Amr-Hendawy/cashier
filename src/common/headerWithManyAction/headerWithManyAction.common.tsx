import { Stack } from "@mui/material";
import "./styles.scss";
import { ColorModeButton, NewLogout } from "@myCash/components";
import logoImage from "@myCash/assets/images/profile-logo.svg";
import NewLanguageButton from "@myCash/components/ui/NewLanguageButton";

export const HeaderWithManyAction: React.FC = () => {
  return (
    <Stack className="header-with-many-action">
      <Stack className="item-header">
       
        <ColorModeButton position="relative" />
        <NewLanguageButton />
      </Stack>
      <Stack className="item-header">
        <img  src={logoImage} alt="profile" height={"70px"} />
      </Stack>
      <Stack className="item-header">
        <NewLogout />
      </Stack>
    </Stack>
  );
};
