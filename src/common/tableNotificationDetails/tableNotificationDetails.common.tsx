import { Box } from "@mui/material";
import "./styles.css";
import { NotificationDetailsCard } from "../notificationDetailsCard";
import { IInvoiceNotification } from "@myCash/types";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

interface TableProps {

    // TODO:: change type when fetch from api
    //eslint-disable-next-line
    invoices: IInvoiceNotification[];
    //eslint-disable-next-line
    rowClickHandler: (data: any) => void;
    disableCheckBox?: boolean[];
}

export const TableNotificationDetails: React.FC<TableProps> = ({
    invoices,
    rowClickHandler,
}) => {

    const invoicesState = useSelector(
        (state: RootState) => state.invoicesNotifications
    );

    return (
        <Box className="table-container">
{invoices.map(item => (
  <NotificationDetailsCard
    key={item?.id}
    invoice={item}
    rowClickHandler={rowClickHandler}
    isSelected={String(invoicesState?.invoice_id) === String(item?.id)} // Convert invoicesState?.invoice_id to string
  />
))}
</Box>
    );
};
