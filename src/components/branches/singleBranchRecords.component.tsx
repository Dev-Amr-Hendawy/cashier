import { Stack } from "@mui/material";
import { AsideTitle, UserRecordCard } from "@myCash/common";
import DatePicker from "../form/DatePicker";

interface SingleBranchRecordsProps {
  handleRecordModal: (value: boolean) => void;
}

export const SingleBranchRecords: React.FC<SingleBranchRecordsProps> = ({
  handleRecordModal,
}) => {
  return (
    <Stack className="detail-container">
      <AsideTitle title="users.records" showAll />
      <Stack className="user-records-container ">
        <DatePicker onChange={(d) => console.log(d)} fullWidth />
        <Stack gap={"0.5rem"}>
          <UserRecordCard onClick={() => handleRecordModal(true)} />
          <UserRecordCard onClick={() => handleRecordModal(true)} />
        </Stack>
      </Stack>
    </Stack>
  );
};
