import React, { useEffect } from "react";
import styles from "./EmpInfo.module.css";

import { useSelector } from "react-redux";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase } from "@material-ui/core";
import historyUtils from "../../../../libs/history.utils";
import SuccessionDetailInfor from "./SuccessionDetails";
import useEmpInformation from "./EmpInformationHook";
const EmployeeInformation = ({ empId }) => {
  const {
    toggleIsOpenDialog,
    employeeDetail,
    isOpenDialog,
    toggleIsOpenRejectionDialog,
    isOpenRejectionDialog,
  } = useEmpInformation();
  console.log(employeeDetail);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Succession Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Employee Information</div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {employeeDetail?.application?.employee?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                {employeeDetail?.application?.employee?.emp_code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {employeeDetail?.application?.employee?.location?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>D.O.B:</span>
                {employeeDetail?.application?.employee?.dob}{" "}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Age:</span>
                {employeeDetail?.application?.employee?.age}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Nature of Association:</span>-
                {/* {employeeDetail?.application?.employee?.location?.name} */}
              </div>
            </div>

            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {employeeDetail?.application?.employee?.designation?.name
                  ? employeeDetail?.application?.employee?.designation?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade/Level:</span>
                {employeeDetail?.application?.employee?.grade?.name}/
                {employeeDetail?.application?.employee?.cadre?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {employeeDetail?.application?.employee?.department?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Date of Retirement:</span>
                {employeeDetail?.application?.employee?.expected_dor_text
                  ? `${employeeDetail?.application?.employee?.expected_dor_text}`
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>D.O.J:</span>
                {employeeDetail?.application?.employee?.doj
                  ? `${employeeDetail?.application?.employee?.doj}`
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Annual Salary:</span>
                {employeeDetail?.application?.ctc
                  ? `₹ ${employeeDetail?.application?.ctc}`
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Succession Details Information */}
      <SuccessionDetailInfor
        isOpenDialog={isOpenDialog}
        toggleIsOpenDialog={toggleIsOpenDialog}
        isOpenRejectionDialog={isOpenRejectionDialog}
        toggleIsOpenRejectionDialog={toggleIsOpenRejectionDialog}
      />
    </div>
  );
};

export default EmployeeInformation;
