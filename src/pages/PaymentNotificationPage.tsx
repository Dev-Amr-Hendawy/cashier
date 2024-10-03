import {  PaymentNotificationContent } from "@myCash/components";
import Fading from "../components/ui/animation/Fading";

interface Props {}

export const PaymentNotificationPage: React.FC<Props> = () => {
  return (
    <Fading>
      <PaymentNotificationContent />
    </Fading>
  );
};
