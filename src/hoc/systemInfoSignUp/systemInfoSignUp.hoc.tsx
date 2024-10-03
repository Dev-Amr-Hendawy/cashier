import { HeaderWithManyAction } from "@myCash/common";
import { ProccessLoader } from "@myCash/common/proccessLoader";
import { SystemInfoContent } from "@myCash/components";
import { useCompleteInfo, useGetInfo } from "@myCash/hooks";
import { IUser } from "@myCash/types";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SystemInfoHocProps {}

export const SystemInfoSignUpHoc: React.FC<SystemInfoHocProps> = () => {
  const { data, isFetching } = useGetInfo();
  const { mutate, isSuccess, loading } = useCompleteInfo();

  // Adjusting the type to accept both string and number
  const handleSubmit = async (values: { [key: string]: string }) => {
    mutate(values);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      data?.data?.isCompleteAccountInfo === 1 &&
      pathname === "/complete-system-info"
    ) {
      toast.success("Account info is completed");
      navigate("/success");
      return;
    }
  }, [data?.data?.isCompleteAccountInfo, pathname, navigate, isSuccess]);

  return (
    <>
      {isFetching || loading ? (
        <ProccessLoader />
      ) : (
        <>
        
          <HeaderWithManyAction />
          <SystemInfoContent handleSubmit={handleSubmit}  data={data?.data ?? ({} as IUser)} />
        </>
      )}
    </>
  );
};
