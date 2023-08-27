import {
  ButtonBase,
  Checkbox,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import styles from "./Style.module.css";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useClaimLoanCard from "./ClaimLoanCard.hook";
import DetailsIncludeForm from "./component/Detailsincludes/DetailsIncludes.component";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import {
  dropDownValuesLoan,
  removeUnderScore,
} from "../../../../../helper/helper";
import { useMemo } from "react";

function ClaimLoanCard() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    travelRef,
    employees,
    currentExp,
    isChecked,
    setIsChecked,
    filteredEmployees
  } = useClaimLoanCard({});

  const eligibleLoans = useMemo(() => {
    const eligible = dropDownValuesLoan.filter(
      (loan) => currentExp > loan.experienceRequired
    );
    return eligible.map((loan) => loan.type);
  }, [currentExp, dropDownValuesLoan]);

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Loan Application Request</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails} isLoan={true} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Loan Request Form</div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.loan_type}
                errorText={errorData?.loan_type}
                label={"Type of Loan"}
                value={form?.loan_type}
                handleChange={(value) => {
                  changeTextData(value, "loan_type");
                }}
              >
                {eligibleLoans?.map((item) => (
                  <MenuItem value={item}>{removeUnderScore(item)}</MenuItem>
                ))}
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                type="number"
                isError={errorData?.amount}
                errorText={errorData?.amount}
                label={"Amount Requested"}
                value={form?.amount}
                onTextChange={(text) => {
                  changeTextData(text, "amount");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.description}
                errorText={errorData?.description}
                label={"Describe your Request for Loan"}
                value={form?.description}
                onTextChange={(text) => {
                  changeTextData(text, "description");
                }}
                onBlur={() => {
                  onBlurHandler("description");
                }}
                multiline
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Attachments</div>
          <div>
            <DetailsIncludeForm ref={travelRef} />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Loan Guarantees</div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomAutoComplete
                autoCompleteProps={{
                  freeSolo: false,
                  getOptionLabel: (option) => option?.label,
                }}
                dataset={filteredEmployees}
                datasetKey={"label"}
                onTextChange={(text, value) => {
                  changeTextData(text, "g1");
                }}
                variant={"outlined"}
                label={"Guarantee 1"}
                name={"g1"}
                isError={errorData?.g1}
                value={form?.g1}
              />
            </div>
            <div
              className={"formGroup"}
              style={{ marginLeft: 36, marginTop: 7 }}
            >
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Location:
                      </span>
                      {form?.g1?.location}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Department:
                      </span>
                      {form?.g1?.department}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"} style={{ marginTop: 7 }}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Designation:
                      </span>
                      {form?.g1?.designation}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Grade:
                      </span>
                      {form?.g1?.grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"} style={{ marginTop: 7 }}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 37 }}>
                        DOJ:
                      </span>
                      {form?.g1?.doj}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomAutoComplete
                autoCompleteProps={{
                  freeSolo: false,
                  getOptionLabel: (option) => option?.label,
                }}
                dataset={filteredEmployees}
                datasetKey={"label"}
                onTextChange={(text, value) => {
                  changeTextData(text, "g2");
                }}
                variant={"outlined"}
                label={"Guarantee 2"}
                name={"g2"}
                isError={errorData?.g2}
                value={form?.g2}
              />
            </div>
            <div
              className={"formGroup"}
              style={{ marginLeft: 36, marginTop: 7 }}
            >
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Location:
                      </span>
                      {form?.g2?.location}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Department:
                      </span>
                      {form?.g2?.department}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"} style={{ marginTop: 7 }}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Designation:
                      </span>
                      {form?.g2?.designation}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Grade:
                      </span>
                      {form?.g2?.grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"} style={{ marginTop: 7 }}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 37 }}>
                        DOJ:
                      </span>
                      {form?.g2?.doj}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomAutoComplete
                autoCompleteProps={{
                  freeSolo: false,
                  getOptionLabel: (option) => option?.label,
                }}
                dataset={filteredEmployees}
                datasetKey={"label"}
                onTextChange={(text, value) => {
                  changeTextData(text, "g3");
                }}
                variant={"outlined"}
                label={"Guarantee 2"}
                name={"g3"}
                isError={errorData?.g3}
                value={form?.g3}
              />
            </div>
            <div
              className={"formGroup"}
              style={{ marginLeft: 36, marginTop: 7 }}
            >
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Location:
                      </span>
                      {form?.g3?.location}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Department:
                      </span>
                      {form?.g3?.department}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"} style={{ marginTop: 7 }}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Designation:
                      </span>
                      {form?.g3?.designation}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 87 }}>
                        Grade:
                      </span>
                      {form?.g3?.grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"} style={{ marginTop: 7 }}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{ width: 37 }}>
                        DOJ:
                      </span>
                      {form?.g3?.doj}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className={styles.cleckboxWrapper}>
            <div className={styles.checkBox}>
              <input
                checked={isChecked}
                type="checkbox"
                id="loanDec"
                name="loanDec"
                onChange={() => {
                  setIsChecked((s) => !s);
                }}
              />
              <label htmlFor="loanDec">
                I confirm the consideration and discussion with the guarantors
                for the loan application I am requesting
              </label>
              <br />
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
            {" "}
            I declare that I have applied for above mentioned Loan from
            Organization. I understand that this application is subject of
            approval or amendment at complete discretion of Organization. I also
            understand that if I default on the approved loan amount,
            organization is at liberty to adjust or deduct this amount from my
            Salary or from other dues including Gratuity, EL or other statutory
            Payments. In that situation I will have no claim on any of these
            components & organization can use them to deduct as recovery of
            loan.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          disabled={!declaration || !isChecked || isLoading ? true : false}
          className={
            declaration && isChecked
              ? styles.createBtn
              : styles.disabledCreatebtn
          }
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

export default ClaimLoanCard;
