import React, { useEffect } from "react";
import styles from "./EmpInfo.module.css";

import { useSelector } from "react-redux";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, MenuItem } from "@material-ui/core";
import historyUtils from "../../../../libs/history.utils";
import useEmpInformation from "./EmpInformationHook";
import ApprovalPopup from "../component/ApprovalPopup/ApprovalPopup";
import RejectionPopup from "../component/RejectionPopup/RejectionPopup";
import UpperCard from "../component/UpperCard/UpperCard";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomAutoComplete from "../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import StatusPill from "../../../../components/Status/StatusPill.component";
const EmployeeInformation = ({ empId }) => {
  const {
    toggleIsOpenDialog,
    employeeDetail,
    isOpenDialog,
    toggleIsOpenRejectionDialog,
    isOpenRejectionDialog,
    form,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    errorData,
    isSubmitting,
    isSubmitted,
    listData,
    salaryCost,
    HODApprovalStatus,
    salaryCostInternal,
    historyData,
    submitToServer,
  } = useEmpInformation();
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const calculateRetentionCTC = (extensionStatus, ctc) => {
    let retentionCtc = ctc;
    if (extensionStatus === "RETENTION") {
      const percCtc = ((ctc * 30) / 100).toFixed(2);
      retentionCtc = Math.ceil(ctc - percCtc);
    }
    return retentionCtc;
  };
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
      <UpperCard
        employeeDetail={employeeDetail}
        form={form}
        changeTextData={changeTextData}
        isCOR={employeeDetail?.application?.status === "CORPORATE_SUBMITTED"}
      />
      {employeeDetail?.application?.status === "EMPLOYEE_SUBMITTED" && (
        <div className={styles.GeneralInfoWrapeer}>
          <div>
            <span className={styles.title}>General Information</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.infoDetails}>
              1. If you do not have a replacement planned for this person, on date
              of your recommendation, then select not in place.
              <br />
              2. If you have a replacement planned then select IN PLACE, further to
              which if the replacement is internal to the organisation select
              internal and give the name of the employee, if the replacement is
              externally hired then select external. HR will add the detail of
              hiring.
            </p>
          </div>
        </div>
      )}
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Succession Details</div>
          </div>
          {(employeeDetail?.status !== "PENDING" ||
            employeeDetail?.application?.status !== "EMPLOYEE_SUBMITTED") && (
            <>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Succession:</span>
                    {removeUnderScore(employeeDetail?.application?.succession)}
                  </div>
                  {employeeDetail?.application?.status ===
                    "CORPORATE_SUBMITTED" && (
                    <>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Employee Continuing With Company:
                        </span>
                        {employeeDetail?.application?.is_continuing
                          ? "Yes"
                          : "No"}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Extension Dates:</span>
                        {employeeDetail?.application?.extensionStartAt} -{" "}
                        {employeeDetail?.application?.extensionEndAt}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Post Extension/Retention CTC:
                        </span>

                        {calculateRetentionCTC(
                          form?.extension_status,
                          employeeDetail?.application?.retention_ctc
                        )}
                      </div>
                    </>
                  )}

                  {employeeDetail?.application?.succession === "IN_PLACE" && (
                    <>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Replacing Person Details
                        </span>
                        {/* {employeeDetail?.replacing_employee_name} */}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Name:</span>
                        {employeeDetail?.application?.replacing_employee_name}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>Employee ID:</span>
                        {employeeDetail?.application?.replacing_employee_code
                          ? employeeDetail?.application?.replacing_employee_code
                          : "N/A"}{" "}
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.vertical}></div>

                {employeeDetail?.application?.succession === "IN_PLACE" && (
                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Nature of Succession:
                      </span>
                      {employeeDetail?.application?.nature_of_succession}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}></span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Salary:</span>
                      {employeeDetail?.application?.replacing_employee_ctc
                        ? `₹ ${employeeDetail?.application?.replacing_employee_ctc}`
                        : "-"}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Succession's Cost WRT employee:
                      </span>
                      {employeeDetail?.application?.wrt
                        ? `${employeeDetail?.application?.wrt} %`
                        : "-"}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.hrline} />
            </>
          )}
        </div>

        <div>
          <div className={styles.key}>
            <span className={styles.value_submission}>Date of Submission:</span>
            {employeeDetail?.application?.employee_form?.submittedAtText}
          </div>
          <div className={styles.key}>
            <span className={styles.value_submission}>Reason:</span>
            {employeeDetail?.application?.employee_form?.reason}
          </div>
          {employeeDetail?.application?.status === "CORPORATE_SUBMITTED" && (
            <>
              <div className={styles.key}>
                <span className={styles.value_submission}>Pending Dues:</span>
                {employeeDetail?.application?.pending_dues}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value_submission}>Notes:</span>
                {employeeDetail?.application?.notes}
              </div>
            </>
          )}
          <></>
          {employeeDetail?.application?.employee_form?.document && (
            <div className={styles.key}>
              <a
                href={employeeDetail?.application?.employee_form?.document}
                target="_blank"
              >
                <div className={styles.hyperlinkText}>
                  View Fitness Certificate
                </div>
              </a>
            </div>
          )}
        </div>

        {employeeDetail?.application?.status === "EMPLOYEE_SUBMITTED" && (
          <>
            {" "}
            <div className={styles.formFlex}>
              <div className={"formGroup"}>
                <CustomSelectField
                  disabled={employeeDetail?.saj_status !== "PENDING"}
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
              </div>
              <div className={"formGroup"}>
                {form?.succession === "IN_PLACE" && (
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
                )}
              </div>
            </div>
            {form?.nature_of_succession === "INTERNAL" && (
              <>
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
                        changeTextData(text, "replacing_employee_id");
                      }}
                      variant={"outlined"}
                      label={"Replacing Employee"}
                      name={"replacing_employee_id"}
                      isError={errorData?.replacing_employee_id}
                      value={form?.replacing_employee_id}
                    />
                  </div>
                  <div className={"formGroup"}>
                    <CustomTextField
                      disabled={true}
                      label={"Replacing Person Current Salary"}
                      value={form?.replacing_employee_id?.ctc}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>
                <div className={styles.costWrap}>
                  Succession's Cost WRT employee:{" "}
                  <span className={styles.cust}>
                    {salaryCost && `${salaryCost} %`}
                  </span>
                </div>
              </>
            )}
          </>
        )}
        {HODApprovalStatus && employeeDetail?.status === "PENDING" && (
          <>
            <div className={styles.formFlex}>
              {/* {employeeDetail?.application?.saj_status === "NOT_IN_PLACE" ? ( */}
              <>
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
              </>
              {/* ) : (
                <div className="formGroup1">
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
              )} */}
            </div>
            {employeeDetail?.application?.nature_of_succession ===
              "EXTERNAL" && (
              <div>
                <div className={styles.formFlex}>
                  <div className={"formGroup"}>
                    <CustomTextField
                      isError={errorData?.replacing_employee_name}
                      errorText={errorData?.replacing_employee_name}
                      label={"Replacing Person"}
                      value={form?.replacing_employee_name}
                      onTextChange={(text) => {
                        changeTextData(text, "replacing_employee_name");
                      }}
                      onBlur={() => {
                        onBlurHandler("replacing_employee_name");
                      }}
                    />
                  </div>
                  <div className={"formGroup"}>
                    <CustomTextField
                      isError={errorData?.replacing_employee_ctc}
                      errorText={errorData?.replacing_employee_ctc}
                      label={"Replacing Person Salary"}
                      value={form?.replacing_employee_ctc}
                      onTextChange={(text) => {
                        changeTextData(text, "replacing_employee_ctc");
                      }}
                      onBlur={() => {
                        onBlurHandler("replacing_employee_ctc");
                      }}
                    />
                  </div>
                </div>
                <div className={styles.costWrap}>
                  Succession's Cost WRT employee:{" "}
                  <span className={styles.cust}>
                    {salaryCostInternal && `${salaryCostInternal} %`}
                  </span>
                </div>
              </div>
            )}

            <div className={"formGroup"}>
              <CustomTextField
                type="number"
                isError={errorData?.pending_dues}
                errorText={errorData?.pending_dues}
                label={"Pending Dues"}
                value={form?.pending_dues}
                onTextChange={(text) => {
                  changeTextData(text, "pending_dues");
                }}
                onBlur={() => {
                  onBlurHandler("pending_dues");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.notes}
                errorText={errorData?.notes}
                label={"Notes (if any)"}
                value={form?.notes}
                onTextChange={(text) => {
                  changeTextData(text, "notes");
                }}
                onBlur={() => {
                  onBlurHandler("notes");
                }}
                multiline
                rows={2}
              />
            </div>
          </>
        )}
      </div>
      {historyData?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.editFlex}>
              <div className={styles.heading}>Employee History</div>
            </div>
            {historyData?.map((item, index) => (
              <div key={`History_${index}`}>
                <div className={styles.mainFlex}>
                  <div className={styles.left}>
                    {/* <div className={styles.key}>
                      <span className={styles.value}>
                        Employee Continuing With Company:
                      </span>
                      {item?.is_continuing ? "Yes" : "No"}
                    </div> */}
                    <div className={styles.key}>
                      <span className={styles.value}>Extension/Retention Dates:</span>
                      {item?.extensionStartAt} - {item?.extensionEndAt}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Succession Status:</span>
                      {item?.nature_of_succession}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Replacing Place:</span>
                      {item?.replacing_employee_name}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Succession's Cost WRT employee:
                      </span>
                      {item?.wrt ? `${item?.wrt} %` : "-"}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Note:</span>
                      {item?.notes ? item?.notes : "-"}{" "}
                    </div>
                  </div>

                  <div className={styles.vertical}></div>

                  <div className={styles.right}>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        <StatusPill status={removeUnderScore(item?.status)} />
                      </span>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Nature of Succession:
                      </span>
                      {item.extension_status}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                      Medical Condition :
                      </span>
                      {item?.medical_condition ? item?.medical_condition : "-"}
                    </div>
                    <div className={styles.key}>
                      <a
                        href={item?.employee_form?.document}
                        style={{ marginLeft: "30%" }}
                        target="_blank"
                      >
                        View certificate
                      </a>
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Salary:</span>
                      {item?.ctc ? `₹ ${item?.ctc}` : "-"}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Pending Dues:</span>
                      {item?.pending_dues
                        ? item?.pending_dues
                        : "Nothing Pending"}
                    </div>
                  </div>
                </div>
                {item?.comments && (
                  <div className={styles.newContainer}>
                    <div className={styles.heading}>Comments</div>
                    <div className={styles.commentContainer}>
                      {item?.comments?.map((items) => (
                        <div className={styles.commentwrap}>
                          <div>{items.comment}</div>
                          <div className={styles.commentDate}>
                            {`${items?.actioned_by?.name} | ${items?.actionedAt}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {historyData?.length !== index + 1 && (
                  <div className={styles.hrline}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ApprovalPopup
        // candidateId={ids}
        isOpen={isOpenDialog}
        handleToggle={toggleIsOpenDialog}
        form={form}
        changeTextData={changeTextData}
        onBlurHandler={onBlurHandler}
        handleSubmit={handleSubmit}
        errorData={errorData}
        isSubmitting={isSubmitting}
      />
      <RejectionPopup
        isOpen={isOpenRejectionDialog}
        handleToggle={toggleIsOpenRejectionDialog}
        form={form}
        changeTextData={changeTextData}
        onBlurHandler={onBlurHandler}
        handleSubmit={submitToServer}
        errorData={errorData}
        isSubmitting={isSubmitting}
      />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Comments/Notes</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.application?.comments &&
              employeeDetail?.application?.comments?.map((item) => (
                <div className={styles.commentwrap}>
                  <div>{item.comment}</div>
                  <div className={styles.commentDate}>
                    <strong>{`${item?.actioned_by?.name} | ${item?.actionedAt}`}</strong>
                  </div>
                  <div>({item?.panelist_role})</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {employeeDetail?.status === "PENDING" && (
        <div className={styles.plainPaper_footer}>
          <div className={styles.newContainer}>
            <div>
              <div className={styles.rightFlex}>
                <ButtonBase
                  className={styles.edit}
                  onClick={() => {
                    // handleViewGraph();
                    toggleIsOpenRejectionDialog();
                  }}
                >
                  REJECT
                </ButtonBase>
                <ButtonBase
                  className={styles.approve}
                  onClick={() => {
                    toggleIsOpenDialog();
                  }}
                >
                  APPROVE
                </ButtonBase>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeInformation;
