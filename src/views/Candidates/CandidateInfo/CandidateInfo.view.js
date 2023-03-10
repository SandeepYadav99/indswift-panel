import { ButtonBase, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import EmployeePersonalForm from "../../EmployeeApplicationForm/EmployeePersonalForm/EmployeePersonalForm";
import QualificationPage from "../../EmployeeApplicationForm/QualificationForm/QualificationForm.js";
import EmployementHistory from "../../EmployeeApplicationForm/EmploymentHistoryForm/EmployementHistory.view";

import useCandidateInfo from "./CandidateInfo.hook";
import styles from "./Style.module.css";
function CandidateInfo() {
  const { form, changeTextData, onBlurHandler } = useCandidateInfo({});
  return (
    <div>
      <EmployeePersonalForm isDisabled={true}/>
      <QualificationPage isDisabled={true}/>
      <EmployementHistory isDisabled={true}/>

    </div>
  )

}

export default CandidateInfo;
