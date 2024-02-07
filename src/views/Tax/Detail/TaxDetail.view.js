import React from "react";
import useTaxDetail from "./TaxDetail.hook";
import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import UpperCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimTaxCard/component/UpperCard/UpperCard";
import TaxData from "./component/TaxData/TaxData";
import ApproveDialog from "./component/ApprovePopUp/ApproveDialog.view";
import RejectDialog from "./component/RejectPopUp/RejectDialog.view";
function TaxDetail() {
  const {
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleRejectDialog,
    rejectDialog,
    id,
  } = useTaxDetail({});
  return (
    <div>
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
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Tax Rebate Claim Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <UpperCard
          data={employeeDetail?.employee}
          isDetail={employeeDetail?.status}
        />
      </div>
      <TaxData employeeDetail={employeeDetail?.taxRebate} />
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
      {employeeDetail?.status === "PENDING" && (
        <div
          className={
            employeeDetail?.status === "APPROVED"
              ? styles.approvedWrapper
              : styles.PdfBtnWrapper
          }
        >
          <div className={styles.editBtn2}>
            <ButtonBase className={styles.edit} onClick={toggleRejectDialog}>
              REJECT
            </ButtonBase>
          </div>

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

export default TaxDetail;
