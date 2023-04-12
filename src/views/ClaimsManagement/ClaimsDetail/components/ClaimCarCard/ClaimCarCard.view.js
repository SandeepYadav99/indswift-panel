import { ButtonBase } from "@material-ui/core";
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
    claimInfo

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
              <b>Car Maintenance Claim</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails}/>
      <div className={styles.plainPaper}>
        <ClaimInfo idCards={claimInfo}/>

        <div className={styles.formSelectWrapper}>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className="formGroup1">
              <CustomTextField
                type="number"
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
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Bill Date"}
                // maxDate={new Date()}
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
                value={form?.name}
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
                max_size={4 * 1024 * 1024}
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
              setDeclaration((s)=>!s);
            }}
          />
          <label htmlFor="confirmation"> I declare the information shared is best of my knowledge.</label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          disabled={!declaration ? true :false}
          type={"button"}
          className={declaration ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
}

export default ClaimCarCard;
