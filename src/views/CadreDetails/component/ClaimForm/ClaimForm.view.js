import React, { useImperativeHandle, forwardRef } from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import useClaimForm from "./ClaimForm.hook";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

const ClaimForm = ({ type, title, resetForm }, ref) => {
  const {
    form,
    setForm,
    errorData,
    changeTextData,
    onBlurHandler,
    handleReset,
    isFormValid,
  } = useClaimForm({ type }, ref);

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
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                type="number"
                isError={errorData?.max_claim}
                errorText={errorData?.max_claim}
                label={"Max No. of Claims"}
                value={form?.max_claim}
                onTextChange={(text) => {
                  changeTextData(text, "max_claim");
                }}
                onBlur={() => {
                  onBlurHandler("max_claim");
                }}
              />
            </div>
            {type === "CAR" ? (
              <div className={"formGroup"}>
                <div className={styles.salaryTxt}>
                  <strong>Max Value in Rs. :</strong>
                  <span>As per Salary Component</span>
                </div>
              </div>
            ) : (
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.max_value}
                  errorText={errorData?.max_value}
                  label={"Max Value in Rs."}
                  value={form?.max_value}
                  onTextChange={(text) => {
                    changeTextData(text, "max_value");
                  }}
                  onBlur={() => {
                    onBlurHandler("max_value");
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default forwardRef(ClaimForm);
