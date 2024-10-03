import { Divider, Stack } from "@mui/material";
import { DrawerLinkItem } from "@myCash/types/types";
import { DrawerLink } from "..";

type DrawerLinksContainerProps = {
  items?: DrawerLinkItem[];
  children?: React.ReactNode;
  handleLinkClick?: () => void;
};

export const DrawerLinksContainer: React.FC<DrawerLinksContainerProps> = ({
  items,
  children,
  handleLinkClick,
}) => {
  return (
    <Stack
      divider={<Divider />}
      sx={{
        backgroundColor: "grey.500",
        borderRadius: "1rem",
      }}
    >
      {items &&
        items.map((item) => (
          <DrawerLink
            key={item.title}
            {...item}
            handleClick={handleLinkClick}
          />
        ))}
      {children && children}
    </Stack>
  );
};
