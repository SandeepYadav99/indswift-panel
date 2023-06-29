import { ButtonBase } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import UpperClaimInfo from "./Component/UpperClaimInfo/UpperClaimInfo";
import ClaimDetailInfo from "./Component/ClaimDetailInfo/ClaimDetailInfo";
import useImprestApprovalDetail from "./ImprestApprovalDetail.hook";
import ApproveDialog from "./Component/ApprovePopUp/ApproveDialog.view";
import ChangeDialog from "./Component/ChangePopUp/ChangeDialog.view";
import RejectDialog from "./Component/RejectPopUp/RejectDialog.view";
import TravelTable from "./Component/TravelTable/TravelTable.component";
import OtherTable from "./Component/OtherTable/OtherTable.component";

function ImprestApprovalDetail() {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
    toggleRejectDialog,
    rejectDialog,
    typeData,
  } = useImprestApprovalDetail({});
  return (
    <div className={styles.claimListWrapper}>
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
        <ChangeDialog
          claimAmount={employeeDetail?.imprest?.amount}
          entitledAmount={employeeDetail?.claim_details?.entitled_amount}
          candidateId={id}
          isOpen={ischangeDialog}
          handleToggle={toggleChangeDialog}
        />
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Imprest Request</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <UpperClaimInfo data={employeeDetail} />
      <div className={styles.plainPaper}>
        <div className={styles.newLineWrap}>
          <span>
            <b>Non Travel Imprest Ledger</b>
          </span>
          <div className={styles.newLine2} />
        </div>
        <div className={styles.experseWrap}>
          BALANCE :{` ₹ ${typeData?.other?.INR?.balance} `}
        </div>
        <OtherTable jobId={employeeDetail?.employee?.id} Claimtype="OTHER" />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newLineWrap}>
          <span>
            <b>Travel Imprest Ledger</b>
          </span>
          <div className={styles.newLine2} />
        </div>
        <div className={styles.experseWrap}>
          BALANCE :{` ₹ ${typeData?.travel?.INR?.balance} |`}
          {` $ ${typeData?.travel?.USD?.balance} |`}
          {` € ${typeData?.travel?.EUR?.balance} `}
          {typeData?.expense_budget !== undefined &&
            ` EXPENSES : ${typeData?.expense_budget}`}
        </div>
        <TravelTable jobId={employeeDetail?.employee?.id} Claimtype="TRAVEL" />

      </div>
      <ClaimDetailInfo idCards={employeeDetail} isLoc={true} />
      {employeeDetail?.comments?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Comments/Notes</div>
            <div className={styles.commentContainer}>
              {employeeDetail?.comments?.map((item) => (
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
      )}

      {/* {employeeDetail?.panelist_status === "PENDING" && ( */}
      <div
        className={
          employeeDetail?.status === "APPROVED"
            ? styles.approvedWrapper
            : styles.PdfBtnWrapper
        }
      >
        {employeeDetail?.status !== "APPROVED" &&
          employeeDetail?.status !== "ACCOUNTS_APPROVED" && (
            <div className={styles.editBtn2}>
              <ButtonBase className={styles.edit} onClick={toggleRejectDialog}>
                REJECT
              </ButtonBase>
            </div>
          )}

        <div className={styles.btnApproveWrapper}>
          {employeeDetail?.status !== "APPROVED" &&
            employeeDetail?.status !== "ACCOUNTS_APPROVED" && (
              <div>
                <ButtonBase
                  // disabled={isSubmitting}
                  className={styles.editSuccess}
                  onClick={toggleChangeDialog}
                >
                  CHANGE & APPROVE
                </ButtonBase>
              </div>
            )}
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

export default ImprestApprovalDetail;
