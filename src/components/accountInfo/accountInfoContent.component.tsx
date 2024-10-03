import { Stack } from "@mui/material";
import { Subtitle } from "iconsax-react";
import { IAccountInfoResponse } from "@myCash/types";
import {
  AccountEmailSetting,
  AccountImageSetting,
  AccountNameSetting,
  AccountPhoneSetting,
} from "@myCash/components";
import {
  ConfirmUserCycle,
  DrawerLink,
  DrawerLinksContainer,
  ScrollContainer,
  SecondaryMainLayout,
} from "@myCash/common";
import "./styles.scss";

interface AccountInfoContentProps {
  data: IAccountInfoResponse;
  updateHandler: (
    value: { [key: string]: string },
    type: "email" | "phone" | "profile"
  ) => void;
  updateProfileHandler: (values: { [key: string]: string }) => void;
  checkOtp: (code: string) => void;
  resendOtp: () => void;
  checkOtpPending: boolean;
  resendPending: boolean;
  profilePending: boolean;
}

export const AccountInfoContent: React.FC<AccountInfoContentProps> = ({
  data,
  updateHandler,
  updateProfileHandler,
  checkOtp,
  resendOtp,
  checkOtpPending,
  profilePending,
  resendPending,
}) => {
  return (
    <ScrollContainer>
      <SecondaryMainLayout title="accountInfo.title">
        <Stack
          gap={"12px"}
          width={"50vw"}
          className="secondary-main-container account-info-container"
        >
          {/* profile photo */}
          <AccountImageSetting
            image={data?.data?.accountInfo?.logo || ""}
            updateHandler={updateProfileHandler}
            profilePending={profilePending}
          />
          {/* menu */}
          <DrawerLinksContainer>
            <DrawerLink
              title="accountInfo.serialNumber"
              icon={<Subtitle size={24} />}
              link=""
              value={data?.data?.id.toLocaleString() || ""}
            />
            <AccountNameSetting
              name={data?.data?.name || " "}
              updateHandler={updateProfileHandler}
              profilePending={profilePending}
            />
            <AccountPhoneSetting
              phone={data?.data?.phone || " "}
              updateHandler={updateHandler}
            />
            <AccountEmailSetting
              email={data?.data?.email || " "}
              updateHandler={updateHandler}
            />
          </DrawerLinksContainer>
        </Stack>
      </SecondaryMainLayout>
      <ConfirmUserCycle
        handleOtpConfirm={(code) => checkOtp(code)}
        handleOtpResend={resendOtp}
        otpLoading={checkOtpPending || resendPending}
      />
    </ScrollContainer>
  );
};
