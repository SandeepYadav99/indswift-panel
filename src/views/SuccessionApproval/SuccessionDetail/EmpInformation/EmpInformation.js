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
  } = useEmpInformation();
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
      <UpperCard employeeDetail={employeeDetail} />

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Succession Details</div>
          </div>
          {employeeDetail?.status !== "PENDING" && (
            <>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Succession:</span>
                    {employeeDetail?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      Replacing Person Details
                    </span>
                    {/* {employeeDetail?.replacing_employee_name} */}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Name:</span>
                    {employeeDetail?.replacing_employee_name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Employee ID:</span>
                    {employeeDetail?.replacing_employee_code}{" "}
                  </div>
                </div>

                <div className={styles.vertical}></div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Nature of Succession:</span>
                    {/* {valencyChange(employeeDetail?.vacancy_type)} */}
                    {employeeDetail?.saj_status}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}></span>
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Salary:</span>
                    {employeeDetail?.replacing_employee_ctc
                      ? `₹ ${employeeDetail?.replacing_employee_ctc}`
                      : "-"}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      Succession's Cost WRT employee:
                    </span>
                    {employeeDetail?.cost_wrt ? employeeDetail?.cost_wrt : "-"}
                  </div>
                </div>
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
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.type}
                  errorText={errorData?.type}
                  label={"Succession"}
                  value={form?.type}
                  handleChange={(value) => {
                    changeTextData(value, "type");
                  }}
                >
                  <MenuItem value="IN_PLACE">In place</MenuItem>
                  <MenuItem value="NOT_IN_PLACE">Not in place</MenuItem>
                </CustomSelectField>
              </div>
              <div className={"formGroup"}>
                {form?.type === "IN_PLACE" && (
                  <CustomSelectField
                    isError={errorData?.succession}
                    errorText={errorData?.succession}
                    label={"Nature of Succession"}
                    value={form?.succession}
                    handleChange={(value) => {
                      changeTextData(value, "succession");
                    }}
                  >
                    <MenuItem value="REPLACEMENT_INTERNAL">Internal</MenuItem>
                    <MenuItem value="REPLACEMENT_EXTERNAL">External</MenuItem>
                  </CustomSelectField>
                )}
              </div>
            </div>
            {form?.succession === "REPLACEMENT_INTERNAL" && (
              <>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <CustomAutoComplete
                      autoCompleteProps={{
                        freeSolo: false,
                        getOptionLabel: (option) => {
                          return option?.name;
                        },
                      }}
                      dataset={listData?.EMPLOYEE_SALARY}
                      datasetKey={"name"}
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
      </div>

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
        handleSubmit={handleSubmit}
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
