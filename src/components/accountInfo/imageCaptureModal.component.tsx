import { CommonModal, WebCamCapture } from "@myCash/common";

interface ImageCaptureModalProps {
  open: boolean;
  handleClose: () => void;
  handleCatpureSubmit: (image: File) => void;
}

export const ImageCaptureModal: React.FC<ImageCaptureModalProps> = ({
  open,
  handleClose,
  handleCatpureSubmit,
}) => {
  return (
    <CommonModal
      open={open}
      handleClose={handleClose}
      hasActions={false}
      title=""
    >
      <WebCamCapture
        clickHandler={handleClose}
        handleCatpureSubmit={handleCatpureSubmit}
      />
    </CommonModal>
  );
};
