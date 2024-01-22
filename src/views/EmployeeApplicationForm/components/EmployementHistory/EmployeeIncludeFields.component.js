import React from "react";
import {
  TextField,
  ButtonBase,
 
} from "@material-ui/core";
import styles from "./style.module.css";

import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";

const EmployeeIncludeFields = ({
  index,
  changeData,
 
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

  const changeTextData = (value, name) => {
    changeData(index, { [name]: value });
  };

  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.qualificationFormCont}>
          <div className={styles.firstRow}>
            <div className={styles.historyfieldWrapper}>
              <div className={styles.flex1}>
                <TextField
                  disabled={isDisabled ? true : false}
                  error={errors?.employer_name}
                  onChange={handleChange}
                  value={data?.employer_name}
                  fullWidth={true}
                  name={"employer_name"}
                  margin={"dense"}
                  variant={"outlined"}
                  label={"Name of employer/Location"}
                />
              </div>

              <div className={styles.flex1}>
                <TextField
                  disabled={isDisabled ? true : false}
                  error={errors?.designation}
                  onChange={handleChange}
                  value={data?.designation}
                  fullWidth={true}
                  name={"designation"}
                  margin={"dense"}
                  variant={"outlined"}
                  label={"Department/Designation"}
                />
              </div>
            </div>
            <div className={styles.historyfieldWrapper}>
              <div className={styles.flex1}>
                <CustomDatePicker
                  disabled={isDisabled ? true : false}
                  clearable
                  label={"Joining Date"}
                  // maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "joining_date");
                  }}
                  value={data?.joining_date}
                  isError={errors?.joining_date}
                />
              </div>

              <div className={styles.flex1}>
                <TextField
                  disabled={isDisabled ? true : false}
                  error={errors?.joining_ctc}
                  onChange={handleChange}
                  value={data?.joining_ctc}
                  fullWidth={true}
                  name={"joining_ctc"}
                  margin={"dense"}
                  variant={"outlined"}
                  type={"number"}
                  label={"CTC at the time of joining"}
                />
              </div>
            </div>
          </div>
          <div className={styles.firstRow}>
            <div className={styles.historyfieldWrapperHide}>
              <div className={styles.flex1}></div>
              <div className={styles.flex1}></div>
            </div>
            <div className={styles.historyfieldWrapper}>
              <div className={styles.flex1}>
                <CustomDatePicker
                  disabled={isDisabled ? true : false}
                  clearable
                  label={"Date of Resignation"}
                  // maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "resignation_date");
                  }}
                  value={data?.resignation_date}
                  isError={errors?.resignation_date}
                />
              </div>
              <div className={styles.flex1}>
                <TextField
                  disabled={isDisabled ? true : false}
                  error={errors?.leaving_ctc}
                  onChange={handleChange}
                  value={data?.leaving_ctc}
                  fullWidth={true}
                  name={"leaving_ctc"}
                  type={"number"}
                  margin={"dense"}
                  variant={"outlined"}
                  label={"CTC at the time of leaving"}
                />
              </div>
            </div>
          </div>
        </div>
        {!isDisabled && (
          <div className={styles.btnCont}>
            <div className={styles.textCenter}>
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
        )}
      </div>
    </div>
  );
};

export default EmployeeIncludeFields;
