import React, {forwardRef} from "react";
import styles from "../../Style.module.css";
import IncludeSalary from "./IncludeSalary";
import MonthlySalary from "../MonthlySalary/MonthlySalary";
import useSalaryDetails from "./SalaryDetailsHook";

function SalaryDetail({}, ref) {
  const { refBenefits, refAnnual, refQuarterly, refMonthly} = useSalaryDetails({}, ref);
  return (
    <>
      <div className={styles.QualificationHeader}>
        <h4 className={"infoTitle1"}>
          <div className={"heading1"}>Current CTC Details</div>
        </h4>
        {/* <br /> */}
        <MonthlySalary ref={refMonthly} />
        <IncludeSalary
            ref={refQuarterly}
          salaryTagType=" Add Quaterly Payment"
          firstfield="CTC Per month"
          secondfield="Quarterly Payment Amount"
        />{" "}
        <IncludeSalary
            ref={refAnnual}
          salaryTagType=" Add Annual Payment"
          firstfield="CTC Per month"
          secondfield="Annual Payment Amount"
        />{" "}
        <IncludeSalary
            ref={refBenefits}
          salaryTagType=" Add Long Term Benefits"
          firstfield="CTC Per month"
          secondfield="Long Term Benefits Amount"
        />
      </div>
    </>
  );
}

export default forwardRef(SalaryDetail);
