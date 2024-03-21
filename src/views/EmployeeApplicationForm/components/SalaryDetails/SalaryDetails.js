import React, {forwardRef} from "react";
import styles from "../../Style.module.css";
import IncludeSalary from "./IncludeSalary";
import MonthlySalary from "../MonthlySalary/MonthlySalary";
import useSalaryDetails from "./SalaryDetailsHook";

function SalaryDetail({isDisabled,isFresher}, ref) {
  const { refBenefits, refAnnual, refQuarterly, refMonthly} = useSalaryDetails({}, ref);
  return (
    <>
      <div className={styles.QualificationHeader}>
        <h4 className={"infoTitle1"}>
          <div className={"heading1"}>Current CTC Details</div>
        </h4>
        {/* <br /> */}
        <MonthlySalary ref={refMonthly} isDisabled={isDisabled} isFresher={isFresher}/>
        <IncludeSalary
          isDisabled={isDisabled}
          ref={refQuarterly}
          salaryTagType=" Add Quaterly Payment"
          firstfield="Quaterly payment type"
          secondfield="Quarterly Payment Amount"
        />{" "}
        <IncludeSalary
          isDisabled={isDisabled}
          ref={refAnnual}
          salaryTagType=" Add Annual Payment"
          firstfield="Annual payment type"
          secondfield="Annual Payment Amount"
        />{" "}
        <IncludeSalary
          isDisabled={isDisabled}
          ref={refBenefits}
          salaryTagType=" Add Long Term Benefits"
          firstfield="Long term benefit type"
          secondfield="Long Term Benefits Amount"
        />
      </div>
    </>
  );
}

export default forwardRef(SalaryDetail);
