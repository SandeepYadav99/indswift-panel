import React, { useCallback, useMemo, useState } from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/styles";
import InformationCard from "../../../../../components/InformationCard/InformationCard.component";
import { myClaimData } from "../../../../../helper/helper";
import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styles from "./Style.module.css"
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

const ClaimDialog = ({ isOpen, handleToggle, candidateId, isInterview }) => {
  const classes = useStyles();

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
        <div className={styles.wrapper}>
        <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
        <InformationCard
          heading="My Claims"
          data={myClaimData}
          isClaimPage={true}
        />
        </div>
        
      </Dialog>
    </div>
  );
};

export default ClaimDialog;
