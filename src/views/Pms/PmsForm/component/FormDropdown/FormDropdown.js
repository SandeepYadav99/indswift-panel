import React from 'react';
import styles from './Style.module.css';
import csx from 'classnames';

function FormDropdown({ value, name, onChange, isError }) {
  return (
      <select className={csx(styles.inputComp, (isError ? styles.ErrorField : ''))} name={name}  value={value} onChange={onChange}>
          <option value=""></option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
      </select>
  );
}

export default FormDropdown;
