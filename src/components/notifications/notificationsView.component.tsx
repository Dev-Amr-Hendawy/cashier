import { Stack } from "@mui/material";
import { NotificationItem } from "@myCash/common";

interface NotificationsViewProps {}

export const NotificationsView: React.FC<NotificationsViewProps> = () => {
  return (
    <Stack gap={"1rem"}>
      <NotificationItem
        handleDelete={() => console.log("delete")}
        title="لم يتم تسجيل بيانات فاتورتك بعد قم بإعداد و ضبط حسابك لسهولة طباعة فواتير."
        time="منذ دقيقة"
      />
      <NotificationItem
        handleDelete={() => console.log("delete")}
        title="لم يتم تسجيل بيانات فاتورتك بعد قم بإعداد و ضبط حسابك لسهولة طباعة فواتير."
        time="منذ دقيقة"
      />
    </Stack>
  );
};
