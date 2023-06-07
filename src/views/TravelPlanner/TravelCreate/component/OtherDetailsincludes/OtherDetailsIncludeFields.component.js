import React, { useMemo } from "react";
import {
  TextField,
  ButtonBase,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import styles from "./style.module.css";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import { useEffect } from "react";
import File from "../../../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../../../libs/LogUtils";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { accomodationType } from "../../../../../helper/helper";

const OtherDetailsIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "amount") {
        if (value >= 0) {
          changeData(index, { [name]: value });
        }
      } else {
        changeData(index, { [name]: value });
      }
    }
  };

  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomDatePicker
              clearable
              label={"Check In Date"}
              onChange={(e) => handleChange(e, "check_in")}
              value={data?.check_in}
              isError={errors?.check_in}
            />
          </div>
          <div className={styles.flex1}>
            <CustomDatePicker
              clearable
              label={"Check Out Date"}
              onChange={(e) => handleChange(e, "check_out")}
              value={data?.check_out}
              isError={errors?.check_out}
            />
          </div>
          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.type}
              errorText={errors?.type}
              label={"Type of Accommodation"}
              value={data?.type}
              handleChange={(value) => {
                handleChange(value, "type");
              }}
            >
              {accomodationType?.map((item, index) => (
                <MenuItem value={item?.id} key={`menu_${index}`}>
                  {item?.name}
                </MenuItem>
              ))}
            </CustomSelectField>
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex12}>
            <TextField
              error={errors?.property_name}
              onChange={handleChange}
              value={data?.property_name}
              fullWidth={true}
              name={"property_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Property Name"}
            />
          </div>
          <div className={styles.flex13}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="accomodation_documents"
              label="Add Attachment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.accomodation_documents}
              value={data?.accomodation_documents}
              placeholder={"Add Attachment"}
              onChange={(file) => {
                if (file) {
                  LogUtils.log("file", file);
                  handleChange(file, "accomodation_documents");
                }
              }}
            />
          </div>
        </div>

        <div className={styles.firstRow221}>
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

export default OtherDetailsIncludeFields;
