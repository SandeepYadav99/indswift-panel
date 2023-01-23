import { ButtonBase } from "@material-ui/core";
import React, { useState } from "react";
import ContactDetails from "./components/PersonalDetails/ContactDetails";
import FamilyDetails from "./components/PersonalDetails/FamilyDetails";
import ProfileUpper from "./components/PersonalDetails/ProfileUpper";
import ProfileUpperinfo from "./components/PersonalDetails/ProfileUpperinfo";
import styles from "./Style.module.css";

function EmployeeForm({incrementPage}) {
  console.log("====>",incrementPage)
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
          <ProfileUpper />
          <ProfileUpperinfo />
        </div>
        <div className={styles.signContainer}>
          <ContactDetails />
        </div>
        <div className={styles.signContainer}>
          <FamilyDetails />
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnCont}>
            <ButtonBase
              type={"button"}
              onClick={incrementPage}
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

export default EmployeeForm;
