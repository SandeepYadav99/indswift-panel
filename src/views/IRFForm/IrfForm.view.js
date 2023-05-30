import React from "react";
import styles from "./Style.module.css";
import Upper from "./Component/Upper/Upper";
import UseIrfFrom from "./IrfFrom.hook";
import TravelDetailsIncludeForm from "./Component/TravelDetailsincludes/TravelDetailsIncludes.component";
import BankOtherDetailsIncludeForm from "./Component/BankDetailsincludes/BankOtherDetailsIncludes.component";
import { ButtonBase, CircularProgress } from "@material-ui/core";
function IrfForm() {
  const { travelRef, otherRef, handleSubmit, declaration, setDeclaration,data } =
    UseIrfFrom({});
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
          <h1 className={styles.headingText}>Interview Reimbursement Form</h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.signContainer}>
          <Upper data={data} />
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Travel Details</div>
          </div>
          <div>
            <TravelDetailsIncludeForm ref={travelRef} />
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Bank Details</div>
            <div>
              <BankOtherDetailsIncludeForm ref={otherRef} />
            </div>
          </div>
        </div>
        <div className={styles.low}>
          <div className={styles.cleckboxWrapper}>
            <div className={styles.checkBox}>
              <input
                checked={declaration}
                type="checkbox"
                id="confirmation"
                name="confirmation"
                onChange={() => {
                  setDeclaration((s) => !s);
                }}
              />
              <label htmlFor="confirmation">
                {" "}
                I confirm the information submitted by me is correct. If the
                information is found to be forged/incorrect I understand that I
                might not be entitled to the claim
              </label>
              <br />
            </div>
          </div>
          <div className={styles.btnCont}>
            <ButtonBase
              type={"button"}
              disabled={!declaration ? true : false}
              className={declaration ? styles.createBtn : styles.disabledCreatebtn}
              onClick={handleSubmit}
            >
              Submit
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IrfForm;
