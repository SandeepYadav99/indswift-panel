import { MenuItem } from "@material-ui/core";
import React from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import styles from "../../Style.module.css";
import IncludeSalary from "./IncludeSalary";

function SalaryDetail() {
  return (
    <>
      <div className={styles.QualificationHeader}>
        <h4 className={"infoTitle1"}>
          <div className={"heading1"}>Current CTC Details</div>
        </h4>
        {/* <br /> */}
        <IncludeSalary
          SalaryTagType=" Add Monthly Payment"
          firstfield="CTC Per month"
          Secondfield="In hand Salary (per month)"
          thirdfield="Monthly Payment Type"
          forthfield="Monthly Payment Amount"
        />
        <IncludeSalary
          SalaryTagType=" Add Quaterly Payment"
          firstfield="CTC Per month"
          Secondfield="In hand Salary (per month)"
        />{" "}
        <IncludeSalary
          SalaryTagType=" Add Annual Payment"
          firstfield="CTC Per month"
          Secondfield="In hand Salary (per month)"
        />{" "}
        <IncludeSalary
          SalaryTagType=" Add Long Term Benefits"
          firstfield="CTC Per month"
          Secondfield="In hand Salary (per month)"
        />
      </div>
    </>
  );
}

export default SalaryDetail;
