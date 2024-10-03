import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { Gallery } from "iconsax-react";
import "./styles.scss";

interface ImageInputButtonProps {
  name: string;
}

export const ImageInputButton: React.FC<ImageInputButtonProps> = ({ name }) => {
  const { setFieldValue } = useFormikContext<{
    image: Blob | MediaSource;
  }>();

  return (
    <Stack gap={"0.5rem"}>
      <ButtonBase className="image-input-button">
        <input
          type="file"
          onChange={(e) => {
            setFieldValue(name, e.target.files![0]);
          }}
        />
        <Box>
          <Gallery size={24} />
        </Box>
      </ButtonBase>
      <Typography variant="subtitle2">Select Image</Typography>
    </Stack>
  );
};
