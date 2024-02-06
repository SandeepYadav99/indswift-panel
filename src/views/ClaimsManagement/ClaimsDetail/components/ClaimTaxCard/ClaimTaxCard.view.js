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
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import useClaimMarrigeCard from "./ClaimTaxCard.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import MultiFile from "./component/FileComponent/FileMultiComponent.component";
import UpperCard from "./component/UpperCard/UpperCard";
import RentFieldIncludeForm from "./component/RentField/RentFieldIncludes.component";
import ChildFieldIncludeForm from "./component/ChildField/ChildFieldIncludes.component";

function ClaimTaxCard() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    declaration,
    setDeclaration,
    employeeDetails,
    getUrlfromFile,
    deleteImage,
    rentRef,
    childRef,
    submitToServer,
    isTodayInFiscalYear,
  } = useClaimMarrigeCard({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Tax Rebate Claim</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <UpperCard data={employeeDetails} />

        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomSelectField
              isError={errorData?.fy_year}
              errorText={errorData?.fy_year}
              label={"Choose Financial Year"}
              value={form?.fy_year}
              handleChange={(value) => {
                changeTextData(value, "fy_year");
              }}
            >
              <MenuItem value="2023-2024">2023-2024</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.formGrp}></div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>House Rent Allowance</div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              disabled={true}
              isError={errorData?.hra_received}
              errorText={errorData?.hra_received}
              label={"HRA Received"}
              value={form?.hra_received}
              onTextChange={(text) => {
                changeTextData(text, "hra_received");
              }}
              // onBlur={() => {
              //   onBlurHandler("hra_received");
              // }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.fy_rent_paid}
              errorText={errorData?.fy_rent_paid}
              label={"Total Rent Paid in FY (All Landlords)"}
              value={form?.fy_rent_paid}
              onTextChange={(text) => {
                changeTextData(text, "fy_rent_paid");
              }}
              onBlur={() => {
                onBlurHandler("fy_rent_paid");
              }}
            />
          </div>
        </div>
        <div className={styles.heading}>Max HRA Allowance</div>
        <div className={styles.basicWrap}>
          <div className={styles.salaryInner}>
            50% of Basic Salary for Metro Cities (For Delhi, Mumbai):{" "}
            <span>{form?.hra_allowance_fifty_pct}</span>
          </div>
          <div className={styles.salaryInner}>
            40% of Basic Salary for Non-Metro Cities:{" "}
            <span>{form?.hra_allowance_forty_pct}</span>
          </div>
          <div className={styles.salaryInner}>
            Total Rent Paid - 10 % of Basic Salary:{" "}
            <span>{form?.hra_allowance_rent_paid}</span>
          </div>
        </div>
        <RentFieldIncludeForm ref={rentRef} getAmount={changeTextData} />
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount :
            <span>
              {form?.house_rent_total ? `₹ ${form?.house_rent_total}` : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Permitted HRA Allowance:
            <span>{form?.hra_permitted ? `₹ ${form?.hra_permitted}` : 0}</span>
          </div>
        </div>
        <div className={styles.heading} style={{ marginBottom: "10px" }}>
          Note :
        </div>
        <div className={styles.dec}>1. Only 2 Landlords can be added</div>
        <div className={styles.dec}>
          2. Permanent Account Number shall be furnished if the aggregate rent
          paid during the previous year exceeds one lakh rupees
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>
            Deduction of Interest on Borrowing
          </div>
        </div>

        <div className={styles.formSelectWrapper}>
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.lender_name}
                errorText={errorData?.lender_name}
                label={"Lender Name"}
                value={form?.lender_name}
                onTextChange={(text) => {
                  changeTextData(text, "lender_name");
                }}
                // onBlur={() => {
                //   onBlurHandler("lender_name");
                // }}
              />
            </div>
            <div className={styles.formGrp}>
              <CustomTextField
                type="number"
                isError={errorData?.interest_paid}
                errorText={errorData?.interest_paid}
                label={"Interest payable/paid to the lender"}
                value={form?.interest_paid}
                onTextChange={(text) => {
                  changeTextData(text, "interest_paid");
                }}
                // onBlur={() => {
                //   onBlurHandler("interest_paid");
                // }}
              />
            </div>
          </div>
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.lender_address}
                errorText={errorData?.lender_address}
                label={"Address of Lender"}
                value={form?.lender_address}
                onTextChange={(text) => {
                  changeTextData(text, "lender_address");
                }}
                // onBlur={() => {
                //   onBlurHandler("lender_address");
                // }}
              />
            </div>
            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.lender_pan}
                errorText={errorData?.lender_pan}
                label={"Lender PAN"}
                value={form?.lender_pan}
                onTextChange={(text) => {
                  changeTextData(text, "lender_pan");
                }}
                // onBlur={() => {
                //   onBlurHandler("lender_pan");
                // }}
              />
            </div>
          </div>
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.financial_institutions}
                errorText={errorData?.financial_institutions}
                label={"Financial Institutions (if available)"}
                value={form?.financial_institutions}
                onTextChange={(text) => {
                  changeTextData(text, "financial_institutions");
                }}
                // onBlur={() => {
                //   onBlurHandler("financial_institutions");
                // }}
              />
            </div>
            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.employer}
                errorText={errorData?.employer}
                label={"Employer (if available)"}
                value={form?.employer}
                onTextChange={(text) => {
                  changeTextData(text, "employer");
                }}
                // onBlur={() => {
                //   onBlurHandler("employer");
                // }}
              />
            </div>
          </div>
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.others}
                errorText={errorData?.others}
                label={"Others"}
                value={form?.others}
                onTextChange={(text) => {
                  changeTextData(text, "others");
                }}
                // onBlur={() => {
                //   onBlurHandler("others");
                // }}
              />
            </div>
            <div className={styles.formGrp}>
              <MultiFile
                multiple
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                // type={["jpeg", "jpg", "png","pdf"]}
                fullWidth={true}
                name="deduction_borrowing_evidences"
                label="Attach Evidence"
                accept={"application/pdf,application/msword,image/*"}
                // accept={"image/*"}
                error={errorData?.deduction_borrowing_evidences}
                value={form?.deduction_borrowing_evidences}
                placeholder={"Attach Evidence"}
                onChange={(file) => {
                  getUrlfromFile(file, "deduction_borrowing_evidences");
                }}
                deleteImage={(file) => {
                  deleteImage(file, "deduction_borrowing_evidences");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingStart}>Deduction under Chapter VI-A</div>
        <div className={styles.heading}>(A) Section 80C,80CCC and 80CCD</div>
        <div className={styles.headingLast}>(i) Section 80C</div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.life_insurance}
              errorText={errorData?.life_insurance}
              label={"Life Insurance Amount"}
              value={form?.life_insurance}
              onTextChange={(text) => {
                changeTextData(text, "life_insurance");
              }}
              // onBlur={() => {
              //   onBlurHandler("life_insurance");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="life_insurance_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.life_insurance_evidence}
              value={form?.life_insurance_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "life_insurance_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "life_insurance_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.term_insurance}
              errorText={errorData?.term_insurance}
              label={"Term Insurance Amount"}
              type="number"
              value={form?.term_insurance}
              onTextChange={(text) => {
                changeTextData(text, "term_insurance");
              }}
              // onBlur={() => {
              //   onBlurHandler("term_insurance");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="term_insurance_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.term_insurance_evidence}
              value={form?.term_insurance_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "term_insurance_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "term_insurance_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.mutual_funds}
              errorText={errorData?.mutual_funds}
              label={"Mutual Insurance Amount"}
              value={form?.mutual_funds}
              onTextChange={(text) => {
                changeTextData(text, "mutual_funds");
              }}
              // onBlur={() => {
              //   onBlurHandler("mutual_funds");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="mutual_funds_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.mutual_funds_evidence}
              value={form?.mutual_funds_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "mutual_funds_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "mutual_funds_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.sukanya_samriddhi}
              errorText={errorData?.sukanya_samriddhi}
              label={"Sukanya Samriddhi Scheme Amount"}
              value={form?.sukanya_samriddhi}
              onTextChange={(text) => {
                changeTextData(text, "sukanya_samriddhi");
              }}
              // onBlur={() => {
              //   onBlurHandler("sukanya_samriddhi");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="sukanya_samriddhi_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.sukanya_samriddhi_evidence}
              value={form?.sukanya_samriddhi_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "sukanya_samriddhi_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "sukanya_samriddhi_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.heading} style={{ marginBottom: "10px" }}>
          Tuition Fees of Child (max. 2)
        </div>
        <ChildFieldIncludeForm
          ref={childRef}
          // grade={employeeDetails?.grade?.code}
          getAmount={changeTextData}
        />
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.epf}
              errorText={errorData?.epf}
              label={"Employee Provident Fund Amount"}
              type="number"
              value={form?.epf}
              onTextChange={(text) => {
                changeTextData(text, "epf");
              }}
              // onBlur={() => {
              //   onBlurHandler("epf");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="epf_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.epf_evidence}
              value={form?.epf_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "epf_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "epf_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.ppf}
              errorText={errorData?.ppf}
              label={"PPF Amount"}
              type="number"
              value={form?.ppf}
              onTextChange={(text) => {
                changeTextData(text, "ppf");
              }}
              // onBlur={() => {
              //   onBlurHandler("ppf");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="ppf_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.ppf_evidence}
              value={form?.ppf_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "ppf_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "ppf_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.house_loan_principle}
              errorText={errorData?.house_loan_principle}
              label={"Principle of Housing Loan Repayment Amount"}
              type="number"
              value={form?.house_loan_principle}
              onTextChange={(text) => {
                changeTextData(text, "house_loan_principle");
              }}
              // onBlur={() => {
              //   onBlurHandler("house_loan_principle");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="house_loan_principle_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.house_loan_principle_evidence}
              value={form?.house_loan_principle_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "house_loan_principle_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "house_loan_principle_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.fd_five_year}
              errorText={errorData?.fd_five_year}
              label={"Five year Fixed Deposit Amount"}
              type="number"
              value={form?.fd_five_year}
              onTextChange={(text) => {
                changeTextData(text, "fd_five_year");
              }}
              // onBlur={() => {
              //   onBlurHandler("fd_five_year");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="fd_five_year_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.fd_five_year_evidence}
              value={form?.fd_five_year_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "fd_five_year_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "fd_five_year_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.headingLast}>(ii) Section 80CCC</div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.eighty_ccc}
              errorText={errorData?.eighty_ccc}
              label={"Amount"}
              type="number"
              value={form?.eighty_ccc}
              onTextChange={(text) => {
                changeTextData(text, "eighty_ccc");
              }}
              // onBlur={() => {
              //   onBlurHandler("eighty_ccc");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="eighty_ccc_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.eighty_ccc_evidence}
              value={form?.eighty_ccc_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "eighty_ccc_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "eighty_ccc_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.headingLast}>(ii) Section 80CCD</div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.eighty_ccd}
              errorText={errorData?.eighty_ccd}
              label={"Amount"}
              type="number"
              value={form?.eighty_ccd}
              onTextChange={(text) => {
                changeTextData(text, "eighty_ccd");
              }}
              // onBlur={() => {
              //   onBlurHandler("eighty_ccd");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="eighty_ccd_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.eighty_ccd_evidence}
              value={form?.eighty_ccd_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "eighty_ccd_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "eighty_ccd_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount under (A):
            <span>
              {form?.total_eighty_c ? `₹ ${form?.total_eighty_c}` : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Note: Maximum of (A) is 1.5 lacs
          </div>
        </div>
        <div className={styles.heading} style={{ marginTop: "10px" }}>
          (B) Section 80D
        </div>
        <div className={styles.formGrp}>
          <div className={styles.radioWrapper}>
            <RadioGroup
              aria-label="option"
              name="is_family_senior_citizen"
              value={form?.is_family_senior_citizen}
              onChange={(e) =>
                changeTextData(e.target.value, "is_family_senior_citizen")
              }
              row
              className={styles.radioWrap}
            >
              <FormControlLabel
                value="NO"
                control={<Radio />}
                label="If you or any of your family member (Excluding parents) is NOT a senior citizen"
              />
              <FormControlLabel
                value="YES"
                control={<Radio />}
                label="If you or any of your family member (Excluding parents) is a senior citizen"
              />
            </RadioGroup>
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.family_insurance}
              errorText={errorData?.family_insurance}
              label={"Health Insurance"}
              value={form?.family_insurance}
              onTextChange={(text) => {
                changeTextData(text, "family_insurance");
              }}
              // onBlur={() => {
              //   onBlurHandler("family_insurance");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="family_insurance_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.family_insurance_evidence}
              value={form?.family_insurance_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "family_insurance_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "family_insurance_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.family_phc}
              errorText={errorData?.family_phc}
              label={"Preventive Health Check Up"}
              value={form?.family_phc}
              onTextChange={(text) => {
                changeTextData(text, "family_phc");
              }}
              // onBlur={() => {
              //   onBlurHandler("family_phc");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="family_phc_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.family_phc_evidence}
              value={form?.family_phc_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "family_phc_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "family_phc_evidence");
              }}
            />
          </div>
        </div>
        {form?.is_family_senior_citizen === "YES" && (
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <CustomTextField
                type="number"
                isError={errorData?.family_medical_expenditure}
                errorText={errorData?.family_medical_expenditure}
                label={"Medical Expenditure"}
                value={form?.family_medical_expenditure}
                onTextChange={(text) => {
                  changeTextData(text, "family_medical_expenditure");
                }}
                // onBlur={() => {
                //   onBlurHandler("family_medical_expenditure");
                // }}
              />
            </div>
            <div className={styles.formGrp}>
              <MultiFile
                multiple
                max_size={10 * 1024 * 1024}
                type={["jpeg", "jpg", "png"]}
                fullWidth={true}
                name="family_medical_expenditure_evidence"
                label="Attach Evidence"
                accept={"image/*"}
                error={errorData?.family_medical_expenditure_evidence}
                value={form?.family_medical_expenditure_evidence}
                placeholder={"Attach Evidence"}
                onChange={(file) => {
                  getUrlfromFile(file, "family_medical_expenditure_evidence");
                }}
                deleteImage={(file) => {
                  deleteImage(file, "family_medical_expenditure_evidence");
                }}
              />
            </div>
          </div>
        )}

        <div className={styles.checkboxWrapper}>
          <Checkbox
            style={{ padding: 0, marginRight: "10px" }}
            name={"form?.is_parents_details"}
            checked={form?.is_parents_details}
            onChange={() =>
              changeTextData(!form?.is_parents_details, "is_parents_details")
            }
          />
          <div className={styles.lowerdec}>
            <span>Fill Parents details</span>
          </div>
        </div>
        {form?.is_parents_details && (
          <>
            <div className={styles.formGrp}>
              <div className={styles.radioWrapper}>
                <RadioGroup
                  aria-label="option"
                  name="is_parents_senior_citizen"
                  value={form?.is_parents_senior_citizen}
                  onChange={(e) =>
                    changeTextData(e.target.value, "is_parents_senior_citizen")
                  }
                  row
                  className={styles.radioWrap}
                >
                  <FormControlLabel
                    // style={{ marginLeft: "20px" }}
                    value="YES"
                    control={<Radio />}
                    label="If any of your parent is a Senior Citizen"
                  />
                  <FormControlLabel
                    value="NO"
                    control={<Radio />}
                    label="If any of your parent is not a Senior Citizen"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGrp}>
                <CustomTextField
                  type="number"
                  isError={errorData?.parents_insurance}
                  errorText={errorData?.parents_insurance}
                  label={"Health Insurance"}
                  value={form?.parents_insurance}
                  onTextChange={(text) => {
                    changeTextData(text, "parents_insurance");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("parents_insurance");
                  // }}
                />
              </div>
              <div className={styles.formGrp}>
                <MultiFile
                  multiple
                  max_size={10 * 1024 * 1024}
                  type={["jpeg", "jpg", "png"]}
                  fullWidth={true}
                  name="parents_insurance_evidence"
                  label="Attach Evidence"
                  accept={"image/*"}
                  error={errorData?.parents_insurance_evidence}
                  value={form?.parents_insurance_evidence}
                  placeholder={"Attach Evidence"}
                  onChange={(file) => {
                    getUrlfromFile(file, "parents_insurance_evidence");
                  }}
                  deleteImage={(file) => {
                    deleteImage(file, "parents_insurance_evidence");
                  }}
                />
              </div>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGrp}>
                <CustomTextField
                  type="number"
                  isError={errorData?.parents_phc}
                  errorText={errorData?.parents_phc}
                  label={"Preventive Health Check Up Amount"}
                  value={form?.parents_phc}
                  onTextChange={(text) => {
                    changeTextData(text, "parents_phc");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("parents_phc");
                  // }}
                />
              </div>
              <div className={styles.formGrp}>
                <MultiFile
                  multiple
                  max_size={10 * 1024 * 1024}
                  type={["jpeg", "jpg", "png"]}
                  fullWidth={true}
                  name="parents_phc_evidence"
                  label="Attach Evidence"
                  accept={"image/*"}
                  error={errorData?.parents_phc_evidence}
                  value={form?.parents_phc_evidence}
                  placeholder={"Attach Evidence"}
                  onChange={(file) => {
                    getUrlfromFile(file, "parents_phc_evidence");
                  }}
                  deleteImage={(file) => {
                    deleteImage(file, "parents_phc_evidence");
                  }}
                />
              </div>
            </div>
            {form?.is_parents_senior_citizen === "YES" && (
              <div className={styles.formWrp}>
                <div className={styles.formGrp}>
                  <CustomTextField
                    type="number"
                    isError={errorData?.parents_medical_expenditure}
                    errorText={errorData?.parents_medical_expenditure}
                    label={"Medical Expenditure"}
                    value={form?.parents_medical_expenditure}
                    onTextChange={(text) => {
                      changeTextData(text, "parents_medical_expenditure");
                    }}
                    // onBlur={() => {
                    //   onBlurHandler("parents_medical_expenditure");
                    // }}
                  />
                </div>
                <div className={styles.formGrp}>
                  <MultiFile
                    multiple
                    max_size={10 * 1024 * 1024}
                    type={["jpeg", "jpg", "png"]}
                    fullWidth={true}
                    name="parents_medical_expenditure_evidence"
                    label="Attach Evidence"
                    accept={"image/*"}
                    error={errorData?.parents_medical_expenditure_evidence}
                    value={form?.parents_medical_expenditure_evidence}
                    placeholder={"Attach Evidence"}
                    onChange={(file) => {
                      getUrlfromFile(
                        file,
                        "parents_medical_expenditure_evidence"
                      );
                    }}
                    deleteImage={(file) => {
                      deleteImage(file, "parents_medical_expenditure_evidence");
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount for Self under (B):
            <span>
              {form?.total_eighty_d ? `₹ ${form?.total_eighty_d}` : 0}
            </span>
          </div>
          <div className={styles.inner}>
            Total Amount for Family under (B):
            <span>
              {form?.total_family_amount ? `₹ ${form?.total_family_amount}` : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Note: Maximum of (B) is for individual 25,000 & parents 50,000 per
            annum
          </div>
        </div>
        <div className={styles.heading} style={{ marginTop: "10px" }}>
          (C) Other sections
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.employee_contribution}
              errorText={errorData?.employee_contribution}
              label={
                "Section 80CCD(1B) Additional Employee Contribution Amount"
              }
              value={form?.employee_contribution}
              onTextChange={(text) => {
                changeTextData(text, "employee_contribution");
              }}
              // onBlur={() => {
              //   onBlurHandler("employee_contribution");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="employee_contribution_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.employee_contribution_evidence}
              value={form?.employee_contribution_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "employee_contribution_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "employee_contribution_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.education_loan}
              errorText={errorData?.education_loan}
              label={"Section 80E Education Loan for Studies Amount"}
              value={form?.education_loan}
              onTextChange={(text) => {
                changeTextData(text, "education_loan");
              }}
              // onBlur={() => {
              //   onBlurHandler("education_loan");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="education_loan_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.education_loan_evidence}
              value={form?.education_loan_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "education_loan_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "education_loan_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.donations}
              errorText={errorData?.donations}
              label={"Section 80G Donations Paid Amount"}
              value={form?.donations}
              onTextChange={(text) => {
                changeTextData(text, "donations");
              }}
              // onBlur={() => {
              //   onBlurHandler("donations");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="donations_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.donations_evidence}
              value={form?.donations_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "donations_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "donations_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              type="number"
              isError={errorData?.disability}
              errorText={errorData?.disability}
              label={"Section 80U Person with Disability Amount"}
              value={form?.disability}
              onTextChange={(text) => {
                changeTextData(text, "disability");
              }}
              // onBlur={() => {
              //   onBlurHandler("disability");
              // }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="disability_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.disability_evidence}
              value={form?.disability_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "disability_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "disability_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount under (C) :
            <span>{form?.total_other ? `₹ ${form?.total_other}` : 0}</span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Total Amount under Deduction under Chapter VI-A:  ₹80,000
            {/* <span>
              {form?.total_under_deduction
                ? `₹ ${form?.total_under_deduction}`
                : 0}
            </span> */}
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
            I certify that the information given above is complete and correct.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <div className={"headerFlex wrapper"}>
          <ButtonBase
            type={"button"}
            disabled={!declaration || isLoading ? true : false}
            className={
              declaration ? styles.createBtn : styles.disabledCreatebtn
            }
            onClick={() => submitToServer("draft")}
          >
            Save As Draft
          </ButtonBase>
        </div>
        {isTodayInFiscalYear && (
          <ButtonBase
            type={"button"}
            disabled={!declaration || isLoading ? true : false}
            className={
              declaration ? styles.createBtn : styles.disabledCreatebtn
            }
            onClick={handleSubmit}
          >
            Submit
          </ButtonBase>
        )}
      </div>
    </div>
  );
}

export default ClaimTaxCard;
