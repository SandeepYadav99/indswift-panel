import { ButtonBase } from "@material-ui/core";
import React from "react";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";
import useUSCEditHook from "./USCEditHook";

function USCEditView() {
  const { form, errorData, changeTextData, handleSubmit } = useUSCEditHook({});
  return (
    <div className={styles.cagrWrapper}>
      <div className={styles.Heading}>Universal Salary Calculator</div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            type="number"
            isError={errorData?.basic_salary}
            errorText={errorData?.basic_salary}
            label={"Basic Salary"}
            value={form?.basic_salary}
            onTextChange={(text) => {
              changeTextData(text, "basic_salary");
            }}
          />
        </div>
      </div>
      <div className={"formGroup"}>
        <CustomTextField
          type="number"
          isError={errorData?.annual_bonus}
          errorText={errorData?.annual_bonus}
          label={"Annual Bonus"}
          value={form?.annual_bonus}
          onTextChange={(text) => {
            changeTextData(text, "annual_bonus");
          }}
        />
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btnCont1}>
          <ButtonBase
            type={"button"}
            onClick={handleSubmit}
            className={styles.createBtn}
          >
            NEXT
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default USCEditView;
