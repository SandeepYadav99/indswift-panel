import { ButtonBase } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";
import ProfessionalDetail from "./components/ProfessionalDetail/ProfessionalDetail";
import QualificationDetail from "./components/Qualification/QualificationDetails";
import styles from "./Style.module.css";

function QualificationPage() {
  return (
    <div className={styles.employeeLoginWrapper}>
      <div className={styles.employeeLoginContainer}>
        <div className={styles.logoImg}>
          <img
            src={require("../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>
            Employment Application FormFields
          </h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.signContainer}>
          <QualificationDetail />
        </div>
        <div className={styles.signContainer}>
          <ProfessionalDetail />
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnCont1}>
            <ButtonBase className={styles.edit}>PREVIOUS</ButtonBase>
            <ButtonBase
              type={"button"}
              // onClick={handleSubmit}
              className={styles.createBtn}
            >
              NEXT
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualificationPage;
