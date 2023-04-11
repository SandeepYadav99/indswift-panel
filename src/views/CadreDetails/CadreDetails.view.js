import { ButtonBase } from "@material-ui/core";
import React from "react";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import ClaimUpper from "./component/ClaimUpper/ClaimUpper";
import useCadreDetailsList from "./CadreDetails.hook";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../components/FormFields/CustomSwitch";

function CadreDetails() {
  const { form, errorData } = useCadreDetailsList({});
  return (
    <div className={styles.cadreDetailWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> Entitlements Information</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpper />
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
                  // handleChange={() => {
                  //   changeTextData(!form?.is_active, "is_active");
                  // }}
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
              isError={errorData?.approved_count}
              errorText={errorData?.approved_count}
              label={"Max No. of Claims"}
              value={form?.approved_count}
              // onTextChange={(text) => {
              //   changeTextData(text, "approved_count");
              // }}
              // onBlur={() => {
              //   onBlurHandler("approved_count");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.approved_count}
              errorText={errorData?.approved_count}
              label={"Max Value in Rs."}
              value={form?.approved_count}
              // onTextChange={(text) => {
              //   changeTextData(text, "approved_count");
              // }}
              // onBlur={() => {
              //   onBlurHandler("approved_count");
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadreDetails;
