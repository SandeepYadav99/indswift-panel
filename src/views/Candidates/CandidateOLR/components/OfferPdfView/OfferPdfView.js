import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import styles from "./Style.module.css";
function PdfViewer({ children }) {
  return (
    <div className={styles.PdfViewWrapper}>
      <div className={styles.innerPdfCont}>
        <div className={styles.topWrapper}>
          <Close style={{ color: "#ffffff", marginLeft: "30px",cursor:"pointer" }} />
        </div>
        {children}
        <div className={styles.PdfBtnWrapper}>
          <div className={styles.editBtn2}>
            <ButtonBase className={styles.edit}>CANCEL</ButtonBase>
          </div>
          <div>
            <ButtonBase className={styles.createBtn}>
              share with candidate
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
