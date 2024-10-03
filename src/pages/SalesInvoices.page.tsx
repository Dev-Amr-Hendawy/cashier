import { SalesInvoicesHoc } from "@myCash/hoc";
import Fading from "../components/ui/animation/Fading";

interface Props {}

export const SalesInvoicesPage: React.FC<Props> = () => {
  return (
    <Fading>
      <SalesInvoicesHoc />
    </Fading>
  );
};
