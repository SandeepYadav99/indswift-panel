import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useTravelAuthDetail from "./TravelAuthDetail.hook";
import TravelUpperCard from "../TravelCreate/component/TravelUpperCard/TravelUpperCard";
import Upper from "./component/upper/Upper";
import history from "../../../libs/history.utils";
import { removeUnderScore } from "../../../helper/helper";
import ApproveAuthDialog from "./component/ApproveAuthPopUp/ApproveAuthDialog.view";
import RejectAuthDialog from "./component/RejectAuthPopUp/RejectDialog.view";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import AuthDetailsIncludeForm from "./component/AuthDetailsincludes/AuthDetailsIncludes.component";

function TravelAuthDetail() {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    errorData,
    travelRef,
    fieldStatusEnabled,
  } = useTravelAuthDetail({});
  const item = {};
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <ApproveAuthDialog
          candidateId={id}
          isOpen={approveDialog}
          handleToggle={toggleStatusDialog}
          form={form}
          changeTextData={changeTextData}
          onBlurHandler={onBlurHandler}
          handleSubmit={handleSubmit}
          errorData={errorData}
        />
        <RejectAuthDialog
          candidateId={id}
          isOpen={rejectDialog}
          handleToggle={toggleRejectDialog}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIosIcon fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b>Travel Request Details</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <TravelUpperCard data={employeeDetail?.employee} />
      <Upper idCards={employeeDetail?.travelPlanner} />

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.travelPlanner?.travelDetails &&
              employeeDetail?.travelPlanner?.travelDetails?.map(
                (item, index) => (
                  <div className={styles.otherWrap}>
                    <div className={styles.mainFlex}>
                      <div className={styles.left}>
                        <div className={styles.key}>
                          <span className={styles.value}>Travel Date:</span>
                          {item?.travelDateText}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Travel From:</span>
                          {item?.from}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>
                            Details of Travel Medium:
                          </span>
                          {item?.medium_details}
                        </div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.key}>
                          <span className={styles.value}>Mode of Travel:</span>
                          {item?.mode}
                        </div>

                        <div className={styles.key}>
                          <span className={styles.value}>Travel To:</span>
                          {item?.to}
                        </div>

                        {item?.document && (
                          <div className={styles.key}>
                            <a href={item?.document} target="_blank">
                              <div className={styles.hyperlinkText}>
                                View Attachement
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {employeeDetail?.travelPlanner?.travelDetails?.length !==
                      index + 1 && <div className={styles.verti}></div>}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Accommodation Details</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.travelPlanner?.accomodationDetails &&
              employeeDetail?.travelPlanner?.accomodationDetails.map(
                (item, index) => (
                  <div className={styles.otherWrap}>
                    <div className={styles.mainFlex}>
                      <div className={styles.left}>
                        <div className={styles.key}>
                          <span className={styles.value}>Check In Date:</span>
                          {item?.checkInText}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>
                            Type of Accommodation:
                          </span>
                          {removeUnderScore(item?.type)}
                        </div>
                        {item?.document && (
                          <div className={styles.key}>
                            <a href={item?.document} target="_blank">
                              <div className={styles.hyperlinkText}>
                                View Attachement
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                      <div className={styles.right}>
                        <div className={styles.key}>
                          <span className={styles.value}>Check Out Date:</span>
                          {item?.checkOutText}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Property Name:</span>
                          {item?.property_name}
                        </div>
                      </div>
                    </div>
                    {employeeDetail?.travelPlanner?.accomodationDetails
                      ?.length !==
                      index + 1 && <div className={styles.verti}></div>}
                  </div>
                )
              )}
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Exception Request Detail</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Exception Required:</span>
                    {employeeDetail?.travelPlanner?.exception_required ? "Yes" : "No"}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Details for exception:</span>
                    {employeeDetail?.travelDetails?.exception?.details}
                  </div>
                  <div className={styles.formWrap}>
                    <div className={styles.formWrapInner}>
                      <CustomTextField
                        type="number"
                        isError={errorData?.exception_value}
                        errorText={errorData?.exception_value}
                        label={"Value of Expense:"}
                        value={form?.exception_value}
                        onTextChange={(text) => {
                          changeTextData(text, "exception_value");
                        }}
                        onBlur={() => {
                          onBlurHandler("exception_value");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {fieldStatusEnabled && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Travel and Accommodation Vouchers</div>
            <div>
              <AuthDetailsIncludeForm
                ref={travelRef}
                // grade={employeeDetails?.grade?.code}
                // travelType={form?.tour_type}
              />
            </div>
          </div>
        </div>
      )}

      {employeeDetail?.comments && (
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
      )}
      {employeeDetail?.status === "PENDING" && (
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

export default TravelAuthDetail;
