import React, { useMemo } from "react";
import { TextField, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./style.module.css";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { useEffect } from "react";
import File from "../../../../../components/FileComponent/FileComponent.component";

const AuthDetailsIncludeFields = ({
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
      changeData(index, { [name]: value });
    }
  };

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
              label={"Name"}
            />
          </div>

          <div className={styles.flex1}>
            <CustomSelectField
              isError={errors?.type}
              errorText={errors?.type}
              label={"Preferred Mode of Travel"}
              value={data?.type}
              handleChange={(value) => {
                handleChange(value, "type");
              }}
            >
              <MenuItem value="TRAVEL">TRAVEL</MenuItem>
              <MenuItem value="ACCOMMODATION">ACCOMMODATION</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              type="number"
              error={errors?.amount}
              onChange={handleChange}
              value={data?.amount}
              fullWidth={true}
              name={"amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"Amount"}
            />
          </div>
          <div className={styles.flex1}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="proof"
              label="Add Attachment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.voucher_documents}
              value={data?.voucher_documents}
              placeholder={"Add Attachment"}
              onChange={(file) => {
                if (file) {
                  handleChange(file, "voucher_documents");
                }
              }}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.comment}
              onChange={handleChange}
              value={data?.comment}
              fullWidth={true}
              name={"comment"}
              margin={"dense"}
              variant={"outlined"}
              label={"Comment"}
            />
          </div>

          <div className={styles.flex1}>
          </div>
        </div>
        <div className={styles.lowerBtn}>
          <div className={styles.firstRow221}>
            <div className={styles.flex1}></div>
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

export default AuthDetailsIncludeFields;
