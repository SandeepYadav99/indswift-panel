import {ButtonBase, MenuItem, TextField} from "@material-ui/core";

import React, {
    useEffect, useState, useCallback, useMemo,
} from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import LogUtils from "../../../../libs/LogUtils";
import {isNum} from "../../../../libs/RegexUtils";
import styles from "../../Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";

const IncludeQualificationField = ({index, changeData, variants, handlePress, data: form, errors: errorData}) => {

    const changeTextData = (value, key) => {
        changeData(index, {[key]: value});
    }

    return (<div className={styles.flexContainer}>
      <div className={styles.qualificationFormCont}>
            <div className={styles.firstRow}>
                <div className={styles.flex1}>
                    <CustomSelectField
                        isError={errorData?.qualification}
                        errorText={errorData?.qualification}
                        label={"Qualification"}
                        value={form?.qualification}
                        handleChange={(value) => {
                            changeTextData(value, "qualification");
                        }}
                    >
                        <MenuItem value="10">10th</MenuItem>
                        <MenuItem value="12">12th</MenuItem>
                    </CustomSelectField>
                </div>
                <div className={styles.flex1}>
                    <CustomTextField
                        isError={errorData?.degree_name}
                        errorText={errorData?.degree_name}
                        label={"Name of Degree/Specialization"}
                        value={form?.degree_name}
                        onTextChange={(text) => {
                            changeTextData(text, "degree_name");
                        }}
                    />
                </div>
                <div className={styles.flex1}>
                    <CustomTextField
                        isError={errorData?.institute_name}
                        errorText={errorData?.institute_name}
                        label={"Institute/University"}
                        value={form?.institute_name}
                        onTextChange={(text) => {
                            changeTextData(text, "institute_name");
                        }}
                    />
                </div>
            </div>
            <div className={styles.firstRow}>
                <div className={styles.flex1}>
                    <CustomTextField
                        isError={errorData?.passing_year}
                        errorText={errorData?.passing_year}
                        label={"Passing Year"}
                        value={form?.passing_year}
                        onTextChange={(text) => {
                            changeTextData(text, "passing_year");
                        }}
                    />
                </div>
                <div className={styles.flex1}>
                    <CustomTextField
                        isError={errorData?.cgpa}
                        errorText={errorData?.cgpa}
                        label={"Percentage/CGPA"}
                        value={form?.cgpa}
                        type={'number'}
                        onTextChange={(text) => {
                            changeTextData(text, "cgpa");
                        }}
                    />
                </div>
                <div className={styles.flex1}>
                    <CustomSelectField
                        isError={errorData?.degree_type}
                        errorText={errorData?.degree_type}
                        label={"Degree Type"}
                        value={form?.degree_type}
                        handleChange={(value) => {
                            changeTextData(value, "degree_type");
                        }}
                    >
                        <MenuItem value="FULL_TIME">Full Time</MenuItem>
                        <MenuItem value="PART_TIME">PartTime</MenuItem>
                    </CustomSelectField>
                </div>
            </div>
      </div>
      <div className={styles.btnCont}>
        <div className={"textCenter"}>
          <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
          >
            {index == 0 ? "Remove" : "Remove"}
          </ButtonBase>
        </div>
      </div>
            <br/>
        </div>);
};

export default IncludeQualificationField;
