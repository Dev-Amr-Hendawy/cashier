import { Stack } from "@mui/material";
import { ISettings } from "@myCash/types";
import { useNavigate } from "react-router-dom";
import { useCompleteInfo } from "@myCash/hooks";
import { BackDrop, ScrollContainer, SecondaryMainLayout } from "@myCash/common";
import {
  LanguageSettings,
  SettingsNightSwitch,
  SettingsReset,
  SystemSettings,
  SystemSwitchSettings,
} from "@myCash/components";

interface SettingsContentProps {
  isPending: boolean;
  data: ISettings;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({
  isPending,
  data,
}) => {
  const navigate = useNavigate();
  const { mutate } = useCompleteInfo();
  const handleSwitch = (value: { [key: string]: string }) => {
    mutate(value);
  };
  return (
    <ScrollContainer>
      <SecondaryMainLayout
        title="settings.title"
        handleBack={() => navigate("/")}
      >
        <BackDrop open={isPending} />
        <Stack
          gap={"2.5rem"}
          width={"50vw"}
          className="secondary-main-container"
        >
          <SystemSettings>
            {/* Switch settings */}
            <SystemSwitchSettings
              accountInfo={data?.accountInfo}
              handleSwitch={handleSwitch}
            />
          </SystemSettings>
          {/* language */}
          <LanguageSettings />
          {/* Night */}
          <SettingsNightSwitch />
          {/* reset */}
          <SettingsReset />
        </Stack>
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
