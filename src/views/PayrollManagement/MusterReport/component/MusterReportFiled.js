import React from "react";
import styles from "./Style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";

import { MenuItem } from "@material-ui/core";
import useMusterReportFiledHook from "./MusterReportFiledHook";
const MusterReportFiled = () => {
  const { form, changeTextData ,   isApprovalPopUp,
    toggleApprovalDialog} = useMusterReportFiledHook();
  return (
    <div className={styles.attendaceContainer}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Employee"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Employees"}>All Employees</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Location"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Locations"}>All Locations</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Department"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Department"}>All Department</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Grade"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Grade"}>All Grade</MenuItem>;
          </CustomSelectField>
        </div>
        
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Designation"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Designation"}>All Designation</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Start Date"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"20/06/2024"}>20/06/2024</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"End Date"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"20/06/2024"}>20/06/2024</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Employee Status"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All Status"}>All Status</MenuItem>;
          </CustomSelectField>
        </div>
        
      </div>
   
    </div>
  );
};

export default MusterReportFiled;
