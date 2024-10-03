import { useEffect, useState } from "react";

import { useAddReportProducts } from "@myCash/hooks";
import { BackDrop, CommonModal } from "@myCash/common";
import { CommonModalProps, ProductReport } from "@myCash/types";
import {
  ReportProductAddFormFields,
  ReportProductResult,
  ReportProductsAddForm,
} from "@myCash/components";

interface ReportProductsModalProps extends CommonModalProps {}

export const ReportProductsModal: React.FC<ReportProductsModalProps> = ({
  open,
  handleClose,
}) => {
  const [data, setData] = useState<ProductReport | Record<string, never>>({});
  const { data: reportData, mutate, isPending } = useAddReportProducts();
  console.log(reportData?.data?.data);
  //   use effect to handle reset data on cancel
  useEffect(() => {
    reportData && setData(reportData?.data?.data);
  }, [reportData]);
  if (isPending) return <BackDrop open={isPending} />;
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title="reports.productReport"
      handleClose={() => {
        handleClose();
        setData({});
      }}
      removePadding
    >
      {!data?.id ? (
        <ReportProductsAddForm
          data={data}
          handleClose={handleClose}
          handleSubmit={(values) => mutate(values)}
          loading={isPending}
          setData={() => setData({})}
        >
          <ReportProductAddFormFields data={data ? data : {}} />
        </ReportProductsAddForm>
      ) : (
        <ReportProductResult
          data={data}
          handleClose={() => {
            handleClose();
            setData({});
          }}
        >
          <ReportProductAddFormFields data={data ? data : {}} />
        </ReportProductResult>
      )}
    </CommonModal>
  );
};
