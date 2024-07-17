import { ButtonBase, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import useContentCreate from "./ContentCreate.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import NewEditor from "../../JobRoleCreate/components/NewEditor/NewEditor.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete } from "@material-ui/lab";

function ContentCreate() {
  const {
    form,
    changeTextData,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    editData,
    descriptionRef,
    id,
    listData,
  } = useContentCreate({});

  console.log("listData", listData);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={styles.value}>
              {id ? "Update" : "Create"} Content
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.value21}>Content Details</div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Reference Format Name"}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomSelectField
              label={"Select Journey"}
              isError={errorData?.letter_journey_id}
              errorText={errorData?.letter_journey_id}
              value={form?.letter_journey_id}
              handleChange={(text) => {
                changeTextData(text, "letter_journey_id");
              }}
            >
              {listData?.LETTER_JOURNEYS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={styles.formGrp}>
            <CustomSelectField
              label={"Select Letter Head"}
              isError={errorData?.letter_head_id}
              errorText={errorData?.letter_head_id}
              value={form?.letter_head_id}
              handleChange={(text) => {
                changeTextData(text, "letter_head_id");
              }}
            >
              {listData?.LETTER_HEADS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>

        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <div className={styles.htmlHeading}>HTML*</div>
            <NewEditor
              //   disable={isDisabled}
              editorData={form?.description}
              handleChange={(html) => {
                descriptionRef.current(html, "description");
              }}
              optionList={["codeView"]}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <div className="AutoCompleteWrap">
            <Autocomplete
              multiple
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "location_id");
              }}
              value={form?.location_id}
              options={listData?.LOCATIONS ? listData?.LOCATIONS : []}
              getOptionLabel={(option) => option.name}
              defaultValue={form?.location_id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Location"
                  error={errorData?.location_id}
                />
              )}
            />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.status}>Status</div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={`Active`}
            />
          </div>
          <div className={styles.btnCont}>
            <ButtonBase
              type={"button"}
              disabled={isLoading ? true : false}
              className={styles.createBtn}
              onClick={handleSubmit}
            >
              Submit
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCreate;
