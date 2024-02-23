import React, { useEffect, useRef } from "react";
import useFullDetail from "./FullDetail.hook";
import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import PayData from "../../Full&Final/FinalDetail/compoent/PayData/PayData";
import FinalUpperCard from "../../Full&Final/FinalForm/component/FinalUpperCard/FinalUpperCard";
import FinalSalaryTable from "../../Full&Final/FinalForm/component/SalaryTable/FinalSalaryTable";
import ApproveDialog from "./component/ApprovePopUp/ApproveDialog.view";
import RejectDialog from "./component/RejectPopUp/RejectDialog.view";

function FullDetail() {
  const {
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    id,
    EditForm,
  } = useFullDetail({});


  return (
    <div className="fullDetailWrapper" id="content-to-print">
      <div className={styles.outerFlex}>
        <ApproveDialog
          candidateId={id}
          isOpen={approveDialog}
          handleToggle={toggleStatusDialog}
        />
        <RejectDialog
          candidateId={id}
          isOpen={rejectDialog}
          handleToggle={toggleRejectDialog}
        />
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Full & Final Settlement Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <FinalUpperCard
          data={employeeDetail?.employee}
          otherData={employeeDetail?.fullAndFinal}
        />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 1 : CTC of Employee</div>
        <FinalSalaryTable data={employeeDetail?.salary} />
      </div>
      <PayData employeeDetail={employeeDetail?.fullAndFinal} />

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Comments/Notes</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.comments &&
              employeeDetail?.comments?.map((item) => (
                <div className={styles.commentwrap}>
                  <div>{item.comment}</div>
                  <div className={styles.commentDate}>
                    {`${item?.employee?.name} | ${item?.updatedAtText}`}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {employeeDetail?.status === "PENDING" && (
        <div className={styles.LowerApp}>
        <div
          className={
            employeeDetail?.status === "APPROVED"
              ? styles.approvedWrapper
              : styles.PdfBtnWrapper
          }
        >
          <div className={styles.editBtn2}>
            <ButtonBase className={styles.edit} onClick={toggleRejectDialog}>
              REJECT
            </ButtonBase>
          </div>

          <div className={styles.btnApproveWrapper}>
            {(employeeDetail?.fullAndFinal?.status === "PENDING" ||
              employeeDetail?.fullAndFinal?.status ===
                "CORPORATE_AUDIT_2_APPROVED") && (
              <div className= {styles.approvWrapp}>
                <ButtonBase className={styles.editChange} onClick={EditForm}>
                  CHANGE AND APPROVE
                </ButtonBase>
              </div>
            )}
            <div>
              <ButtonBase
                // disabled={isSubmitting}
                className={styles.createBtn}
                onClick={toggleStatusDialog}
              >
                APPROVE
              </ButtonBase>
            </div>
          </div>
        </div>
        <div className={styles.mobApprove}>
        {(employeeDetail?.fullAndFinal?.status === "PENDING" ||
              employeeDetail?.fullAndFinal?.status ===
                "CORPORATE_AUDIT_2_APPROVED") && (
              <div className= {styles.innerApprove}>
                <ButtonBase className={styles.editChangeApp} onClick={EditForm}>
                  CHANGE AND APPROVE
                </ButtonBase>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FullDetail;
