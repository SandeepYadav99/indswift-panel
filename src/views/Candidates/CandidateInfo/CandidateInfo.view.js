import { ButtonBase, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import useCandidateInfo from "./CandidateInfo.hook";
import styles from "./Style.module.css";
import UpperDetail from "./component/UpperDetail";
import PersonalInfo from "./component/Info/CandidatePersonalInfo";
import ContactInfo from "./component/Info/ContactInfo";
import FamilyInfo from "./component/Info/CandFamily";
import QualificationDetails from "./component/Info/QualificationDetails";
import ProfessionalInfo from "./component/Info/ProfessionalInfo";
import HistoryInfo from "./component/Info/HistoryInfo";
import SalaryInfo from "./component/Info/SalaryInfo";
import OtherInfo from "./component/Info/OtherInfo";

function CandidateInfo() {
  const { handlePreviousPage, personalData } = useCandidateInfo({});
  return (
    <div className="CandidateInfoWrappers">
      <div className={styles.employeeLoginWrapper}>
        <div className={styles.employeeLoginContainer}>
          <div className={styles.logoImg}>
            <img
              src={require("../../../assets/img/login logo@2x.png")}
              className={styles.sky}
            />
          </div>
          <div className={styles.loginSignupText}>
            <h1 className={styles.headingText}>Employment Application Form</h1>
          </div>
        </div>
      </div>
      <UpperDetail data={personalData} />
      <div className={styles.infoWrap}>
        <div className={styles.lhs}>
          <PersonalInfo data={personalData?.eaf} />
          <FamilyInfo family={personalData?.eaf?.family} />
          <ProfessionalInfo data={personalData?.eaf?.professional_details} />
          <OtherInfo data={personalData?.eaf?.additional_data} />
        </div>
        <div className={styles.rhs}>
          <ContactInfo contact={personalData?.eaf?.contact} />
          <QualificationDetails data={personalData?.eaf?.qualification} />
          <HistoryInfo data={personalData?.eaf?.employment_history} />
          <SalaryInfo data={personalData?.eaf} />
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <div className={styles.btnCont}>
          <ButtonBase
            // disabled={isSubmitting}
            type={"button"}
            onClick={handlePreviousPage}
            className={styles.createBtn}
          >
            CLOSE
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default CandidateInfo;
