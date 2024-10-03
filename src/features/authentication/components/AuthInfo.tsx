import { Stack, Typography } from "@mui/material";
import Fading from "../../../components/ui/animation/Fading";

// import { ColorModeButton } from "@myCash/components";
import NewLanguageButton from "@myCash/components/ui/NewLanguageButton";

type Props = {
  title: string;
  description: string;
};

const AuthInfo = ({ title, description }: Props) => {
  return (
    <Stack
      spacing={1}
      justifyContent={"center"}
      sx={{
        height: "100%",
        // margin: "0 auto",
      }}
    >
      <NewLanguageButton position="absolute"  />
      {/* <ColorModeButton position="absolute" /> */}
      <Fading>
        <Stack
          justifyContent={"center"}
          spacing={1}
          sx={{ width: "clamp(25rem, 50vw, 70rem)",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Typography variant="subtitle2" color={"grey.800"}>
            {description}
          </Typography>
        </Stack>
      </Fading>

    </Stack>
  );
};

export default AuthInfo;
