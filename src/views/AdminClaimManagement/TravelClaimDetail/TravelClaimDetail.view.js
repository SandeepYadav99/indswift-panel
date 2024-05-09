import { ButtonBase } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import UpperClaimInfo from "../ClaimListDetail/Component/UpperClaimInfo/UpperClaimInfo";
import { getCurrency, removeUnderScore } from "../../../helper/helper";
import RejectDialog from "../ClaimListDetail/Component/RejectPopUp/RejectDialog.view";
import useTravelClaimListDetail from "./TravelClaimDetail.hook";
import LodgingincludesDetailForm from "./component/LodgingincludesDetail/LodgingincludesDetail.component";
import TravelincludesDetailForm from "./component/TravelincludesDetail/TravelincludesDetail.component";
import DAincludesDetailForm from "./component/DAincludesDetail/DAincludesDetail.component";
import EnterincludesDetailForm from "./component/EnterincludesDetail/EnterincludesDetail.component";
import OtherincludesDetailForm from "./component/OtherincludesDetail/OtherincludesDetail.component";
import ApproveDialog from "./component/ApproveDialog/ApproveDialog.view";
import StatusPill from "../../../components/Status/StatusPill.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { useMemo } from "react";

function TravelClaimListDetail({location}) {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    toggleRejectDialog,
    rejectDialog,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    editData,
    lodgeRef,
    travelRef,
    daRef,
    enterRef,
    otherRef,
    changeAmount,
    getTotalValue,
    setOfficeAmount,
    officeAmount,
    setOfficeAmount2,
    officeAmount2,
    getRefundAmount,
    imprestAmount,
    refundData,
    setRefundData,
    getOfficeAmount,
    officeAmount3,
    setOfficeAmount3,
    setOfficeAmount4,
  } = useTravelClaimListDetail({});
  
  const isClonePage = useMemo(()=>{
    return location?.state?.isClone ? true : false
  },[location])

  const statusCheck=useMemo(()=>{
    if(employeeDetail){
      return employeeDetail?.panelist_status === "PENDING"
    }
  },[employeeDetail])

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <ApproveDialog
          candidateId={id}
          isOpen={approveDialog}
          handleToggle={toggleStatusDialog}
          form={form}
          changeTextData={changeTextData}
          onBlurHandler={onBlurHandler}
          handleSubmit={handleSubmit}
          errorData={errorData}
          isSubmitting={isSubmitting}
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
                    {employeeDetail?.travelPlanner?.code}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Type:</span>
                    {employeeDetail?.travelPlanner?.tour_type}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Dates:</span>
                    {employeeDetail?.travelPlanner?.startDateText} -{" "}
                    {employeeDetail?.travelPlanner?.endDateText}
                  </div>

                  <div className={styles.key}>
                    <span className={styles.value}>Status:</span>
                    {
                      <StatusPill
                        status={employeeDetail?.travelPlanner?.status}
                        style={{ border: "none" }}
                      />
                    }
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
          <LodgingincludesDetailForm
            ref={lodgeRef}
            changeAmount={changeAmount}
            setOfficeAmount={setOfficeAmount}
            statusCheck={statusCheck}
          />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part B: Travel Expense</div>
          <TravelincludesDetailForm
            ref={travelRef}
            changeAmount={changeAmount}
            setOfficeAmount2={setOfficeAmount2}
            statusCheck={statusCheck}
          />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part C: DA & IE Expenses</div>
          <DAincludesDetailForm ref={daRef} changeAmount={changeAmount} 
            statusCheck={statusCheck}
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part D: Entertainment Expenses</div>
          <EnterincludesDetailForm
            ref={enterRef}
            changeAmount={changeAmount}
            setOfficeAmount3={setOfficeAmount3}
            statusCheck={statusCheck}
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part E: Other Expenses</div>
          <OtherincludesDetailForm
            ref={otherRef}
            changeAmount={changeAmount}
            setOfficeAmount4={setOfficeAmount4}
            statusCheck={statusCheck}
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Imprest Details</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Imprest for tour:</span>
                    {employeeDetail?.imprest?.code
                      ? employeeDetail?.imprest?.code
                      : "N/A"}
                  </div>
                  {/* <div className={styles.key}>
                    <span className={styles.value}>Claim Amount :</span>
                    {employeeDetail?.travelPlanner?.imprest?.amount ? (
                      <>
                        {getCurrency(
                          employeeDetail?.travelPlanner?.imprest?.currency
                        )}
                        {employeeDetail?.travelPlanner?.imprest?.amount}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div> */}
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Imprest Amount:</span>
                    {imprestAmount ? (
                      <>
                        {getCurrency(employeeDetail?.imprest?.currency)}
                        {imprestAmount}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </div>
              {/* <div className={styles.totalWrap}>
                <div className={styles.inner}>
                  Amount to be Refunded:{" "}
                  <span>
                    {getCurrency(
                      employeeDetail?.travelPlanner?.imprest?.currency
                    )}
                    {isNaN(
                      employeeDetail?.travelPlanner?.imprest?.amount -
                        employeeDetail?.travelPlanner?.imprest
                          ?.sanctionable_amount
                    )
                      ? 0
                      : employeeDetail?.travelPlanner?.imprest?.amount -
                        employeeDetail?.travelPlanner?.imprest
                          ?.sanctionable_amount}
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.heading}>Reimbursable Expense</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Total Expense (self + office):
            <span>{getTotalValue ? ` ₹ ${getTotalValue}` : 0}</span>
          </div>
          <div className={styles.headingWrap}>
            Self Borne Expense :
            <span>₹ {Number(getTotalValue) - Number(getOfficeAmount)}</span>
          </div>
          <div className={styles.headingWrap}>
            Office Borne Expense:
            <span>₹ {Number(getOfficeAmount)}</span>
          </div>
        </div>
        <div className={styles.totalWrap} style={{ marginTop: "20px" }}>
          <div className={styles.inner}>
            Amount to be Refunded:{" "}
            <span>{getRefundAmount ? `₹ ${getRefundAmount}` : 0}</span>
          </div>
          <div className={styles.inner32}>
            <CustomTextField
             disabled={!statusCheck}
              type="number"
              label={"Final Amount"}
              value={refundData}
              onTextChange={(text) => {
                setRefundData(text);
              }}
            />
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
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>
            Travel Planner Closing Remarks of Employee
          </div>
          <div className={styles.det}>
            {employeeDetail?.copassengerStatus?.achievement}
          </div>
        </div>
      </div>
      { !isClonePage && employeeDetail?.panelist_status === "PENDING" && (
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
      )}
    </div>
  );
}

export default TravelClaimListDetail;
