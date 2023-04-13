import { ButtonBase } from "@material-ui/core";
import React from "react";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import styles from "./Style.module.css";
import ClaimBills from "../ClaimBills/ClaimBills";
import ClaimInfo from "../ClaimInfo/ClaimInfo";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { useState } from "react";
import useClaimMarrigeCard from "./ClaimMarrigeCard.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomDatePicker from "../../../../../components/FormFields/DatePicker/CustomDatePicker";
function ClaimMarriageCard() {
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
              <b>Marriage Gift Card Claim</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails}/>
      <div className={styles.plainPaper}>
        <ClaimInfo idCards={claimInfo}/>
        <div className={styles.formDetailWrapper}>
          <div className={styles.value}>Marriage of:</div>
        </div>
        <div className={styles.formSelectWrapper}>
          <FormControl component="fieldset">
            <RadioGroup
              value={form?.marraige_of}
              onChange={(value) => {
                changeTextData(value, "marraige_of");
              }}
              row
            >
              <FormControlLabel value="Self" control={<Radio />} label="Self" />
              <FormControlLabel
                value="Daughter"
                control={<Radio />}
                label="Daughter"
              />
              <FormControlLabel value="Son" control={<Radio />} label="Son" />
            </RadioGroup>
          </FormControl>
          <div className={styles.formWrapper21}>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Date of Marrige"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "dom");
                }}
                value={form?.dom}
                isError={errorData?.dom}
              />
            </div>
            <div className={"formGroup"}>
              <File
                max_size={4 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="image"
                label=""
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
          <label htmlFor="confirmation">
            I declare the information shared is best of my knowledge.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          disabled={!declaration ? true :false}
          className={declaration ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          Submit
        </ButtonBase>
      </div>
    </div>
  );
}

export default ClaimMarriageCard;
