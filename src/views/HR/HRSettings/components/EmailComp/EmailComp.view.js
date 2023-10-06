import {
  ButtonBase,
  CircularProgress,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import styles from "./Style.module.css";
import useEmailCompHook from "./EmailComp.hook";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete } from "@material-ui/lab";
import NewEditor from "../../../../JobRoleCreate/components/NewEditor/NewEditor.component";

function EmailCompView() {
  const {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    listData,
    descriptionRef,
    isSubmitting,
  } = useEmailCompHook({});

  return (
    <div className={styles.cagrWrapper}>
      <div className={styles.Heading}>Email Composer</div>
      <div className={"formGroup"}>
        <CustomSelectField
          isError={errorData?.type}
          errorText={errorData?.type}
          label={"Send To"}
          value={form?.type}
          handleChange={(value) => {
            changeTextData(value, "type");
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="DEPARTMENT">DEPARTMENT WISE</MenuItem>
          <MenuItem value="LOCATION">Location WISE</MenuItem>
          <MenuItem value="DESIGNATION">Designation WISE</MenuItem>
          <MenuItem value="GRADE">GRADE</MenuItem>
        </CustomSelectField>
      </div>
      {form?.type === "LOCATION" && (
        <div className={"formGroup"}>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "location_id");
            }}
            value={form?.location_id}
            // id="tags-standard"
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
      )}
      {form?.type === "DEPARTMENT" && (
        <div className={"formGroup"}>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "department_id");
            }}
            value={form?.department_id}
            // id="tags-standard"
            options={listData?.DEPARTMENTS ? listData?.DEPARTMENTS : []}
            getOptionLabel={(option) => option.name}
            defaultValue={form?.department_id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Department"
                error={errorData?.department_id}
              />
            )}
          />
        </div>
      )}
      {form?.type === "DESIGNATION" && (
        <div className={"formGroup"}>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "designation_id");
            }}
            value={form?.designation_id}
            // id="tags-standard"
            options={listData?.DESIGNATIONS ? listData?.DESIGNATIONS : []}
            getOptionLabel={(option) => option.name}
            defaultValue={form?.designation_id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Designation"
                error={errorData?.designation_id}
              />
            )}
          />
        </div>
      )}
      {form?.type === "GRADE" && (
        <div className={"formGroup"}>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "grade");
            }}
            value={form?.grade}
            // id="tags-standard"
            options={listData?.GRADES ? listData?.GRADES : []}
            getOptionLabel={(option) => option.code}
            defaultValue={form?.grade}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Grade"
                error={errorData?.grade}
              />
            )}
          />
        </div>
      )}
      <div className={"formGroup"}>
        <CustomTextField
          isError={errorData?.subject}
          errorText={errorData?.subject}
          label={"Subject"}
          value={form?.subject}
          onTextChange={(text) => {
            changeTextData(text, "subject");
          }}
        />
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Body Content</div>
          </h4>
        </div>
        <NewEditor
          editorData={form?.body}
          // handleChange={(html) => {
          //   changeTextData(html, "body");
          // }}
          handleChange={(html) => {
            descriptionRef.current(html, "body");
          }}
        />
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btnCont1}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            onClick={handleSubmit}
            className={
              isSubmitting ? styles.disabledCreatebtn : styles.createBtn
            }
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "Send"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default EmailCompView;
