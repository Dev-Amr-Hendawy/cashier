import { CircularLoader } from "@myCash/common";
import { SettingsContent } from "@myCash/components";
import { useGetSettings } from "@myCash/hooks";
import { ISettings } from "@myCash/types";

interface SettingsHocProps {}

export const SettingsHoc: React.FC<SettingsHocProps> = () => {
  const { data, isFetching, isPending } = useGetSettings();
  return (
    <>
      {isPending ? (
        <CircularLoader size={200} />
      ) : (
        <SettingsContent
          isPending={isFetching || isPending}
          data={data ?? ({} as ISettings)}
        />
      )}
    </>
  );
};
