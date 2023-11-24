import React from "react";
import styles from "./Style.module.css";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import { ButtonBase, MenuItem } from "@material-ui/core";
const PmsMasterView = () => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.title}>PMS Master</div>
          <div className={styles.newLine} />
        </div>
        <p>To create a new batch for the new performance review cycle.</p>

        <div>
          <div className={"formFlex"} style={{width:"70%"}}>
            <div className={"formGroup"}>
              <CustomSelectField
                // isError={errorData?.is_education_verification_status}
                // errorText={errorData?.is_education_verification_status}
                label={"Select Financial Year"}
                // value={form?.is_education_verification_status}
                handleChange={(value) => {
                  // changeTextData(value, "is_education_verification_status");
                }}
              >
                <MenuItem value="CLEAR">2022 - 2023</MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                // isError={errorData?.is_education_verification_status}
                // errorText={errorData?.is_education_verification_status}
                label={"Make Batch"}
                // value={form?.is_education_verification_status}
                handleChange={(value) => {
                  // changeTextData(value, "is_education_verification_status");
                }}
              >
                <MenuItem value="CLEAR">APMS</MenuItem>
              </CustomSelectField>
            </div>
            <div className={styles.container}>
              <ButtonBase
                // disabled={isSubmitting}
                className={styles.editSuccess}
                // onClick={toggleChangeDialog}
              >
                CREATE BATCH
              </ButtonBase>
            </div>
          </div>
          <table className={styles.table}>
            <thead className={styles.table_head}>
              <tr className={styles.table_head_th}>
                <th>LAST BATCH</th>
                <th>FINANCIAL YEAR</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              <tr>
                <td>APMS</td>
                <td>2022 - 2023</td>
                <td>08/11/2023</td>
              </tr>
              <tr className={styles.row2}>
                <td>DTY</td>
                <td>2022 - 2023</td>
                <td>12/10/2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />

      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.title}>
            Reviewer Batch (Type 1 - Type 4) - APMS
          </div>
        
        </div>
        <p>
          Please choose the start date (email will be sent) and end date (review
          submission last date) by reviewers. <br />{" "}
          <b>
            {" "}
            Note: Once batch is created, reviewers for employees cannot be
            changed.{" "}
          </b>
        </p>

        <div >
          <div className={"formFlex"} style={{width:"70%"}}>
            <div className={"formGroup"}>
              <CustomSelectField
                // isError={errorData?.is_education_verification_status}
                // errorText={errorData?.is_education_verification_status}
                label={"Start Date"}
                // value={form?.is_education_verification_status}
                handleChange={(value) => {
                  // changeTextData(value, "is_education_verification_status");
                }}
              >
                <MenuItem value="CLEAR">20/11/2023</MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <CustomSelectField
                // isError={errorData?.is_education_verification_status}
                // errorText={errorData?.is_education_verification_status}
                label={"End Date"}
                // value={form?.is_education_verification_status}
                handleChange={(value) => {
                  // changeTextData(value, "is_education_verification_status");
                }}
              >
                <MenuItem value="CLEAR">30/11/2023</MenuItem>
              </CustomSelectField>
            </div>
            <div className={styles.container}>
              <ButtonBase
                // disabled={isSubmitting}
                className={styles.editSuccess}
                // onClick={toggleChangeDialog}
              >
               CREATE BATCH
              </ButtonBase>
              
              <ButtonBase
                // disabled={isSubmitting}
                className={styles.editFreeze}
                // onClick={toggleChangeDialog}
              >
             FREEZE
              </ButtonBase>
            </div>
          </div>
          <table className={styles.table}>
            <thead className={styles.table_head}>
              <tr className={styles.table_head_th}>
                <th>LAST BATCH</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>FREEZED ON</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              <tr>
                <td>APMS</td>
                <td>08/11/2023</td>
                <td>08/11/2023</td>
                <td>08/11/2023</td>
              </tr>
              <tr className={styles.row2}>
                <td>DTY</td>
                <td>12/10/2023</td>
                <td>12/10/2023</td>
                <td>12/10/2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PmsMasterView;
