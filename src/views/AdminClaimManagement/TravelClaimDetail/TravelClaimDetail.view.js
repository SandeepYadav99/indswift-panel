import { ButtonBase } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import UpperClaimInfo from "../ClaimListDetail/Component/UpperClaimInfo/UpperClaimInfo";
import StatusPill from "../../../components/Status/StatusPill.component";
import { getCurrency, removeUnderScore } from "../../../helper/helper";
import ApproveDialog from "../ClaimListDetail/Component/ApprovePopUp/ApproveDialog.view";
import ChangeDialog from "../ClaimListDetail/Component/ChangePopUp/ChangeDialog.view";
import RejectDialog from "../ClaimListDetail/Component/RejectPopUp/RejectDialog.view";
import useTravelClaimListDetail from "./TravelClaimDetail.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

function TravelClaimListDetail() {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
    toggleRejectDialog,
    rejectDialog,
  } = useTravelClaimListDetail({});
  console.log("employeeDetail", employeeDetail?.travel_expenses);
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

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>TAP No. :</span>
                    {employeeDetail?.type}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Type:</span>
                    {employeeDetail?.from}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Dates:</span>
                    {employeeDetail?.travelDateText}
                  </div>

                  <div className={styles.key}>
                    <span className={styles.value}>Status:</span>
                    {employeeDetail?.to}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part A: Lodging Expense</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.lodging_expenses &&
              employeeDetail?.lodging_expenses.map((item, index) => (
                <div className={styles.otherWrap}>
                  <div className={styles.mainFlex}>
                    <div className={styles.left}>
                      <div className={styles.key}>
                        <span className={styles.value}>Check In Date:</span>
                        {item?.checkInDateText}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Booking By :</span>
                        {item?.booking_by}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>City:</span>
                        {item?.city}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Hotel Name :</span>
                        {item?.hotel}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>No. of Nights:</span>
                        {item?.total_nights}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Total Max Entitlement:
                        </span>
                        {item?.max_entitlement}
                      </div>
                      {item?.payment_proof && (
                        <div className={styles.key}>
                          <a href={item?.payment_proof} target="_blank">
                            <div className={styles.hyperlinkText}>
                              View Proof of Payment
                            </div>
                          </a>
                        </div>
                      )}
                      <div className={styles.key}>
                        <span className={styles.value}>
                          {" "}
                          <CustomTextField
                            // isError={errorData?.venue}
                            // errorText={errorData?.venue}
                            label={"Expense Amount"}
                            // value={form?.name}
                            // onTextChange={(text) => {
                            //     changeTextData(text, "venue");
                            // }}
                            // onBlur={() => {
                            //     onBlurHandler("venue");
                            // }}
                          />
                        </span>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.key}>
                        <span className={styles.value}>Check Out Date:</span>
                        {item?.checkOutDateText}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>City Cluster:</span>
                        {item?.city_cluster}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Stay at:</span>
                        {item?.stay_at}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Shared with:</span>
                        {item?.travelDateText}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Per Day Entitlement:
                        </span>
                        {item?.per_day_entitlement}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Payment Made By:</span>
                        {item?.payment_by}
                      </div>

                      {item?.voucher && (
                        <div className={styles.key}>
                          <a href={item?.voucher} target="_blank">
                            <div className={styles.hyperlinkText}>
                              View Voucher/Bill
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  {employeeDetail?.lodging_expenses?.length !== index + 1 && (
                    <div className={styles.verti}></div>
                  )}
                </div>
              ))}
          </div>
          <div className={styles.totalWrap}>
            <div className={styles.inner}>
              Total Claim Amount:
              <span>
                {employeeDetail?.lodging_expenses_amount
                  ? `₹ ${employeeDetail?.lodging_expenses_amount}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part B: Travel Expense</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.travel_expenses &&
              employeeDetail?.travel_expenses.map((item, index) => (
                <div className={styles.otherWrap}>
                  <div className={styles.mainFlex}>
                    <div className={styles.left}>
                      <div className={styles.key}>
                        <span className={styles.value}>Travel Date:</span>
                        {item?.travelDateText}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Travel From :</span>
                        {item?.from}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Payment Made By:</span>
                        {item?.payment_by}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Travel Mode :</span>
                        {item?.mode}
                      </div>
                      {item?.voucher && (
                        <div className={styles.key}>
                          <a href={item?.voucher} target="_blank">
                            <div className={styles.hyperlinkText}>
                              View Voucher/Bill
                            </div>
                          </a>
                        </div>
                      )}
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Details of Travel Medium:
                        </span>
                        {item?.details}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          {" "}
                          <CustomTextField
                            // isError={errorData?.venue}
                            // errorText={errorData?.venue}
                            label={"Expense Amount"}
                            // value={form?.name}
                            // onTextChange={(text) => {
                            //     changeTextData(text, "venue");
                            // }}
                            // onBlur={() => {
                            //     onBlurHandler("venue");
                            // }}
                          />
                        </span>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.key}>
                        <span className={styles.value}>Booking By:</span>
                        {item?.booking_by}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Travel To:</span>
                        {item?.to}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>No of KMs:</span>
                        {item?.total_kms}
                      </div>

                      {item?.payment_proof && (
                        <div className={styles.key}>
                          <a href={item?.payment_proof} target="_blank">
                            <div className={styles.hyperlinkText}>
                              View Proof of Payment
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  {employeeDetail?.travel_expenses?.length !== index + 1 && (
                    <div className={styles.verti}></div>
                  )}
                </div>
              ))}
          </div>
          <div className={styles.totalWrap}>
            <div className={styles.inner}>
              Total Claim Amount:
              <span>
                {employeeDetail?.travel_expenses?.amount
                  ? `₹ ${employeeDetail?.travel_expenses?.amount}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

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
      {/* {employeeDetail?.panelist_status === "PENDING" && (
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
      )} */}
    </div>
  );
}

export default TravelClaimListDetail;
