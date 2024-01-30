import { ButtonBase } from "@material-ui/core";
import React from "react";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import ClaimUpper from "./component/ClaimUpper/ClaimUpper";
import useCadreDetailsList from "./CadreDetails.hook";
import ClaimForm from "./component/ClaimForm/ClaimForm.view";
import ImprestClaimFormView from "./component/ImprestClaimForm/ImprestClaimForm.view";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";

function CadreDetails() {
  const {
    refMarrige,
    refCar,
    refMobile,
    handleSubmit,
    refHealth,
    employeeDetail,
    reftravel,
    refLoc,
    refImp,
    form,
    errorData,
    changeTextData,
    onBlurHandler,
  } = useCadreDetailsList({});

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

      <ClaimUpper data={employeeDetail} />
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Cadre Salary</div>
          </h4>
        </div>

        <div className={"formFlex"} id={styles.mobileResponsive}>
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.max_salary}
              errorText={errorData?.max_salary}
              label={"Maximum Salary"}
              value={form?.max_salary}
              onTextChange={(text) => {
                changeTextData(text, "max_salary");
              }}
              onBlur={() => {
                onBlurHandler("max_salary");
              }}
            />
          </div>
          <div className="formGroup">
            <CustomTextField
              type="number"
              isError={errorData?.min_salary}
              errorText={errorData?.min_salary}
              label={"Minimum salary"}
              value={form?.min_salary}
              onTextChange={(text) => {
                changeTextData(text, "min_salary");
              }}
              onBlur={() => {
                onBlurHandler("min_salary");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"} style={{ alignItems: "center" }}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.mdn_salary}
              errorText={errorData?.mdn_salary}
              label={"Median salary"}
              value={form?.mdn_salary}
              onTextChange={(text) => {
                changeTextData(text, "mdn_salary");
              }}
              onBlur={() => {
                onBlurHandler("mdn_salary");
              }}
            />
          </div>
          <div className={"formGroup"} id={styles.mobileBlank}></div>
        </div>
      </div>

      <ClaimForm
        type={"MARRIAGE"}
        title={"Mariage Gift Card Claim"}
        ref={refMarrige}
      />
      <ClaimForm type={"CAR"} title={"Car Maintenance Claim"} ref={refCar} />
      <ClaimForm
        type={"MOBILE"}
        title={"Mobile Reimbursments"}
        ref={refMobile}
      />
      <ClaimForm
        type={"HEALTH"}
        title={"Preventive Health Check-up Claim"}
        ref={refHealth}
      />
      <ClaimForm type={"TRAVEL"} title={"Travel Claim"} ref={reftravel} />
      <ClaimForm
        type={"RELOCATION"}
        title={"Relocation Entitlement"}
        ref={refLoc}
      />
      <ImprestClaimFormView type={"IMPREST"} title={"Imprest"} ref={refImp} />

      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          className={styles.createBtn}
          onClick={handleSubmit}
        >
          Save
        </ButtonBase>
      </div>
    </div>
  );
}

export default CadreDetails;
