import { Stack, Typography } from "@mui/material";
import { CommonModal } from "@myCash/common";
import { CommonModalProps } from "@myCash/types";

interface ReturnPolicyModalProps extends CommonModalProps {}

export const ReturnPolicyModal: React.FC<ReturnPolicyModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      title="accountHelp.returnPolicy"
      hasActions={false}
    >
      <Stack marginBottom={"30px"}>
        <Typography variant="body2">
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
          تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد
          الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص
          العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من
          الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم
          أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص
          العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع
          الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.
        </Typography>
      </Stack>
    </CommonModal>
  );
};
