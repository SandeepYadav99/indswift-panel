import { ButtonBase } from "@material-ui/core";
import React, { useMemo } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import UpperClaimInfo from "./Component/UpperClaimInfo/UpperClaimInfo";
import ClaimDetailInfo from "./Component/ClaimDetailInfo/ClaimDetailInfo";
import useClaimListDetail from "./ClaimListDetail.hook";
import ApproveDialog from "./Component/ApprovePopUp/ApproveDialog.view";
import ChangeDialog from "./Component/ChangePopUp/ChangeDialog.view";
import RejectDialog from "./Component/RejectPopUp/RejectDialog.view";
import StatusPill from "../../../components/Status/StatusPill.component";
import { removeUnderScore } from "../../../helper/helper";
function ClaimListDetail({location}) {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
    toggleRejectDialog,
    rejectDialog,
  } = useClaimListDetail({});

  const isClonePage = useMemo(()=>{
    return location?.state?.isClone ? true : false
  },[location])

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
          claimAmount={employeeDetail?.claim_amount}
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
      <UpperClaimInfo data={employeeDetail} isLoc={true} />
      <ClaimDetailInfo idCards={employeeDetail} isLoc={true} />

      {employeeDetail?.claimTypeText === "Local_travel" && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Travel Details</div>
            <div className={styles.commentContainer}>
              {employeeDetail?.travel_details &&
                employeeDetail?.travel_details?.map((item, index) => (
                  <div className={styles.otherWrap}>
                    <div className={styles.mainFlex}>
                      <div className={styles.left}>
                        <div className={styles.key}>
                          <span className={styles.value}>Travel Type:</span>
                          {item?.type}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Travel From:</span>
                          {item?.from}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Travel Mode:</span>
                          {item?.mode}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Amount:</span>
                          {item?.amount && `₹ ${item?.amount}`}
                        </div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.key}>
                          <span className={styles.value}>Travel Date:</span>
                          {item?.travelDateText}
                        </div>

                        <div className={styles.key}>
                          <span className={styles.value}>Travel To:</span>
                          {item?.to}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Total Km:</span>
                          {item?.total_kms && `${item?.total_kms} Km`}
                        </div>
                        {item?.payment_proof && (
                          <div className={styles.key}>
                            <a href={item?.payment_proof} target="_blank">
                              <div className={styles.hyperlinkText}>
                                View Payment Proof
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {employeeDetail?.travel_details?.length !== index + 1 && (
                      <div className={styles.verti}></div>
                    )}
                  </div>
                ))}
            </div>
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                {" "}
                Total Claim Amount:
                <span>
                  {employeeDetail?.travel_details_amount
                    ? `₹ ${employeeDetail?.travel_details_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeDetail?.claimTypeText === "Relocation" && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Expense Details</div>
            <div className={styles.commentContainer}>
              {employeeDetail?.relocation_expense_details &&
                employeeDetail?.relocation_expense_details?.map(
                  (item, index) => (
                    <div className={styles.otherWrap}>
                      <div className={styles.mainFlex}>
                        <div className={styles.left}>
                          <div className={styles.key}>
                            <span className={styles.value}>Bill Date:</span>
                            {item?.billDateText}
                          </div>
                          <div className={styles.key}>
                            <span className={styles.value}>Amount:</span>
                            {item?.amount && `₹ ${item?.amount}`}
                          </div>
                          <div className={styles.key}>
                            <span className={styles.value}>Payment Mode:</span>
                            {item?.payment_mode ? item?.payment_mode : "-"}
                          </div>
                          {item?.document && (
                            <div className={styles.key}>
                              <a href={item?.document} target="_blank">
                                <div className={styles.hyperlinkText}>
                                  View Attachment
                                </div>
                              </a>
                            </div>
                          )}
                        </div>
                        <div className={styles.right}>
                          <div className={styles.key}>
                            <span className={styles.value}>Bill No.:</span>
                            {item?.bill_no}
                          </div>

                          <div className={styles.key}>
                            <span className={styles.value}>Description:</span>
                            {item?.details}
                          </div>
                          {item?.payment_proof && (
                            <div className={styles.key}>
                              <a href={item?.payment_proof} target="_blank">
                                <div className={styles.hyperlinkText}>
                                  View Payment Proof
                                </div>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      {employeeDetail?.relocation_expense_details?.length !==
                        index + 1 && <div className={styles.verti}></div>}
                    </div>
                  )
                )}
            </div>
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                {" "}
                Total Claim Amount:
                <span>
                  {employeeDetail?.bill_amount
                    ? `₹ ${employeeDetail?.bill_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeDetail?.claimTypeText === "Local_travel" && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Other Expenses Details</div>
            <div className={styles.commentContainer}>
              {employeeDetail?.other_expenses &&
                employeeDetail?.other_expenses.map((item, index) => (
                  <div className={styles.otherWrap}>
                    <div className={styles.mainFlex}>
                      <div className={styles.left}>
                        <div className={styles.key}>
                          <span className={styles.value}>
                            Nature of Expense:
                          </span>
                          {item?.type}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Amount :</span>
                          {item?.amount && `₹ ${item?.amount}`}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Details:</span>
                          {item?.details}
                        </div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.key}>
                          <span className={styles.value}>Travel Date:</span>
                          {item?.travelDateText}
                        </div>
                        {item?.slip && (
                          <div className={styles.key}>
                            <a href={item?.slip} target="_blank">
                              <div className={styles.hyperlinkText}>
                                View Slip
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {employeeDetail?.other_expenses?.length !== index + 1 && (
                      <div className={styles.verti}></div>
                    )}
                  </div>
                ))}
            </div>
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                Total Claim Amount:
                <span>
                  {employeeDetail?.other_expenses_amount
                    ? `₹ ${employeeDetail?.other_expenses_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Comments/Notes</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.comments &&
              employeeDetail?.comments?.map((item) => (
                <div className={styles.commentwrap}>
                  {(item?.status || item?.panelist_role) && (
                    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                      <span style={{ fontWeight: "600" }}>
                        {removeUnderScore(item?.panelist_role)}
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        {
                          <StatusPill
                            status={item?.status}
                            style={{ border: "none" }}
                          />
                        }
                      </span>
                    </div>
                  )}
                  {item?.status !== "WAITING" && item?.status !== "PENDING" && (
                    <>
                      <div>{item?.comment}</div>
                      <div className={styles.commentDate}>
                        {`${item?.employee?.name} (${item?.employee?.code}) | ${item?.updatedAtText}`}
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      {!isClonePage && employeeDetail?.panelist_status === "PENDING" && (
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
                <ButtonBase
                  className={styles.edit}
                  onClick={toggleRejectDialog}
                >
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
      )}
    </div>
  );
}

export default ClaimListDetail;
