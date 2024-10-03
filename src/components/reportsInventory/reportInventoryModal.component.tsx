import { useEffect, useState } from "react";

import { useAddReportInventory } from "@myCash/hooks";
import { BackDrop, CommonModal } from "@myCash/common";
import { CommonModalProps, InventoryReport } from "@myCash/types";
import {
  ReportInventoryAddFormFields,
  ReportInventoryResult,
  ReportInventoryAddForm,
  ReportFormProductResults,
} from "@myCash/components";

interface ReportInventoryModalProps extends CommonModalProps {}

export const ReportInventoryModal: React.FC<ReportInventoryModalProps> = ({
  open,
  handleClose,
}) => {
  const [data, setData] = useState<InventoryReport | Record<string, never>>({});
  const [haveDamaged, setHaveDamaged] = useState(false);
  const { data: reportData, mutate, isPending } = useAddReportInventory();
  //   use effect to handle reset data on cancel
  useEffect(() => {
    reportData &&
      setData({
        ...reportData?.data?.data,
        finalPrice: reportData?.data?.data?.product?.finalPrice,
      });
  }, [reportData]);
  if (isPending) return <BackDrop open={isPending} />;
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title="reports.inventoryReport"
      handleClose={() => {
        handleClose();
        setHaveDamaged(false);
        setData({});
      }}
      removePadding
    >
      {!data?.id ? (
        <ReportInventoryAddForm
          data={data}
          handleClose={handleClose}
          handleSubmit={(values) => mutate(values)}
          loading={isPending}
          setData={() => setData({})}
        >
          <ReportInventoryAddFormFields
            data={data ? data : {}}
            haveDamaged={haveDamaged}
            setHaveDamaged={(value) => setHaveDamaged(value)}
          />
        </ReportInventoryAddForm>
      ) : (
        <ReportInventoryResult
          data={data}
          handleClose={() => {
            handleClose();
            setData({});
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
            data={data ? data : {}}
            haveDamaged={true}
            setHaveDamaged={(value) => setHaveDamaged(value)}
            isReportResult
          />
        </ReportInventoryResult>
      )}
    </CommonModal>
  );
};
