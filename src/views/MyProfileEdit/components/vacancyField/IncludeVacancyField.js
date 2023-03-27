import { ButtonBase, MenuItem, TextField } from "@material-ui/core";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import styles from "./Style.module.css";

const IncludeVacancyField = ({
  index,
  changeData,
  variants,
  handlePress,
  data,
  errors,
  isDisabled,
}) => {
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    changeData(index, { [name]: value });
  };
  return (
    <div className={styles.flexContainer}>
      <div className={styles.formWrapper}>
        <div className={"formGroup"}>
          <TextField
            disabled={isDisabled ? true : false}
            error={errors?.name}
            onChange={handleChange}
            value={data?.name}
            fullWidth={true}
            name={"name"}
            margin={"dense"}
            variant={"outlined"}
            label="Name"
          />
        </div>

        <div className={"formGroup"}>
          <TextField
            disabled={isDisabled ? true : false}
            error={errors?.Relation}
            onChange={handleChange}
            // value="$3"
            value={data?.Relation}
            fullWidth={true}
            name={"Relation"}
            margin={"dense"}
            variant={"outlined"}
            label="Relation"
            type={"number"}
          />
        </div>
      </div>
      <div className={styles.formWrapper}>
        <div className={"formGroup"}>
          <CustomDatePicker
            name="dob"
            clearable
            label={"Child DOB"}
            maxDate={new Date()}
            onChange={handleChange}
            value={data?.dob}
            isError={errors?.dob}
          />
        </div>
        <div className={"formGroup"}>
          <TextField
            disabled={isDisabled ? true : false}
            error={errors?.Aadhar_no}
            onChange={handleChange}
            // value="$3"
            value={data?.Aadhar_no}
            fullWidth={true}
            name={"Aadhar_no"}
            margin={"dense"}
            variant={"outlined"}
            label="Aadhar Number"
            type={"number"}
          />
        </div>
      </div>
    </div>
  );
};

export default IncludeVacancyField;
