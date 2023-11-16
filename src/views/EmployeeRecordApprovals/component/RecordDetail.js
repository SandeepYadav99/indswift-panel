import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, makeStyles } from "@material-ui/core";
import MuiStyle from "../../../libs/MuiStyle";
import csx from "classnames";
import useRecordDetail from "./RecordDetailHook";
import EmployeeInfoComponent from "./EmployeeInfoComponent";
import OldView from "./OldView";
import NewView from "./NewView";
import ApprovalConfirmationPopUp from "../ApprovalConfirmationPopUp/ApprovalConfirmationPopUp";
import RejectConfirmationPopUp from "../RejectConfirmationPopUp/RejectConfirmationPopUp";

const useStyle = makeStyles(MuiStyle);
const RecordDetailView = ({ id, isOpen, handleClose }) => {
  const {   
    data,
    isRejectPopUp,
    toggleRejectDialog,
    isSubmitting,
    toggleApprovalDialog,
    isApprovalPopUp,

  } = useRecordDetail({ id, isOpen, handleClose });

  const classes = useStyle();
  return (
    <div className={styles.panelCont}>
      <EmployeeInfoComponent empInfoList={data?.employee} />
      <h4>Change Log</h4>
      <div className={csx("plainPaper", styles.infoContainer)}>
        <div className={styles.titleText}>{}</div>
        <label className={styles.infoLabel1}>Old</label>
        <OldView oldData={data?.old_values} />
        <br />
        <label className={styles.infoLabel1}>New</label>
        <NewView newValues={data?.new_values} />
      </div>

      <div className={styles.buttoonforApprove}>
        <ButtonBase
          disabled={isSubmitting}
          className={csx(classes.btnBorder, styles.rejectBtn)}
          onClick={toggleRejectDialog}
        >
          Reject
        </ButtonBase>
        <ButtonBase
          disabled={isSubmitting}
          onClick={toggleApprovalDialog}
          className={classes.btnBorder}
        >
          Approve
        </ButtonBase>
      </div>

      <ApprovalConfirmationPopUp
        offerId={id}
        isOpen={isApprovalPopUp}
        handleToggle={toggleApprovalDialog}
        handleClose={handleClose}
      />

      <RejectConfirmationPopUp
        offerId={id}
        isOpen={isRejectPopUp}
        handleToggle={toggleRejectDialog}
        handleClose={handleClose}
      />
    </div>
  );
};

export default RecordDetailView;
