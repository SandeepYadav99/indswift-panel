import React, { useMemo } from "react";
import styles from "./Style.module.css";
import { ButtonBase, makeStyles } from "@material-ui/core";
import MuiStyle from "../../../libs/MuiStyle";
import csx from "classnames";
import useRecordDetail from "./RecordDetailHook";
import EmployeeInfoComponent from "./EmployeeInfoComponent";
import OldView from "./OldView";
import NewView from "./NewView";
import ApprovalConfirmationPopUp from "../ApprovalConfirmationPopUp/ApprovalConfirmationPopUp";

const useStyle = makeStyles(MuiStyle);

const RecordDetailView = ({ id, isOpen, handleClose }) => {
  const {
    isLoading,
    data,
    handleApprove,
    handleReject,
    isSubmitting,
    toggleApprovalDialog,
    isApprovalPopUp,
  } = useRecordDetail({ id, isOpen, handleClose });
  const classes = useStyle();

  return (
    <div className={styles.panelCont}>
      <EmployeeInfoComponent data={data?.employee} />
      <h4>Change Log</h4>
      <div className={csx("plainPaper", styles.infoContainer)}>
        <div className={styles.titleText}>{}</div>

        <label className={styles.infoLabel}>Old</label>
        {/* {oldValue} */}
        <OldView />
        <br />
        <label className={styles.infoLabel}>New</label>
        {/* {newValue} */}
        <NewView />
      </div>

      <div className={styles.buttoonforApprove}>
        <ButtonBase
          disabled={isSubmitting}
          className={csx(classes.btnBorder, styles.rejectBtn)}
          // onClick={handleReject}
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
      />
    </div>
  );
};

export default RecordDetailView;
