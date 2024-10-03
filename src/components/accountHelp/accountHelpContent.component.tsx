import { Stack } from "@mui/material";
import { ScrollContainer, SecondaryMainLayout } from "@myCash/common";
import { ContactUs, KnowMore } from "@myCash/components";
import "./styles.scss";

interface AccountHelpContentProps {}

export const AccountHelpContent: React.FC<AccountHelpContentProps> = () => {
  return (
    <ScrollContainer>
      <SecondaryMainLayout title="accountHelp.title">
        <Stack
          gap={"2.5rem"}
          width={"50vw"}
          className="secondary-main-container"
        >
          <ContactUs />
          <KnowMore />
        </Stack>
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
