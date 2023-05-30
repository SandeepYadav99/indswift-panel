import React from 'react';
import styles from './Style.module.css';
import csx from 'classnames';
import LogUtils from "../../../../../libs/LogUtils";

function FormDropdown({ value, name, onChange, isError }) {
    LogUtils.log('FormDropdown', value);
  return (
      <select className={csx(styles.inputComp, (isError ? styles.ErrorField : ''))} name={name}  value={value} onChange={onChange}>
          <option value="">Choose Value</option>
          <option value="10">Strongly Agree</option>
          <option value="8">Agree</option>
          <option value="6">Disagree</option>
          <option value="4">Strongly Disagree</option>
      </select>
  );
}

export default FormDropdown;
