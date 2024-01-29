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
    getUrlfromFile,
    deleteImage,
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
                label="Attach Evidence"
                accept={"image/*"}
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
              value={form?.term_insurance}
              onTextChange={(text) => {
                changeTextData(text, "term_insurance");
              }}
              onBlur={() => {
                onBlurHandler("term_insurance");
              }}
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
              isError={errorData?.mutual_funds}
              errorText={errorData?.mutual_funds}
              label={"Mutual Insurance Amount"}
              value={form?.mutual_funds}
              onTextChange={(text) => {
                changeTextData(text, "mutual_funds");
              }}
              onBlur={() => {
                onBlurHandler("mutual_funds");
              }}
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
              isError={errorData?.sukanya_samriddhi}
              errorText={errorData?.sukanya_samriddhi}
              label={"Sukanya Samriddhi Scheme Amount"}
              value={form?.sukanya_samriddhi}
              onTextChange={(text) => {
                changeTextData(text, "sukanya_samriddhi");
              }}
              onBlur={() => {
                onBlurHandler("sukanya_samriddhi");
              }}
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
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.epf}
              errorText={errorData?.epf}
              label={"Employee Provident Fund Amount"}
              value={form?.epf}
              onTextChange={(text) => {
                changeTextData(text, "epf");
              }}
              onBlur={() => {
                onBlurHandler("epf");
              }}
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
              value={form?.ppf}
              onTextChange={(text) => {
                changeTextData(text, "ppf");
              }}
              onBlur={() => {
                onBlurHandler("ppf");
              }}
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
              value={form?.house_loan_principle}
              onTextChange={(text) => {
                changeTextData(text, "house_loan_principle");
              }}
              onBlur={() => {
                onBlurHandler("house_loan_principle");
              }}
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
              value={form?.fd_five_year}
              onTextChange={(text) => {
                changeTextData(text, "fd_five_year");
              }}
              onBlur={() => {
                onBlurHandler("fd_five_year");
              }}
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
              value={form?.eighty_ccc}
              onTextChange={(text) => {
                changeTextData(text, "eighty_ccc");
              }}
              onBlur={() => {
                onBlurHandler("eighty_ccc");
              }}
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
              value={form?.eighty_ccd}
              onTextChange={(text) => {
                changeTextData(text, "eighty_ccd");
              }}
              onBlur={() => {
                onBlurHandler("eighty_ccd");
              }}
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
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.self_insurance}
              errorText={errorData?.self_insurance}
              label={"Self Insurance Amount"}
              value={form?.self_insurance}
              onTextChange={(text) => {
                changeTextData(text, "self_insurance");
              }}
              onBlur={() => {
                onBlurHandler("self_insurance");
              }}
            />
          </div>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["jpeg", "jpg", "png"]}
              fullWidth={true}
              name="self_insurance_evidence"
              label="Attach Evidence"
              accept={"image/*"}
              error={errorData?.self_insurance_evidence}
              value={form?.self_insurance_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                getUrlfromFile(file, "self_insurance_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "self_insurance_evidence");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.family_insurance}
              errorText={errorData?.family_insurance}
              label={"Family Insurance Amount"}
              value={form?.family_insurance}
              onTextChange={(text) => {
                changeTextData(text, "family_insurance");
              }}
              onBlur={() => {
                onBlurHandler("family_insurance");
              }}
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
              isError={errorData?.parents_insurance}
              errorText={errorData?.parents_insurance}
              label={"Parents medical Insurance Amount"}
              value={form?.parents_insurance}
              onTextChange={(text) => {
                changeTextData(text, "parents_insurance");
              }}
              onBlur={() => {
                onBlurHandler("parents_insurance");
              }}
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
