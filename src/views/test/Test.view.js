import styles from "../CadreDetails/component/ClaimForm/Style.module.css";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import React from "react";
import useTestHook from "./Test.hook";

const TestView = ({}) => {
    const  {errorData, changeTextData, form, handleDelete, handleReset, handleSubmit, removeError, onBlurHandler} = useTestHook({});
    return (
        <div>
            <div className={"formFlex"}>
                <div className={"formGroup"}>
                    <CustomTextField
                        type="text"
                        isError={errorData?.name}
                        errorText={errorData?.name}
                        label={"name"}
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
                    <CustomTextField
                        type="text"
                        isError={errorData?.email}
                        errorText={errorData?.email}
                        label={"Email"}
                        value={form?.email}
                        onTextChange={(text) => {
                            changeTextData(text, "email");
                        }}
                        onBlur={() => {
                            onBlurHandler("email");
                        }}
                    />
                </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
};

export default TestView;
