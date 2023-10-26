import React from "react";
import CandidateInfor from "../component/CandidateInfor";
import CheckboxList from "../component/Checkbox";
import useCandidateUpdate_Hook from "./BGVStatusUpdate_Hook";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import historyUtils from "../../../libs/history.utils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
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
      <CandidateInfor data={{}} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <CheckboxList form={form} changeTextData={changeTextData} />
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.billing_to}
                errorText={errorData?.billing_to}
                label={"Choose Status"}
                value={form?.billing_to}
                handleChange={(value) => {
                  changeTextData(value, "billing_to");
                }}
              >
                <MenuItem value="clear">CLEAR</MenuItem>
                <MenuItem value="failed">FAILED </MenuItem>
                <MenuItem value="unable">UNABLE TO VERIFY </MenuItem>
                <MenuItem value="pending">PENDING </MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.billing_to}
                errorText={errorData?.billing_to}
                label={"Choose Status"}
                value={form?.billing_to}
                handleChange={(value) => {
                  changeTextData(value, "billing_to");
                }}
              >
                <MenuItem value="clear">CLEAR</MenuItem>
                <MenuItem value="failed">FAILED </MenuItem>
                <MenuItem value="unable">UNABLE TO VERIFY </MenuItem>
                <MenuItem value="pending">PENDING </MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.billing_to}
                errorText={errorData?.billing_to}
                label={"Choose Status"}
                value={form?.billing_to}
                handleChange={(value) => {
                  changeTextData(value, "billing_to");
                }}
              >
                <MenuItem value="terminated">Terminated</MenuItem>
                <MenuItem value="allowed_to_work">Allowed To Work </MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.billing_to}
                errorText={errorData?.billing_to}
                label={"Choose BGV Result Status"}
                value={form?.billing_to}
                handleChange={(value) => {
                  changeTextData(value, "billing_to");
                }}
              >
                <MenuItem value="in_process">In_Process</MenuItem>
                <MenuItem value="clear">Clear </MenuItem>
                <MenuItem value="pending">Pending </MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.requiredFooter}>
            <div className={styles.topText}>
              <b>BGV Status:</b>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.billing_to}
                errorText={errorData?.billing_to}
                label={"Choose Action "}
                value={form?.billing_to}
                handleChange={(value) => {
                  changeTextData(value, "billing_to");
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
              <CustomSelectField
                isError={errorData?.billing_to}
                errorText={errorData?.billing_to}
                label={"Any Remarks"}
                value={form?.billing_to}
                handleChange={(value) => {
                  changeTextData(value, "billing_to");
                }}
              >
                <MenuItem value="isl">ISL</MenuItem>
                <MenuItem value="isll">ISLL </MenuItem>
                <MenuItem value="esix">ESIX </MenuItem>
              </CustomSelectField>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BGVStatus_Update;
