import React from "react";
import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import logo from "../../assets/img/indswift_ios_popup_logo.png";
import share from "../../assets/img/share.jpg";
import add from "../../assets/img/add.jpg";
import home from "../../assets/img/add_to_home.jpg";

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

const InstructDialog = ({ isOpen, handleToggle }) => {
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
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div>
              <img src={logo} className={styles.imgClass} />
            </div>
            <div className={styles.heading}>
              Add IndSwift app to your device
            </div>
            <div className={styles.newLine}></div>
          </div>
          <div className={styles.fieldWrapper}>
            <div className={styles.text}>
              1. Tap the <strong>Share</strong> button in your browser
            </div>
            <div>
              <img src={share} className={styles.upperImg} />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div className={styles.text}>
              2. In the pop-up menu actions, scroll down and tap on the{" "}
              <strong>Add to Home Screen</strong>
            </div>
            <div>
              <img src={home} className={styles.upperImg} />
            </div>
          </div>{" "}
          <div className={styles.fieldWrapper}>
            <div className={styles.text}>
              3. Tap on the <strong>Add</strong> button on the Top-Right corner,
              to complete adding the card.
            </div>
            <div>
              <img src={add} className={styles.upperImg} />
            </div>
          </div>
          <div className={styles.fieldWrapper}>
            <div className={styles.text}>The app will be accessible from your iPhone home screen</div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default InstructDialog;
