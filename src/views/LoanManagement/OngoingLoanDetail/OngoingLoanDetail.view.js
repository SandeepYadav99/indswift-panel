import React from "react";
import useOngoingLoanDetail from "./OngoingLoanDetail.hook";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { removeUnderScore } from "../../../helper/helper";
import StatusPill from "../../../components/Status/StatusPill.component";
import ClaimUpperCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimUpperCard/ClaimUpperCard";
import LoanCloseDialog from "./component/ClosePopUp/LoanRejectDialog.view";

function OngoingLoanDetail() {
  const {
    employeeDetail,
    id,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    handleViewDetails2,
  } = useOngoingLoanDetail({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Loan Application Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetail?.loan?.employee} isLoan={true} />
      <LoanCloseDialog
        candidateId={id}
        isOpen={rejectDialog}
        handleToggle={toggleRejectDialog}
      />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headWrap}>
            <div className={styles.heading}>Loan Request Form</div>
            <div>
              <StatusPill status={employeeDetail?.status} />
            </div>
          </div>

          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Type of Loan:</span>
                    {removeUnderScore(employeeDetail?.loan?.loan_type)}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      Describe your Request for Loan:
                    </span>

                    {employeeDetail?.loan?.description}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Amount Requested:</span>
                    {employeeDetail?.loan?.amount &&
                      `₹ ${employeeDetail?.loan?.amount}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Attachments</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.loan?.attachments &&
              employeeDetail?.loan?.attachments.map((item, index) => (
                <div className={styles.otherWrap} key={`attachment_${index}`}>
                  <div className={styles.mainFlex}>
                    <div className={styles.left}>
                      {item?.document && (
                        <div className={styles.key7}>
                          <a href={item?.document} target="_blank">
                            <div className={styles.hyperlinkText}>
                              {item?.label}
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                    <div className={styles.right}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Loan Guarantees</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.loan?.guarantees &&
              employeeDetail?.loan?.guarantees.map((item, index) => (
                <div className={styles.otherWrap} key={`guarantee_${index}`}>
                  <div className={styles.heading}>{`Guarantee ${
                    index + 1
                  }`}</div>
                  <div className={styles.mainFlex}>
                    <div className={styles.left}>
                      <div className={styles.key}>
                        <span className={styles.value}>Employee:</span>
                        {item?.name}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Location:</span>
                        {item?.location}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Department:</span>
                        {item?.department}
                      </div>{" "}
                      <div className={styles.key}>
                        <span className={styles.value}>Status:</span>
                        {
                          <StatusPill
                            status={removeUnderScore(item?.status)}
                            style={{
                              border: "none",
                              background: "transparent",
                            }}
                          />
                        }
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.key}>
                        <span className={styles.value}>Designation:</span>
                        {item?.designation}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Grade:</span>
                        {item?.grade}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>DOJ:</span>
                        {item?.doj}
                      </div>
                      {item?.document && (
                        <div className={styles.key}>
                          <a href={item?.document} target="_blank">
                            <div className={styles.hyperlinkText}>Download</div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  {employeeDetail?.loan?.guarantees?.length !== index + 1 && (
                    <div className={styles.verti}></div>
                  )}
                </div>
              ))}
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
                    <b>{`${item?.employee?.name} | ${item?.updatedAtText}`}</b>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* {employeeDetail?.status === "PENDING" && ( */}
      <div className={styles.approvedWrapper}>
        <div className={styles.editBtn2}>
          <ButtonBase className={styles.createBtn} onClick={toggleRejectDialog}>
            CLOSE
          </ButtonBase>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default OngoingLoanDetail;
