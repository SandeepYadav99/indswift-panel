import React, { useMemo } from "react";
import useJobRolesDetail from "./JobRoleCreateHook";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import constants from "../../config/constants";
import AutoCompleteChip from "../../components/FormFields/AutoCompleteText/AutoCompleteChip";
import NewEditor from "./components/NewEditor/NewEditor.component";
import CustomSwitch from "../../components/FormFields/CustomSwitch";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const JobRoleCreateView = ({}) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    isEdit,
    handleDelete,
    includeRef,
    currency,
    keywords,
    handleReset,
  } = useJobRolesDetail({});
  const classes = useStyles();

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>New Job Description</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Job Description Information</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.job_title}
              errorText={errorData?.job_title}
              label={"Job Title (Designation)"}
              value={form?.job_title}
              onTextChange={(text) => {
                changeTextData(text, "job_title");
              }}
              onBlur={() => {
                onBlurHandler("job_title");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.code}
              errorText={errorData?.code}
              label={"Job Code"}
              value={form?.code}
              onTextChange={(text) => {
                changeTextData(text, "code");
              }}
              onBlur={() => {
                onBlurHandler("code");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.location}
              errorText={errorData?.location}
              label={"Location"}
              value={form?.location}
              handleChange={(value) => {
                changeTextData(value, "location");
              }}
            >
              <MenuItem value={"NABHA"}>Nabha</MenuItem>
            </CustomSelectField>
          </div>
        </div>

        <div className={"formFlex"}>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.department}
              errorText={errorData?.department}
              label={"Department"}
              value={form?.department}
              handleChange={(value) => {
                changeTextData(value, "department");
              }}
            >
              <MenuItem value={"TEST"}>Test</MenuItem>
            </CustomSelectField>
          </div>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.sub_department}
              errorText={errorData?.sub_department}
              label={"Sub-Department"}
              value={form?.sub_department}
              handleChange={(value) => {
                changeTextData(value, "sub_department");
              }}
            >
              <MenuItem value={"TEST"}>Test</MenuItem>
            </CustomSelectField>
          </div>
        </div>

        <div className={"formFlex"}>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.grade}
              errorText={errorData?.grade}
              label={"Grade"}
              value={form?.grade}
              handleChange={(value) => {
                changeTextData(value, "grade");
              }}
            >
              <MenuItem value={"TEST"}>Test</MenuItem>
            </CustomSelectField>
          </div>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.cader}
              errorText={errorData?.cader}
              label={"Cader"}
              value={form?.cader}
              handleChange={(value) => {
                changeTextData(value, "cader");
              }}
            >
              <MenuItem value={"TEST"}>Test</MenuItem>
            </CustomSelectField>
          </div>
        </div>

        <div className={"formFlex"}>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.reporting_to}
              errorText={errorData?.reporting_to}
              label={"Reporting To"}
              value={form?.reporting_to}
              handleChange={(value) => {
                changeTextData(value, "reporting_to");
              }}
            >
              <MenuItem value={"TEST"}>Test</MenuItem>
            </CustomSelectField>
          </div>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.qualification}
              errorText={errorData?.qualification}
              label={"Mini Qualification"}
              value={form?.qualification}
              handleChange={(value) => {
                changeTextData(value, "qualification");
              }}
            >
              <MenuItem value={"TEST"}>Test</MenuItem>
            </CustomSelectField>
          </div>
        </div>

        <div className={"formFlex"}>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.experience}
              errorText={errorData?.experience}
              label={"Mini Experience"}
              value={form?.experience}
              handleChange={(value) => {
                changeTextData(value, "experience");
              }}
            >
              <MenuItem value={"TEST"}>Test</MenuItem>
            </CustomSelectField>
          </div>
          {/* form field need to be added on F.E */}
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.experience}
              errorText={errorData?.experience}
              label={"Salary Range"}
              value={form?.experience}
              handleChange={(value) => {
                changeTextData(value, "experience");
              }}
            >
              <MenuItem value={"TEST"}>5L-9L</MenuItem>
            </CustomSelectField>
          </div>
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Job Description</div>
          </h4>
        </div>
        <NewEditor />
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Job Specification</div>
          </h4>
        </div>
        <NewEditor />
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={`Active`}
            />
          </div>
        </div>

        <div className={styles.btnCont}>
          <ButtonBase
            disabled={isSubmitting}
            type={"button"}
            onClick={handleSubmit}
            className={styles.createBtn}
          >
            Create
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default JobRoleCreateView;
