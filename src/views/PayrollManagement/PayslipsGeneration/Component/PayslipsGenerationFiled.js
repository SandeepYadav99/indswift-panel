import React from "react";
import styles from "./Style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { ButtonBase, MenuItem } from "@material-ui/core";
import usePayslipsGenerationFiledHook from "./PayslipsGenerationFiledHook";
import SubHeader from "./SubHeader";

const PayslipsGenerationFiled = ({handleToggleSlipDetail}) => {
  const { form, changeTextData } =
    usePayslipsGenerationFiledHook();
  return (
    <div className={styles.attendaceContainer}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Year"}
            value={form?.year}
            handleChange={(value) => {
              changeTextData(value, "year");
            }}
          >
            <MenuItem value={"2024"} >2024</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Month"}
            value={form?.month}
            handleChange={(value) => {
              changeTextData(value, "month");
            }}
          >
            <MenuItem value={"June_(07)"}>June (07)</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          {form?.year === "2024" && (
            <div className={styles.actionButton}>
              <ButtonBase
                onClick={handleToggleSlipDetail}
                className={"createBtn"}
              >
                GENERATE PAYSLIPS
              </ButtonBase>
            </div>
          )}
        </div>
        <div className={"formGroup"}></div>
      </div>
      <SubHeader />
    </div>
  );
};

export default PayslipsGenerationFiled;
