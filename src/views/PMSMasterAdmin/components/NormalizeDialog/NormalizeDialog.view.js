import React, { useCallback, useMemo, useState } from "react";
import {
  ButtonBase,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useNormalizeDialogHook from "./NormalizeDialog.hook";

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

const NormalizeDialog = ({
  isOpen,
  handleToggle,
  normalizeType,
  getPmsList,
}) => {
  const classes = useStyles();
  const { changeTextData, errorData, form, handleSubmit, onBlurHandler,isSubmitting } =
    useNormalizeDialogHook({ isOpen, handleToggle, normalizeType, getPmsList });

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
            <div className={styles.heading}>{normalizeType === "REVIEWER" ? "FIRST" : "SECOND" } NORMALIZATION</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
              Please choose the required option to proceed further
            </div>
          </div>

          <RadioGroup
            aria-label="option"
            name="type"
            value={form?.type}
            onChange={(e) => changeTextData(e.target.value, "type")}
            row
            className={styles.radioWrap}
          >
            <FormControlLabel
              // style={{ marginLeft: "20px" }}
              value="AUTOMATIC"
              control={<Radio />}
              label="System Calculated Average"
            />
            <FormControlLabel
              value="MANUAL"
              control={<Radio />}
              label="Manual Entry"
            />
          </RadioGroup>
          {form?.type === "MANUAL" && (
            <div className={styles.fieldWrapper}>
              <div>
                <CustomTextField
                  type="number"
                  isError={errorData?.value}
                  errorText={errorData?.value}
                  label={"Enter Value"}
                  value={form?.value}
                  onTextChange={(text) => {
                    changeTextData(text, "value");
                  }}
                  onBlur={() => {
                    onBlurHandler("value");
                  }}
                />
              </div>
            </div>
          )}
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} disabled={isSubmitting} className={styles.createBtn}>
              {isSubmitting ? <CircularProgress color="success" size="20px" />: "Submit"}
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default NormalizeDialog;
