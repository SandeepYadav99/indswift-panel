import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,

} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import DefaultImg from "../../../assets/img/download.png";

import useApprovalConfirmationHook from "./ApprovalConfirmationHook";


const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApprovalConfirmationPopUp = ({ isOpen, handleToggle, offerId , handleClose}) => {
  const classes = useStyles();

  const { handleSubmit } = useApprovalConfirmationHook({ offerId ,handleToggle, handleClose});
  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/*<DialogTitle id="alert-dialog-title">*/}
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.requiredWrapper}>
            <div className={styles.upperFlex}>Approval Confirmation</div>
            <div className={styles.newLine} />
            <span style={{ marginTop: "10px", fontSize: ".785rem" }}>
            Are you sure you want to approve this Employee Record?
            </span>
            <br/>
          </div>
      
          <div className={styles.btnCont1}>
          
            <ButtonBase
              type={"button"}
              onClick={()=>handleSubmit('APPROVAL_DUE')}
              className={styles.createBtn}
            >
              CONFIRM
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ApprovalConfirmationPopUp;
