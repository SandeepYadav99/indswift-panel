import React from "react";
import styles from "./Style.module.css";
function FormInput({ onChange, readOnly, value, isError }) {
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
    />
  );
}

export default FormInput;
