import React, { useImperativeHandle, forwardRef } from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import useImprestClaimForm from "./ImprestClaimForm.hook";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

const ImprestClaimForm = ({ type, title, resetForm }, ref) => {
  const {
    form,
    setForm,
    errorData,
    changeTextData,
    onBlurHandler,
    handleReset,
    isFormValid,
  } = useImprestClaimForm({ type }, ref);

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
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>{title}</div>
          </h4>
          <div className={"infoTitle"} style={{ justifyContent: "flex-end" }}>
            <div className="info_Status">
              <div className={"heading"}>Show to Employees:</div>
              <div className={styles.toggleWrapper}>
                <p className="tags">NO</p>
                <CustomSwitch
                  value={form?.is_show}
                  handleChange={() => {
                    changeTextData(!form?.is_show, "is_show");
                  }}
                  label={`Yes`}
                />
              </div>
            </div>
          </div>
        </div>
        {form?.is_show && (
          <>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.max_value_inr}
                  errorText={errorData?.max_value_inr}
                  label={"Max Value in Rs."}
                  value={form?.max_value_inr}
                  onTextChange={(text) => {
                    changeTextData(text, "max_value_inr");
                  }}
                  onBlur={() => {
                    onBlurHandler("max_value_inr");
                  }}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.max_value_eur}
                  errorText={errorData?.max_value_eur}
                  label={"Max Value in Euro"}
                  value={form?.max_value_eur}
                  onTextChange={(text) => {
                    changeTextData(text, "max_value_eur");
                  }}
                  onBlur={() => {
                    onBlurHandler("max_value_eur");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"} style={{ width: "50%" }}>
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.max_value_usd}
                  errorText={errorData?.max_value_usd}
                  label={"Max Value in Dollar"}
                  value={form?.max_value_usd}
                  onTextChange={(text) => {
                    changeTextData(text, "max_value_usd");
                  }}
                  onBlur={() => {
                    onBlurHandler("max_value_usd");
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default forwardRef(ImprestClaimForm);
