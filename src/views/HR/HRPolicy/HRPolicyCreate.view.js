import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import constants from "../../../config/constants";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import useHRPolicyDetail from "./HRPolicyCreateHook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../libs/LogUtils";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const HRCreateView = ({}) => {
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
    id,
  } = useHRPolicyDetail({});
  const classes = useStyles();

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Update" : "New"} HR Policy</b>
            </span>
          </ButtonBase>
          <div className={styles.newLines} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>HR Policy Details</div>
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
              label={"Policy Name"}
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
              isError={errorData?.code}
              errorText={errorData?.code}
              label={"Policy Number"}
              value={form?.code}
              onTextChange={(text) => {
                changeTextData(text, "code");
              }}
              onBlur={() => {
                onBlurHandler("code");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Effective Date"}
              // minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "effective_date");
              }}
              value={form?.effective_date}
              isError={errorData?.effective_date}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.revision_number}
              errorText={errorData?.revision_number}
              label={"Revision Number"}
              value={form?.revision_number}
              onTextChange={(text) => {
                changeTextData(text, "revision_number");
              }}
              onBlur={() => {
                onBlurHandler("revision_number");
              }}
            />
          </div>
        </div>
        <div className={"formGroup file_Wrapper"}>
          <File
              max_size={2 * 1024 * 1024}
              type={['pdf']}
              fullWidth={true}
              name="document"
              accept={'application/pdf'}
              label=""
              default_image={form?.document ? form?.document : null}
              // user_image={form?.image}
              error={errorData?.document}
              // title={'image'}
              value={form?.document}
              // handleChange={this._handleFileChange}
              placeholder={'Policy Document'}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, 'document');
                }
              }}
          />
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
            <div className="info_Status">
              <h4 className={"heading_stats"}>Feature on Dashboard:</h4>
              <div className={"slider_wrap "}>
                <p className="tags">No</p>
                <CustomSwitch
                  value={form?.is_featured}
                  handleChange={() => {
                    changeTextData(!form?.is_featured, "is_featured");
                  }}
                  label={`Yes`}
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
            {id ? "Update" : "Create"}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default HRCreateView;
