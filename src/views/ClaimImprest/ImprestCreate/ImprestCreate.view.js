import {
  ButtonBase,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useImprestCreate from "./ImprestCreate.hook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import TravelUpperCard from "../../TravelPlanner/TravelCreate/component/TravelUpperCard/TravelUpperCard";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import StatusPill from "../../../components/Status/StatusPill.component";
import { getCurrency } from "../../../helper/helper";

function ImprestCreate() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    listData,
    errorData,
    declaration,
    setDeclaration,
    employeeDetails,
    amountDetail,
  } = useImprestCreate({});
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Imprest Request</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <TravelUpperCard data={employeeDetails} isImprest={true} />
      <div className={styles.plainPaper}>
        <span className={styles.heading}>
          <b>Imprest Request Form</b>
        </span>
        <div
          className={"formFlex"}
          style={{ paddingBottom: "0", marginTop: "30px" }}
        >
          <div className={styles.radioWrapper}>
            <div className={styles.radioheading}>Imprest Required for:</div>
            <RadioGroup
              aria-label="option"
              name="imprest_type"
              value={form?.imprest_type}
              onChange={(e) => changeTextData(e.target.value, "imprest_type")}
              row
            >
              <FormControlLabel
                value="OTHER"
                control={<Radio />}
                label="Other"
              />
              <FormControlLabel
                style={{ marginLeft: "20px" }}
                value="TRAVEL"
                control={<Radio />}
                label="Travel"
              />
            </RadioGroup>
          </div>
        </div>
        {form?.imprest_type === "TRAVEL" && (
          <div className={styles.AutoWrap}>
            <div className={styles.tapWrap}>
              {listData?.length > 0 && (
                <div className="formGroup" style={{ paddingLeft: "0" }}>
                  <CustomAutoComplete
                    autoCompleteProps={{
                      freeSolo: false,
                      getOptionLabel: (option) => option.code,
                    }}
                    dataset={listData}
                    datasetKey={"code"}
                    onTextChange={(text, value) => {
                      changeTextData(text, "tour_type");
                    }}
                    variant={"outlined"}
                    label={"Choose your Travel Plan Application (TAP)"}
                    name={"tour_type"}
                    isError={errorData?.tour_type}
                    value={form?.tour_type}
                  />
                </div>
              )}
            </div>
            {typeof form?.tour_type === "object" && (
              <div className={styles.write}>
                <div className={styles.key}>
                  <span className={styles.wrap}>Tour Date</span>
                  {form?.tour_type?.startDateText} -
                  {form?.tour_type?.endDateText}
                </div>
                <div className={styles.key}>
                  <span className={styles.wrap}>Status:</span>
                  <StatusPill
                    status={removeUnderScore(form?.tour_type?.status)}
                    style={{ background: "transparent", border: "none" }}
                  />
                </div>
                <div className={styles.key}>
                  <span className={styles.wrap}>Tour Type:</span>
                  {form?.tour_type?.tour_type}
                </div>
              </div>
            )}
          </div>
        )}

        <div className={"formFlex2"}>
          <div className={"formGroup1"} style={{ paddingLeft: "0" }}>
            <CustomTextField
              isError={errorData?.purpose}
              errorText={errorData?.purpose}
              label={"Describe the Purpose"}
              value={form?.purpose}
              onTextChange={(text) => {
                changeTextData(text, "purpose");
              }}
              onBlur={() => {
                onBlurHandler("purpose");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrap2}>
          <div className={styles.formCurr}>
            <div className={styles.formWrapInner}>
              <CustomSelectField
                disabled={form?.imprest_type === 'OTHER' || form?.tour_type?.tour_type === 'DOMESTIC'}
                isError={errorData?.currency}
                errorText={errorData?.currency}
                label={"Currency"}
                value={form?.currency}
                handleChange={(value) => {
                  changeTextData(value, "currency");
                }}
              >
                <MenuItem value="INR">₹</MenuItem>
                <MenuItem value="USD">$</MenuItem>
                <MenuItem value="EUR">€</MenuItem>
              </CustomSelectField>
            </div>
            <div className={styles.amountWrap}>
              <CustomTextField
                type="number"
                isError={errorData?.amount}
                errorText={errorData?.amount}
                label={"Required Amount"}
                value={form?.amount}
                onTextChange={(text) => {
                  changeTextData(text, "amount");
                }}
                onBlur={() => {
                  onBlurHandler("amount");
                }}
              />
            </div>
          </div>

          <div className={styles.maxWrap}>
            {form?.currency && (
              <div className={styles.entitledVa}>
                <div className={styles.valuesV}>
                  <div className={styles.flex1}>Max Entitled:</div> <div className={styles.flex12}>{getCurrency(form?.currency)}{amountDetail[form?.currency]?.entitled}</div>
                </div>
                <div className={styles.valuesV}>
                 <div className={styles.flex1}>Balance Outstanding:</div> <div className={styles.flex12}>{getCurrency(form?.currency)}{amountDetail[form?.currency]?.balance}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.formWrap}>
          <div className={styles.formWrapInner}>
            <CustomSelectField
              disabled={true}
              isError={errorData?.currency}
              errorText={errorData?.currency}
              label={"Currency"}
              value={form?.currency}
              handleChange={(value) => {
                changeTextData(value, "currency");
              }}
            >
              <MenuItem value="INR">₹</MenuItem>
              <MenuItem value="USD">$</MenuItem>
              <MenuItem value="EUR">€</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.amountWrap}>
            <CustomTextField
              disabled={true}
              isError={errorData?.sanctionable_amount}
              errorText={errorData?.sanctionable_amount}
              label={"Sanctionable Amount"}
              value={form?.sanctionable_amount}
              onTextChange={(text) => {
                changeTextData(text, "sanctionable_amount");
              }}
              onBlur={() => {
                onBlurHandler("sanctionable_amount");
              }}
            />
          </div>
        </div>
        <div className={styles.formSelectWrapper}>
          <div className={"formFlex"}>
            <div className={"formGroup"} style={{ paddingLeft: "0" }}>
              <div className={styles.checkBoxWrap}>
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  name={"isSame"}
                  value={"isSame"}
                  onClick={() => {
                    changeTextData(
                      !form?.is_salary_adjustment_agreed,
                      "is_salary_adjustment_agreed"
                    );
                  }}
                  id="exceptions"
                  checked={form?.is_salary_adjustment_agreed}
                />
                <label>
                  Last date of clearing the imprest is 30 days from the date of
                  issue. I understand and authorize that the amount be adjusted
                  against my salary if not returned.
                </label>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cleckboxWrapper}>
        <div className={styles.checkBox}>
          <input
            checked={declaration}
            type="checkbox"
            id="confirmation"
            name="confirmation"
            onChange={() => {
              setDeclaration((s) => !s);
            }}
          />
          <label htmlFor="confirmation">
            I declare the information shared is best of my knowledge.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          disabled={!declaration || isLoading ? true : false}
          className={declaration ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            "Submit"
          )}
        </ButtonBase>
      </div>
    </div>
  );
}

export default ImprestCreate;
