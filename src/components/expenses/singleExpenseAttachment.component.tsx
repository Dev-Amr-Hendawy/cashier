import { Box, Stack, Typography } from "@mui/material";
import { AsideTitle, IconLabelValueField } from "@myCash/common";
import { RootState } from "@myCash/lib";
import { Paperclip2 } from "iconsax-react";
import { useSelector } from "react-redux";

interface SingleExpenseAttachmentProps {}

export const SingleExpenseAttachment: React.FC<
  SingleExpenseAttachmentProps
> = () => {
  const expense = useSelector((state: RootState) => state.expense);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = expense?.ExpenseFile || "";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Stack className="detail-container" onClick={handleDownload}>
      <AsideTitle title="users.records" amount="1" />
      <Stack className="expense-attachment-container ">
        <Stack className="container-border-padding">
          <Box>
            <IconLabelValueField
              label="invoice.title"
              value={"200mb"}
              icon={<Paperclip2 size={24} color="#2D2D2D" />}
            />
            <Typography
              fontSize={"14px"}
              fontWeight={500}
              color={"#2D2D2D99"}
              padding={"1rem 2.5rem"}
            >
              21/08/2021, 02:22 AM
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
