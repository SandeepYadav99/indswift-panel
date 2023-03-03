import { ButtonBase } from "@material-ui/core";
import React from "react";
import ProfessionalDetail from "../components/ProfessionalDetail/ProfessionalDetail";
import QualificationDetail from "../components/Qualification/IncludeQualification";
import styles from "../Style.module.css";
import useQualificationForm from "./QualificationFormHook";

function QualificationPage() {
  const { refProfessionalDetails, refQualificationDetails, handleSubmit, isSubmitting } = useQualificationForm({});

  return (
    <div className={styles.employeeLoginWrapper}>
      <div className={styles.employeeLoginContainer}>
        <div className={styles.logoImg}>
          <img
            src={require("../../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>
            Employment Application Form
          </h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.signContainer}>
          <div className={styles.QualificationHeader}>
            <h4 className={"infoTitle1"}>
              <div className={"heading1"}>Qualification Details</div>
            </h4>
          <QualificationDetail ref={refQualificationDetails} />
          </div>
        </div>
        <div className={styles.signContainer}>
          <ProfessionalDetail ref={refProfessionalDetails} />
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnCont1}>
            <ButtonBase className={styles.edit1}>PREVIOUS</ButtonBase>
            <ButtonBase
                disabled={isSubmitting}
              type={"button"}
              onClick={handleSubmit}
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
