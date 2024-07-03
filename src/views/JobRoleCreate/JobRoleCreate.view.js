import React, { useMemo } from "react";
import useJobRolesDetail from "./JobRoleCreateHook";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NewEditor from "./components/NewEditor/NewEditor.component";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import WaitingComponent  from "../../components/Waiting.component";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const JobRoleCreateView = ({ onlyShow }) => {
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
    listData,
    filteredDepartments,
    filteredSubDepartments,
    descriptionRef,
    id,
  } = useJobRolesDetail({});
  const classes = useStyles();
  const isDisabled = useMemo(() => {
    return onlyShow ? true : false;
  }, [onlyShow]);

  if (isLoading) {
    return <WaitingComponent />;
  }
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Update" : "New"} Job Description</b>
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

        <div className={"formFlex"} id={styles.mobileResponsive}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={isDisabled}
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Job Role "}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
              onBlur={() => {
                onBlurHandler("name");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={id ? true : false}
              isError={errorData?.location_id}
              errorText={errorData?.location_id}
              label={"Location"}
              value={form?.location_id}
              handleChange={(value) => {
                changeTextData(value, "location_id");
              }}
            >
              {listData?.LOCATION_DEPARTMENTS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"} id={styles.mobileResponsive}>
          <div className="formGroup">
            <CustomSelectField
              disabled={id ? true : false}
              isError={errorData?.department_id}
              errorText={errorData?.department_id}
              label={"Department"}
              value={form?.department_id}
              handleChange={(value) => {
                changeTextData(value, "department_id");
              }}
            >
              {filteredDepartments?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className="formGroup">
            <CustomSelectField
              disabled={isDisabled}
              isError={errorData?.grade_id}
              errorText={errorData?.grade_id}
              label={"Grade"}
              value={form?.grade_id}
              handleChange={(value) => {
                changeTextData(value, "grade_id");
              }}
            >
              {listData?.GRADES?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.code}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>

        <div className={"formFlex"} id={styles.mobileResponsive}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={isDisabled}
              inputProps={{ disabled: true }}
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
          <div className="formGroup">
            <CustomSelectField
              disabled={isDisabled}
              isError={errorData?.reporting_to}
              errorText={errorData?.reporting_to}
              label={"Reporting To"}
              value={form?.reporting_to}
              handleChange={(value) => {
                changeTextData(value, "reporting_to");
              }}
            >
              <MenuItem value={""}>None</MenuItem>
              {listData?.JOB_ROLES?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.label}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"} id={styles.mobileResponsive}>
          <div className="formGroup">
            <CustomTextField
              disabled={isDisabled}
              isError={errorData?.min_qualification}
              errorText={errorData?.min_qualification}
              label={"Min Qualification"}
              value={form?.min_qualification}
              onTextChange={(text) => {
                changeTextData(text, "min_qualification");
              }}
              onBlur={() => {
                onBlurHandler("min_qualification");
              }}
            />
          </div>

          <div className="formGroup">
            <CustomTextField
              disabled={isDisabled}
              isError={errorData?.min_experience}
              errorText={errorData?.min_experience}
              label={"Min Experience"}
              value={form?.min_experience}
              onTextChange={(text) => {
                changeTextData(text, "min_experience");
              }}
              onBlur={() => {
                onBlurHandler("min_experience");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"} id={styles.salary_range_field}>
          {/* form field need to be added on F.E */}
          <div className="formGroup">
            <CustomTextField
              disabled={isDisabled}
              isError={errorData?.salary_range}
              errorText={errorData?.salary_range}
              label={"Salary Range"}
              value={form?.salary_range}
              onTextChange={(text) => {
                changeTextData(text, "salary_range");
              }}
              onBlur={() => {
                onBlurHandler("salary_range");
              }}
            />
          </div>
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Job Description</div>
          </h4>
        </div>
        <NewEditor
          disable={isDisabled}
          editorData={form?.description}
          handleChange={(html) => {
            descriptionRef.current(html, "description");
          }}
        />
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Job Specification</div>
          </h4>
        </div>
        <NewEditor
          disable={isDisabled}
          editorData={form?.specification}
          handleChange={(html) => {
            descriptionRef.current(html, "specification");
          }}
        />
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
          </h4>
        </div>

        <div className={"formFlex"} id={styles.mobileResponsive}>
          <div className={"formGroup"}>
            <CustomSwitch
              disabled={isDisabled}
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={`Active`}
            />
          </div>
        </div>

        {!isDisabled && (
          <div className={styles.btnCont}>
            <ButtonBase
              disabled={isSubmitting}
              type={"button"}
              onClick={handleSubmit}
              className={styles.createBtn}
            >
              {id ? "Update" : "Create"}
            </ButtonBase>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRoleCreateView;

// <div className="formGroup">
//             <CustomSelectField
//               disabled={isDisabled}
//               isError={errorData?.sub_department_id}
//               errorText={errorData?.sub_department_id}
//               label={"Sub-Department"}
//               value={form?.sub_department_id}
//               handleChange={(value) => {
//                 changeTextData(value, "sub_department_id");
//               }}
//             >
//               {filteredSubDepartments?.map((dT) => {
//                 return (
//                   <MenuItem value={dT?.id} key={dT?.id}>
//                     {dT?.name}
//                   </MenuItem>
//                 );
//               })}
//             </CustomSelectField>
//           </div>
