import { useState } from "react";
import i18next from "i18next";
import { Formik } from "formik";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useGetDevices } from "@myCash/hooks";
import { useTranslation } from "react-i18next";
import {
  RootState,
  setSubscriptionDevice,
  setSubscriptionStep,
} from "@myCash/lib";
import { GetDevicesResponseData } from "@myCash/types";
import { ScrollContainer, SecondaryMainLayout } from "@myCash/common";
import DeviceCard from "@myCash/features/authentication/components/sign_up_components/DeviceCard";
import Button from "../form/Button";

interface DevicesProps {
  // handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleClick: () => void;
  calculatePayment: (values: { [key: string]: string }) => void;
}
export const Devices: React.FC<DevicesProps> = ({
  handleClick,
  calculatePayment,
}) => {
  const { t } = useTranslation();
  const dir = i18next.dir();
  const { data } = useGetDevices();
  const [selectedDevice, setSelectedDevice] = useState<number>(0);
  const [wholeDevice, setWholeDevice] = useState<{ id: number }>();
  const subscription = useSelector((state: RootState) => state.subscription);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleSubmitClick = async () => {
    let deviceId = null;
    if (wholeDevice?.id) {
      wholeDevice.id == user?.subscription?.device?.id
        ? (deviceId = null)
        : (deviceId = wholeDevice.id);
    }
    wholeDevice && dispatch(setSubscriptionDevice(deviceId));
    calculatePayment({
      device_country_id: deviceId?.toLocaleString() || "",
      package_id: subscription.subscriptionPayment.package_id || "",
    });
  };
  return (
    <ScrollContainer>
      <Formik
        initialValues={{ device_country_id: "" }}
        onSubmit={(v) => console.log(v)}
      >
        {() => (
          <SecondaryMainLayout
            title={t("signUp.stepTwo.title")}
            handleBack={() => dispatch(setSubscriptionStep(1))}
          >
            <Stack gap={"12px"} m={"0 auto"}>
              <ScrollContainer>
                <Stack width={"50vw"} gap={"12px"}>
                  {(data?.data?.data || []).map(
                    (device: GetDevicesResponseData, index: number) => (
                      <DeviceCard
                        key={index}
                        dir={dir}
                        setIsDeviceSelected={setSelectedDevice}
                        setWholeDevice={() => setWholeDevice(device)}
                        selectedDevice={selectedDevice}
                        {...device}
                      />
                    )
                  )}
                </Stack>
              </ScrollContainer>
              <Button
                text={t("signUp.stepTwo.continue")}
                type="submit"
                onClick={() => {
                  handleSubmitClick();
                  handleClick();
                }}
                disabled={!selectedDevice}
              />
            </Stack>
          </SecondaryMainLayout>
        )}
      </Formik>
    </ScrollContainer>
  );
};
