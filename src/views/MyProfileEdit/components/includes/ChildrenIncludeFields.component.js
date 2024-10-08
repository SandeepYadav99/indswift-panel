/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, {useCallback, useState} from "react";
import {
    TextField,
    ButtonBase,
    InputAdornment,
    MenuItem,
    IconButton,
} from "@material-ui/core";
import styles from "./style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
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

const ChildrenIncludeFields = ({
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
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.firstRow}>
                    <div className={styles.flex1}>
                        <TextField
                            error={errors?.name}
                            onChange={handleChange}
                            value={data?.name}
                            fullWidth={true}
                            name={"name"}
                            margin={"dense"}
                            variant={"outlined"}
                            label={"Child Name"}
                        />
                    </div>
                    <div className={styles.flex1}>
                        <CustomSelectField
                            name="gender"
                            isError={errors?.gender}
                            errorText={errors?.gender}
                            label={"Child Gender"}
                            value={data?.gender}
                            handleChange={(value) => {
                                changeTextData(value, "gender");
                            }}
                        >
                            <MenuItem value="NA">NA</MenuItem>
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                        </CustomSelectField>
                    </div>
                    <div className={styles.flex1}>
                        <CustomDatePicker
                            name="dob"
                            clearable
                            label={"Child DOB"}
                            // onChange={handleChange}
                            maxDate={new Date()}
                            onChange={(date) => {
                                changeTextData(date, "dob");
                            }}
                            value={data?.dob}
                            isError={errors?.dob}
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
            </div>
        </div>
    );
};

export default ChildrenIncludeFields;
