import React from "react";
import { MenuItem, ButtonBase } from "@material-ui/core";
import styles from "../Style.module.css";
import useEmployeeView from "./EmployeeViewHook.js";
import CustomSelectField from "../../../../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../../../components/FileComponent/FileComponent.component";

const EmployeeView = ({ closeSidePanel, Formtype }) => {
  const { form, changeTextData, errorData, handleSubmit, onBlurHandler } =
    useEmployeeView({ closeSidePanel, Formtype });

  return (
    <div>
      <div className={"formFlex"}>
        <div className={"formGroup1"}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            name="title"
            label={Formtype === "RECORD" ? "Letter Title" : "Title"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
        </div>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup2"}>
          {Formtype === "RECORD" ? (
            <CustomSelectField
              isError={errorData?.letter_type}
              errorText={errorData?.letter_type}
              name="letter_type"
              label={"Type Of Letter"}
              value={form?.letter_type}
              handleChange={(value) => {
                changeTextData(value, "letter_type");
              }}
            >
              <MenuItem value="APPRAISAL"> APPRAISAL LETTER</MenuItem>
              <MenuItem value="WARNING">WARNING LETTER</MenuItem>
              <MenuItem value="SHOW_CAUSE">SHOW CAUSE</MenuItem>
              <MenuItem value="DISCIPLINARY">DISCIPLINARY LETTER</MenuItem>
            </CustomSelectField>
          ) : (
            <CustomSelectField
              isError={errorData?.star_type}
              errorText={errorData?.star_type}
              name="star_type"
              label={"Star Type"}
              value={form?.star_type}
              handleChange={(value) => {
                changeTextData(value, "star_type");
              }}
            >
              <MenuItem value="RED">RED STAR</MenuItem>
              <MenuItem value="ORANGE">ORANGE STAR</MenuItem>
              <MenuItem value="YELLOW">YELLOW STAR</MenuItem>
              <MenuItem value="PINK">PINK STAR</MenuItem>
              <MenuItem value="BLUE">BLUE STAR</MenuItem>
              <MenuItem value="GREEN">GREEN STAR</MenuItem>
            </CustomSelectField>
          )}
        </div>
        <div className={"formGroup2"}>
          <CustomDatePicker
            clearable
            name="date_of_issue"
            label={"Date Of issue"}
            maxDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "date_of_issue");
            }}
            value={form?.date_of_issue}
            isError={errorData?.date_of_issue}
          />
        </div>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup2"}>
          <File
            max_size={2 * 1024 * 1024}
            type={["pdf"]}
            fullWidth={true}
            name="document"
            accept={"application/pdf"}
            label=""
            default_image={form?.document ? form?.document : null}
            error={errorData?.document}
            // title={'image'}
            value={form?.document}
            placeholder={
              Formtype === "RECORD" ? "PDF Upload" : "Add Attachment"
            }
            onChange={(file) => {
              if (file) {
                changeTextData(file, "document");
              }
            }}
          />
        </div>
        <div className={"formGroup2"}>
          <CustomTextField
            isError={errorData?.letter_head_no}
            errorText={errorData?.letter_head_no}
            label={Formtype === "RECORD" ? "Letter Head" : "LH No. (optional)"}
            name="letter_head_no"
            value={form?.letter_head_no}
            onTextChange={(text) => {
              changeTextData(text, "letter_head_no");
            }}
            onBlur={() => {
              onBlurHandler("letter_head_no");
            }}
          />
        </div>
      </div>

      <div className={styles.generate}>
        <ButtonBase
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          Upload
        </ButtonBase>
      </div>
      {Formtype !== "RECORD" && (
        <div className={styles.noteWrap}>
          <div className={styles.heading}>Note : </div>
          <div className={styles.heading}>
            It was later decided that instead of linking these failures with
            PLI, they will rather be linked with annual PMS of employees and for
            the purpose below mentioned logic will be used-
          </div>
          <div>
            <b>Yellow Star- </b>Each Star Equivalent to Minor Incidents- Each
            Star will amount to reduction of 1 % Increment in PMS
          </div>
          <div>
            <b>Orange Star-</b> Each Star Equivalent to Major Incidents- Each
            Star Will amount to reduction of 2 % Increment in PMS
          </div>
          <div>
            <b>Red Star- </b>Each Star Equivalent to Critical Incidents- Each
            Star Will amount to 0 % Increment or reduction of 3 % Increment in
            PMS as per the case.
          </div>
          <div className={styles.heading}>
            Similarly, if someone has done exceptionally good work that had over
            passed a Functional Failure then following appreciation logic will
            apply-
          </div>
          <div>
            <b>Pink Star- </b> Each Star Equivalent to a Minor Improvement- Each
            Star Will amount to increase of 1 % Increment in PMS
          </div>
          <div>
            <b>Blue Star-</b> Each Star Equivalent to a Major Improvement- Each
            Star Will amount to increase of 2 % Increment in PMS
          </div>
          <div>
            <b>Green Star- </b>Each Star Equivalent to a Critical Improvement-
            Each Star Will amount to increase of 3 % Increment in PMS
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeView;
