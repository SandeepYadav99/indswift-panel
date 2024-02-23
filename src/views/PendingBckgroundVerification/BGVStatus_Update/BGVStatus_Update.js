import React from "react";
import CandidateInfor from "../component/CandidateInfor/CandidateInfor";
import useCandidateUpdate_Hook from "./BGVStatusUpdate_Hook";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import historyUtils from "../../../libs/history.utils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import { EditOutlined } from "@material-ui/icons";
const BGVStatus_Update = () => {
  const { form, changeTextData, errorData, handleSubmit, isEdit, setIsEdit } =
    useCandidateUpdate_Hook({});

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
      <CandidateInfor empId={form?.emp_code} />
      <div className={styles.plainPaper}>
        <div>
          <div className={styles.required_action}>
            Background Verification Status{" "}
          </div>
          <div className={styles.gaps} />
          <span>Update Verification Status</span>
        </div>
        <div className={styles.newContainer}>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.alignOneColoumn}>
                <div className={styles.InnerWrap}>
                  <div className={styles.formGroup}>
                    <CustomCheckbox
                      color={"primary"}
                      label={"Education"}
                      disabled={
                        form?.is_education_verification
                          ? form?.is_education_verification
                          : !form?.is_education_verification
                      }
                      checked={form?.is_education_verification}
                    />
                  </div>
                </div>
                <div className={"formGroup"} id={styles.minWidth}>
                  {form?.is_education_verification && (
                    <CustomSelectField
                      isError={errorData?.is_education_verification_status}
                      errorText={errorData?.is_education_verification_status}
                      label={"Choose Status"}
                      value={form?.is_education_verification_status}
                      handleChange={(value) => {
                        changeTextData(
                          value,
                          "is_education_verification_status"
                        );
                      }}
                    >
                      <MenuItem value="CLEAR">Clear</MenuItem>
                      <MenuItem value="FAILED">Failed </MenuItem>
                      <MenuItem value="UNABLE_TO_VERIFY">
                        Unable to Verify
                      </MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                    </CustomSelectField>
                  )}
                </div>
              </div>
              <div className={styles.alignOneColoumn}>
                <div className={styles.InnerWrap}>
                  <div className={styles.formGroup}>
                    <CustomCheckbox
                      color={"primary"}
                      disabled={
                        form?.is_first_employment_verification
                          ? form?.is_first_employment_verification
                          : !form?.is_first_employment_verification
                      }
                      label={"1st Employment"}
                      checked={form?.is_first_employment_verification}
                    />
                  </div>
                </div>
                <div className={"formGroup"} id={styles.minWidth}>
                  {form?.is_first_employment_verification && (
                    <CustomSelectField
                      isError={
                        errorData?.is_first_employment_verification_status
                      }
                      errorText={
                        errorData?.is_first_employment_verification_status
                      }
                      label={"Choose Status"}
                      value={form?.is_first_employment_verification_status}
                      handleChange={(value) => {
                        console.log(value);
                        changeTextData(
                          value.toUpperCase(),
                          "is_first_employment_verification_status"
                        );
                      }}
                    >
                      <MenuItem value="CLEAR">Clear</MenuItem>
                      <MenuItem value="FAILED">Failed </MenuItem>
                      <MenuItem value="UNABLE_TO_VERIFY">
                        Unable To Verify{" "}
                      </MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                    </CustomSelectField>
                  )}
                </div>
              </div>
              <div className={styles.alignOneColoumn}>
                <div className={styles.InnerWrap} id={styles.minWidth}>
                  <div className={styles.formGroup}>
                    <CustomCheckbox
                      color={"primary"}
                      disabled={
                        form?.is_secound_employment_verification
                          ? form?.is_secound_employment_verification
                          : !form?.is_secound_employment_verification
                      }
                      label={"2nd Employment"}
                      checked={form?.is_secound_employment_verification}
                    />
                  </div>
                </div>
                <div className={"formGroup"} id={styles.minWidth}>
                  {form?.is_secound_employment_verification && (
                    <CustomSelectField
                      isError={
                        errorData?.is_secound_employment_verification_status
                      }
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
                      <MenuItem value="CLEAR">Clear</MenuItem>
                      <MenuItem value="FAILED">Failed </MenuItem>
                      <MenuItem value="UNABLE_TO_VERIFY">
                        Unable To Verify{" "}
                      </MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                    </CustomSelectField>
                  )}
                </div>
              </div>
              <div className={styles.alignOneColoumn}>
                <div className={styles.InnerWrap}>
                  <div className={styles.formGroup}>
                    <CustomCheckbox
                      color={"primary"}
                      disabled={
                        form?.is_criminal_verification
                          ? form?.is_criminal_verification
                          : !form?.is_criminal_verification
                      }
                      label={"Criminal"}
                      checked={form?.is_criminal_verification}
                    />
                  </div>
                </div>
                <div className={"formGroup"} id={styles.minWidth}>
                  {form?.is_criminal_verification ? (
                    <CustomSelectField
                      isError={errorData?.is_criminal_verification_status}
                      errorText={errorData?.is_criminal_verification_status}
                      label={"Choose Status"}
                      value={form?.is_criminal_verification_status}
                      handleChange={(value) => {
                        changeTextData(
                          value,
                          "is_criminal_verification_status"
                        );
                      }}
                    >
                      <MenuItem value="CLEAR">Clear</MenuItem>
                      <MenuItem value="FAILED">Failed </MenuItem>
                      <MenuItem value="UNABLE_TO_VERIFY">
                        Unable To Verify{" "}
                      </MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                      {/* <MenuItem value="terminated">Terminated</MenuItem>
                <MenuItem value="allowed_to_work">Allowed To Work </MenuItem> */}
                    </CustomSelectField>
                  ):<div></div>}
                </div>
              </div>
            </div>
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
                <MenuItem value="PENDING">Pending </MenuItem>
                <MenuItem value="FAILED">Failed </MenuItem>
                <MenuItem value="CLEAR">Clear </MenuItem>
                <MenuItem value="INPROCESS">In Process</MenuItem>
              </CustomSelectField>
            </div>
          </div>

          <div className={styles.requiredFooter}>
            <div className={styles.topText}>
              <b>BGV Status: {form?.bgv_status}</b>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div>
          <div className={styles.required_action}>Required Action Details </div>
        </div>
        <div className={styles.newContainer}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.choose_action}
                errorText={errorData?.choose_action}
                label={"Choose Action "}
                value={form?.choose_action}
                handleChange={(value) => {
                  changeTextData(value, "choose_action");
                }}
              >
                <MenuItem value="TERMINATED">Terminated</MenuItem>
                <MenuItem value="ALLOWED_TO_WORK">Allowed to work </MenuItem>
                <MenuItem value="NA">N/A</MenuItem>
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
          <div className={styles.billingWrap}>
            <span>
              <b>Billing To:</b>{" "}
              <span className={styles.right_gaps}> {form?.billing_to}</span>
            </span>
          </div>

          <div className={styles.formFlex}>
            <div className={"formGroup"}>
              <div className={styles.Wrap}>
                <div style={{ flex: "1" }}>
                  <CustomTextField
                    isError={errorData?.cost}
                    errorText={errorData?.cost}
                    label={"Cost"}
                    type={"number"}
                    value={form?.cost}
                    disabled={!isEdit}
                    onTextChange={(text) => {
                      changeTextData(text, "cost");
                    }}
                  />
                </div>
                <div>
                  <IconButton
                    className={"tableActionBtn"}
                    color="secondary"
                    onClick={() => setIsEdit(true)}
                  >
                    <EditOutlined fontSize={"small"} />
                  </IconButton>
                </div>
              </div>
              <CustomSelectField
                isError={errorData?.payment_status}
                errorText={errorData?.payment_status}
                label={"Payment Status "}
                value={form?.payment_status}
                handleChange={(value) => {
                  changeTextData(value, "payment_status");
                }}
              >
                <MenuItem value="INPROCESS">In Process</MenuItem>
                <MenuItem value="CLEAR">Clear </MenuItem>
                <MenuItem value="PENDING">Pending </MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Complete in "}
                maxDate={new Date()}
                onChange={(value) => {
                  changeTextData(value, "payment_complete");
                }}
                views={["month", "year"]}
                format={"MM-yyyy"}
                value={form?.payment_complete}
                isError={errorData?.payment_complete}
                errorText={errorData?.payment_complete}
              />
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
            {form?.remark}
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
