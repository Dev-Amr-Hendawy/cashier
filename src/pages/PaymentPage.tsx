import { PaymentContent } from "@myCash/components";
import Fading from "../components/ui/animation/Fading";

interface Props {}

export const PaymentPage: React.FC<Props> = () => {
  return (
    <Fading>
      <PaymentContent />
    </Fading>
  );
};
