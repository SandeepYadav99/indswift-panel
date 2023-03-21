import React, {useCallback, useMemo, useState} from "react";
import {
    Button,
    ButtonBase,
    IconButton,
    InputAdornment,
    MenuItem,
} from "@material-ui/core";
import {Close, Visibility, VisibilityOff} from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import {makeStyles} from "@material-ui/styles";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import SearchIcon from "@material-ui/icons/Search";
import {serviceCreateVacancy} from "../../../../../services/Vacancy.service";
import Constants from "../../../../../config/constants";

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

const NewPositionDialog = ({jobId, isOpen, handleToggle, prc, handleSubmit}) => {
    const classes = useStyles();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            serviceCreateVacancy({
                job_id: jobId,
                type: Constants.VACANCY_TYPE.ADDITIONAL_REQUIREMENT,
            }).then((res) => {
                if (!res.error) {
                    handleSubmit && handleSubmit();
                }
                setIsSubmitting(false);
            });
        }
    }, [jobId, isSubmitting, setIsSubmitting,]);

    return (
        <div>
            <Dialog
                onBackdropClick={() => {
                }}
                keepMounted
                fullWidth={true}
                maxWidth={"sm"}
                TransitionComponent={Transition}
                open={isOpen}
                onClose={() => {
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/*<DialogTitle id="alert-dialog-title">*/}
                <div className={styles.resetPasswordWrapper}>
                    <div className={styles.resetWrapper}>
                        <ButtonBase
                            classes={{root: classes.closeBtn}}
                            onClick={handleToggle}
                        >
                            <Close/>
                        </ButtonBase>
                    </div>
                    <div className={styles.requiredWrapper}>
                        <div className={styles.upperFlex}>Vacancy Addition Confirmation</div>
                        <div className={styles.newLine}/>
                        <span style={{marginTop: "10px", fontSize: ".785rem"}}>
            Are you sure you want to add a new vacancy for
            </span>
                        <br/>
                        <span className={styles.jobTitle}> Job Opening - {prc}</span>
                    </div>
                    {/*</DialogTitle>*/}
                    <div className={styles.fieldWrapper}>


                    </div>
                    <div className={styles.printFlex}>
                        <ButtonBase
                            disabled={isSubmitting}
                            // onClick={handleSubmit}
                            // disabled={isSubmitting}
                            onClick={handleConfirm}
                            className={"createBtnreset"}
                        >
                            Confirm
                        </ButtonBase>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default NewPositionDialog;
