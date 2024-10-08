import { ButtonBase, MenuItem } from "@material-ui/core";
import React from "react";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import styles from "./Style.module.css";
import ClaimInfo from "../ClaimInfo/ClaimInfo";

import { useState } from "react";
import useClaimMarrigeCard from "./ClaimCarCard.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
function ClaimCarCard() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    declaration,
    setDeclaration,
    isLoading,
    isSubmitting,
    errorData,
    jobDetails,
    selectedJobId,
    editData,
    employeeDetails,
    claimInfo,
  } = useClaimMarrigeCard({});
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Car Maintenance Claim</b>
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
              <CustomTextField
                disabled={true}
                isError={errorData?.vehicle_no}
                errorText={errorData?.vehicle_no}
                label={"Vehicle No."}
                value={form?.vehicle_no}
                onTextChange={(text) => {
                  changeTextData(text, "vehicle_no");
                }}
                onBlur={() => {
                  onBlurHandler("vehicle_no");
                }}
              />
            </div>
            <div className={styles.formGrp}>
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
          <div className={styles.formWrp}>
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
            <div className={styles.formGrp}>
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
          <div className={styles.formWrp}>
          <div className={styles.formGrp}>
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
          <div className={styles.formWrp}>
            <div className={styles.formGrp}>
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
          disabled={(!declaration || isLoading) || !form?.vehicle_no?.length ? true : false}
          className={declaration && form?.vehicle_no?.length ? styles.createBtn : styles.disabledCreatebtn}
          type={"button"}
          onClick={handleSubmit}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
}

export default ClaimCarCard;
