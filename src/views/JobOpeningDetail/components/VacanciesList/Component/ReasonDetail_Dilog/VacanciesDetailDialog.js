import React from "react";
import {
 
  ButtonBase,
 
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

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

const DetailsDialog = ({ isOpen, handleToggleDetail, data }) => {
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
        {/*<DialogTitle id="alert-dialog-title">*/}
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggleDetail}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Inactive Reason Details</div>
            <div className={styles.newLine}></div>
            <div style={{marginTop:"30px"}}></div>
            <div className={styles.des}>
              <div className={styles.subDes}>
                <img src={data?.employee?.image} className={styles.detailImage}/>
                <div className={styles.nameEmp}>
                  <span ><b>{data?.employee?.name} </b> </span> <br/>
                  <span>{data?.employee?.emp_code}</span>
                </div>
              </div>
              <div>{data?.createdAtText}</div>
            </div>
          </div>

          <div className={styles.fieldWrapper}>
            {data?.inactive_reason}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DetailsDialog;
