import styles from "./Style.module.css";
import { Close, OpenInNew } from "@material-ui/icons";
import { ButtonBase, Dialog, Slide, IconButton } from "@material-ui/core";
import React from "react";
import RouteName from "../../../../../routes/Route.name";
import historyUtils from "../../../../../libs/history.utils";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({ isOpen, handleClose, candidatedata }) => {

  // console.log("candidatedata");
  return (
    <Dialog
      keepMounted
      maxWidth={"xl"}
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // classes={{paper: classes.dialog}}
    >
      <div className={styles.InterviewPopUpWrapper}>
        <div className={styles.closeWrap}>
          <Close style={{ cursor: "pointer" }} onClick={handleClose}></Close>
        </div>

        <div className={styles.loginSignupText}>
          <div className={styles.headingText}>Existing Duplicate Records</div>
          <div className={styles.newLine} />
        </div>
        <div className={styles.wr}>
          <div className={styles.LowerWeap}>
            {candidatedata?.length > 0 &&
              candidatedata?.map((item) => (
                <div className={styles.parent}>
                  <div className={styles.nameWrap}>
                    <div>
                      <img src={item?.image} className={styles.imgClass} />
                    </div>
                    <div className={styles.str}>
                      <strong>{item?.name}</strong>
                      <div>{item?.email}</div>
                    </div>
                  </div>
                  <div className={styles.conWrap}>
                    <div>{item?.job_opening?.code}</div>
                    <div>{item?.contact}</div>
                  </div>
                  <div className={styles.btnWrap}>
                    <Link
                      to={`${RouteName.CANDIDATES_DETAILS}${item.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                      target="_blank"
                    >
                      <IconButton
                        className={"tableActionBtn"}
                        color="secondary"
                      >
                        <OpenInNew
                          fontSize={"small"}
                          className={styles.openIcon}
                        />{" "}
                        <span className={styles.subText}>View Profile</span>
                      </IconButton>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogComponent;
