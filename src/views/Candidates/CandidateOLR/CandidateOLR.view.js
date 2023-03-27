import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import CandidateDetails from "./components/CandidateDetails/CandidateDetails";
import ReplacementDetails from "./components/ReplacementDetails/ReplacementDetails";
import SalaryDetails from "./components/SalaryDetails/SalaryDetails";
import ApprovalDialog from "./components/ApprovalPopUp/ApprovalDialog.view";
import CandidateOLRHook from "./CandidateOLR.hook";
import RejectOLRDialog from "./components/RejectOLRPopUp/RejectOLRDialog.view";

function CandidateOLR() {
  const {
    isApprovalPopUp,
    toggleApprovalDialog,
    isRejectPopUp,
    toggleRejectDialog,
      data
  } = CandidateOLRHook({});

  return (
    <div className={"container"}>
      <ApprovalDialog
        isOpen={isApprovalPopUp}
        handleToggle={toggleApprovalDialog}
      />
      <RejectOLRDialog
        isOpen={isRejectPopUp}
        handleToggle={toggleRejectDialog}
      />
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
        </div>
        <div>
          <div style={{ fontSize: "0.8rem" }}>
            <b>Offer Letter Release Sheet</b>
          </div>
          <div className={styles.newLine} />
        </div>
      </div>
      <br />
      <CandidateDetails data={data} />
      <ReplacementDetails data={data} />
      <SalaryDetails data={data}/>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Corporate HR Comments</div>
        <span className={styles.spanWrapper}>
          <span style={{ textTransform: 'capitalize' }}>{data?.comment}</span>
        </span>
      </div>
      <div className={styles.btnCont1}>
        <ButtonBase
          type={"button"}
          onClick={toggleApprovalDialog}
          className={styles.createBtn}
        >
          SHARE FOR APPROVAL
        </ButtonBase>
      </div>
    </div>
  );
}

export default CandidateOLR;
