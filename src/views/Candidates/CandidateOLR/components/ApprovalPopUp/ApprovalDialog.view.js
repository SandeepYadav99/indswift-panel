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

  const { panelists ,handleSubmit } = useApprovalDialog({ offerId });
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
            {
              panelists?.map((item,index)=> (
                <div className={styles.mappedCard} key={`Approval_index_${index}`}>
              <div className={styles.imageNameContainer}>
                <div className={styles.imageContainer}>
                  <img
                    src={ item?.image ?  item?.image : DefaultImg }
                  />
                </div>
                <div className={styles.nameContainer}>
                  <span>{item?.name}</span>
                  <div className={styles.date}>{item?.designation?.name}</div>
                </div>
              </div>
              <div className={styles.SummaryViewstar}>
                <div className={styles.buttonWrapper}>
                <div className={styles.date}>{item?.department?.name}</div>
                </div>
              </div>
            </div>
              ) )
            }
          </div>
          <div className={styles.btnCont1}>
            <ButtonBase className={styles.edit1} onClick={()=>handleSubmit('DRAFTED')} >KEEP AS DRAFT</ButtonBase>
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

export default ApprovalDialog;
