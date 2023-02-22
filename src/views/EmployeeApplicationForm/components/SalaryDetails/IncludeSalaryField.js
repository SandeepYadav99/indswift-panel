import { ButtonBase, MenuItem, TextField } from "@material-ui/core";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import LogUtils from "../../../../libs/LogUtils";
import { isNum } from "../../../../libs/RegexUtils";
import styles from "../../Style.module.css";

const IncludSalaryField = ({
  index,
  changeData,
  variants,
  handlePress,
  data,
  errors,
  firstfield,
  secondfield,
}) => {

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    changeData(index, { [name]: value });
  };

  return (
    <div className={styles.flexContainer}>
      <div className={styles.firstRow}>
        <div className={styles.flex1}>
          <TextField
            error={errors?.payment_type}
            onChange={handleChange}
            value={data?.payment_type}
            fullWidth={true}
            name={"payment_type"}
            margin={"dense"}
            variant={"outlined"}
            label={firstfield}
          />
        </div>
        <div className={styles.flex1}>
          <TextField
            error={errors?.amount}
            onChange={handleChange}
            value={data?.amount}
            fullWidth={true}
            name={"amount"}
            margin={"dense"}
            variant={"outlined"}
            label={secondfield}
            type={'number'}
          />
        </div>

        <div className={"textCenter"}>
          <ButtonBase
            className={styles.removeBtn}
            // label={this.props.index == 0 ? "+" : '-'}
            onClick={() => {
              handlePress(index == 0 ? "-" : "-", index);
            }}
          >
            {index == 0 ? "Remove" : "Remove"}
          </ButtonBase>
        </div>
      </div>
      <br />
    </div>
  );
};

export default IncludSalaryField;
