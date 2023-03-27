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
import DefaultImg from "../../../../../assets/img/download.png";
import useApprovalDialog from "./ApprovalDialog.hook";


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

const ApprovalDialog = ({ isOpen, handleToggle, offerId }) => {
  const classes = useStyles();

  const { } = useApprovalDialog({ offerId });

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
            OLR Sheet will be sent for approval to following:
            </span>
            <br/>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
          <div className={styles.mappedCard} key={`Approval_index`}>
              <div className={styles.imageNameContainer}>
                <div className={styles.imageContainer}>
                  <img
                    src={ DefaultImg }
                  />
                </div>
                <div className={styles.nameContainer}>
                  <span>Shashank Rastogi</span>
                  <div className={styles.date}>Manager</div>
                </div>
              </div>
              <div className={styles.SummaryViewstar}>
                <div className={styles.buttonWrapper}>
                <div className={styles.date}>Human Resource</div>
                </div>
              </div>
            </div>

          </div>
          <div className={styles.btnCont1}>
            <ButtonBase className={styles.edit1} onClick={handleToggle} >KEEP AS DRAFT</ButtonBase>
            <ButtonBase
              type={"button"}
              onClick={handleToggle}
              // onClick={handleSubmit}
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

export default ApprovalDialog;
