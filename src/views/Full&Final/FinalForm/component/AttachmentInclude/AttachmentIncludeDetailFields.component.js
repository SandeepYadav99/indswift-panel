import React, { useMemo } from "react";
import { TextField, ButtonBase } from "@material-ui/core";
import styles from "./style.module.css";
import File from "../../../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../../../libs/LogUtils";

const AttachmentIncludeDetailFields = ({
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
          <div className={styles.flex12}>
            <TextField
              error={errors?.file_name}
              onChange={handleChange}
              value={data?.file_name}
              fullWidth={true}
              name={"file_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Description of Expense"}
            />
          </div>
          <div className={styles.flex12}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="attachment_documents"
              label="Attach Document"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.attachment_documents}
              value={data?.attachment_documents}
              placeholder={"Attach Document"}
              onChange={(file) => {
                if (file) {
                  LogUtils.log("file", file);
                  handleChange(file, "attachment_documents");
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

export default AttachmentIncludeDetailFields;
