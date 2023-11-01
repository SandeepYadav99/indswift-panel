import React, { useEffect } from "react";
import styles from "./EmpInfo.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { actionGetEmployeeDetails } from "../../../../actions/Employee.action";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase } from "@material-ui/core";
import historyUtils from "../../../../libs/history.utils";
import SuccessionDetailInfor from "./SuccessionDetails";
const EmployeeInformation = ({ empId }) => {
  console.log(empId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (empId) {
      // dispatch(actionGetEmployeeDetails(empId));
    }
  }, [empId]);

  const { employeeData } = useSelector((state) => state.employee);

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Background Verification Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>
              Candidate Information - <span>{employeeData?.code}</span>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {employeeData?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                {employeeData?.verificationText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {employeeData?.location?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>D.O.B:</span>
                {employeeData?.designation?.name}{" "}
                {employeeData?.designation_note && (
                  <>({employeeData?.designation_note})</>
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Age:</span>
                {employeeData?.location?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Nature of Association:</span>
                {employeeData?.location?.name}
              </div>
            </div>

            <div className={styles.vertical}></div>
            <div className={styles.right}>
              {/* <div className={styles.key}>
                <span className={styles.value}>PRC:</span>
                {employeeData?.code}
              </div> */}
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {/* {valencyChange(employeeData?.vacancy_type)} */}
                {employeeData?.designation?.name
                  ? employeeData?.designation?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade/Level:</span>
                {employeeData?.department?.name
                  ? employeeData?.department?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {employeeData?.replacing_person?.name
                  ? employeeData?.replacing_person?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Date of Retirement:</span>
                {employeeData?.doj ? `${employeeData?.doj}` : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>D.O.J:</span>
                {employeeData?.doj ? `${employeeData?.doj}` : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Annual Salary:</span>
                {employeeData?.doj ? `${employeeData?.doj}` : "NA"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Succession Details Information */}
      <SuccessionDetailInfor/>
    </div>
  );
};

export default EmployeeInformation;
