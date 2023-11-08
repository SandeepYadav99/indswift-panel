import React from "react";
import styles from "./EmpInfo.module.css";
import { ButtonBase } from "@material-ui/core";
import ApprovalPopup from "../component/ApprovalPopup/ApprovalPopup";
import RejectionPopup from "../component/RejectionPopup/RejectionPopup";

const SuccessionDetailInfor = ({ employeeData , jobId, ids, toggleIsOpenDialog, isOpenDialog,  toggleIsOpenRejectionDialog,
  isOpenRejectionDialog}) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>
              Succession Details <span>{employeeData?.code}</span>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Succession:</span>
                {employeeData?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Person Details</span>
                {employeeData?.verificationText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {employeeData?.location?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                {employeeData?.designation?.name}{" "}
                {employeeData?.designation_note && (
                  <>({employeeData?.designation_note})</>
                )}
              </div>
            </div>

            <div className={styles.vertical}></div>
            <div className={styles.right}>
              {/* <div className={styles.key}>
                <span className={styles.value}>PRC:</span>
                {employeeData?.code}
              </div> */}
              <div className={styles.key}>
                <span className={styles.value}>Nature of Succession:</span>
                {/* {valencyChange(employeeData?.vacancy_type)} */}
                {employeeData?.designation?.name
                  ? employeeData?.designation?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Salary:</span>
                {employeeData?.department?.name
                  ? employeeData?.department?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>
                  Succession's Cost WRT employee:
                </span>
                {employeeData?.replacing_person?.name
                  ? employeeData?.replacing_person?.name
                  : "NA"}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.hrline} />
        <div>
          <div className={styles.key}>
            <span className={styles.value_submission}>Date of Submission:</span>
            {employeeData?.name}
          </div>
          <div className={styles.key}>
            <span className={styles.value_submission}>Reason:</span>
            {employeeData?.verificationText}
          </div>
          <div className={styles.hyperlinkText}>View Fitness Certificate</div>
        </div>
      </div>
      {/* Comments/Notes  */}
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>
              Comments/Notes <span>{employeeData?.code}</span>
            </div>
          </div>
          <div>
            <div className={styles.key}>
              <span className={styles.value_submission}>APPROVED</span>
              <br />
            </div>
            <div className={styles.key}>
              <span className={styles.value_submission}>
                Pranav Bhasin | 21/02/2023
              </span>
              {employeeData?.verificationText}
            </div>
          </div>
        </div>
      </div>
      {/* Approval Pop  */}
      <ApprovalPopup
     
        // candidateId={ids}
        isOpen={isOpenDialog}
        handleToggle={toggleIsOpenDialog}
      />
      <RejectionPopup 
       isOpen={isOpenRejectionDialog}
        handleToggle={toggleIsOpenRejectionDialog}/>
      {/* Footer Button  */}

      <div className={styles.plainPaper_footer}>
        <div className={styles.newContainer}>
          <div>
            <div className={styles.rightFlex}>
              <ButtonBase
                className={styles.edit}
                onClick={() => {
                  // handleViewGraph();
                  toggleIsOpenRejectionDialog()
                }}
              >
                REJECT
              </ButtonBase>
              <ButtonBase
                className={styles.approve}
                onClick={() => {
                  toggleIsOpenDialog();
                }}
              >
                APPROVE
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessionDetailInfor;
