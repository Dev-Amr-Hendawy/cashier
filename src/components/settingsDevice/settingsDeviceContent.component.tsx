import { useState } from "react";

import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Gallery, Monitor } from "iconsax-react";
import { DeviceDescModal } from "@myCash/components";
import {
  CircularLoader,
  DrawerLink,
  DrawerLinksContainer,
  ScrollContainer,
  SecondaryMainLayout,
} from "@myCash/common";

import "./styles.scss";
import { useGetInfo } from "@myCash/hooks";
import i18n from "@myCash/i18n";

interface SettingsDeviceContentProps {}

export const SettingsDeviceContent: React.FC<
  SettingsDeviceContentProps
> = () => {
  const navigate = useNavigate();
  const dir = i18n.dir();
  const handleBack = () => {
    navigate("/settings");
  };
  const [descOpen, setDescOpen] = useState(false);
  const { data, isPending } = useGetInfo();
  if (isPending) return <CircularLoader size={200} />;
  return (
    <ScrollContainer>
      <SecondaryMainLayout title="settings.deviceInfo" handleBack={handleBack}>
        <Stack className="secondary-main-container device-settings-container">
          <Stack gap={"12px"}>
            <DrawerLinksContainer
              items={[
                {
                  icon: <Gallery size={24} color="var(--grey-900)" />,
                  link: "",
                  title: "settings.deviceImage",
                  image: data?.data?.subscription?.device?.device?.image || "",
                },
              ]}
            />
            <DrawerLinksContainer>
              <DrawerLink
                title="settings.deviceType"
                icon={<Monitor size={24} color="var(--grey-900)" />}
                link=""
                value={
                  dir === "rtl"
                    ? data?.data?.subscription?.device?.device?.brand
                        ?.name_ar || ""
                    : data?.data?.subscription?.device?.device?.brand
                        ?.name_en || ""
                }
              />
              <DrawerLink
                title="settings.deviceName"
                icon={<Monitor size={24} color="var(--grey-900)" />}
                link=""
                value={
                  dir === "rtl"
                    ? data?.data?.subscription?.device?.device?.name_ar || ""
                    : data?.data?.subscription?.device?.device?.name_en || ""
                }
              />
              <DrawerLink
                title="settings.deviceDesc"
                icon={<Monitor size={24} color="var(--grey-900)" />}
                link=""
                handleClick={() => setDescOpen(true)}
              />
            </DrawerLinksContainer>
          </Stack>
          <DeviceDescModal
            open={descOpen}
            handleClose={() => setDescOpen(false)}
            description={
              dir === "rtl"
                ? data?.data?.subscription?.device?.device?.description_ar || ""
                : data?.data?.subscription?.device?.device?.description_en || ""
            }
          />
        </Stack>
      </SecondaryMainLayout>
    </ScrollContainer>
  );
};
