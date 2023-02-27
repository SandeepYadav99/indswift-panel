import { ButtonBase } from "@material-ui/core";
import React, { useState } from "react";
import ContactDetails from "../components/PersonalDetails/Contact/ContactDetails";
import ProfileUpper from "../components/PersonalDetails/ProfileUpper";
import ProfilePersonalForm from "../components/PersonalDetails/PersonalInfo/ProfilePersonalForm";
import styles from "../Style.module.css";
import useEmployeePersonalForm from "./EmployeePersonalFormHook";
import handleSubmit from "redux-form/lib/handleSubmit";
import FamilyDetailComponent from "../components/PersonalDetails/FamilyDetails/FamilyDetails.component";

function EmployeePersonalForm({incrementPage}) {
  const { refPersonalForm, handleSubmit, refContactForm, refFamilyDetail, isSubmitting, candidateData, image, handleImageChange } = useEmployeePersonalForm({});
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
            Employment Application FormFields
          </h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.signContainer}>
          <ProfileUpper image={image} handleImageChange={handleImageChange} data={candidateData} />
          <ProfilePersonalForm ref={refPersonalForm} />
        </div>
        <div className={styles.signContainer}>
          <ContactDetails ref={refContactForm} />
        </div>
        <div className={styles.signContainer}>
          <FamilyDetailComponent ref={refFamilyDetail} />
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnCont}>
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

export default EmployeePersonalForm;
