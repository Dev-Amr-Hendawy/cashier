import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const Scaling = ({ children }: Props) => {
  const fade = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fade}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Scaling;
