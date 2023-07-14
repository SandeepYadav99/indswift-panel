import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useTravelDetail from "./TravelDetail.hook";
import TravelUpperCard from "../TravelCreate/component/TravelUpperCard/TravelUpperCard";
import Upper from "./component/upper/Upper";
import history from "../../../libs/history.utils";
import { removeUnderScore } from "../../../helper/helper";
import BottomPanelComponent from "../../../components/BottomBar/BottomBar.component";
import ClosureDialog from "./component/ClosureDialog/ClosureDialog.view";

function TravelDetail() {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
    toggleRejectDialog,
    rejectDialog,
    toggleClosureDialog,
    closureDialog,
  } = useTravelDetail({});

  return (
    <div className={styles.claimListWrapper}>
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
      <Upper idCards={employeeDetail} />

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.travelDetails &&
              employeeDetail?.travelDetails?.map((item, index) => (
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
                  {employeeDetail?.travelDetails?.length !== index + 1 && (
                    <div className={styles.verti}></div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Accommodation Details</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.accomodationDetails &&
              employeeDetail?.accomodationDetails.map((item, index) => (
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
                  {employeeDetail?.accomodationDetails?.length !==
                    index + 1 && <div className={styles.verti}></div>}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Exception Details</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Exception Required:</span>
                    {employeeDetail?.exception_required ? "Yes" : "No"}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Details for exception:</span>
                    {employeeDetail?.exception?.details}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Value of Expense:</span>
                    {employeeDetail?.exception?.expense_value &&
                      `₹ ${employeeDetail?.exception?.expense_value}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {employeeDetail?.voucherDetails?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>
              Travel and Accommodation Vouchers
            </div>
            <div className={styles.commentContainer}>
              {employeeDetail?.voucherDetails &&
                employeeDetail?.voucherDetails.map((item, index) => (
                  <div className={styles.otherWrap}>
                    <div className={styles.mainFlex}>
                      <div className={styles.left}>
                        <div className={styles.key}>
                          <span className={styles.value}>Name:</span>
                          {item?.name}
                        </div>
                        <div className={styles.key}>
                          <span className={styles.value}>Amount :</span>
                          {item?.amount && `₹ ${item?.amount}`}
                        </div>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.key}>
                          <span className={styles.value}>Type:</span>
                          {item?.type}
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
                    {employeeDetail?.voucherDetails?.length !== index + 1 && (
                      <div className={styles.verti}></div>
                    )}
                  </div>
                ))}
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
      {employeeDetail?.panelist_status === "PENDING" && (
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
      <ClosureDialog
        isOpen={closureDialog}
        handleToggle={toggleClosureDialog}
        data={employeeDetail}
      />
      {employeeDetail?.status &&  employeeDetail?.status !== "CLOSED" && (
        <BottomPanelComponent open={true}>
          <div className={styles.btnWrap}>
            <ButtonBase
              aria-haspopup="true"
              onClick={toggleClosureDialog}
              className={"createBtn"}
            >
              TRAVEL CLOSURE
            </ButtonBase>
          </div>
        </BottomPanelComponent>
      )}
    </div>
  );
}

export default TravelDetail;
