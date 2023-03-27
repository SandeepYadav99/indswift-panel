import styles from "./Style.module.css";
import {Close} from "@material-ui/icons"; 
import {ButtonBase, Dialog, MenuItem, Slide} from "@material-ui/core";
import React from "react";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AcceptanceDialog = ({isOpen, handleDialog, }) => {
    return (
        <Dialog
            // fullWidth={true}
            maxWidth={"sm"}
            keepMounted
            TransitionComponent={Transition}
            open={isOpen}
            onClose={handleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // classes={{paper: classes.dialog}}
        >
            <div className={styles.InterviewPopUpWrapper}>
                <div className={styles.closeWrap}>
                    <Close
                        style={{ cursor: "pointer" }}
                        onClick={handleDialog}
                    ></Close>
                </div>

                <div className={styles.loginSignupText}>
                    <h1 className={styles.headingText}>Acceptance Confirmation</h1>
                    <div className={styles.newLine} />
                </div>
                <div>
                    <p>Are you sure you want to accept this offer letter?</p>
                </div>
                <div className={styles.confirmedWrapper}>
                    <ButtonBase className={styles.createBtn} onClick={handleDialog}>ACCEPT</ButtonBase>
                </div>
            </div>
        </Dialog>
    )
};

export default AcceptanceDialog;
