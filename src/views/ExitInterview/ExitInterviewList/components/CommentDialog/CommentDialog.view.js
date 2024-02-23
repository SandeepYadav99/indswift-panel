import React from "react";
import {
  ButtonBase,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useCommentDialogHook from "./CommentDialog.hook";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";

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

const CommentDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    setDeclaration,
    declaration,
  } = useCommentDialogHook({ isOpen, handleToggle, candidateId });

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
            <div className={styles.heading}>Add Remarks</div>
            <div className={styles.newLine}></div>
          </div>

          <div className={styles.fieldWrapper}>
            <CustomSelectField
              isError={errorData?.leaving_reason}
              errorText={errorData?.leaving_reason}
              label={"Reason of Leaving"}
              value={form?.leaving_reason}
              handleChange={(value) => {
                changeTextData(value, "leaving_reason");
              }}
            >
              <MenuItem value="For Salary/Career Growth">
                For Salary/Career Growth
              </MenuItem>
              <MenuItem value="Due to Issues in Working Culture">
                Due to Issues in Working Culture
              </MenuItem>
              <MenuItem value="Personal Problem">Personal Problem</MenuItem>
              <MenuItem value="Health Issue">Health Issue</MenuItem>
              <MenuItem value="Due to relation with supervisor">
                Due to relation with supervisor
              </MenuItem>
              <MenuItem value="Due to relation in team">
                Due to relation in team
              </MenuItem>
              <MenuItem value="Due to work Stress">Due to work Stress</MenuItem>
              <MenuItem value="Due to Performance Issue">
                Due to Performance Issue
              </MenuItem>
              <MenuItem value="Other Reasons">Other Reasons</MenuItem>
            </CustomSelectField>
            <div className={styles.headingDes}>Select Exit Type</div>
            <RadioGroup
              aria-label="option"
              name="exit_type"
              value={form?.exit_type}
              onChange={(e) => changeTextData(e.target.value, "exit_type")}
              row
              className={styles.radioWrap}
            >
              <FormControlLabel
                // style={{ marginLeft: "20px" }}
                value="GOOD_EXIT"
                control={<Radio />}
                label="Good Exit"
              />
              <FormControlLabel
                value="BAD_EXIT"
                control={<Radio />}
                label="Bad Exit"
              />
            </RadioGroup>

            <CustomTextField
              isError={errorData?.hr_comment}
              errorText={errorData?.hr_comment}
              label={"Add comments (Optional)"}
              value={form?.hr_comment}
              onTextChange={(text) => {
                changeTextData(text, "hr_comment");
              }}
              onBlur={() => {
                onBlurHandler("hr_comment");
              }}
              multiline
              rows={3}
            />
            <div className={styles.checkBox}>
              <input
                checked={form?.is_new_company_disclosed}
                type="checkbox"
                id="is_new_company_disclosed"
                name="is_new_company_disclosed"
                onChange={() => {
                  changeTextData(
                    !form?.is_new_company_disclosed,
                    "is_new_company_disclosed"
                  );
                }}
              />
              <label htmlFor="is_new_company_disclosed" className={styles.disclosed}>
                Disclosed new company?
              </label>
              <br />
            </div>
            {form?.is_new_company_disclosed && (
              <CustomTextField
                isError={errorData?.new_company_name}
                errorText={errorData?.new_company_name}
                label={"Mention name of company"}
                value={form?.new_company_name}
                onTextChange={(text) => {
                  changeTextData(text, "new_company_name");
                }}
                onBlur={() => {
                  onBlurHandler("new_company_name");
                }}
              />
            )}
          </div>
          <div className={styles.cleckboxWrapper}>
            <div className={styles.checkBox}>
              <input
                checked={declaration}
                type="checkbox"
                id="confirmation"
                name="confirmation"
                onChange={() => {
                  setDeclaration((s) => !s);
                }}
              />
              <label htmlFor="confirmation">
                I have verified the information .
              </label>
              <br />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={!declaration ? true : false}
              className={
                declaration ? styles.createBtn : styles.disabledCreatebtn
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

export default CommentDialog;
