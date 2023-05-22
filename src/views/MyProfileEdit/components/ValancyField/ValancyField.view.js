import React, { useImperativeHandle, forwardRef } from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useValancyField from "./ValancyField.hook";
import styles from "./Style.module.css";
import { ButtonBase, TextField } from "@material-ui/core";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import { Add } from "@material-ui/icons";

const ValancyField = ({ type, title }, ref) => {
  const {
    form,
    setForm,
    errorData,
    changeTextData,
    onBlurHandler,
    handleReset,
    isFormValid,
    enableField,
    isChanged,
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
      const values = {};
      Object.keys(data).forEach(key => {
        if (key === "name" || key === "relation" || key === "dob" || key === 'aadhar_no') {
          values[key] = data[key];
        }
      });
      setForm({ ...values });
    },
    getData() {
      return {
        type: type,
         ...form,
         isChanged
      };
    },
  }));

  return (
    <div>
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
                isError={errorData?.relation}
                errorText={errorData?.relation}
                label={"Relation"}
                value={form?.relation}
                onTextChange={(text) => {
                  changeTextData(text, "relation");
                }}
                onBlur={() => {
                  onBlurHandler("relation");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomDatePicker
                name="dob"
                clearable
                label={"DOB"}
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
    </div>
  );
};

export default forwardRef(ValancyField);
