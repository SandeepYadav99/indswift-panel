import { ButtonBase } from "@material-ui/core";
import React from "react";
import useCPCHook from "./CPCHook";
import styles from "./Style.module.css";
import File from "../../../../../components/FileComponent/FileComponent.component";

function CPCView() {
  const { form, errorData, changeTextData, handleSubmit } = useCPCHook({});
  return (
    <div className={styles.cagrWrapper}>
      <div className={styles.Heading}>CPC File</div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <File
            max_size={10 * 1024 * 1024}
            type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
            fullWidth={true}
            name="prcreport"
            label="Upload CPC Document"
            accept={"application/pdf,application/msword,image/*"}
            // link={editData?.document ? editData?.document : null}
            error={errorData?.document}
            value={form?.document}
            placeholder={"Upload CPC Document"}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "document");
              }
            }}
          />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btnCont1}>
          <ButtonBase
            type={"button"}
            onClick={handleSubmit}
            className={styles.createBtn}
          >
            Upload
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default CPCView;
