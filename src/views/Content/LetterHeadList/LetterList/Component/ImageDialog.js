import React from "react";
import styles from "./Style.module.css";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/styles";
import { ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import logo from "../../../../../assets/img/logos/ic_logo.png";

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

const ImageDialog = ({ isOpen, handleToggle, editData }) => {
  const classes = useStyles();
  console.log("editData", editData);
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
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.imgWrap}>
            <img src={logo} />
          </div>
          <div className={styles.headerWrap}>
            <img src={editData?.header_image} className={styles.headerImg} />
            <img src={editData?.footer_image} className={styles.headerImg} />
          </div>
        </div>
        <div className={styles.footerWrap}>
          for any queries please write to us at
          <br />
          connect@indswift.com
        </div>
        <div className={styles.info}>
          This is an automatic email, please do not reply to this email
        </div>
      </Dialog>
    </div>
  );
};

export default ImageDialog;
