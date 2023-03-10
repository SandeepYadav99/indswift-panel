import { ButtonBase, Checkbox, MenuItem } from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import React, { useCallback, useState } from "react";
import { useRef } from "react";
import CustomToggle from "../../../components/FormFields/CustomToggle";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { isNum } from "../../../libs/RegexUtils";
import EmployeeIncludeForm from "../components/EmployementHistory/EmployeeIncludes.component";
import SalaryDetail from "../components/SalaryDetails/SalaryDetails";
import useEmployeeFormDetail from "./EmployementHistoryHook";
import styles from "../Style.module.css";
import AdditionalForm from "../components/AdditionalForm/AdditionalForm";
import useEmploymentHistory from "./EmployementHistoryHook";

function EmploymentHistory({ isDisabled}) {
  const {isSubmitting, isFresher, setIsFresher, handleSubmit, refAdditional, refEmpHistory, refSalary, isTermChecked, setIsTermChecked} = useEmploymentHistory({});
  const classes = useStyles();

  return (
    <div className={styles.employeeLoginWrapper}>
      <div className={styles.employeeLoginContainer}>
        {
          !isDisabled && <><div className={styles.logoImg}>
          <img
            src={require("../../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>
            Employment Application Form
          </h1>
          <div className={styles.newLine} />
        </div>
          </>
        }
        
        <div className={styles.signContainer}>
          <div className={"plainPaper"}>
            <div className={"headerFlex"}>
              <h4 className={"infoTitle"}>
                <div className={"heading"}>
                  Employment History
                  <span>(Please start from most recent employer)</span>
                </div>
              </h4>
              <div style={{ width: "250px" }}>
                <CustomToggle
                  value={!isFresher}
                  handleChange={() => {
                    setIsFresher(e => !e);
                  }}
                  leftLabel={"Fresher"}
                  rightLabel={"Experienced"}
                />
              </div>
            </div>
            <div style={{ display: isFresher ? 'none' : 'block' }}>
              <EmployeeIncludeForm ref={refEmpHistory} isDisabled={isDisabled}/>
            </div>
          </div>
        </div>
        <div className={styles.signContainer}>
          <SalaryDetail isDisabled={isDisabled} ref={refSalary} />
        </div>
        <AdditionalForm ref={refAdditional} isDisabled={isDisabled}/>
        {
          !isDisabled && <div className={styles.signContainer}>
          <div className={styles.discriptionWrap}>
            <div style={{ gap: "5px" }}>
              <Checkbox
                style={{ padding: 0, marginRight: "10px" }}
                name={"is_mandatory"}
                 checked={isTermChecked}
                 onChange={(e) => { setIsTermChecked(e => !e)}}
              />
            </div>
            <div>
              <p style={{ padding: 0, margin: 0, fontWeight: "400" ,fontSize:".875rem", lineHeight:"1.4"}}>
                I solemnly declare that all the particulars furnished in this
                form are true and correct to my knowledge and belief. I
                clearly understand that any incorrect statement of facts/willful
                concealment of any material or facts will render me liable to
                termination from the services of the company
              </p>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase className={styles.edit}>PREVIOUS</ButtonBase>
              <ButtonBase
                  disabled={isSubmitting||!isTermChecked}
                type={"button"}
                onClick={handleSubmit}
                className={styles.createBtn}
              >
                SUBMIT
              </ButtonBase>
            </div>
          </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default EmploymentHistory;
