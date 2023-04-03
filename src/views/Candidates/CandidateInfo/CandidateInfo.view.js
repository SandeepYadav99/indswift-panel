import { ButtonBase, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import EmployeePersonalForm from "../../EmployeeApplicationForm/EmployeePersonalForm/EmployeePersonalForm";
import QualificationPage from "../../EmployeeApplicationForm/QualificationForm/QualificationForm.js";
import EmployementHistory from "../../EmployeeApplicationForm/EmploymentHistoryForm/EmployementHistory.view";

import useCandidateInfo from "./CandidateInfo.hook";
import styles from "./Style.module.css";
function CandidateInfo() {
  const { handlePreviousPage } = useCandidateInfo({});
  return (
    <div className="CandidateInfoWrappers">
      <EmployeePersonalForm isDisabled={true} />
      <QualificationPage isDisabled={true} />
      <EmployementHistory isDisabled={true} />
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
