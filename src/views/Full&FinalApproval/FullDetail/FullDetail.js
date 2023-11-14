import React from "react";
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
  } = useFullDetail({});
  return (
    <div>
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
      {/* {employeeDetail?.panelist_status === "PENDING" && ( */}
        <div
          className={
            employeeDetail?.status === "APPROVED"
              ? styles.approvedWrapper
              : styles.PdfBtnWrapper
          }
        >
          {/* {employeeDetail?.status !== "APPROVED" &&
            employeeDetail?.status !== "ACCOUNTS_APPROVED" && ( */}
              <div className={styles.editBtn2}>
                <ButtonBase
                  className={styles.edit}
                  onClick={toggleRejectDialog}
                >
                  REJECT
                </ButtonBase>
              </div>
            {/* )} */}

          <div className={styles.btnApproveWrapper}>
            <div>
              <ButtonBase
                // disabled={isSubmitting}
                className={styles.createBtn}
                onClick={toggleStatusDialog}
              >
                {employeeDetail?.status !== "APPROVED" &&
                employeeDetail?.status !== "ACCOUNTS_APPROVED"
                  ? "APPROVE"
                  : "PROCESS"}
              </ButtonBase>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default FullDetail;
