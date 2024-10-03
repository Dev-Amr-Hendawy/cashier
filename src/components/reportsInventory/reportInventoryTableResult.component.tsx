import { CommonModal } from "@myCash/common";
import { CommonModalProps, InventoryReport } from "@myCash/types";
import {
  ReportInventoryResult,
  ReportInventoryAddFormFields,
} from "@myCash/components";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { ReportFormProductResults } from "@myCash/components";

interface ReportInventoryTableResultProps extends CommonModalProps {}

export const ReportInventoryTableResult: React.FC<
  ReportInventoryTableResultProps
> = ({ open, handleClose }) => {
  const data = useSelector(
    (state: RootState) => state.reports?.inventoryReport
  );
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title="reports.inventoryReport"
      handleClose={() => {
        handleClose();
        // setData({});
      }}
      removePadding
    >
      <ReportInventoryResult
        data={data?.id ? (data as InventoryReport) : {}}
        handleClose={() => {
          handleClose();
          //   setData({});
        }}
      >
        <ReportFormProductResults
          barCode={
            data?.product?.barCode
              ? data.product.barCode
              : "No Barcode Assigned"
          }
          name={data?.product?.name ? data.product.name : ""}
        />
        <ReportInventoryAddFormFields
          data={data?.id ? (data as InventoryReport) : {}}
          isReportResult
          haveDamaged
        />
      </ReportInventoryResult>
    </CommonModal>
  );
};
