import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import React from "react";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import styles from "./Style.module.css";
import ClaimInfo from "../ClaimInfo/ClaimInfo";

import { useState } from "react";
import useClaimMarrigeCard from "./ClaimMobileCard.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
function ClaimMobileCard() {
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
  } = useClaimMarrigeCard({});
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
              <b>Mobile Reimbursment Claim Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <ClaimInfo idCards={claimInfo} />

        <div className={styles.formSelectWrapper}>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className="formGroup1">
              <CustomTextField
                disabled= {true}
                type="number"
                isError={errorData?.official_contact}
                errorText={errorData?.official_contact}
                label={"Official Phone No."}
                value={form?.official_contact}
                onTextChange={(text) => {
                  changeTextData(text, "official_contact");
                }}
                onBlur={() => {
                  onBlurHandler("official_contact");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Bill Date"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "bill_date");
                }}
                value={form?.bill_date}
                isError={errorData?.bill_date}
              />
            </div>
          </div>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}>
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
            <div className={"formGroup"}>
              <File
                max_size={10 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="image"
                label="Add Attachment"
                accept={"application/pdf,application/msword,image/*"}
                link={editData?.document ? editData?.document : null}
                error={errorData?.document}
                value={form?.document}
                placeholder={"Add Attachment"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "document");
                  }
                }}
              />
            </div>
          </div>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className="formGroup1">
              <CustomTextField
                isError={errorData?.invoice_no}
                errorText={errorData?.invoice_no}
                label={"Invoice Number"}
                value={form?.invoice_no}
                onTextChange={(text) => {
                  changeTextData(text, "invoice_no");
                }}
                onBlur={() => {
                  onBlurHandler("invoice_no");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.payment_mode}
                errorText={errorData?.payment_mode}
                label={"Payment Mode"}
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
            <div className={"formGroup"}>
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
          disabled={(!declaration || isLoading) || !form?.official_contact?.length ? true : false}
          className={declaration && form?.official_contact?.length ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          {isLoading ? <CircularProgress color="success" size="20px"/>: 'Submit'}
        </ButtonBase>
      </div>
    </div>
  );
}

export default ClaimMobileCard;
