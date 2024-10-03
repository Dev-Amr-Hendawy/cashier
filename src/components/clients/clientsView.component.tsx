import {
  CircularLoader,
  ClientGridCard,
  NoData,
  SingleItemMenu,
  Table,
} from "@myCash/common";
import { CircularProgress, Grid } from "@mui/material";
import { RootState, clearClient, setClient } from "@myCash/lib";
import {
  useCustomLongPress,
  useDeleteClient,
  useGetClients,
} from "@myCash/hooks";
import { useDispatch, useSelector } from "react-redux";

import { Client } from "@myCash/types/types";
import { EditClientForm } from "@myCash/components";
import { clientsColumns } from "./columnStructure/columnStructure";
import { useTranslation } from "react-i18next";

interface ClientsViewProps {}

export const ClientsView: React.FC<ClientsViewProps> = () => {
  const { t } = useTranslation();
  const isGridView = useSelector(
    (state: RootState) => state.layout.clientsGrid
  );
  const columns = clientsColumns(t);
  const clientState = useSelector((state: RootState) => state.client);

  const { hasNextPage, ref, data, isPending, isRefetching } = useGetClients(
    clientState.search_text
  );
  const clients = data?.pages.flat();
  const { anchorEl, open, attrs, setAnchorEl } = useCustomLongPress();
  const dispatch = useDispatch();
  const rowClickHandler = (data: Client) => {
    dispatch(setClient(data));
  };
  const {
    mutate,
    isSuccess: deleteIsSuccess,
    isPending: deleteIsPending,
  } = useDeleteClient();
  const deleteHandler = () => {
    clientState.client_id && mutate(clientState.client_id);
    clientState.client_id && setAnchorEl(null);
    clientState.client_id && dispatch(clearClient());
  };
  if (
    !data?.pages[0] ||
    (data?.pages[0].length === 0 && !isPending && !isRefetching)
  )
    return <NoData />;
  return (
    <>
      {isPending || isRefetching ? (
        <CircularLoader size={50} />
      ) : isGridView ? (
        <Grid container spacing={2} padding={"0 1rem"}>
          {clients
            ? clients.map((client) => (
                <Grid key={client?.id} item xs={6} {...attrs}>
                  <ClientGridCard
                    onClick={rowClickHandler}
                    onLongPress={rowClickHandler}
                    client={client}
                  />
                </Grid>
              ))
            : null}
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </Grid>
      ) : (
        <>
          <Table
            columns={columns}
            rows={clients ? clients : []}
            rowClickHandler={(data: Client) => rowClickHandler(data)}
            {...attrs}
          />
          {hasNextPage && <CircularProgress size={24} ref={ref} />}
        </>
      )}
      <SingleItemMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
        handleClose={() => setAnchorEl(null)}
        handleDelete={deleteHandler}
        id={clientState.client_id}
        EditModal={EditClientForm}
        deleteSuccess={deleteIsSuccess}
        deletePending={deleteIsPending}
      />
    </>
  );
};
