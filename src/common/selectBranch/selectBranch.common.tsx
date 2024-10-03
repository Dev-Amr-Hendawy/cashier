// import { useTranslation } from "react-i18next";
import {
  MenuItem,
  Stack,
  Menu,
  styled,
  Button,
} from "@mui/material";

import "./styles.scss";
import { SelectBranchType } from "@myCash/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@myCash/lib";
import { useGetBranches } from "@myCash/hooks";
import { ArrowDown2 } from "iconsax-react";

interface SelectBranchProps {
  setFilterHandler: (key: string, value: string) => void;
  branchId?: string;
}

export const SelectBranch: React.FC<SelectBranchProps> = ({
  setFilterHandler, branchId }) => {
  // const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const mainBranch = useSelector((state: RootState) => state.user.mainBranch);
  const [SelectedBranch, setSelectedBranch] = useState<SelectBranchType>();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (val: SelectBranchType) => {
    setSelectedBranch(val);
    setFilterHandler("branch_id", String(val.value));
    handleClose();
  };


  const getBranchesQuery = useGetBranches({
    date_from: "",
    date_to: "",
    status: "",
    city: "",
  });
  const branches = getBranchesQuery.data?.pages?.flat();

  const branchesShortData = branches?.map((branch) => ({
    value: branch?.id,
    label: branch?.name,
  }));


  useEffect(() => {
    if (branchId) {
      const branch = branchesShortData?.find(branch => String(branch.value) === branchId)
      setSelectedBranch(branch);


      setFilterHandler("branch_id", branchId);
    }
    else {
      if (mainBranch) {
        setSelectedBranch({
          label: mainBranch?.name,
          value: mainBranch.id,
        });


        setFilterHandler("branch_id", String(mainBranch.id));
      }
    }
  }, []);
  return (
    <Stack className="filters-branch">
      {branchesShortData?.length ? (
        <>
          <StyledButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {SelectedBranch?.label&&SelectedBranch?.label?.length>8?`${SelectedBranch?.label.slice(0,8)} ...`:SelectedBranch?.label}
            <ArrowDown2 size="24" />
          </StyledButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {" "}
            {branchesShortData.map((branch) => (
              <MenuItem
                value={branch.value}
                key={branch.value}
                sx={{
                  backgroundColor:
                    SelectedBranch && SelectedBranch.value === branch.value
                      ? "var(--primary-primary50)"
                      : "",
                }}
                onClick={() => {
                  handleChangeLanguage(branch);
                }}
              >
                {branch.label}
              </MenuItem>
            ))}
          </Menu>{" "}
        </>
      ) : null}
    </Stack>
  );
};
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "1rem",
  borderRadius: "999rem",
  padding: "1rem 1rem",
  border: "0.5px solid",
  borderColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.primary.main,
  backgroundColor: "transparent",
  "&:hover": {
    opacity: "0.9",
  },
  // backgroundColor: 'rgba(35, 39, 115, 0.15)',
  // "&:hover": {
  //   backgroundColor: theme.palette.grey[200],
  // },
}));