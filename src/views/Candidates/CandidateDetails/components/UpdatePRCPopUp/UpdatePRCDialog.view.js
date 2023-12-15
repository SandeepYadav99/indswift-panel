import React from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import { Close, Search, Visibility } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import useUpdatePRCDialogHook from "./UpdatePRCDialog.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";

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

const UpdatePRCDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    isSubmitting,
    onBlurHandler,
    isPRCDetailFetched,
  } = useUpdatePRCDialogHook({ isOpen, handleToggle, candidateId });
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
            <div className={styles.upperFlex}>Update PRC</div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.code}
                errorText={errorData?.code}
                label={"Search RAP ID"}
                value={form?.code}
                onTextChange={(text) => {
                  changeTextData(text, "code");
                }}
                // onBlur={() => {
                //   onBlurHandler("code");
                // }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          {form?.vacancy_type && (
            <div className={styles.wr}>
              <div className={styles.lowerWrap}>
                <div className={styles.labelWrap}>RAP ID:</div>
                <div className={styles.solWrap}>{form?.code}</div>
              </div>
              <div className={styles.lowerWrap}>
                <div className={styles.labelWrap}>Type of Vacancy:</div>
                <div className={styles.solWrap}>{form?.vacancy_type}</div>
              </div>{" "}
              <div className={styles.lowerWrap}>
                <div className={styles.labelWrap}>Place of Posting:</div>
                <div className={styles.solWrap}>{form?.location?.name}</div>
              </div>
              <div className={styles.lowerWrap}>
                <div className={styles.labelWrap}>Candidate Grade:</div>
                <div className={styles.solWrap}>{form?.grade?.code}</div>
              </div>
              <div className={styles.lowerWrap}>
                <div className={styles.labelWrap}>Department Applied For:</div>
                <div className={styles.solWrap}>{form?.department?.name}</div>
              </div>
              <div className={styles.lowerWrap}>
                <div className={styles.labelWrap}>Designation Applied For:</div>
                <div className={styles.solWrap}>{form?.designation?.name}</div>
              </div>
              <div className={styles.lowerWrap}>
                <div className={styles.labelWrap}>Associated HR:</div>
                <div className={styles.solWrap}>
                  {form?.assigned_person?.name}
                </div>
              </div>
            </div>
          )}
          {isPRCDetailFetched && (
            <div className={styles.printFlex}>
              <ButtonBase
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={"createBtnreset"}
              >
                Update
              </ButtonBase>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default UpdatePRCDialog;
