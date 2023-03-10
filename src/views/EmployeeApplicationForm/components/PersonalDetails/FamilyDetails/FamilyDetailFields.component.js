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
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";

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
                                   data: form,
                                   errors: errorData,
                                   onBlur,
                                   currency,
                                   listWarehouse,
                                   isDisabled
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
        changeData(index, {[key]: value});

    }
    return (
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.firstRow}>
                    <div className={styles.flex1}>
                        <CustomSelectField
                        disabled={isDisabled ? true : false}
                            isError={errorData?.relation}
                            errorText={errorData?.relation}
                            label={"Relation"}
                            value={form?.relation}
                            handleChange={(value) => {
                                changeTextData(value, "relation");
                            }}
                        >
                            <MenuItem value="FATHER">Father</MenuItem>
                            <MenuItem value="MOTHER">Mother</MenuItem>
                        </CustomSelectField>
                        <CustomTextField
                        disabled={isDisabled ? true : false}
                            isError={errorData?.name}
                            errorText={errorData?.name}
                            label={"Relation Name"}
                            value={form?.name}
                            onTextChange={(text) => {
                              changeTextData(text, "name");
                            }}
                        />
                    </div>
                    <div className={styles.flex1}>
                        <CustomDatePicker
                        disabled={isDisabled ? true : false}
                            clearable
                            label={"D.O.B"}
                            maxDate={new Date()}
                            onChange={(date) => {
                              changeTextData(date, "dob");
                            }}
                            value={form?.dob}
                            isError={errorData?.dob}
                        />
                        <CustomTextField
                        disabled={isDisabled ? true : false}
                            isError={errorData?.occupation}
                            errorText={errorData?.occupation}
                            label={"Occupation"}
                            value={form?.occupation}
                            onTextChange={(text) => {
                              changeTextData(text, "occupation");
                            }}
                        />
                    </div>
                    {
                        !isDisabled && <div className={"textCenter"}>
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
                    }
                    
                </div>

            </div>
        </div>
    );
};

export default ChildrenIncludeFields;
