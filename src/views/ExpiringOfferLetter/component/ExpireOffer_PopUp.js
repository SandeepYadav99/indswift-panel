import React from "react";
import {
 
  ButtonBase,
 
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import { serviceMarkExpired, serviceMarkResharedOfferLetter } from "../../../services/ExpirOfferLetter.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";



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

const ExpireOffer_PopUp = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  
  const handleSubmit = () => {
    if (candidateId) {
      serviceMarkExpired({ letter_id: candidateId }).then((res) => {
        if (!res?.error) {
          handleToggle();
          // historyUtils.goBack()
          SnackbarUtils.success("Offer Letter Expired Successfully")
        }else{
          SnackbarUtils.error("Offer letter not found")
        }
      });
    }
  };
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
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Expire Offer</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
            Are you sure you want to expire this offer letter?
            </div>
          </div>

          
       
          <div className={styles.printFlex}>
            <ButtonBase
               onClick={handleSubmit}
            
              className={
               styles.createBtn 
              }
            >
              CONFIRM
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ExpireOffer_PopUp;
