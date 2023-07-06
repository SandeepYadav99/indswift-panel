import React from 'react';
import styles from './Style.module.css';
import csx from 'classnames';
function FormDropdown({ value, name, onChange, isError, isEnabled }) {
  return (
      <select className={csx(styles.inputComp, (isError ? styles.ErrorField : ''))} name={name}  value={value} onChange={onChange}>
          <option value="">Choose Value</option>
          {isEnabled && (<option value="YES">Yes</option>)}
          <option value="NO">No</option>
      </select>
  );
}

export default FormDropdown;
