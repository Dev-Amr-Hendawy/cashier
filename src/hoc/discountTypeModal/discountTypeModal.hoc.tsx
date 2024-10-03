import { DiscountTypeModalContent } from "../../components";

interface DiscountTypeHocProps {}

export const DiscountTypeHoc: React.FC<DiscountTypeHocProps> = () => {
  return <DiscountTypeModalContent handleClose={() => {}} open={false} />;
};
