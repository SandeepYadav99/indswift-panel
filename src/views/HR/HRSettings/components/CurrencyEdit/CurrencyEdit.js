import { ButtonBase } from "@material-ui/core";
import React from "react";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";
import useUSCEditHook from "./CurrencyEditHook";

function CurrencyEditView() {
  const { form, errorData, changeTextData, handleSubmit,detail } = useUSCEditHook({});
  return (
    <div className={styles.cagrWrapper}>
      <div className={styles.Heading}>Currency Conversion - {detail?.currency}</div>
      <div className={"formFlex"} style={{marginTop:'20px'}}>
        <div className={"formGroup"}>
          <CustomTextField
            type="number"
            isError={errorData?.conversion_rate}
            errorText={errorData?.conversion_rate}
            label={"Conversion Rate"}
            value={form?.conversion_rate}
            onTextChange={(text) => {
              changeTextData(text, "conversion_rate");
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
            Update
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default CurrencyEditView;
