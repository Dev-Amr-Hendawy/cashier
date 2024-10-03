import { useLongPress } from "@uidotdev/usehooks";
import { useState } from "react";

export const useCustomLongPress = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const attrs = useLongPress(
    (e) => {
      setAnchorEl(e.target as HTMLElement);
    },
    {
      onStart: () => console.log("Press started"),
      onFinish: () => console.log("Press Finished"),
      onCancel: () => console.log("Press cancelled"),
      threshold: 500,
    }
  );
  return { anchorEl, open, attrs, setAnchorEl };
};
