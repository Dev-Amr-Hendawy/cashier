import { CircularLoader } from "@myCash/common";
import { InvoiceSettingsContent } from "@myCash/components";
import { useGetSettings } from "@myCash/hooks";
import { ISettings } from "@myCash/types";

interface InvoiceSettingsHocProps {}

export const InvoiceSettingsHoc: React.FC<InvoiceSettingsHocProps> = () => {
  const { data, isFetching, isPending } = useGetSettings();
  return (
    <>
      {isFetching ? (
        <CircularLoader size={200} />
      ) : (
        <InvoiceSettingsContent
          isPending={isFetching || isPending}
          data={data ?? ({} as ISettings)}
        />
      )}
    </>
  );
};
