/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import styles from "./style.module.css";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

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

  data,
  errors,
}) => {
  const handleChange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    changeData(index, { [name]: value });
  };

  const handleInputChange = (e, fieldName) => {
    let value = e.target.value;

    if (parseFloat(value) >= 0 || value === "") {
      if (fieldName === "min" && data?.max !== undefined) {
        if (parseFloat(value) >= parseFloat(data?.max)) {
          changeData(index, {
            errors: { ...errors, min: SnackbarUtils.error("Min value must be less than Max value") },
          });
        } else {
          changeData(index, { errors: { ...errors, min: undefined } });

          handleChange({ target: { name: fieldName, value } });
        }
      } else if (fieldName === "max" && data?.min !== undefined) {
        if (parseFloat(value) <= parseFloat(data?.min)) {
          changeData(index, {
            errors: {
              ...errors,
              max: SnackbarUtils.error("Max value must be greater than Min value"),
            },
          });
        } else {
          changeData(index, { errors: { ...errors, max: undefined } });

          handleChange({ target: { name: fieldName, value } });
        }
      } else {
        changeData(index, {
          errors: { ...errors, min: undefined, max: undefined },
        });

        handleChange({ target: { name: fieldName, value } });
      }
    }
  };

  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.levelCont}>L{index}</div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.min}
              onChange={(e) => handleInputChange(e, "min")}
              value={data?.min}
              fullWidth={true}
              name={"min"}
              margin={"dense"}
              variant={"outlined"}
              label={"Min"}
              type={"number"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.max}
              onChange={(e) => handleInputChange(e, "max")}
              value={data?.max}
              fullWidth={true}
              name={"max"}
              margin={"dense"}
              variant={"outlined"}
              label={"Max"}
              type={"number"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              error={errors?.percentage}
              onChange={(e) => handleInputChange(e, "percentage")}
              value={data?.percentage}
              fullWidth={true}
              name={"percentage"}
              margin={"dense"}
              variant={"outlined"}
              label={"Percentage"}
              type={"number"}
            />
          </div>
          <div className={styles.flex1}>
            <FormControl variant={"outlined"} margin={"dense"} fullWidth>
              <Select
                disableUnderline
                error={errors?.criteria}
                onChange={handleChange}
                value={data?.criteria}
                fullWidth={true}
                name={"criteria"}
              >
                <MenuItem value={"NONE"}>NONE</MenuItem>
                <MenuItem value={"PIP"}>PIP</MenuItem>
                <MenuItem value={"REPLACE"}>REPLACE</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChildrenIncludeFields;
