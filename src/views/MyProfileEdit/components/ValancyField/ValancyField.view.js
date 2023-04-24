import React, { useImperativeHandle, forwardRef } from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import useValancyField from "./ValancyField.hook";
import styles from "./Style.module.css";
import { ButtonBase, TextField } from "@material-ui/core";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import { Add } from "@material-ui/icons";

const ValancyField = ({ type, title, resetForm }, ref) => {
  const {
    form,
    setForm,
    errorData,
    changeTextData,
    onBlurHandler,
    handleReset,
    isFormValid,
    enableField,
    setEnableField,
  } = useValancyField({ type }, ref);

  useImperativeHandle(ref, () => ({
    isValid() {
      return isFormValid();
    },
    resetData() {
      handleReset();
    },
    setData(data) {
      setForm({ ...data });
    },
    getData() {
      return {
        type: type,
        data: form,
      };
    },
  }));

  return (
    <div>
      {/* <div className={"plainPaper"}> */}
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <div className={"heading"}>{title}</div>
        </h4>
        <div className={"infoTitle"} style={{ justifyContent: "flex-end" }}>
          {enableField ? (
            <ButtonBase
              className={styles.removeBtn}
              onClick={() => {
                setEnableField(false);
              }}
            >
              Remove
            </ButtonBase>
          ) : (
            <ButtonBase
              className={styles.addition}
              label={"+"}
              onClick={() => {
                setEnableField(true);
              }}
            >
              <Add fontSize={"small"} /> <span>Add Nominee</span>
            </ButtonBase>
          )}
        </div>
      </div>
      {enableField && (
        <>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Name"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  onBlurHandler("name");
                }}
              />
            </div>

            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.Relation}
                errorText={errorData?.Relation}
                label={"Relation"}
                value={form?.Relation}
                onTextChange={(text) => {
                  changeTextData(text, "Relation");
                }}
                onBlur={() => {
                  onBlurHandler("Relation");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomDatePicker
                name="dob"
                clearable
                label={"Child DOB"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "dob");
                }}
                value={form?.dob}
                isError={errorData?.dob}
              />
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                type="number"
                isError={errorData?.aadhar_no}
                errorText={errorData?.aadhar_no}
                label={"Aadhar Number"}
                value={form?.aadhar_no}
                onTextChange={(text) => {
                  changeTextData(text, "aadhar_no");
                }}
                onBlur={() => {
                  onBlurHandler("aadhar_no");
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* </div> */}
    </div>
  );
};

export default forwardRef(ValancyField);
