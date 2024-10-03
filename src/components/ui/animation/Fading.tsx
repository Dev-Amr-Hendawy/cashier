import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const Fading = ({ children }: Props) => {
  const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fade}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default Fading;
