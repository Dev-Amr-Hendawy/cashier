import { TablePaymentCompleted, TablePaymentUnCompleted } from "@myCash/common";

interface TablePaymentStatusCellProps {
  status: number | string;
}

export const TablePaymentStatusCell: React.FC<TablePaymentStatusCellProps> = ({
  status,
}) => {
  return status == "1" ? (
    <TablePaymentCompleted />
  ) : (
    <TablePaymentUnCompleted />
  );
};
