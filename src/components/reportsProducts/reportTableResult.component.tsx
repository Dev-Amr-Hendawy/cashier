import { CommonModal } from "@myCash/common";
import { CommonModalProps } from "@myCash/types";
import {
  ReportProductAddFormFields,
  ReportProductResult,
} from "@myCash/components";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";

interface ReportTableResultProps extends CommonModalProps {}

export const ReportTableResult: React.FC<ReportTableResultProps> = ({
  open,
  handleClose,
}) => {
  const data = useSelector((state: RootState) => state.reports?.productReport);
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title="reports.productReport"
      handleClose={() => {
        handleClose();
        // setData({});
      }}
      removePadding
    >
      <ReportProductResult
        data={data?.id ? data : {}}
        handleClose={() => {
          handleClose();
          //   setData({});
        }}
      >
        <ReportProductAddFormFields data={data?.id ? data : {}} />
      </ReportProductResult>
    </CommonModal>
  );
};
