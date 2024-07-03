import React, { useEffect } from "react";
import styles from "./CandidateInfor.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actionGetEmployeeDetails } from "../../../../actions/Employee.action";
import { useLocation } from "react-router";
const CandidateInfor = ({ empId }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const offerDate =
    queryParams.get("offerDate") !== "Invalid date"
      ? queryParams.get("offerDate")
      : "N/A";
  const offerAcceptedDate =
    queryParams.get("offerAcceptedDate") !== "Invalid date"
      ? queryParams.get("offerAcceptedDate")
      : "N/A";

  useEffect(() => {
    if (empId) {
      dispatch(actionGetEmployeeDetails(empId, { check_location: false }));
    }
  }, [empId]);

  const { employeeData } = useSelector((state) => state.employee);

  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>
            Candidate Information - <span>{employeeData?.code}</span>
          </div>
        </div>

        <div className={styles.mainFlex}>
          <div>
            <img src={employeeData?.image} alt=""  className={styles.imageHeightValue}/>
          </div>
          <div className={styles.candidateContainer}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Name:</span>
              {employeeData?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Month:</span>
              {employeeData?.verificationText}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Location:</span>
              {employeeData?.location?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Offer Accepted:</span>
              {offerAcceptedDate || "N/A"}{" "}
            </div>
          </div>

          <div className={styles.vertical}></div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>

              {employeeData?.designation?.name
                ? employeeData?.designation?.name
                : "NA"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              {employeeData?.department?.name
                ? employeeData?.department?.name
                : "NA"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Offer Date:</span>
              {offerDate ? offerDate : "NA"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>DOJ:</span>
              {employeeData?.doj ? `${employeeData?.doj}` : "NA"}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfor;
