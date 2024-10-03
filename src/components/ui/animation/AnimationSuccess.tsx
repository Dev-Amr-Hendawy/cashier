import React from "react";
import Lottie, { Options, EventListener } from "react-lottie";
import animationData from "../../../assets/animation/Animation-success.json";
import { Stack } from "@mui/material";
import "./styles.scss";

const AnimationSuccess: React.FC = () => {
  const defaultOptions: Options = {
    loop: false,
    animationData: animationData,
  };

  const eventListeners: EventListener[] = [
    {
      eventName: "loopComplete",
      callback: () => console.log("a loop complete"),
    },
  ];

  return (
    <Stack className="animation-success">
    <Lottie
    width={"50%"}
      eventListeners={eventListeners}
      options={defaultOptions}
    /></Stack>
  );
};

export default AnimationSuccess;
