import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"; 
import useDesignationDetail from "./DesignationCreateHook";
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

const DesignationCreateView = ({}) => {
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
    handleReset,
    filteredSubDepartments,
    filteredDepartments,
    filteredEmployees,
  } = useDesignationDetail({});
  const classes = useStyles();

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> New Designation</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Designation Information</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Designation Name"}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
              onBlur={() => {
                onBlurHandler("name");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.department_id}
              errorText={errorData?.department_id}
              label={"Location"}
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
              isError={errorData?.sub_department_id}
              errorText={errorData?.sub_department_id}
              label={"Department"}
              value={form?.sub_department_id}
              handleChange={(value) => {
                changeTextData(value, "sub_department_id");
              }}
            >
              {filteredSubDepartments?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.department_id}
              errorText={errorData?.department_id}
              label={"Grade"}
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
              isError={errorData?.sub_department_id}
              errorText={errorData?.sub_department_id}
              label={"Cadre"}
              value={form?.sub_department_id}
              handleChange={(value) => {
                changeTextData(value, "sub_department_id");
              }}
            >
              {filteredSubDepartments?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className="formGroup">
            <CustomSelectField
              isError={errorData?.department_id}
              errorText={errorData?.department_id}
              label={"Progression Designation (optional)"}
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
              isError={errorData?.sub_department_id}
              errorText={errorData?.sub_department_id}
              label={"Reporting To (optional)"}
              value={form?.sub_department_id}
              handleChange={(value) => {
                changeTextData(value, "sub_department_id");
              }}
            >
              {filteredSubDepartments?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex wrapper"}>
          <div className={"infoTitle inner"}>
            <div className="info_Status">
              <h4 className={"heading_stats"}>Status</h4>
              <div className={"slider_wrap "}>
                <p className="tags">Inactive</p>
                <CustomSwitch
                  value={form?.is_active}
                  handleChange={() => {
                    changeTextData(!form?.is_active, "is_active");
                  }}
                  label={`Active`}
                />
              </div>
            </div>
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

export default DesignationCreateView;
