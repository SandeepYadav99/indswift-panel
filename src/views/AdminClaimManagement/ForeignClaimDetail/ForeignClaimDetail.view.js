import React from "react";
import useClaimForDetail from "./ForeignClaimDetail.hook";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./style.module.css";
import UpperClaimInfo from "../ClaimListDetail/Component/UpperClaimInfo/UpperClaimInfo";
import { getCurrency, removeUnderScore } from "../../../helper/helper";
import RejectDialog from "../ClaimListDetail/Component/RejectPopUp/RejectDialog.view";
import StatusPill from "../../../components/Status/StatusPill.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import LodgingIncludeForm from "./component/Lodgingincludes/LodgingIncludes.component";
import ExpenseIncludeForm from "./component/Expenseincludes/ExpenseIncludes.component";
import DAIncludeForm from "./component/DAincludes/DAIncludes.component";
import OtherDetailsIncludeForm from "./component/OtherDetailsincludes/OtherDetailsIncludes.component";
import OtherIncludeForm from "./component/Otherincludes/OtherIncludes.component";
import ApproveDialog from "../TravelClaimDetail/component/ApproveDialog/ApproveDialog.view";
import { useMemo } from "react";

function ForeignClaimDetail() {
  const {
    employeeDetails,
    employees,
    form,
    changeTextData,
    handleSubmit,
    isLoading,
    errorData,
    declaration,
    setDeclaration,
    travelRef,
    otherRef,
    lodgeRef,
    daRef,
    enterRef,
    startDate,
    endDate,
    CoPass,
    tourType,
    changeAmount,
    setCurrency,
    getTotalValue,
    setOfficeAmount,
    officeAmount,
    getRefundAmount,
    setOfficeAmount2,
    officeAmount2,
    imprestAmount,
    isCP,
    InrAmount,
    EuroAmount,
    USDAmount,
    curr,
    USDtoINR,
    EurotoINR,
    imprestINRAmount,
    getOfficeAmount,
    setOfficeAmount3,
    setOfficeAmount4,
    id,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    isSubmitting,
    refundData,
    setRefundData,
    onBlurHandler,
  } = useClaimForDetail({});

  const statusCheck=useMemo(()=>{
    if(employeeDetails){
      return employeeDetails?.panelist_status === "PENDING"
    }
  },[employeeDetails])

  console.log("statusCheck",statusCheck)
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
      <UpperClaimInfo data={employeeDetails} isLoc={true} />

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>TAP No. :</span>
                    {employeeDetails?.travelPlanner?.code}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Type:</span>
                    {employeeDetails?.travelPlanner?.tour_type}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Dates:</span>
                    {employeeDetails?.travelPlanner?.startDateText} -{" "}
                    {employeeDetails?.travelPlanner?.endDateText}
                  </div>

                  <div className={styles.key}>
                    <span className={styles.value}>Status:</span>
                    {
                      <StatusPill
                        status={employeeDetails?.travelPlanner?.status}
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
          <LodgingIncludeForm
            ref={lodgeRef}
            changeAmount={changeAmount}
            setOfficeAmount={setOfficeAmount}
            curr={curr}
            statusCheck={statusCheck}
          />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part B: Travel Expense</div>
          <ExpenseIncludeForm
            ref={travelRef}
            changeAmount={changeAmount}
            setOfficeAmount2={setOfficeAmount2}
            curr={curr}
            statusCheck={statusCheck}
          />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part C: DA & IE Expenses</div>
          <DAIncludeForm ref={daRef} changeAmount={changeAmount} statusCheck={statusCheck}/>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part D: Entertainment Expenses</div>
          <OtherDetailsIncludeForm
            ref={enterRef}
            changeAmount={changeAmount}
            setOfficeAmount3={setOfficeAmount3}
            curr={curr}
            statusCheck={statusCheck}
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part E: Other Expenses</div>
          <OtherIncludeForm
            ref={otherRef}
            changeAmount={changeAmount}
            setOfficeAmount4={setOfficeAmount4}
            curr={curr}
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
                    {employeeDetails?.imprest?.code
                      ? employeeDetails?.imprest?.code
                      : "N/A"}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Imprest Amount:</span>
                    {imprestAmount ? (
                      <>
                        {getCurrency(employeeDetails?.imprest?.currency)}
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
                  employeeDetails?.travelPlanner?.imprest?.currency
                )}
                {isNaN(
                  employeeDetails?.travelPlanner?.imprest?.amount -
                    employeeDetails?.travelPlanner?.imprest
                      ?.sanctionable_amount
                )
                  ? 0
                  : employeeDetails?.travelPlanner?.imprest?.amount -
                    employeeDetails?.travelPlanner?.imprest
                      ?.sanctionable_amount}
              </span>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Summary</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap} style={{ marginBottom: "20px" }}>
            Imprest for tour:
            <span>{employeeDetails?.imprest?.code}</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency(employeeDetails?.imprest?.currency)}
              {imprestAmount ? imprestAmount : 0}
            </span>
          </div>
        </div>
        <div className={styles.Vertiva}></div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Currency Used:
            <span>USD</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency("USD")}
              {USDAmount ? USDAmount : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>{curr?.length > 0 ? curr[1]?.conversion_rate : "-"}</span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {USDtoINR ? USDtoINR : 0}
            </span>
          </div>
        </div>
        <div className={styles.lowerWrapImprest2}>
          <div className={styles.headingWrap}>
            Currency Used:
            <span>EURO</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency("EUR")}
              {EuroAmount ? EuroAmount : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>{curr?.length > 0 ? curr[0]?.conversion_rate : "-"}</span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {EurotoINR ? EurotoINR : 0}
            </span>
          </div>
        </div>
        <div className={styles.lowerWrapImprest2}>
          <div className={styles.headingWrap}>
            Currency Used:
            <span>INR</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency("INR")}
              {InrAmount ? InrAmount : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>1</span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {InrAmount ? InrAmount : 0}
            </span>
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount in INR:
            <span>{getTotalValue ? `₹ ${getTotalValue}` : 0}</span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Imprest amount INR conversion:
            <span>{imprestINRAmount ? `₹ ${imprestINRAmount}` : 0}</span>
          </div>
        </div>
      </div>
      {/* <div className={styles.plainPaper}>
        <div className={styles.heading}>Reimbursable Expense</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Total Expense (self + office):
            <span>{getTotalValue ? ` ₹ ${getTotalValue}` : 0}</span>
          </div>
          <div className={styles.headingWrap}>
            Self Borne Expense:
            <span>₹ {Number(getTotalValue) - Number(getOfficeAmount)}</span>
          </div>
          <div className={styles.headingWrap}>
            Office Borne Expense:
            <span>₹ {Number(getOfficeAmount)}</span>
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Amount to be Refunded:{" "}
            <span>{getRefundAmount ? `₹ ${getRefundAmount}` : 0}</span>
          </div>
        </div>
      </div> */}
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Reimbursable Expense</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Total Expense (self + office):
            <span>{getTotalValue ? ` ₹ ${getTotalValue}` : 0}</span>
          </div>
          <div className={styles.headingWrap}>
            Self Borne Expense::
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
            {employeeDetails?.comments &&
              employeeDetails?.comments?.map((item) => (
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
            {employeeDetails?.copassengerStatus?.achievement}
          </div>
        </div>
      </div>
      {employeeDetails?.panelist_status === "PENDING" && (
        <div
          className={
            employeeDetails?.status === "APPROVED"
              ? styles.approvedWrapper
              : styles.PdfBtnWrapper
          }
        >
          {employeeDetails?.status !== "APPROVED" &&
            employeeDetails?.status !== "ACCOUNTS_APPROVED" && (
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

export default ForeignClaimDetail;
