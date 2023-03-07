import React from "react";
import { MenuItem, ButtonBase } from "@material-ui/core";
import styles from "../Style.module.css";
import useEmployeeView from "./EmployeeViewHook.js";
import CustomSelectField from "../../../../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../../../components/FileComponent/FileComponent.component";

const EmployeeView = ({
  selectedAnnuals,
  closeSidePanel,
  originWarehouseId,
}) => {
  const {
    form,
    changeTextData,
    errorData,
    handleSubmit,
    onBlurHandler,
    listData,
  } = useEmployeeView({ selectedAnnuals, closeSidePanel, originWarehouseId });

  return (
    <div>
      <div className={styles.headerFlex}>
        {/*<h4 className={styles.infoTitle}>*/}
        {/*    <div className={styles.heading}>Annual</div>*/}
        {/*    <Tooltip title="Info" aria-label="info" placement="right">*/}
        {/*        <InfoIcon fontSize={'small'}/>*/}
        {/*    </Tooltip>*/}
        {/*</h4>*/}
      </div>
      <div className={styles.upperInfo}>
        {/* <div>FY 2022-23</div>
        <div>On Roll Employee</div> */}
      </div>

      <div>
        {/* <div className={styles.loc}>Mohali Location</div>
        <div className={styles.hr}>Human Resources Department</div> */}
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup1"}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            name="title"
            label={"Letter Title"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
        </div>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup2"}>
          <CustomSelectField
            isError={errorData?.type}
            errorText={errorData?.type}
            name="type"
            label={"Type Of Letter"}
            value={form?.type}
            handleChange={(value) => {
              changeTextData(value, "type");
            }}
          >
            {listData?.TYPE_OF_LETTER?.map((dT) => {
              return (
                <MenuItem value={dT?.name} key={dT?.id}>
                  {dT?.name}
                </MenuItem>
              );
            })}
          </CustomSelectField>
        </div>
        <div className={"formGroup2"}>
          <CustomDatePicker
            clearable
            name="date_of_issue"
            label={"Date Of issue"}
            // minDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "date_of_issue");
            }}
            value={form?.date_of_issue}
            isError={errorData?.date_of_issue}
          />
        </div>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup2"}>
          <File
            max_size={2 * 1024 * 1024}
            type={["pdf"]}
            fullWidth={true}
            name="document"
            accept={"application/pdf"}
            label=""
            default_image={form?.document ? form?.document : null}
            // user_image={form?.image}
            error={errorData?.document}
            // title={'image'}
            value={form?.document}
            // handleChange={this._handleFileChange}
            placeholder={"PDF Upload"}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "document");
              }
            }}
          />
        </div>
        <div className={"formGroup2"}>
          <CustomTextField
            isError={errorData?.letter_head_no}
            errorText={errorData?.letter_head_no}
            label={"Letter Head"}
            name="letter_head_no"
            value={form?.letter_head_no}
            onTextChange={(text) => {
              changeTextData(text, "letter_head_no");
            }}
            onBlur={() => {
              onBlurHandler("letter_head_no");
            }}
          />
        </div>
      </div>

      <div className={styles.generate}>
        <ButtonBase
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          Upload
        </ButtonBase>
      </div>
    </div>
  );
};

export default EmployeeView;
