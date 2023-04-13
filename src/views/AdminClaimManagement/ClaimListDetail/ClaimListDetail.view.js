import { ButtonBase } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import UpperClaimInfo from "./Component/UpperClaimInfo/UpperClaimInfo";
import ClaimDetailInfo from "./Component/ClaimDetailInfo/ClaimDetailInfo";
import useClaimListDetail from "./ClaimListDetail.hook";
import ApproveDialog from "./Component/ApprovePopUp/ApproveDialog.view";
import ChangeDialog from "./Component/ChangePopUp/ChangeDialog.view";
function ClaimListDetail() {
  const {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,
    toggleChangeDialog,
    ischangeDialog,
  } = useClaimListDetail({});
  console.log("employeeDetail", employeeDetail);
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <ApproveDialog
          isOpen={approveDialog}
          handleToggle={toggleStatusDialog}
        />
        <ChangeDialog
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
      <UpperClaimInfo data={employeeDetail} />
      <ClaimDetailInfo idCards={employeeDetail} />
      <div className={styles.plainPaper}>
          <div className={styles.heading}>Comments/Notes</div>
          <div className={styles.commentWrap}>
            <div>{employeeDetail?.comments}</div>
            <div></div>
          </div>
      </div>
      <div className={styles.PdfBtnWrapper}>
        <div className={styles.editBtn2}>
          <ButtonBase
            className={styles.edit}
            // onClick={() => handleToggle()}
          >
            REJECT
          </ButtonBase>
        </div>
        <div className={styles.btnApproveWrapper}>
          <div>
            <ButtonBase
              // disabled={isSubmitting}
              className={styles.editSuccess}
              onClick={toggleChangeDialog}
            >
              CHANGE & APPROVE
            </ButtonBase>
          </div>
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
    </div>
  );
}

export default ClaimListDetail;
