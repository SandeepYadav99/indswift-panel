import styles from "./Style.module.css";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { EditOutlined } from "@material-ui/icons";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useBGVForm_Hook from "./BGVForm_Hook";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";

const BGVForm = ({isCLonePage}) => {
  const {
    form,
    changeTextData,
    errorData,
    handleSubmit,
    isCostEdit,
    toggleCostEdit,
  } = useBGVForm_Hook({});

  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div>
              <span className={styles.bgv_verification}>
                Background Verification Details{" "}
              </span>
              <br />
              <div className={styles.gpas}/>
              <div className={styles.text_}>
                Choose type of verification required:
              </div>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.InnerWrap}>
                <div className={styles.formGroup}>
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
              <div className={styles.InnerWrap}>
                <div className={styles.formGroup}>
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
              <div className={styles.InnerWrap}>
                <div className={styles.formGroup}>
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
              <div className={styles.InnerWrap}>
                <div className={styles.formGroup}>
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
          <div className={styles.formFlec}>
            <div
              className={styles.formGroup221}
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isCostEdit ? (
                <CustomTextField
                  isError={errorData?.cost}
                  errorText={errorData?.cost}
                  label={"Cost"}
                  type={"number"}
                  value={form?.cost}
                  onTextChange={(text) => {
                    changeTextData(text, "cost");
                  }}
                  onBlur={() => {
                    // onBlurHandler("name");
                  }}
                />
              ) : (
                <CustomTextField
                  isError={errorData?.cost}
                  errorText={errorData?.cost}
                  label={"Cost"}
                  type={"number"}
                  value={form?.cost}
                  disabled={true}
                />
              )}
              <div>
                <IconButton
                  className={"tableActionBtn"}
                  color="secondary"
                  // disabled={isCalling}
                  onMouseDown={toggleCostEdit}
                >
                  <EditOutlined fontSize={"small"} />
                </IconButton>
              </div>
            </div>

            <div className={styles.formGroup}>
              <CustomSelectField
                isError={errorData?.billing_to}
                errorText={errorData?.billing_to}
                label={"Billing To "}
                value={form?.billing_to}
                handleChange={(value) => {
                  changeTextData(value, "billing_to");
                }}
              >
                <MenuItem value="ISL">ISL</MenuItem>
                <MenuItem value="ISLL">ISLL</MenuItem>
                <MenuItem value="ESIX">ESSIX </MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.description}
                // errorText={errorData?.description}
                label={"Any Remarks"}
                value={form?.remark}
                onTextChange={(text) => {
                  changeTextData(text, "remark");
                }}
                // onBlur={() => {
                //    onBlurHandler("remark");
                // }}
                multiline
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
      {
        !isCLonePage &&   <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          SUBMIT
        </ButtonBase>
      </div>
      }
    </div>
  );
};

export default BGVForm;
