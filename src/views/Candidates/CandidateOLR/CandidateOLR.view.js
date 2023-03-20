import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import CandidateDetails from "./components/CandidateDetails/CandidateDetails";
import ReplacementDetails from "./components/ReplacementDetails/ReplacementDetails";
import SalaryDetails from "./components/SalaryDetails/SalaryDetails";

function CandidateOLR() {
  return (
    <div className={"container"}>
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
      <CandidateDetails />
      <ReplacementDetails />
      <SalaryDetails />
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Corporate HR Comments</div>
        <span className={styles.spanWrapper}>
          Looking Forward to the approval of offer letter as soon as possible.
        </span>
      </div>
      <div className={styles.btnCont1}>
            <ButtonBase
              type={"button"}
              // onClick={handleSubmit}
              className={styles.createBtn}
            >
              SHARE FOR APPROVAL
            </ButtonBase>
          </div>
    </div>
  );
}

export default CandidateOLR;
