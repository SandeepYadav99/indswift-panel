import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, MenuItem } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { removeUnderScore } from "../../../helper/helper";
import StatusPill from "../../../components/Status/StatusPill.component";
import ClaimUpperCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimUpperCard/ClaimUpperCard";
import LoanHistoryIncludeForm from "../LoanProcessDetail/component/LoanHistory/LoanHistoryIncludes.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import LoanTable from "./component/LoanTable/LoanTable.view";
import useProcessDetail from "./ProcessDetail.hook";

function ProcessDetail() {
  const {
    employeeDetail,
    experience,
    form,
    changeTextData,
    onBlurHandler,
    errorData,
    loanDetail,
    viewRecoveryPage,
    toggleStatusDialog,
    id,
    info,
    tabledata,
    afterAmount,
    travelRef,
  } = useProcessDetail({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Employee Loan Processing Sheet</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetail?.employee} isLoan={true} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headWrap}>
            <div className={styles.heading}>Loan Request Form</div>
            <div>
              <StatusPill status={removeUnderScore(employeeDetail?.status)} />
            </div>
          </div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Type of Loan:</span>
                    {removeUnderScore(employeeDetail?.loan_type)}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      Describe your Request for Loan:
                    </span>

                    {employeeDetail?.description}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Amount Requested:</span>
                      {form?.total_applied_loan && `₹ ${form?.total_applied_loan}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Attachments</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.attachments &&
              employeeDetail?.attachments.map((item, index) => (
                <div className={styles.otherWrap} key={`attachment_${index}`}>
                  <div className={styles.mainFlex}>
                    <div className={styles.left}>
                      {item?.document && (
                        <div className={styles.key7}>
                          <a href={item?.document} target="_blank">
                            <div className={styles.hyperlinkText}>
                              {item?.label}
                            </div>
                          </a>
                        </div>
                      )}
                    </div>
                    <div className={styles.right}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Loan Guarantees</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.guarantees &&
              employeeDetail?.guarantees.map((item, index) => (
                <div className={styles.otherWrap} key={`guarantee_${index}`}>
                  <div className={styles.heading}>{`Guarantee ${
                    index + 1
                  }`}</div>
                  <div className={styles.mainFlex}>
                    <div className={styles.left}>
                      <div className={styles.key}>
                        <span className={styles.value}>Employee:</span>
                        {`${item?.name} ( ${item?.emp_code})`}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Location:</span>
                        {item?.location}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Department:</span>
                        {item?.department}
                      </div>{" "}
                      <div className={styles.key}>
                        <span className={styles.value}>Salary:</span>
                        {item?.guaranteeSalary && `₹ ${item?.guaranteeSalary}`}
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.key}>
                        <span className={styles.value}>Designation:</span>
                        {item?.designation}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Grade:</span>
                        {item?.grade}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>DOJ:</span>
                        {item?.doj}
                      </div>
                      {item?.document && (
                        <div className={styles.key}>
                          <a href={item?.document} target="_blank">
                            <div className={styles.hyperlinkText}>Download</div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  {employeeDetail?.guarantees?.length !== index + 1 && (
                    <div className={styles.verti}></div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Previous Loan History</div>
        <LoanHistoryIncludeForm
          experience={experience}
          ref={travelRef}
          isDetail={true}
        />
        <div className={"formGroup"}>
        <CustomTextField
          type="number"
          disabled={true}
          label={"Add Comments"}
          value={form?.loan_history_comment}
          multiline
          rows={3}
          InputLabelProps={{ shrink: true }}
        />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Eligibility Calculations</div>
        <div className={styles.commentContainer}>
          <div className={styles.otherWrap}>
            <div className={styles.mainFlex}>
              <div className={styles.left}>
                <div className={styles.key}>
                  <span className={styles.value}>Basic Salary:</span>
                  {loanDetail?.Basic_salary && `₹ ${loanDetail?.Basic_salary}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>
                    Cap for the Type of Loan:
                  </span>

                  {loanDetail?.cap_for_the_type_of_loan && `₹ ${loanDetail?.cap_for_the_type_of_loan}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Applied Amount:</span>

                  {form?.total_applied_loan && `₹ ${form?.total_applied_loan}`}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.key}>
                  <span className={styles.value}>10 Times of Basic:</span>
                  {loanDetail.salary_multiply &&
                    `₹ ${loanDetail.salary_multiply}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Eligible for Loan of:</span>
                  {loanDetail?.userEligibleForLoan &&
                    `₹ ${loanDetail?.userEligibleForLoan}`}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.formFlex}>
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  disabled={true}
                  label={"Exceptional Approval"}
                  value={form?.exceptional_approval}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  disabled={true}
                  type="number"
                  isError={errorData?.total_applied_loan}
                  errorText={errorData?.total_applied_loan}
                  label={"Total Applied Loan"}
                  value={form?.total_applied_loan}
                  onTextChange={(text) => {
                    changeTextData(text, "total_applied_loan");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  disabled={true}
                  type="number"
                  isError={errorData?.employee_el}
                  errorText={errorData?.employee_el}
                  label={"EL in Account of Employee"}
                  value={form?.employee_el}
                  onTextChange={(text) => {
                    changeTextData(text, "employee_el");
                  }}
                  onBlur={() => {
                    onBlurHandler("employee_el");
                  }}
                />
              </div>
            </div>
            <div className={styles.formFlex}>
              <div className={"formGroup"}>
                <CustomTextField
                  disabled={true}
                  type={"number"}
                  isError={errorData?.employee_el_amount}
                  errorText={errorData?.employee_el_amount}
                  label={"EL Amount of Employee"}
                  value={form?.employee_el_amount}
                  onTextChange={(text) => {
                    changeTextData(text, "employee_el_amount");
                  }}
                  onBlur={() => {
                    onBlurHandler("employee_el_amount");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  disabled={true}
                  type="number"
                  isError={errorData?.gratuity_amount}
                  errorText={errorData?.gratuity_amount}
                  label={"Gratuity Amount"}
                  value={form?.gratuity_amount}
                  onTextChange={(text) => {
                    changeTextData(text, "gratuity_amount");
                  }}
                  onBlur={() => {
                    onBlurHandler("gratuity_amount");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  disabled={true}
                  type="number"
                  isError={errorData?.total_recoverable_amount}
                  errorText={errorData?.total_recoverable_amount}
                  label={"Total Recoverable Amount"}
                  value={form?.total_recoverable_amount}
                  onTextChange={(text) => {
                    changeTextData(text, "total_recoverable_amount");
                  }}
                  onBlur={() => {
                    onBlurHandler("total_recoverable_amount");
                  }}
                />
              </div>
            </div>
            <div className={styles.formFlex}>
              <div className={"formGroup"}>
                <CustomSelectField
                  disabled={true}
                  isError={errorData?.posible_recovery_loan}
                  errorText={errorData?.posible_recovery_loan}
                  label={"Possible Recovery Loan"}
                  value={form?.posible_recovery_loan}
                  handleChange={(value) => {
                    changeTextData(value, "posible_recovery_loan");
                  }}
                >
                  <MenuItem value="YES">YES</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </CustomSelectField>
              </div>
              <div className={"formGroup"}></div>
              <div className={"formGroup"}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>
          Proposal & Recovery Plan (From Site HR)
        </div>
        <div className={styles.commentContainer}>
          <div className={styles.otherWrap}>
            <div className={styles.mainFlex}>
              <div className={styles.left}>
                <div className={styles.key}>
                  <span className={styles.value}>Proposed Loan:</span>
                  {form?.total_applied_loan}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.formFlex}>
              <div className={"formGroup"}>
                <CustomDatePicker
                  disabled={true}
                  clearable
                  label={"Start Date"}
                  //   maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "loan_start_date");
                  }}
                  value={form?.loan_start_date}
                  isError={errorData?.loan_start_date}
                />
              </div>

              <div className={"formGroup"}>
                <CustomDatePicker
                  disabled={true}
                  clearable
                  label={"End Date"}
                  //   maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "loan_end_date");
                  }}
                  value={form?.loan_end_date}
                  isError={errorData?.loan_end_date}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  disabled={true}
                  type="number"
                  isError={errorData?.interest}
                  errorText={errorData?.interest}
                  label={"Applicable Interest %"}
                  value={form?.interest}
                  onTextChange={(text) => {
                    changeTextData(text, "interest");
                  }}
                  onBlur={() => {
                    onBlurHandler("interest");
                  }}
                />
              </div>
            </div>
            <div className={styles.Wrap}>
              <div className={styles.keyWrap}>
                <span className={styles.value}>Tenure (MONTHS)/ EMIs:</span>
                {employeeDetail?.proposal_recovery_plan?.tenure_month} {employeeDetail?.proposal_recovery_plan?.emi && ` / ₹ ${employeeDetail?.proposal_recovery_plan?.emi}`}
              </div>
              <div className={styles.keyWrap}>
                <span className={styles.value}>Net Recovery Amount: </span>
                {employeeDetail?.proposal_recovery_plan?.net_recovery_amount &&
                  `₹ ${employeeDetail?.proposal_recovery_plan?.net_recovery_amount}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>
          Budget Positioning After Considering Loan (From Corporate HR)
        </div>
        {tabledata?.length > 0 && <LoanTable title="hello" data={tabledata} />}
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>
          Loan Sanctioned Details (From Corporate HR)
        </div>
        <div className={styles.otherWrap}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Loan Sanctioned:</span>
                {form?.total_applied_loan}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Loan Case Code (LCC):</span>
                {employeeDetail?.code}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessDetail;
