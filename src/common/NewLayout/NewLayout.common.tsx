import { Stack } from "@mui/material";
import "./styles.scss";
import { ScrollContainerWithCustomHeight } from "../scrollContainerWithCustomHeight";

interface NewLayoutProps {
  children: React.ReactNode;
}

export const NewLayout: React.FC<NewLayoutProps> = ({ children }) => {
  return (
    <>
      <ScrollContainerWithCustomHeight
       
        removeHeight={1}
        customStyle={{ flax: "1 1 0", padding: "1rem 0", ...StyleFlexContainer }}
      >
        <Stack className="new-layout">
          <Stack className="card">{children}</Stack>
        </Stack>
        </ScrollContainerWithCustomHeight>
    </>
  );
};
const StyleFlexContainer = {
  display: "grid",
  width: "100%",
};