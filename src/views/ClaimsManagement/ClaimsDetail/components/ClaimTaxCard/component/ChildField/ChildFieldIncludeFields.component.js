import React, { useMemo } from "react";
import { TextField, ButtonBase } from "@material-ui/core";
import styles from "./style.module.css";
import MultiFile from "../FileComponent/FileMultiComponent.component";
import { serviceUpdateFile } from "../../../../../../../services/ClaimsManagement.service";

const ChildFieldIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      const fd = new FormData();
      e.forEach((item) => {
        fd.append("files", item);
      });
      let req = serviceUpdateFile(fd);
      req.then((res) => {
        const data = res?.data;
        changeData(index, { [fieldName]: [...data] });
      });
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
  const deleteImage = (e, fieldName) => {
    changeData(index, { [fieldName]: [...e] });
  };
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.amount}
              onChange={handleChange}
              value={data?.amount}
              fullWidth={true}
              name={"amount"}
              margin={"dense"}
              variant={"outlined"}
              label={"Child Fees Amount"}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="child_fees_evidence"
              label="Add Attachment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.child_fees_evidence}
              value={data?.child_fees_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                handleChange(file, "child_fees_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "child_fees_evidence", index);
              }}
            />
          </div>
        </div>

        <div className={styles.firstRow221}>
          <div className={styles.btnWrap}>
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

export default ChildFieldIncludeFields;
