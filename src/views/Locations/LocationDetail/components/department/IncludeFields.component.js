/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Autocomplete } from "@material-ui/lab";

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

const IncludeFields = ({
  index,
  changeData,
  employees,
  departments,
  subdepartments,
  handlePress,
  data,
  errors,
  onBlur,
  listData,
}) => {
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    changeData(index, { [name]: value });
  };

  const handleChangeValue = useCallback(
    (value, key) => {
      changeData(index, { [key]: value });
    },
    [changeData, index]
  );

  const filteredSubDepartments = useMemo(() => {
    return subdepartments?.filter(
      (val) => val.department_id === data?.department_id
    );
  }, [subdepartments, data?.department_id]);
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomSelectField
              fullWidth={true}
              isError={errors?.department_id}
              errorText={errors?.department_id}
              label={"Department Name"}
              value={data?.department_id}
              handleChange={(val) => {
                handleChangeValue(val, "department_id");
              }}
              name={"department_id"}
            >
              {departments.map((dept) => {
                return (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>

          <div className={styles.flex1}>
            <CustomAutoComplete
              autoCompleteProps={{
                freeSolo: false,
                getOptionLabel: (option) => option.label,
              }}
              dataset={employees}
              datasetKey={"label"}
              onTextChange={(text, value) => {
                handleChangeValue(text, "employee");
              }}
              variant={"outlined"}
              label={"Employee Name(Employee ID)"}
              name={"employee"}
              isError={errors?.employee}
              value={data?.employee}
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
        <div className={"AutoCompleteWrap"}>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              handleChangeValue(value, "sub_department_ids");
            }}
            value={data?.sub_department_ids}
            // id="tags-standard"
            options={filteredSubDepartments ? filteredSubDepartments : subdepartments}
            getOptionLabel={(option) => option.name}
            defaultValue={data?.sub_department_ids}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Choose Sub-Departments"
                error={errors?.sub_department_ids}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default IncludeFields;
