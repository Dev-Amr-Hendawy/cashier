import { ButtonBase, Stack, Box, Typography } from "@mui/material";
import { Camera } from "iconsax-react";
import "./styles.scss";

interface ImageCaptureButtonProps {
  clickHandler: () => void;
}

export const ImageCaptureButton: React.FC<ImageCaptureButtonProps> = ({
  clickHandler,
}) => {
  return (
    <Stack gap={"0.5rem"}>
      <ButtonBase className="image-capture-button" onClick={clickHandler}>
        <Box>
          <Camera size={24} />
        </Box>
      </ButtonBase>
      <Typography variant="subtitle2">Take Photo</Typography>
    </Stack>
  );
};
