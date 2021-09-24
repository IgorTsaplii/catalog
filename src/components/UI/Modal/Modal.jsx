import React from "react";
import classes from "./Modal.module.css";

const Modal = ({ children, visible, setVisible }) => {
  

  return (
    <div className={classes.modal}>
      <div
        className={classes.modal_content}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
