import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import styles from "./Style.module.css";
function PdfViewer({
  children,
  handleShare,
  handleToggle,
  isSubmitting,
  candidateStatus,
  handleCheckbox,
}) {
  const [checkBox, setCheckBox] = useState(true);
  return (
    <div className={styles.PdfViewWrapper}>
      <div className={styles.innerPdfCont}>
        <div className={styles.topWrapper}>
          <Close
            onClick={() => handleToggle()}
            style={{ color: "#ffffff", marginLeft: "30px", cursor: "pointer" }}
          />
        </div>
        {children}
        <div className={styles.PdfBtnWrapper}>
          <div>
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"isSame"}
                value={"isSame"}
                onClick={() => {
                  setCheckBox((s)=>!s)
                  handleCheckbox(!checkBox)
                }}
                id="checkedPrc"
                checked={checkBox}
              />{" "}
              <label htmlFor="checkedPrc">
                {" "}
                If offer accepted send PRC closing email to rest of the
                candidates.
              </label>
              <br />
            </div>
          </div>
          <div className={styles.btnWrap}>
            <div className={styles.editBtn2}>
              <ButtonBase
                className={styles.edit}
                onClick={() => handleToggle()}
              >
                CANCEL
              </ButtonBase>
            </div>
            <div>
              <ButtonBase
                disabled={isSubmitting}
                className={styles.createBtn}
                onClick={handleShare}
              >
                share with candidate
              </ButtonBase>
            </div>
          </div>
        </div>
        {/* <div className={styles.pdfBtnShared}></div> */}
      </div>
    </div>
  );
}

export default PdfViewer;
