import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import InterviewDetailInfo from "./component/InterviewDetailInfo/InterviewDetailInfo";
import UpperIntroInfo from "./component/UpperIntroInfo/UpperIntroInfo";
import useInterviewClaimDetail from "./InterviewClaimDetail.hook";
import ApproveDialog from "../AdminClaimManagement/ClaimListDetail/Component/ApprovePopUp/ApproveDialog.view";
import RejectDialog from "../CVReviewCandidate/component/RejectPopUp/RejectDialog.view";
import ChangeDialog from "../AdminClaimManagement/ClaimListDetail/Component/ChangePopUp/ChangeDialog.view";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../libs/history.utils";
import InterviewBankInfo from "./component/InterviewBankInfo/InterviewBankInfo";

function InterviewClaimDetail() {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
    toggleRejectDialog,
    rejectDialog,
  } = useInterviewClaimDetail({});
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <ApproveDialog
          isInterview={true}
          candidateId={id}
          isOpen={approveDialog}
          handleToggle={toggleStatusDialog}
        />
        <RejectDialog
          isInterview={true}
          candidateId={id}
          isOpen={rejectDialog}
          handleToggle={toggleRejectDialog}
        />
        <ChangeDialog
          isInterview={true}
          claimAmount={employeeDetail?.claim?.claim_amount}
          entitledAmount={employeeDetail?.claim_details?.entitled_amount}
          candidateId={id}
          isOpen={ischangeDialog}
          handleToggle={toggleChangeDialog}
        />
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Claim Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <UpperIntroInfo data={employeeDetail} />
      <InterviewDetailInfo idCards={employeeDetail} />
      <InterviewBankInfo idCards={employeeDetail?.claim?.bank_details}/>
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
      {employeeDetail?.claim?.status === "PENDING" && (
      <div
        className={
        //   employeeDetail?.status === "APPROVED"
        //     ? styles.approvedWrapper
            // :
             styles.PdfBtnWrapper
        }
      >
        {/* {employeeDetail?.status !== "APPROVED" &&
            employeeDetail?.status !== "ACCOUNTS_APPROVED" && ( */}
        <div className={styles.editBtn2}>
          <ButtonBase className={styles.edit} onClick={toggleRejectDialog}>
            REJECT
          </ButtonBase>
        </div>
        {/* )} */}

        <div className={styles.btnApproveWrapper}>
          {/* {employeeDetail?.status !== "APPROVED" &&
              employeeDetail?.status !== "ACCOUNTS_APPROVED" && ( */}
          <div>
            <ButtonBase
              className={styles.editSuccess}
              onClick={toggleChangeDialog}
            >
              CHANGE & APPROVE
            </ButtonBase>
          </div>
          {/* )} */}
          <div>
            <ButtonBase
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
       )} 
    </div>
  );
}

export default InterviewClaimDetail;
