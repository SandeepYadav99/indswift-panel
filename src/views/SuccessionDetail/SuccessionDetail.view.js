import React from "react";
import DesUpperCard from "./component/DesUpperCard/UpperCard";
import styles from "./Style.module.css";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../libs/history.utils";
import useSuccessionDetail from "./SuccessionDetail.hook";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import CustomAutoComplete from "../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../components/FileComponent/FileComponent.component";

function SuccessionPlanDetail() {
  const {
    employeeDetails,
    form,
    changeTextData,
    handleSubmit,
    isSubmitting,
    errorData,
    listData,
    salaryCost,
  } = useSuccessionDetail({});
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Succession Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <DesUpperCard employeeDetail={employeeDetails} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Succession Details</div>
          </div>
        </div>
        <div className={styles.formFlex}>
          <div className="formGroup">
            <CustomSelectField
              label={"Choose One"}
              value={form?.extension_status}
              handleChange={(value) => {
                changeTextData(value, "extension_status");
              }}
              isError={errorData?.extension_status}
            >
              <MenuItem value="EXTENSION">EXTENSION</MenuItem>
              <MenuItem value="RETIRE">RETIRE</MenuItem>
            </CustomSelectField>
          </div>
          <div className="formGroup">
            {form?.extension_status === "RETIRE" ? (
              <CustomDatePicker
                clearable
                label={"Retirement Date"}
                // maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "retirement_date");
                }}
                value={form?.retirement_date}
                isError={errorData?.retirement_date}
              />
            ) : (
              <CustomSelectField
                isError={errorData?.succession}
                errorText={errorData?.succession}
                label={"Succession"}
                value={form?.succession}
                handleChange={(value) => {
                  changeTextData(value, "succession");
                }}
              >
                <MenuItem value="IN_PLACE">In place</MenuItem>
                <MenuItem value="NOT_IN_PLACE">Not in place</MenuItem>
              </CustomSelectField>
            )}
          </div>
        </div>
        {form?.extension_status === "EXTENSION" && (
          <>
            <div className={styles.formFlex}>
              <div className="formGroup">
                {form?.succession === "IN_PLACE" ? (
                  <CustomSelectField
                    isError={errorData?.nature_of_succession}
                    errorText={errorData?.nature_of_succession}
                    label={"Nature of Succession"}
                    value={form?.nature_of_succession}
                    handleChange={(value) => {
                      changeTextData(value, "nature_of_succession");
                    }}
                  >
                    <MenuItem value="INTERNAL">Internal</MenuItem>
                    <MenuItem value="EXTERNAL">External</MenuItem>
                  </CustomSelectField>
                ) : (
                  <div style={{ flex: "1" }}></div>
                )}
              </div>
              <div className="formGroup">
                {form?.extension_status === "EXTENSION" &&
                  form?.succession === "IN_PLACE" && (
                    <CustomSelectField
                      isError={errorData?.medical_condition}
                      errorText={errorData?.medical_condition}
                      label={"Medical Condition"}
                      value={form?.medical_condition}
                      handleChange={(value) => {
                        changeTextData(value, "medical_condition");
                      }}
                    >
                      <MenuItem value="FIT">FIT</MenuItem>
                      <MenuItem value="UNFIT">UNFIT</MenuItem>
                    </CustomSelectField>
                  )}
              </div>
            </div>
            {form?.succession === "IN_PLACE" && (
              <div className={styles.formFlex}>
                <div className={"formGroup"}>
                  <CustomAutoComplete
                    autoCompleteProps={{
                      freeSolo: false,
                      getOptionLabel: (option) => {
                        return option?.label;
                      },
                    }}
                    dataset={listData?.EMPLOYEE_SALARY}
                    datasetKey={"label"}
                    onTextChange={(text, value) => {
                      changeTextData(text, "replacing_person_id");
                    }}
                    variant={"outlined"}
                    label={"Replacing Employee"}
                    name={"replacing_person_id"}
                    isError={errorData?.replacing_person_id}
                    value={form?.replacing_person_id}
                  />
                </div>
                <div className={"formGroup"}>
                  <CustomTextField
                    disabled={true}
                    label={"Replacing Person Current Salary"}
                    value={form?.replacing_person_id?.ctc}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {form?.extension_status === "EXTENSION" &&
          form?.succession === "IN_PLACE" &&
          form?.nature_of_succession === "EXTERNAL" && (
            <div className={styles.formFlex}>
              <div className="formGroup">
                <CustomDatePicker
                  clearable
                  label={"Last Working Date"}
                  // maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "last_working_date");
                  }}
                  value={form?.last_working_date}
                  isError={errorData?.last_working_date}
                />
              </div>
              <div className="formGroup"></div>
            </div>
          )}
        {form?.extension_status === "EXTENSION" && (
          <div className={styles.formFlex}>
            {form?.succession === "IN_PLACE" && (
              <div className={"formGroup"}>
                <div className={styles.costWrap}>
                  Succession's Cost WRT employee:{" "}
                  <span className={styles.cust}>
                    {salaryCost && `${salaryCost} %`}
                  </span>
                </div>
              </div>
            )}
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.pending_dues}
                errorText={errorData?.pending_dues}
                label={"Pending Dues"}
                value={form?.pending_dues}
                onTextChange={(text) => {
                  changeTextData(text, "pending_dues");
                }}
                // onBlur={() => {
                //   onBlurHandler("pending_dues");
                // }}
              />
            </div>

            {form?.extension_status === "EXTENSION" &&
              form?.succession === "NOT_IN_PLACE" && (
                <div className={"formGroup"}>
                  <CustomSelectField
                    isError={errorData?.medical_condition}
                    errorText={errorData?.medical_condition}
                    label={"Medical Condition"}
                    value={form?.medical_condition}
                    handleChange={(value) => {
                      changeTextData(value, "medical_condition");
                    }}
                  >
                    <MenuItem value="FIT">FIT</MenuItem>
                    <MenuItem value="UNFIT">UNFIT</MenuItem>
                  </CustomSelectField>
                </div>
              )}
          </div>
        )}

        {form?.succession && form?.extension_status === "EXTENSION" && (
          <div className={styles.formFlex}>
            <div className="formGroup">
              <CustomDatePicker
                clearable
                label={"Extension/Retainer Start Date"}
                // maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "extension_start_date");
                }}
                value={form?.extension_start_date}
                isError={errorData?.extension_start_date}
              />
            </div>
            <div className="formGroup">
              <CustomDatePicker
                clearable
                label={"Extension/Retainer End Date"}
                // maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "extension_end_date");
                }}
                value={form?.extension_end_date}
                isError={errorData?.extension_end_date}
              />
            </div>
          </div>
        )}

        <div className={styles.formFlex}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.notes}
              errorText={errorData?.notes}
              label={"Notes (if any)"}
              value={form?.notes}
              onTextChange={(text) => {
                changeTextData(text, "notes");
              }}
              // onBlur={() => {
              //   onBlurHandler("notes");
              // }}
              multiline
              rows={2}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Employee Details</div>
          </div>
        </div>
        <div className={styles.formFlex}>
          <div className="formGroup">
            <CustomDatePicker
              clearable
              label={"Date of Submission"}
              // maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "form_submitted_at");
              }}
              value={form?.form_submitted_at}
              isError={errorData?.form_submitted_at}
            />
          </div>
          <div className="formGroup" style={{ alignItems: "center" }}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="image"
              label=""
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
        </div>
        <div className={styles.formFlex}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.form_reason}
              errorText={errorData?.form_reason}
              label={"Specify Reason"}
              value={form?.form_reason}
              onTextChange={(text) => {
                changeTextData(text, "form_reason");
              }}
              multiline
              rows={2}
            />
          </div>
        </div>

        <div className={styles.confirmedWrapper}>
          <ButtonBase onClick={handleSubmit} className={"createBtn"}>
            Submit
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default SuccessionPlanDetail;
