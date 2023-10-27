import React from 'react'
import styles from "./Style.module.css"
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";

const CheckboxList = ({changeTextData, form}) => {
  console.log(form)
  return (
    <div className={styles.mainFlex}>
    <div className={styles.left}>
      <div>
        <div className={"formGroup"}>
          <CustomCheckbox
            color={"primary"}
            handleChange={() => {
              changeTextData(
                !form?.is_education_verification,
                "is_education_verification"
              );
            }}
            label={"Education"}
            checked={form?.is_education_verification}
          />
        </div>
      </div>
      <div>
        <div className={"formGroup"}>
          <CustomCheckbox
            color={"primary"}
            handleChange={() => {
              changeTextData(
                !form?.is_first_employment_verification,
                "is_first_employment_verification"
              );
            }}
            label={"1st Employment"}
            checked={form?.is_first_employment_verification}
          />
        </div>
      </div>
      <div>
        <div className={"formGroup"}>
          <CustomCheckbox
            color={"primary"}
            handleChange={() => {
              changeTextData(
                !form?.is_secound_employment_verification,
                "is_secound_employment_verification"
              );
            }}
            label={"2nd Employment"}
            checked={form?.is_secound_employment_verification}
          />
        </div>
      </div>
      <div>
        <div className={"formGroup"}>
          <CustomCheckbox
            color={"primary"}
            handleChange={() => {
              changeTextData(
                !form?.is_criminal_verification,
                "is_criminal_verification"
              );
            }}
            label={"Criminal"}
            checked={form?.is_criminal_verification}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default CheckboxList