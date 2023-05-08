import React from "react";
import styles from "./Style.module.css";
function FormInput({ onChange, readOnly, value, isError, ...props }) {
  return (
    <input
      className={
        readOnly
          ? styles.readOnlyClass
          : isError
          ? styles.ErrorField
          : styles.inputComp
      }
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      {...props}
    />
  );
}

export default FormInput;
