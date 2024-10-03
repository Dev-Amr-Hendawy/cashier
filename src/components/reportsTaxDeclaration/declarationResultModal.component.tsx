import { CommonModal } from "@myCash/common";
import { CommonModalProps, ReportResults } from "@myCash/types";
import { DeclarationResultFields } from "@myCash/components";

interface DeclarationResultModalProps extends CommonModalProps {
  data: ReportResults | Record<string, never>;
}

export const DeclarationResultModal: React.FC<DeclarationResultModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  return (
    <CommonModal
      open={open}
      hasActions={false}
      title="reports.taxdeclaraton"
      handleClose={() => {
        handleClose();
        // setData({});
      }}
      removePadding
    >
      <DeclarationResultFields data={data ? data : {}} />
    </CommonModal>
  );
};
