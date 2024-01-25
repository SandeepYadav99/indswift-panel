import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import React from "react";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import ClaimInfo from "../ClaimInfo/ClaimInfo";
import useClaimMarrigeCard from "./ClaimTaxCard.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import MultiFile from "./component/FileComponent/FileMultiComponent.component";
import UpperCard from "./component/UpperCard/UpperCard";
function ClaimTaxCard() {
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
    getUrlfromFile
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
                onBlur={() => {
                  onBlurHandler("lender_name");
                }}
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
                onBlur={() => {
                  onBlurHandler("interest_paid");
                }}
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
                onBlur={() => {
                  onBlurHandler("lender_address");
                }}
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
                onBlur={() => {
                  onBlurHandler("lender_pan");
                }}
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
                onBlur={() => {
                  onBlurHandler("financial_institutions");
                }}
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
                onBlur={() => {
                  onBlurHandler("employer");
                }}
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
                onBlur={() => {
                  onBlurHandler("others");
                }}
              />
            </div>
            <div className={styles.formGrp}>
              <MultiFile
                multiple
                max_size={10 * 1024 * 1024}
                type={["jpeg", "jpg", "png"]}
                fullWidth={true}
                name="deduction_borrowing_evidences"
                label="Upload Multiple Image"
                accept={"image/*"}
                error={errorData?.deduction_borrowing_evidences}
                value={form?.deduction_borrowing_evidences}
                placeholder={"Upload Multiple Image"}
                onChange={(file) => {
                  if (file) {
                    getUrlfromFile(file, "deduction_borrowing_evidences");
                  }
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
              isError={errorData?.life_insurance}
              errorText={errorData?.life_insurance}
              label={"Life Insurance Amount"}
              value={form?.life_insurance}
              onTextChange={(text) => {
                changeTextData(text, "life_insurance");
              }}
              onBlur={() => {
                onBlurHandler("life_insurance");
              }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="life_insurance_evidence"
              label="Upload Multiple Image"
              error={errorData?.life_insurance_evidence}
              value={form?.life_insurance_evidence}
              placeholder={"Upload Multiple Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "life_insurance_evidence");
                }
              }}
            />
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
            I declare the information shared is best of knowledge and I have
            submitted genuine claim will authenticate bills as and where
            attached. I understand that any disparity found in claims/bills with
            respect to the organizational policies may cause auto rejection of
            claim with or without an opportunity of re-applying. I also
            understand that if any part/bill of claim is found to be forged with
            respect to laws of land or organizational policies then I will be
            individually accountable for all related legal or organizational
            consequences. I understand the submitted claim/bill is not part of
            my earning and it is a subject of approval/rejection from
            organization which can also be altered by organization as per my
            entitlements before approval or rejection.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          disabled={
            !declaration || isLoading || !form?.official_contact?.length
              ? true
              : false
          }
          className={
            declaration && form?.official_contact?.length
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

export default ClaimTaxCard;
