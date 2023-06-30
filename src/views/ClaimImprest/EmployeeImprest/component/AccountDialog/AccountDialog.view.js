import React from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import useAccountDialogHook from "./AccountDialog.hook";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";

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

const AccountDialog = ({ isOpen, handleToggle, candidateId, listData ,emp_id}) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    isSubmitting,
    setDeclaration,
    declaration,
  } = useAccountDialogHook({ isOpen, handleToggle, candidateId, listData ,emp_id});
  return (
    <div>
      <Dialog
        // sx={{ width: "80%", height: "1000px" }}
        maxHeight="lg"
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
            <div className={styles.upperFlex}>
              Account Reconciliation Record
            </div>
            <div className={styles.newLine}></div>
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
              <CustomAutoComplete
                disabled={emp_id ? true :false}
                disabledList={emp_id ? true :false}
                autoCompleteProps={{
                  freeSolo: false,
                  getOptionLabel: (option) => option?.label,
                }}
                dataset={listData?.EMPLOYEES}
                datasetKey={"label"}
                onTextChange={(text) => {
                  changeTextData(text, "employee_id");
                }}
                variant={"outlined"}
                label={"Employee"}
                name={"employee_id"}
                isError={errorData?.employee_id}
                value={form?.employee_id}
              />
            </div>
          </div>
          <div className={styles.headingBe}>Credit to Employee Balance</div>
          <div className={styles.formWrap}>
            <div className={styles.formWrapInner}>
              <CustomSelectField
                isError={errorData?.currency}
                errorText={errorData?.currency}
                label={"Currency"}
                value={form?.currency}
                handleChange={(value) => {
                  changeTextData(value, "currency");
                }}
              >
                <MenuItem value="INR">₹</MenuItem>
                <MenuItem value="USD">$</MenuItem>
                <MenuItem value="EUR">€</MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup1"}>
              <CustomTextField
                type="number"
                isError={errorData?.credit_amount}
                errorText={errorData?.credit_amount}
                label={"Amount"}
                value={form?.credit_amount}
                onTextChange={(text) => {
                  changeTextData(text, "credit_amount");
                }}
              />
            </div>
          </div>
          <div className={styles.headingBe}>Debit from Employee Balance</div>
          <div className={styles.formWrap}>
            <div className={styles.formWrapInner}>
              <CustomSelectField
                isError={errorData?.currency}
                errorText={errorData?.currency}
                label={"Currency"}
                value={form?.currency}
                handleChange={(value) => {
                  changeTextData(value, "currency");
                }}
              >
                <MenuItem value="INR">₹</MenuItem>
                <MenuItem value="USD">$</MenuItem>
                <MenuItem value="EUR">€</MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup1"}>
              <CustomTextField
                type="number"
                isError={errorData?.debit_amount}
                errorText={errorData?.debit_amount}
                label={"Amount"}
                value={form?.debit_amount}
                onTextChange={(text) => {
                  changeTextData(text, "debit_amount");
                }}
              />
            </div>
          </div>
          <div className={styles.formWrap}>
            <div className={styles.formWrapInner}>
              <CustomTextField
                isError={errorData?.voucher_no}
                errorText={errorData?.voucher_no}
                label={"Voucher No."}
                value={form?.voucher_no}
                onTextChange={(text) => {
                  changeTextData(text, "voucher_no");
                }}
              />
            </div>
            <div className={"formGroup1"}>
              <CustomDatePicker
                clearable
                label={"Date"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "date");
                }}
                value={form?.date}
                isError={errorData?.date}
              />
            </div>
          </div>
          <div className={styles.formWrap}>
            <CustomTextField
              isError={errorData?.description}
              errorText={errorData?.description}
              label={"Notes"}
              value={form?.description}
              onTextChange={(text) => {
                changeTextData(text, "description");
              }}
            />
          </div>
            <div className={styles.cleckboxWrapper}>
              <div className={styles.checkBox}>
                <input
                  checked={declaration}
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  onChange={() => {
                    setDeclaration((s) => !s);
                  }}
                />
                <label htmlFor="declaration">
                  I approve of the information and action.
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
              SAVE RECORD
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AccountDialog;
