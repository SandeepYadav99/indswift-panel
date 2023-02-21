import { MenuItem } from "@material-ui/core";
import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import IncludeQualification from "./IncludeQualification";
import styles from "../../Style.module.css";


function QualificationDetail() {
  return (
    <>
      <div className={styles.QualificationHeader}>
        <h4 className={"infoTitle1"}>
          <div className={"heading1"}>Qualification Details</div>
        </h4>
        <br/>
        <IncludeQualification/>
      </div>
    </>
  );
}

export default QualificationDetail;
