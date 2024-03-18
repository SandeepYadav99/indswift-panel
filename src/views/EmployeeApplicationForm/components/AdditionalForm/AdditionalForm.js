import styles from "../../Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import React, {forwardRef} from "react";
import useAdditionalForm from "./AdditionalFormHook";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import {MenuItem} from "@material-ui/core";


const AdditionalForm = ({isDisabled}, ref) => {
    const { changeTextData, form, errorData, handleReset, includeRef, isEdit, isLoading, isSubmitting, onBlurHandler, removeError} = useAdditionalForm({}, ref);
    return (
        <div className={styles.signContainer}>
            {/* <SalaryDetail /> */}
            <div className={"headerFlex1"}>
                <h4 className={"infoTitle1"}>
                    <div className={"heading1"}>Other Information</div>
                </h4>
            </div>
            <div className={"formFlex1"}>
                <div className={"formGroup1"}>
                    <CustomSelectField
                        disabled={isDisabled ? true : false}
                        isError={errorData?.is_interviewed_before}
                        errorText={errorData?.is_interviewed_before}
                        label={"Interview by IISL before"}
                        value={form?.is_interviewed_before}
                        handleChange={(value) => {
                            changeTextData(value, "is_interviewed_before");
                        }}
                    >
                        <MenuItem value="YES">Yes</MenuItem>
                        <MenuItem value="NO">No</MenuItem>
                    </CustomSelectField>
                </div>

            </div>
            {
                form?.is_interviewed_before === "YES" &&
                <>
                <div className={"formFlex1"}>
                <div className="formGroup1">
                    <CustomDatePicker
                        disabled={isDisabled ? true : false}
                        clearable
                        label={"Interview Date"}
                        // minDate={new Date()}
                        onChange={(date) => {
                          changeTextData(date, "interview_date");
                        }}
                        value={form?.interview_date}
                        isError={errorData?.interview_date}
                    />
                </div>
                <div className="formGroup1">
                    <CustomTextField
                        disabled={isDisabled ? true : false}
                        isError={errorData?.interviewed_for}
                        errorText={errorData?.interviewed_for}
                        label={"Position Interviewed For"}
                        value={form?.interviewed_for}
                        onTextChange={(text) => {
                          changeTextData(text, "interviewed_for");
                        }}
                        onBlur={() => {
                          onBlurHandler("interviewed_for");
                        }}
                    />
                </div>
            </div>

            <div className={"formFlex1"}>
                <div className="formGroup1">
                    <CustomTextField
                        disabled={isDisabled ? true : false}
                        isError={errorData?.note}
                        errorText={errorData?.note}
                        label={"Any additonal Information"}
                        value={form?.note}
                        onTextChange={(text) => {
                          changeTextData(text, "note");
                        }}
                        onBlur={() => {
                          onBlurHandler("note");
                        }}
                    />
                </div>
            </div>
                </>
            }

            {/* <div className={"formFlex1"}>
                <div className="formGroup1">
                    <CustomDatePicker
                        disabled={isDisabled ? true : false}
                        clearable
                        label={"Interview Date"}
                        // minDate={new Date()}
                        onChange={(date) => {
                          changeTextData(date, "interview_date");
                        }}
                        value={form?.interview_date}
                        isError={errorData?.interview_date}
                    />
                </div>
                <div className="formGroup1">
                    <CustomTextField
                        disabled={isDisabled ? true : false}
                        isError={errorData?.interviewed_for}
                        errorText={errorData?.interviewed_for}
                        label={"Position Interviewed For"}
                        value={form?.interviewed_for}
                        onTextChange={(text) => {
                          changeTextData(text, "interviewed_for");
                        }}
                        onBlur={() => {
                          onBlurHandler("interviewed_for");
                        }}
                    />
                </div>
            </div>

            <div className={"formFlex1"}>
                <div className="formGroup1">
                    <CustomTextField
                        disabled={isDisabled ? true : false}
                        isError={errorData?.note}
                        errorText={errorData?.note}
                        label={"Any additonal Information"}
                        value={form?.note}
                        onTextChange={(text) => {
                          changeTextData(text, "note");
                        }}
                        onBlur={() => {
                          onBlurHandler("note");
                        }}
                    />
                </div>
            </div> */}
        </div>
    )
};

export default forwardRef(AdditionalForm);
