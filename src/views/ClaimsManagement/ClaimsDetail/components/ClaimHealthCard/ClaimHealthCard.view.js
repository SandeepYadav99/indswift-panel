import { ButtonBase, MenuItem } from "@material-ui/core";
import React from "react";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import styles from "./Style.module.css";
import ClaimInfo from "../ClaimInfo/ClaimInfo";
import { useState } from "react";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import useClaimHealthCard from "./ClaimHealthCard.hook";
function ClaimHealthCard() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    jobDetails,
    selectedJobId,
    editData,
    declaration,
    setDeclaration,
    employeeDetails,
    claimInfo,
  } = useClaimHealthCard({});
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };
  const idCards = {};
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Preventive Health Check-up Claim Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <ClaimInfo idCards={claimInfo} />

        <div className={styles.formSelectWrapper}>
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <CustomDatePicker
                clearable
                label={"PHC Conducted on"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "phc_date");
                }}
                value={form?.phc_date}
                isError={errorData?.phc_date}
              />
            </div>

            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.phc_centre}
                errorText={errorData?.phc_centre}
                label={"PHC conucted from"}
                value={form?.phc_centre}
                onTextChange={(text) => {
                  changeTextData(text, "phc_centre");
                }}
                onBlur={() => {
                  onBlurHandler("phc_centre");
                }}
              />
            </div>
          </div>

          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <CustomTextField
                isError={errorData?.list}
                errorText={errorData?.list}
                label={"List of Investigations under PHC"}
                value={form?.list}
                onTextChange={(text) => {
                  changeTextData(text, "list");
                }}
                onBlur={() => {
                  onBlurHandler("list");
                }}
                multiline
                rows={2}
              />
            </div>
          </div>
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="prcreport"
                label="Upload PHC Report"
                accept={"application/pdf,application/msword,image/*"}
                link={
                  editData?.medical_report ? editData?.medical_report : null
                }
                error={errorData?.medical_report}
                value={form?.medical_report}
                placeholder={"Upload PHC Report"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "medical_report");
                  }
                }}
              />
            </div>
            <div className={styles.formGrp}>
              <CustomTextField
                type="number"
                isError={errorData?.bill_amount}
                errorText={errorData?.bill_amount}
                label={"Bill Amount"}
                value={form?.bill_amount}
                onTextChange={(text) => {
                  changeTextData(text, "bill_amount");
                }}
                onBlur={() => {
                  onBlurHandler("bill_amount");
                }}
              />
            </div>
          </div>

          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="image"
                label="Add Attachment (Bill)"
                accept={"application/pdf,application/msword,image/*"}
                link={editData?.document ? editData?.document : null}
                error={errorData?.document}
                value={form?.document}
                placeholder={"Add Attachment (Bill)"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "document");
                  }
                }}
              />
            </div>
            <div className={styles.formGrp}>
              <CustomSelectField
                isError={errorData?.payment_mode}
                errorText={errorData?.payment_mode}
                label={"Payment Via"}
                value={form?.payment_mode}
                handleChange={(value) => {
                  changeTextData(value, "payment_mode");
                }}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="proofimage"
                label="Upload Payment Proof"
                accept={"application/pdf,application/msword,image/*"}
                link={editData?.payment_proof ? editData?.payment_proof : null}
                error={errorData?.payment_proof}
                value={form?.payment_proof}
                placeholder={"Upload Payment Proof"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "payment_proof");
                  }
                }}
              />
            </div>
            <div className={styles.formGrp}></div>
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
          disabled={!declaration || isLoading ? true : false}
          className={declaration ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
}

export default ClaimHealthCard;
