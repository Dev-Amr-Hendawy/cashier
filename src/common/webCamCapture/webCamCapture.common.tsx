import { Button } from "@mui/material";
import { Camera } from "iconsax-react";
import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import "./styles.scss";

interface WebCamCaptureProps {
  clickHandler: () => void;
  handleCatpureSubmit: (image: File) => void;
}

export const WebCamCapture: React.FC<WebCamCaptureProps> = ({
  clickHandler,
  handleCatpureSubmit,
}) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
    type: "file",
  };

  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64Response = await fetch(imageSrc);
        const blob = await base64Response.blob();
        const file = new File([blob], "webcam-image.png", {
          type: "image/png",
        });
        handleCatpureSubmit(file);
      }
    }
  }, [webcamRef, handleCatpureSubmit]);
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <Button
        onClick={() => {
          capture();
          clickHandler();
        }}
        variant="contained"
        className="web-cam-capture-button"
      >
        <Camera />
      </Button>
    </>
  );
};
