import React from "react";
import CandidateInfor from "../component/CandidateInfor/CandidateInfor";
import CheckboxList from "../component/Checkbox";
import useCandidateUpdate_Hook from "./BGVStatusUpdate_Hook";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import historyUtils from "../../../libs/history.utils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
const BGVStatus_Update = () => {
  const {
    data,
    isLoading,
    id,
    isInterviewStatus,
    handleChangeInterviewStatus,
    handleViewEditDetails,
    form,
    changeTextData,
    errorData,
    handleSubmit,
  } = useCandidateUpdate_Hook({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Background Verification Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <CandidateInfor data={form} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div>
                <div className={"formGroup"}>
                  {form?.is_education_verification ? (
                    <CustomCheckbox
                      color={"primary"}
                      // handleChange={() => {
                      //   changeTextData(
                      //     !form?.is_education_verification,
                      //     "is_education_verification"
                      //   );
                      // }}
                      label={"Education"}
                      disabled={form?.is_education_verification}
                      checked={form?.is_education_verification}
                    />
                  ) : null}
                </div>
              </div>
              <div>
                <div className={"formGroup"}>
                  {form?.is_first_employment_verification ? (
                    <CustomCheckbox
                      color={"primary"}
                      handleChange={() => {
                        changeTextData(
                          !form?.is_first_employment_verification,
                          "is_first_employment_verification"
                        );
                      }}
                      disabled={form?.is_first_employment_verification}
                      label={"1st Employment"}
                      checked={form?.is_first_employment_verification}
                    />
                  ) : null}
                </div>
              </div>
              <div>
                <div className={"formGroup"}>
                  {form.is_secound_employment_verification ? ( // Render only if is_secound_employment_verification is true
                    <div>
                      <div className={"formGroup"}>
                        <CustomCheckbox
                          color={"primary"}
                          handleChange={() => {
                            changeTextData(
                              !form?.is_secound_employment_verification,
                              "is_secound_employment_verification"
                            );
                          }}
                          disabled={form?.is_secound_employment_verification}
                          label={"2nd Employment"}
                          checked={form?.is_secound_employment_verification}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className={"formGroup"}>
                  {form?.is_criminal_verification ? (
                    <CustomCheckbox
                      color={"primary"}
                      handleChange={() => {
                        changeTextData(
                          !form?.is_criminal_verification,
                          "is_criminal_verification"
                        );
                      }}
                      disabled={form?.is_criminal_verification}
                      label={"Criminal"}
                      checked={form?.is_criminal_verification}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className={"formFlex"}>
            {form?.is_education_verification && (
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.is_education_verification_status}
                  errorText={errorData?.is_education_verification_status}
                  label={"Choose Status"}
                  value={form?.is_education_verification_status}
                  handleChange={(value) => {
                    changeTextData(value, "is_education_verification_status");
                  }}
                >
                  <MenuItem value="clear">CLEAR</MenuItem>
                  <MenuItem value="failed">FAILED </MenuItem>
                  <MenuItem value="unable">UNABLE TO VERIFY </MenuItem>
                  <MenuItem value="pending">PENDING </MenuItem>
                </CustomSelectField>
              </div>
            )}
            {form?.is_first_employment_verification && (
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.is_first_employment_verification_status}
                  errorText={errorData?.is_first_employment_verification_status}
                  label={"Choose Status"}
                  value={form?.is_first_employment_verification_status}
                  handleChange={(value) => {
                    changeTextData(
                      value,
                      "is_first_employment_verification_status"
                    );
                  }}
                >
                  <MenuItem value="clear">CLEAR</MenuItem>
                  <MenuItem value="failed">FAILED </MenuItem>
                  <MenuItem value="unable">UNABLE TO VERIFY </MenuItem>
                  <MenuItem value="pending">PENDING </MenuItem>
                </CustomSelectField>
              </div>
            )}
            {form?.is_secound_employment_verification && (
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.is_secound_employment_verification_status}
                  errorText={
                    errorData?.is_secound_employment_verification_status
                  }
                  label={"Choose Status"}
                  value={form?.is_secound_employment_verification_status}
                  handleChange={(value) => {
                    changeTextData(
                      value,
                      "is_secound_employment_verification_status"
                    );
                  }}
                >
                  <MenuItem value="clear">CLEAR</MenuItem>
                  <MenuItem value="failed">FAILED </MenuItem>
                  <MenuItem value="unable">UNABLE TO VERIFY </MenuItem>
                  <MenuItem value="pending">PENDING </MenuItem>
                </CustomSelectField>
              </div>
            )}
            {form?.is_criminal_verification && (
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.is_criminal_verification_status}
                  errorText={errorData?.is_criminal_verification_status}
                  label={"Choose Status"}
                  value={form?.is_criminal_verification_status}
                  handleChange={(value) => {
                    changeTextData(value, "is_criminal_verification_status");
                  }}
                >
                  <MenuItem value="clear">CLEAR</MenuItem>
                  <MenuItem value="failed">FAILED </MenuItem>
                  <MenuItem value="unable">UNABLE TO VERIFY </MenuItem>
                  <MenuItem value="pending">PENDING </MenuItem>
                  {/* <MenuItem value="terminated">Terminated</MenuItem>
                <MenuItem value="allowed_to_work">Allowed To Work </MenuItem> */}
                </CustomSelectField>
              </div>
            )}
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.bgv_result}
                errorText={errorData?.bgv_result}
                label={"Choose BGV Result Status"}
                value={form?.bgv_result}
                handleChange={(value) => {
                  changeTextData(value, "bgv_result");
                }}
              >
                <MenuItem value="in_process">IN_PROCESS</MenuItem>
                <MenuItem value="clear">CLEAR </MenuItem>
                <MenuItem value="pending">PENDIG </MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.requiredFooter}>
            <div className={styles.topText}>
              <b>BGV Status:  {form?.bgv_status}</b>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.choose_action}
                errorText={errorData?.choose_action}
                label={"Choose Action "}
                value={form?.billinchoose_actiong_to}
                handleChange={(value) => {
                  changeTextData(value, "choose_action");
                }}
              >
                <MenuItem value="isl">ISL</MenuItem>
                <MenuItem value="isll">ISLL </MenuItem>
                <MenuItem value="esix">ESIX </MenuItem>
              </CustomSelectField>
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.description}
                // errorText={errorData?.description}
                label={"Any Remarks"}
                value={form?.action_remark}
                onTextChange={(text) => {
                  changeTextData(text, "action_remark");
                }}
                // onBlur={() => {
                //    onBlurHandler("remark");
                // }}
                multiline
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={"formFlex"}>
            <div style={{ color: "#161616", fontSize: "15px" }}>
              <b> Payment Details</b>
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <span>
                <b>Cost:   {form?.cost}</b>{" "}
              </span>
              <CustomSelectField
                isError={errorData?.payment_status}
                errorText={errorData?.payment_status}
                label={"Choose Action "}
                value={form?.payment_status}
                handleChange={(value) => {
                  changeTextData(value, "payment_status");
                }}
              >
                <MenuItem value="in-Process">In-Process</MenuItem>
                <MenuItem value="clear">Clear </MenuItem>
                <MenuItem value="pending">Pending </MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <span>
                <b>Billing To:  {form?.billing_to}</b>{" "}
              </span>
              <CustomSelectField
                isError={errorData?.payment_complete}
                errorText={errorData?.payment_complete}
                label={"Choose Action "}
                value={form?.payment_complete}
                handleChange={(value) => {
                  changeTextData(value, "payment_complete");
                }}
              >
                <MenuItem value="2023-09-08">2023-09-08</MenuItem>
                {/* <MenuItem value="esix">ESIX </MenuItem> */}
              </CustomSelectField>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={"formFlex"}>
            <div style={{ color: "#161616", fontSize: "15px" }}>
              <b> Remarks</b>
            </div>
          </div>
          <p
            style={{
              color: "#161616",
              fontFamily: "normal normal normal 14px/32px Montserrat",
              fontSize: "13px",
            }}
          >
            Any Remarks added while sending BGV form will be shown here
          </p>
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          UPDATE
        </ButtonBase>
      </div>
    </div>
  );
};

export default BGVStatus_Update;
