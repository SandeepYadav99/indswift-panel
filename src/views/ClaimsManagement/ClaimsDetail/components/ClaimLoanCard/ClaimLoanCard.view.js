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
import ClaimInfo from "../ClaimInfo/ClaimInfo";
import { useState } from "react";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useClaimLoanCard from "./ClaimLoanCard.hook";
import DetailsIncludeForm from "./component/Detailsincludes/DetailsIncludes.component";
import CoIncludeForm from "./component/Coincludes/Coinclude.component";
import OtherDetailsIncludeForm from "./component/OtherDetailsincludes/OtherDetailsIncludes.component";
import { CheckBox } from "@material-ui/icons";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

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
    claimInfo,
    getMonthsInRange,
    travelRef,
    otherRef,
    coRef,
    getTravelAmount,
    getotherAmount,
    startDate,
    endDate,
    employees,
    isChecked,
    handleCheckboxChange,
  } = useClaimLoanCard({});

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
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Loan Request Form</div>
          {/* <ClaimInfo idCards={claimInfo} isLocal={true} /> */}
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Full Name"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  onBlurHandler("name");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Amount Requested"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  onBlurHandler("name");
                }}
              />
            </div>

          </div>
          <div className={"formFlex"}>

            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Describe your Request for Loan"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  onBlurHandler("name");
                }}
              />
            </div>

          </div>
          {/* <div className={styles.formSelectWrapper}>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.rem_month}
                errorText={errorData?.rem_month}
                label={"Choose Reimbursement Month"}
                value={form?.rem_month}
                handleChange={(value) => {
                  changeTextData(value, "rem_month");
                }}
              >
                {getMonthsInRange()?.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="od1"
                label="Upload OD Screenshot 1"
                accept={"application/pdf,application/msword,image/*"}
                link={editData?.od_ss ? editData?.od_ss : null}
                error={errorData?.od_ss}
                value={form?.od_ss}
                placeholder={"Upload OD Screenshot 1"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "od_ss");
                  }
                }}
              />
            </div>
            <div className={"formGroup"}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="od2"
                label="Upload OD Screenshot 2"
                accept={"application/pdf,application/msword,image/*"}
                link={editData?.od_ss_2 ? editData?.od_ss_2 : null}
                error={errorData?.od_ss_2}
                value={form?.od_ss_2}
                placeholder={"Upload OD Screenshot 2"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "od_ss_2");
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.checkWrapper}>
            <div className={styles.chkwrapp}>
              <Checkbox
                disabled={false}
                onChange={handleCheckboxChange}
                checked={isChecked}
                value="secondary"
                color="primary"
                size="small"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span className={styles.spanchk}>
                Do you have a co-traveler?
              </span>
            </div>
            {isChecked && (
              <div>
                <CoIncludeForm
                  ref={coRef}
                  employees={employees}
                  isChecked={isChecked}
                  employeeId={employeeDetails?.id}
                />
              </div>
            )}
          </div>
        </div> */}
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Attachments</div>
          <div>
            <DetailsIncludeForm
              startDate={startDate}
              endDate={endDate}
              ref={travelRef}
              grade={employeeDetails?.grade?.code}
              getTravelAmount={getTravelAmount}
              month={form?.rem_month}
            />
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
                  getOptionLabel: (option) => option.label,
                }}
                dataset={""}
                datasetKey={"label"}
                onTextChange={(text, value) => {
                  // handleChangeValue(text, "co_passengers");
                }}
                variant={"outlined"}
                label={"Guarantee 1"}
                name={"co_passengers"}
              // isError={errors?.co_passengers}
              // value={data?.co_passengers}
              />
            </div>
            <div className={"formGroup"} style={{marginLeft:36,marginTop:7}}>

              <div className={styles.mainFlex}>
                <div className={styles.left221}>

                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{width:87}}>Location:</span>
                      {/* {data?.name} */}
                      ISL- SAMBA
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{width:87}}>Department:</span>
                      {/* {data?.emp_code} */}
                      Engineering
                    </div>


                  </div>
                </div>
              </div>

              {/* <div className={styles.vertical}></div> */}
              {/* <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>
              {data?.designation?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade/Cadre:</span>
              {`${data?.grade?.code} / ${data?.cadre?.code}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              {data?.department?.name}
            </div>
          </div> */}
            </div>
            <div className={"formGroup"} style={{marginTop:7}}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value}style={{width:87}}>Designation:</span>
                      Manager
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}style={{width:87}}>Grade:</span>
                      C1
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"}style={{marginTop:7}}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value}style={{width:37}}>DOJ:</span>
                      02/08/2019
                    </div>
                    {/* <div className={styles.key}>
                      <span className={styles.value}>Department:</span>
                      Engineering
                    </div> */}
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
                  getOptionLabel: (option) => option.label,
                }}
                dataset={""}
                datasetKey={"label"}
                onTextChange={(text, value) => {
                  // handleChangeValue(text, "co_passengers");
                }}
                variant={"outlined"}
                label={"Guarantee 2"}
                name={"co_passengers"}
                // icon={}
              // isError={errors?.co_passengers}
              // value={data?.co_passengers}
              />
            </div>
            <div className={"formGroup"} style={{marginLeft:36,marginTop:7}}>

              <div className={styles.mainFlex}>
                <div className={styles.left221}>

                  <div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{width:87}}>Location:</span>
                      {/* {data?.name} */}
                      ISL- SAMBA
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value} style={{width:87}}>Department:</span>
                      {/* {data?.emp_code} */}
                      Engineering
                    </div>


                  </div>
                </div>
              </div>

              {/* <div className={styles.vertical}></div> */}
              {/* <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Designation:</span>
              {data?.designation?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Grade/Cadre:</span>
              {`${data?.grade?.code} / ${data?.cadre?.code}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Department:</span>
              {data?.department?.name}
            </div>
          </div> */}
            </div>
            <div className={"formGroup"} style={{marginTop:7}}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value}style={{width:87}}>Designation:</span>
                      Manager
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}style={{width:87}}>Grade:</span>
                      C1
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"formGroup"}style={{marginTop:7}}>
              <div className={styles.mainFlex}>
                <div className={styles.left221}>
                  <div>
                    <div className={styles.key}>
                      <span className={styles.value}style={{width:37}}>DOJ:</span>
                      02/08/2019
                    </div>
                    {/* <div className={styles.key}>
                      <span className={styles.value}>Department:</span>
                      Engineering
                    </div> */}
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
                {" "}
                I confirm the consideration and discussion with the guarantors for the loan application I am requesting
              </label>
              <br />
            </div>
          </div>
          {/* <div>
            <OtherDetailsIncludeForm
              startDate={startDate}
              endDate={endDate}
              ref={otherRef}
              grade={employeeDetails?.grade?.code}
              getotherAmount={getotherAmount}
              month={form?.rem_month}
            />
          </div> */}
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
            I declare that I have applied for above mentioned Loan from Organization. I understand that this application is subject of approval or amendment at complete discretion of Organization. I also understand that if I default on the approved loan amount, organization is at liberty to adjust or deduct this amount from my Salary or from other dues including Gratuity, EL or other statutory Payments. In that situation I will have no claim on any of these components & organization can use them to deduct as recovery of loan.
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

export default ClaimLoanCard;
