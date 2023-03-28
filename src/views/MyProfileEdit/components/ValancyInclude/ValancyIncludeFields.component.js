/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, {useCallback, useState} from "react";
import {
  ButtonBase,
    TextField,
} from "@material-ui/core";
import styles from "./style.module.css";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import LogUtils from "../../../../libs/LogUtils";

const useStyles = {
    toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5,
    },
    toggleLabel: {
        color: "black",
        fontWeight: 100,
    },
    buttons: {
        marginTop: 30,
        float: "right",
    },
    saveButton: {
        marginLeft: 5,
    },
};

const ValancyIncludeFields = ({
                                   index,
                                   changeData,
                                   variants,
                                   handlePress,
                                   data,
                                   errors,
                                   onBlur,
                                   currency,
                                   listWarehouse,
                               }) => {
    const handleChange = (e) => {
        const name = e?.target?.name;
        const value = e?.target?.value;
        if (name === "dob") {
            changeData(index, {['dob']: value})
        } else {
            changeData(index, {[name]: value});
        }
    };
    const changeTextData = (value, key) => {
        LogUtils.log(value, key, new Date());
        changeData(index, {[key]: value});

    }
    return (
        <div className={styles.flexContainer}>
      <div className={styles.formWrapper}>
        <div className={"formGroup"}>
          <TextField
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
      <div className={styles.btnWrapper}>
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
    );
};

export default ValancyIncludeFields;
