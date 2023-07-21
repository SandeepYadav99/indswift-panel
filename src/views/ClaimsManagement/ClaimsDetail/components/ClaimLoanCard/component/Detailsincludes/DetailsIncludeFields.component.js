import React, { useMemo } from "react";
import { ButtonBase, TextField } from "@material-ui/core";
import styles from "./style.module.css";
import File from "../../../../../../../components/FileComponent/FileComponent.component";

const DetailsIncludeFields = ({
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
      <div className={styles.firstRow}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
              error={errors?.documents_label}
              onChange={handleChange}
              value={data?.documents_label}
              fullWidth={true}
              name={"documents_label"}
              margin={"dense"}
              variant={"outlined"}
              label={"Document Name"}
            />
          </div>
          <div className={styles.flex1}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="proof"
              label="Attach Document"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.documents}
              value={data?.documents}
              placeholder={"Attach Document"}
              onChange={(file) => {
                if (file) {
                  handleChange(file, "documents");
                }
              }}
            />
          </div>
          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
               Remove
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsIncludeFields;
