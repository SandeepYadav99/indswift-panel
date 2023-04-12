import React from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import useMarrigeClaimForm from "./MarrigeClaimForm.hook";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

function MarrigeClaimForm({ ref }) {
  const { form, errorData, changeTextData, onBlurHandler } =
    useMarrigeClaimForm({}, ref);
  return (
    <div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Mariage Gift Card Claim</div>
          </h4>
          <div className={"infoTitle"} style={{ justifyContent: "flex-end" }}>
            <div className="info_Status">
              <div className={"heading"}>Show to Employees:</div>
              <div className={styles.toggleWrapper}>
                <p className="tags">NO</p>
                <CustomSwitch
                  value={form?.is_active}
                  handleChange={() => {
                    changeTextData(!form?.is_active, "is_active");
                  }}
                  label={`Yes`}
                />
              </div>
            </div>
          </div>
        </div>

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
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          className={styles.createBtn}
          // onClick={handleSubmit}
        >
          Save
        </ButtonBase>
      </div>
    </div>
  );
}

export default MarrigeClaimForm;
