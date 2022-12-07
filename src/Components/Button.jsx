import React from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";
import { motion } from "framer-motion";

const buttonType = {
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ children, variant = "primary", type, ...rest }) => {
  return (
    <motion.button
      whileTap={{ scale: 1.2 }}
      className={getClasses([
        styles.button,
        styles[`button--${buttonType[variant]}`],
      ])}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

const SelectButton = ({ children, ...rest }) => {
  return (
    <select
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
