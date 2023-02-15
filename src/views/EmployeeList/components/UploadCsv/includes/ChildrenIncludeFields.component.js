/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, { useCallback, useState } from "react";
import {
  TextField,
  ButtonBase,
  InputAdornment,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import styles from "./style.module.css";
import { isAlpha, isNum } from "../../../../../libs/RegexUtils";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import {
  AddCircle as AddIcon,
  Info as EditIcon,
  RemoveCircleOutline as RemoveIcon,
} from "@material-ui/icons";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../../../libs/LogUtils";
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
  data,
  errors,
  onBlur,
  currency,
  listWarehouse,
}) => {
  const handleChange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    if (name === "child_dob") {
      changeData(index,{['child_dob'] : value})
    } else {
      changeData(index, { [name]: value });
    }
  };
const changeTextData=(value,key)=>{
  changeData(index, { [key]: value });
  
}
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.child_name}
              onChange={handleChange}
              value={data?.child_name}
              fullWidth={true}
              name={"child_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Child Name"}
            />
          </div>
          <div className={styles.flex1}>
            <CustomSelectField
              name="child_gender"
              isError={errors?.child_gender}
              errorText={errors?.child_gender}
              label={"Child Gender"}
              value={data?.child_gender}
              onChange={handleChange}
              //   handleChange={(value) => {
              //     changeTextData(value, "child_gender");
              //   }}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <CustomDatePicker
              name="child_dob"
              clearable
              label={"Child DOB"}
              maxDate={new Date()}
              // onChange={handleChange}
              // minDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "child_dob");
                }}
              value={data?.child_dob}
              isError={errors?.child_dob}
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
