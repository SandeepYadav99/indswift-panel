import React from 'react';
import styles from './Style.module.css';
import csx from 'classnames';
import LogUtils from "../../../../../libs/LogUtils";

function FormDropdown({ value, name, onChange, isError }) {
    LogUtils.log('FormDropdown', value);
  return (
      <select className={csx(styles.inputComp, (isError ? styles.ErrorField : ''))} name={name}  value={value} onChange={onChange}>
          <option value=""></option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
      </select>
  );
}

export default FormDropdown;
