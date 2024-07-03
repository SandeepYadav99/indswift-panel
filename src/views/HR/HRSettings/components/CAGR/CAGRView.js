import { ButtonBase } from "@material-ui/core";
import React from "react";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useCAGRHook from "./CAGRHook";
import styles from "./Style.module.css";

function CAGRView() {
  const { form, errorData, changeTextData ,handleSubmit} = useCAGRHook({});
  return (
    <div className={styles.cagrWrapper}>
      <div className={styles.Heading}>CAGR Values</div>
      <div className={"formFlex"} id={styles.mobileResponsive}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.company_cagr}
            errorText={errorData?.company_cagr}
            label={"Company CAGR"}
            value={form?.company_cagr}
            onTextChange={(text) => {
              changeTextData(text, "company_cagr");
            }}
          />
        </div>

        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.manpower_cagr}
            errorText={errorData?.manpower_cagr}
            label={"Manpower CAGR"}
            value={form?.manpower_cagr}
            onTextChange={(text) => {
              changeTextData(text, "manpower_cagr");
            }}
          />
        </div>
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

export default CAGRView;
