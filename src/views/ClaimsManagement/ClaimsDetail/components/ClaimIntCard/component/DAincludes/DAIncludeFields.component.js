import React, { useMemo } from "react";
import {
  TextField,
  ButtonBase,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import styles from "./style.module.css";
import CustomDatePicker from "../../../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../../../components/FormFields/SelectField/SelectField.component";
import { useEffect } from "react";
import File from "../../../../../../../components/FileComponent/FileComponent.component";
import {
  DAAllotAmout,
  IEAllotAmout,
  entitlementAmout,
} from "../../../../../../../helper/helper";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const DAIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  grade,
  startDate,
  endDate,
  checkDays,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      if (fieldName === "type") {
        changeData(index, { [fieldName]: e.target.value });
      } else {
        changeData(index, { [fieldName]: e });
      }
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "da_amount" || name === "ie_amount") {
        if (value >= 0) {
          changeData(index, { [name]: value });
        }
      } else {
        changeData(index, { [name]: value });
      }
    }
  };
  useEffect(() => {
    if (grade && data?.stay_at && data?.hours) {
      let storeValue = DAAllotAmout(grade, data?.stay_at);
      let percent;
      if (data?.stay_at === "GUEST_HOUSE") {
        percent = 50;
      } else {
        if (data?.hours >= 12) {
          percent = 100;
        } else if (data?.hours >= 6 && data?.hours < 12) {
          percent = 60;
        } else {
          percent = 40;
        }
      }
      let maxValue = (storeValue * percent) / 100;
      changeData(index, {
        ["da_entitlement"]: maxValue,
        ["da_pct"]: percent,
      });
    }
  }, [grade, data?.stay_at, data?.hours]);

  useEffect(() => {
    if (data?.start_time && data?.end_time) {
      const starttime = new Date(data?.start_time);
      const endtime = new Date(data?.end_time);
      const timeDifferenceInMilliseconds = endtime - starttime;
      const timeDifferenceInHours =
        timeDifferenceInMilliseconds / (1000 * 60 * 60);

      const roundedTimeDifference =
        Math.round(timeDifferenceInHours * 100) / 100;

      changeData(index, {
        ["hours"]: roundedTimeDifference,
      });
    }
  }, [data?.start_time, data?.end_time]);

  useEffect(() => {
    if (checkDays >= 5 && grade) {
      let ieRes = IEAllotAmout(grade);
      changeData(index, {
        ["ie_entitlement"]: ieRes,
      });
    }
  }, [checkDays]);

  console.log("checkDays", checkDays, index);
  return (
    <div>
      <div className={styles.heading}>Travel Type</div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.stay_at}
              errorText={errors?.stay_at}
              label={"Stay at"}
              value={data?.stay_at}
              handleChange={(value) => {
                handleChange(value, "stay_at");
              }}
            >
              <MenuItem value="HOTEL">HOTEL</MenuItem>
              <MenuItem value="GUEST_HOUSE">GUEST HOUSE</MenuItem>
              <MenuItem value="SELF_ARRANGEMENT">SELF ARRANGEMENT</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.flex1}>
            <CustomDatePicker
              disabled={!startDate ? true : false}
              clearable
              label={"Date"}
              minDate={startDate}
              maxDate={endDate}
              onChange={(e) => handleChange(e, "date")}
              value={data?.date}
              isError={errors?.date}
            />
          </div>
          <div className={styles.flex1}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                margin="dense"
                variant="inline"
                id="time-picker"
                fullWidth
                label={"Starting Time"}
                value={data?.start_time}
                onChange={(e) => handleChange(e, "start_time")}
                inputVariant={"outlined"}
                minutesStep={5}
                // format="HH:mm"
                format="h:mm a"
                error={errors?.start_time}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <AccessTimeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={styles.flex1}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                margin="dense"
                variant="inline"
                id="time-picker"
                fullWidth
                label={"Ending Time"}
                value={data?.end_time}
                onChange={(e) => handleChange(e, "end_time")}
                inputVariant={"outlined"}
                minutesStep={5}
                // format="HH:mm"
                format="h:mm a"
                error={errors?.end_time}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <AccessTimeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className={styles.firstRow} style={{ marginTop: "15px" }}>
          <div className={styles.flex1}>
            <TextField
              disabled={true}
              type="number"
              error={errors?.hours}
              onChange={handleChange}
              value={data?.hours}
              fullWidth={true}
              name={"hours"}
              margin={"dense"}
              variant={"outlined"}
              label={"Duration in Hours"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              disabled={true}
              type="number"
              error={errors?.da_pct}
              onChange={handleChange}
              value={data?.da_pct}
              fullWidth={true}
              name={"da_pct"}
              margin={"dense"}
              variant={"outlined"}
              label={"% of DA"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              disabled={true}
              type="number"
              error={errors?.da_entitlement}
              onChange={handleChange}
              value={data?.da_entitlement}
              fullWidth={true}
              name={"da_entitlement"}
              margin={"dense"}
              variant={"outlined"}
              label={"DA Entitelment/Day"}
            />
          </div>
        </div>
        <div className={styles.firstRow221}></div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              type="number"
              error={errors?.da_amount}
              onChange={handleChange}
              value={data?.da_amount}
              fullWidth={true}
              name={"da_amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"DA Claimed Amount"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              disabled={true}
              type="number"
              error={errors?.ie_entitlement}
              onChange={handleChange}
              value={data?.ie_entitlement}
              fullWidth={true}
              name={"ie_entitlement"}
              margin={"dense"}
              variant={"outlined"}
              label={"IE Entitelment/Day"}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
              disabled={index > 2 || checkDays < 5 ? true : false}
              type="number"
              error={errors?.ie_amount}
              onChange={handleChange}
              value={data?.ie_amount}
              fullWidth={true}
              name={"ie_amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"IE Claimed Amount"}
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

export default DAIncludeFields;
