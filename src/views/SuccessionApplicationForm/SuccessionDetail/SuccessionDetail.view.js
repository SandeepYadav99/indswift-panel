import React from "react";
import styles from "./Style.module.css";
import { ButtonBase, Checkbox, MenuItem } from "@material-ui/core";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import useSuccessionForm from "./SuccessionDetail.hook";
import InfoCardUpper from "./component/InfoCardUpper";
import File from "../../../components/FileComponent/FileComponent.component";

function SuccessionForm() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    declaration,
    setDeclaration,
    employeeDetail,
    salary,
  } = useSuccessionForm({});

  return (
    <div className={styles.evaluationFormWrapper}>
      <div className={styles.wrap}>
        <div className={styles.logoImg}>
          <img
            src={require("../../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Succession Form</h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.evaluationContainer}>
          <div className={styles.candidateInfoContainer2}>
            <InfoCardUpper data={employeeDetail} />
          </div>
          <div className={styles.candidateInfoContainer2}>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>Succession Details</span>
            </div>
            <div className={styles.commentWrap}>
              <File
                max_size={5 * 1024 * 1024}
                type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                fullWidth={true}
                name="document"
                label="Upload Fitness Certificate"
                accept={"application/pdf,application/msword,image/*"}
                error={errorData?.document}
                value={form?.document}
                placeholder={"Upload Fitness Certificate"}
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "document");
                  }
                }}
              />
            </div>
            <div className={styles.commentWrap}>
              <CustomTextField
                isError={errorData?.reason}
                errorText={errorData?.reason}
                label={"Reason for Extension/Retension"}
                value={form?.reason}
                onTextChange={(text) => {
                  changeTextData(text, "reason");
                }}
                onBlur={() => {
                  onBlurHandler("reason");
                }}
                multiline
                rows={3}
              />
            </div>
          
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.delcarationWrapper}>
              <div className={styles.heading}>Declaration</div>
              <div className={styles.discriptionWrap}>
                <div className={styles.checkboxWrapper}>
                  <Checkbox
                    style={{ padding: 0, marginRight: "10px" }}
                    name={"declaration"}
                    checked={declaration}
                    onChange={() => setDeclaration((e) => !e)}
                  />
                  <div className={styles.lowerdec}>
                    <span>
                      I solemnly declare that all the particulars furnished in
                      this form are true and correct to the best of my knowledge
                      and belief.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase
                disabled={!declaration ? true : false}
                type={"button"}
                onClick={handleSubmit}
                className={
                  !declaration || isSubmitting
                    ? styles.disabledBtn
                    : styles.createBtn
                }
              >
                Submit
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      {/* <SnackbarComponent /> */}
    </div>
  );
}

export default SuccessionForm;
