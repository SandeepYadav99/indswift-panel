import React, { useMemo } from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import CustomAutoComplete from "../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../components/FileComponent/FileComponent.component";
import EmployeeListCreateHook from "./EmployeeListCreateHook";
import TotalSum from "./components/TotalSum/TotalSum";
import constants from "../../config/constants";
import ChildrenIncludeForm from "./components/includes/ChildrenIncludes.component";
import { Delete, Edit } from "@material-ui/icons";
import DialogComponent from "./components/ConfirmDialog";
const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const EmployeeListCreate = ({ location }) => {
  const {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    filteredDepartments,
    filteredSubDepartments,
    filteredEmployees,
    filteredCadres,
    getLevelValues,
    ChildenRef,
    defaultImg,
    empFlag,
    toggleConfirmDialog,
    isDialog,
    submitToServer
  } = EmployeeListCreateHook({ location });
  const getSumValue = (...numbers) => {
    return numbers
      ? numbers.reduce((sum, value) => {
          if (value) {
            return sum + parseFloat(value);
          }
          return sum;
        }, 0)
      : "-";
  };
  const classes = useStyles();
  const image = useMemo(() => {
    return (
      <File
        default_image={defaultImg ? defaultImg : ""}
        // imageClass={styles.inputFileUploader}
        max_size={5 * 1024 * 1024}
        type={["png", "jpeg", "jpg"]}
        fullWidth={true}
        name="document"
        accept={"image/*"}
        label="Please Upload Image"
        show_image={true}
        error={errorData?.image}
        value={form?.image}
        onChange={(file) => {
          if (file) {
            changeTextData(file, "image");
          }
        }}
      />
    );
  }, [form?.image, changeTextData]);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{"New"} Employee</b>
            </span>
          </ButtonBase>
          <div className={styles.newLines} />
        </div>
      </div>
      <DialogComponent
        isOpen={isDialog}
        handleClose={toggleConfirmDialog}
        handleConfirm={submitToServer}
      />
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Personal Information</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>
        <div className={styles.imageContainer}>
          {image}
          <div className={styles.nameWrapper}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Employee Name"}
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
                  isError={errorData?.emp_code}
                  errorText={errorData?.emp_code}
                  label={"Employee Code"}
                  value={form?.emp_code}
                  onTextChange={(text) => {
                    changeTextData(text, "emp_code");
                  }}
                  onBlur={() => {
                    onBlurHandler("emp_code");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomDatePicker
                  clearable
                  label={"Date of Birth"}
                  maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "dob");
                  }}
                  value={form?.dob}
                  isError={errorData?.dob}
                />
              </div>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.gender}
                  errorText={errorData?.gender}
                  label={"Gender"}
                  value={form?.gender}
                  handleChange={(value) => {
                    changeTextData(value, "gender");
                  }}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </CustomSelectField>
              </div>
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.state}
              errorText={errorData?.state}
              label={"Domicile State"}
              value={form?.state}
              handleChange={(value) => {
                changeTextData(value, "state");
              }}
            >
              {constants.STATES.map((state) => {
                return (
                  <MenuItem
                    value={state.toUpperCase()}
                    key={state.toUpperCase()}
                  >
                    {state}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.blood_group}
              errorText={errorData?.blood_group}
              label={"Blood Group"}
              value={form?.blood_group}
              handleChange={(value) => {
                changeTextData(value, "blood_group");
              }}
            >
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.aadhar_no}
              errorText={errorData?.aadhar_no}
              label={"Aadhar Number"}
              value={form?.aadhar_no}
              onTextChange={(text) => {
                changeTextData(text, "aadhar_no");
              }}
              onBlur={() => {
                onBlurHandler("aadhar_no");
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.pan_no}
              errorText={errorData?.pan_no}
              label={"PAN Number"}
              value={form?.pan_no}
              onTextChange={(text) => {
                changeTextData(text, "pan_no");
              }}
              onBlur={() => {
                onBlurHandler("pan_no");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.esi_no}
              errorText={errorData?.esi_no}
              label={"ESI Number"}
              value={form?.esi_no}
              onTextChange={(text) => {
                changeTextData(text, "esi_no");
              }}
              onBlur={() => {
                onBlurHandler("esi_no");
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.uan_no}
              errorText={errorData?.uan_no}
              label={"UAN Number"}
              value={form?.uan_no}
              onTextChange={(text) => {
                changeTextData(text, "uan_no");
              }}
              onBlur={() => {
                onBlurHandler("uan_no");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"} style={{ width: "50%" }}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.higher_education}
              errorText={errorData?.higher_education}
              label={"Qualification (optional)"}
              value={form?.higher_education}
              onTextChange={(text) => {
                changeTextData(text, "higher_education");
              }}
              onBlur={() => {
                onBlurHandler("higher_education");
              }}
            />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Official Details</div>
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.location_id}
              errorText={errorData?.location_id}
              label={"Location"}
              value={form?.location_id}
              handleChange={(value) => {
                changeTextData(value, "location_id");
              }}
            >
              {listData?.LOCATION_DEPARTMENTS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.department_id}
              errorText={errorData?.department_id}
              label={"Department"}
              value={form?.department_id}
              handleChange={(value) => {
                changeTextData(value, "department_id");
              }}
            >
              {filteredDepartments?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.sub_department_id}
              errorText={errorData?.sub_department_id}
              label={"Sub-Department"}
              value={form?.sub_department_id}
              handleChange={(value) => {
                changeTextData(value, "sub_department_id");
              }}
            >
              {filteredSubDepartments?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"DOJ"}
              maxDate={new Date()}
              // minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "doj");
              }}
              value={form?.doj}
              isError={errorData?.doj}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.grade_id}
              errorText={errorData?.grade_id}
              label={"Grade"}
              value={form?.grade_id}
              handleChange={(value) => {
                changeTextData(value, "grade_id");
              }}
            >
              {listData?.GRADES?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.code}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.cadre_id}
              errorText={errorData?.cadre_id}
              label={"Cadre"}
              value={form?.cadre_id}
              handleChange={(value) => {
                changeTextData(value, "cadre_id");
              }}
            >
              {filteredCadres?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              inputProps={{ disabled: true }}
              isError={errorData?.grade_id}
              errorText={errorData?.grade_id}
              label={"Level"}
              value={getLevelValues}
              onTextChange={(text) => {
                changeTextData(text, "grade_id");
              }}
              onBlur={() => {
                onBlurHandler("grade_id");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomAutoComplete
              autoCompleteProps={{
                freeSolo: false,
                getOptionLabel: (option) => option?.label || "",
              }}
              dataset={listData?.EMPLOYEES}
              datasetKey={"label"}
              onTextChange={(text, value) => {
                changeTextData(text, "hod_id");
              }}
              variant={"outlined"}
              label={"HOD Name"}
              name={"hod_id"}
              isError={errorData?.hod_id}
              value={form?.hod_id}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomAutoComplete
              autoCompleteProps={{
                freeSolo: false,
                getOptionLabel: (option) => option?.label || "",
              }}
              dataset={listData?.JOB_ROLES}
              datasetKey={"label"}
              onTextChange={(text, value) => {
                changeTextData(text, "job_role_id");
              }}
              variant={"outlined"}
              label={"Associate Job Role"}
              name={"job_role_id"}
              isError={errorData?.job_role_id}
              value={form?.job_role_id}
            />
          </div>
          <div className={"formGroup"}>
            <CustomAutoComplete
              autoCompleteProps={{
                freeSolo: false,
                getOptionLabel: (option) => option?.label || "",
              }}
              dataset={listData?.DESIGNATIONS}
              datasetKey={"label"}
              onTextChange={(text, value) => {
                changeTextData(text, "designation_id");
              }}
              variant={"outlined"}
              label={"DESIGNATION"}
              name={"designation_id"}
              isError={errorData?.designation_id}
              value={form?.designation_id}
            />
          </div>
        </div>
        <div className={"formFlex"} style={{ width: "50%" }}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.is_transport_facility}
              errorText={errorData?.is_transport_facility}
              label={"Transport Facility"}
              value={form?.is_transport_facility}
              handleChange={(value) => {
                changeTextData(value, "is_transport_facility");
              }}
            >
              <MenuItem value="availed">Availed</MenuItem>
              <MenuItem value="notavailed">Not Availed </MenuItem>
            </CustomSelectField>
          </div>
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Contact Details</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.official_contact}
              errorText={errorData?.official_contact}
              label={"Official Contact Number"}
              value={form?.official_contact}
              onTextChange={(text) => {
                changeTextData(text, "official_contact");
              }}
              onBlur={() => {
                onBlurHandler("official_contact");
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.official_email}
              errorText={errorData?.official_email}
              label={"Official Email Id"}
              value={form?.official_email}
              onTextChange={(text) => {
                changeTextData(text, "official_email");
              }}
              onBlur={() => {
                onBlurHandler("official_email");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.personal_contact}
              errorText={errorData?.personal_contact}
              label={"Personal Contact Number"}
              value={form?.personal_contact}
              onTextChange={(text) => {
                changeTextData(text, "personal_contact");
              }}
              onBlur={() => {
                onBlurHandler("personal_contact");
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.personal_email}
              errorText={errorData?.personal_email}
              label={"Personal Email Id"}
              value={form?.personal_email}
              onTextChange={(text) => {
                changeTextData(text, "personal_email");
              }}
              onBlur={() => {
                onBlurHandler("personal_email");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.permanent_address}
              errorText={errorData?.permanent_address}
              label={"Permanent Address"}
              value={form?.permanent_address}
              onTextChange={(text) => {
                changeTextData(text, "permanent_address");
              }}
              onBlur={() => {
                onBlurHandler("permanent_address");
              }}
            />
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"isSame"}
                value={"isSame"}
                onClick={() => {
                  changeTextData(!form?.is_address_same, "is_address_same");
                }}
                id="vehicle1"
                checked={form?.is_address_same}
              />{" "}
              <label htmlFor="vehicle1"> Same Correspondence Address</label>
              <br />
            </div>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.current_address}
              errorText={errorData?.current_address}
              label={"Correspondence Address"}
              value={form?.current_address}
              onTextChange={(text) => {
                changeTextData(text, "current_address");
              }}
              onBlur={() => {
                onBlurHandler("current_address");
              }}
            />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Banking Details</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.bank_name}
              errorText={errorData?.bank_name}
              label={"Bank Name"}
              value={form?.bank_name}
              onTextChange={(text) => {
                changeTextData(text, "bank_name");
              }}
              onBlur={() => {
                onBlurHandler("bank_name");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.bank_account_no}
              errorText={errorData?.bank_account_no}
              label={"Bank Account Number"}
              value={form?.bank_account_no}
              onTextChange={(text) => {
                changeTextData(text, "bank_account_no");
              }}
              onBlur={() => {
                onBlurHandler("bank_account_no");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.ifsc}
              errorText={errorData?.ifsc}
              label={"Bank IFSC Code"}
              value={form?.ifsc}
              onTextChange={(text) => {
                changeTextData(text, "ifsc");
              }}
              onBlur={() => {
                onBlurHandler("ifsc");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Family Details</div>
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.father_name}
              errorText={errorData?.father_name}
              label={"Father's Name"}
              value={form?.father_name}
              onTextChange={(text) => {
                changeTextData(text, "father_name");
              }}
              onBlur={() => {
                onBlurHandler("father_name");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Father's DOB"}
              maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "father_dob");
              }}
              value={form?.father_dob}
              isError={errorData?.father_dob}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.father_state}
              errorText={errorData?.father_state}
              label={"Father's State"}
              value={form?.father_state}
              handleChange={(value) => {
                changeTextData(value, "father_state");
              }}
            >
              <MenuItem value="EXPIRED">EXPIRED</MenuItem>
              <MenuItem value="ALIVE">ALIVE</MenuItem>
            </CustomSelectField>
          </div>
          {form?.father_state === "EXPIRED" ? (
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Fathers Passing Away Date"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "father_dod");
                }}
                value={form?.father_dod}
                isError={errorData?.father_dod}
              />
            </div>
          ) : (
            <div className={"formGroup"}></div>
          )}
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.mother_name}
              errorText={errorData?.mother_name}
              label={"Mother's Name"}
              value={form?.mother_name}
              onTextChange={(text) => {
                changeTextData(text, "mother_name");
              }}
              onBlur={() => {
                onBlurHandler("mother_name");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Mother's DOB"}
              maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "mother_dob");
              }}
              value={form?.mother_dob}
              isError={errorData?.mother_dob}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.mother_state}
              errorText={errorData?.mother_state}
              label={"Mother's State"}
              value={form?.mother_state}
              handleChange={(value) => {
                changeTextData(value, "mother_state");
              }}
            >
              <MenuItem value="EXPIRED">EXPIRED</MenuItem>
              <MenuItem value="ALIVE">ALIVE</MenuItem>
            </CustomSelectField>
          </div>
          {form?.mother_state === "EXPIRED" ? (
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Mother Passing Away Date"}
                maxDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "mother_dod");
                }}
                value={form?.mother_dod}
                isError={errorData?.mother_dod}
              />
            </div>
          ) : (
            <div className={"formGroup"}></div>
          )}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.martial_status}
              errorText={errorData?.martial_status}
              label={"Marital Status"}
              value={form?.martial_status}
              handleChange={(value) => {
                changeTextData(value, "martial_status");
              }}
            >
              <MenuItem value="Divorce">Divorce</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
              <MenuItem value="Widow">Widow</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Date of Marriage"}
              maxDate={new Date()}
              // minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "dom");
              }}
              value={form?.dom}
              isError={errorData?.dom}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.spouse_name}
              errorText={errorData?.spouse_name}
              label={"Spouse Name"}
              value={form?.spouse_name}
              onTextChange={(text) => {
                changeTextData(text, "spouse_name");
              }}
              onBlur={() => {
                onBlurHandler("spouse_name");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.spouse_gender}
              errorText={errorData?.spouse_gender}
              label={"Spouse Gender"}
              value={form?.spouse_gender}
              handleChange={(value) => {
                changeTextData(value, "spouse_gender");
              }}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Spouse DOB"}
              maxDate={new Date()}
              // minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "spouse_dob");
              }}
              value={form?.spouse_dob}
              isError={errorData?.spouse_dob}
            />
          </div>
          <div className={"formGroup"}>
            {/* <CustomSelectField
              isError={errorData?.hod_id}
              errorText={errorData?.hod_id}
              label={"No. of Children"}
              value={form?.hod_id}
              handleChange={(value) => {
                changeTextData(value, "hod_id");
              }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </CustomSelectField> */}
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <ChildrenIncludeForm ref={ChildenRef} />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Past Experience</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.previous_organisation}
              errorText={errorData?.previous_organisation}
              label={"Previous Org"}
              value={form?.previous_organisation}
              onTextChange={(text) => {
                changeTextData(text, "previous_organisation");
              }}
              onBlur={() => {
                onBlurHandler("previous_organisation");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.before_experience}
              errorText={errorData?.before_experience}
              label={"Past Experience"}
              value={form?.before_experience}
              onTextChange={(text) => {
                changeTextData(text, "before_experience");
              }}
              onBlur={() => {
                onBlurHandler("before_experience");
              }}
            />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Performance Review</div>
            {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
            {/*    <InfoIcon fontSize={'small'}/>*/}
            {/*</Tooltip>*/}
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomAutoComplete
              autoCompleteProps={{
                freeSolo: false,
                getOptionLabel: (option) => option?.label || "",
              }}
              dataset={listData?.EMPLOYEES}
              datasetKey={"label"}
              onTextChange={(text, value) => {
                changeTextData(text, "pms_reviewer_id");
              }}
              variant={"outlined"}
              label={"Reviewer Name"}
              name={"pms_reviewer_id"}
              isError={errorData?.pms_reviewer_id}
              value={form?.pms_reviewer_id}
            />
          </div>

          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Previous Review Date"}
              // minDate={new Date()}
              maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "previous_review_date");
              }}
              value={form?.previous_review_date}
              isError={errorData?.previous_review_date}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Next Review Date"}
              minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "next_review_date");
              }}
              value={form?.next_review_date}
              isError={errorData?.next_review_date}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Monthly Salary Details</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              disabled={empFlag ? true : false}
              inputProps={{ min: 0 }}
              isError={errorData?.incremental_gross_salary}
              errorText={errorData?.incremental_gross_salary}
              label={"Incremental Gross Salary"}
              value={form?.incremental_gross_salary}
              onTextChange={(text) => {
                changeTextData(text, "incremental_gross_salary");
              }}
              onBlur={() => {
                onBlurHandler("incremental_gross_salary");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_car_component_manual === "NO" ? true : false
              }
              type={"number"}
              isError={errorData?.car_component}
              errorText={errorData?.car_component}
              label={"Car Component"}
              value={form?.car_component}
              onTextChange={(text) => {
                changeTextData(text, "car_component");
              }}
              onBlur={() => {
                onBlurHandler("car_component");
              }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_car_component_manual");
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("NO", "is_car_component_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Incremental Gross Salary + Car Component: "
            firstAmount={getSumValue(form?.gross)}
          />
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Part A - Earnings 1</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.basic_salary}
              errorText={errorData?.basic_salary}
              label={"Basic"}
              value={form?.basic_salary}
              onTextChange={(text) => {
                changeTextData(text, "basic_salary");
              }}
              onBlur={() => {
                onBlurHandler("basic_salary");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.hra}
              errorText={errorData?.hra}
              label={"HRA"}
              value={form?.hra}
              onTextChange={(text) => {
                changeTextData(text, "hra");
              }}
              onBlur={() => {
                onBlurHandler("hra");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              // disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.education_allowance}
              errorText={errorData?.education_allowance}
              label={"Education Allowance"}
              value={form?.education_allowance}
              onTextChange={(text) => {
                changeTextData(text, "education_allowance");
              }}
              onBlur={() => {
                onBlurHandler("education_allowance");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.special_allowance}
              errorText={errorData?.special_allowance}
              label={"Special Allowance"}
              value={form?.special_allowance}
              onTextChange={(text) => {
                changeTextData(text, "special_allowance");
              }}
              onBlur={() => {
                onBlurHandler("special_allowance");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Earnings 1: "
            firstAmount={getSumValue(form?.earning_one)}
          />
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Part B - Earnings 2</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_pug}
              errorText={errorData?.is_pug}
              label={"Professional Upgradation Applicable"}
              value={form?.is_pug}
              handleChange={(value) => {
                changeTextData(value, "is_pug");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag || form?.is_pug_manual === "NO" ? true : false}
              type={"number"}
              isError={errorData?.pug}
              errorText={errorData?.pug}
              label={"Professional Upgradation"}
              value={form?.pug}
              onTextChange={(text) => {
                changeTextData(text, "pug");
              }}
              onBlur={() => {
                onBlurHandler("pug");
              }}
            />
          </div>
          {/* {form?.is_pug_manual == "NO" && ( */}
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_pug_manual");
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("NO", "is_pug_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          {/* )} */}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_helper}
              errorText={errorData?.is_helper}
              label={"Helper Allowance Applicable"}
              value={form?.is_helper}
              handleChange={(value) => {
                changeTextData(value, "is_helper");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_helper_manual === "NO" ? true : false
              }
              type={"number"}
              isError={errorData?.helper}
              errorText={errorData?.helper}
              label={"Helper Allowance"}
              value={form?.helper}
              onTextChange={(text) => {
                changeTextData(text, "helper");
              }}
              onBlur={() => {
                onBlurHandler("helper");
              }}
            />
          </div>
          {/* {form?.is_helper_manual == "NO" && ( */}
          <div className={styles.editBtnWrap}>
            <IconButton
              disabled={empFlag ? true : false}
              className={"tableActionBtn"}
              color="secondary"
              onClick={() => {
                changeTextData("YES", "is_helper_manual");
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              disabled={empFlag ? true : false}
              className={"tableActionBtn"}
              color="secondary"
              onClick={() => {
                changeTextData("NO", "is_helper_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          {/* )} */}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_food_coupons}
              errorText={errorData?.is_food_coupons}
              label={"Food Coupons Applicable"}
              value={form?.is_food_coupons}
              handleChange={(value) => {
                changeTextData(value, "is_food_coupons");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_food_coupons_manual === "NO" ? true : false
              }
              type={"number"}
              isError={errorData?.food_coupons}
              errorText={errorData?.food_coupons}
              label={"Food Coupons"}
              value={form?.food_coupons}
              onTextChange={(text) => {
                changeTextData(text, "food_coupons");
              }}
              onBlur={() => {
                onBlurHandler("food_coupons");
              }}
            />
          </div>
          {/* {form?.is_food_coupons_manual == "NO" && ( */}
          <div className={styles.editBtnWrap}>
            <IconButton
              disabled={empFlag ? true : false}
              className={"tableActionBtn"}
              color="secondary"
              onClick={() => {
                changeTextData("YES", "is_food_coupons_manual");
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              disabled={empFlag ? true : false}
              className={"tableActionBtn"}
              color="secondary"
              onClick={() => {
                changeTextData("NO", "is_food_coupons_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          {/* )} */}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_gift_coupons}
              errorText={errorData?.is_gift_coupons}
              label={"Gift Coupons Applicable"}
              value={form?.is_gift_coupons}
              handleChange={(value) => {
                changeTextData(value, "is_gift_coupons");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.gift_coupons}
              errorText={errorData?.gift_coupons}
              label={"Gift Coupons"}
              value={form?.gift_coupons}
              onTextChange={(text) => {
                changeTextData(text, "gift_coupons");
              }}
              onBlur={() => {
                onBlurHandler("gift_coupons");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_lta}
              errorText={errorData?.is_lta}
              label={"LTA Applicable"}
              value={form?.is_lta}
              handleChange={(value) => {
                changeTextData(value, "is_lta");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.lta}
              errorText={errorData?.lta}
              label={"LTA"}
              value={form?.lta}
              onTextChange={(text) => {
                changeTextData(text, "lta");
              }}
              onBlur={() => {
                onBlurHandler("lta");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_super_annuation}
              errorText={errorData?.is_super_annuation}
              label={"Superannuation Applicable"}
              value={form?.is_super_annuation}
              handleChange={(value) => {
                changeTextData(value, "is_super_annuation");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.super_annuation}
              errorText={errorData?.super_annuation}
              label={"Superannuation"}
              value={form?.super_annuation}
              onTextChange={(text) => {
                changeTextData(text, "super_annuation");
              }}
              onBlur={() => {
                onBlurHandler("super_annuation");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_nps}
              errorText={errorData?.is_nps}
              label={"NPS Applicable"}
              value={form?.is_nps}
              handleChange={(value) => {
                changeTextData(value, "is_nps");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.nps}
              errorText={errorData?.nps}
              label={"NPS"}
              value={form?.nps}
              onTextChange={(text) => {
                changeTextData(text, "nps");
              }}
              onBlur={() => {
                onBlurHandler("nps");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_em_pf}
              errorText={errorData?.is_em_pf}
              label={"Em PF- Deduction Part Applicable"}
              value={form?.is_em_pf}
              handleChange={(value) => {
                changeTextData(value, "is_em_pf");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.earning2_vpf}
              errorText={errorData?.earning2_vpf}
              label={"VPF"}
              value={form?.earning2_vpf}
              onTextChange={(text) => {
                changeTextData(text, "earning2_vpf");
              }}
              onBlur={() => {
                onBlurHandler("earning2_vpf");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.vehicle_maintenance}
              errorText={errorData?.vehicle_maintenance}
              label={"Vehicle Maint (CTC)"}
              value={form?.vehicle_maintenance}
              onTextChange={(text) => {
                changeTextData(text, "vehicle_maintenance");
              }}
              onBlur={() => {
                onBlurHandler("vehicle_maintenance");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.vehicle_emi}
              errorText={errorData?.vehicle_emi}
              label={"Vehicle EMIs (CTC)"}
              value={form?.vehicle_emi}
              onTextChange={(text) => {
                changeTextData(text, "vehicle_emi");
              }}
              onBlur={() => {
                onBlurHandler("vehicle_emi");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.fuel}
              errorText={errorData?.fuel}
              label={"Fuel Availed (CTC)"}
              value={form?.fuel}
              onTextChange={(text) => {
                changeTextData(text, "fuel");
              }}
              onBlur={() => {
                onBlurHandler("fuel");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Earning2: "
            firstAmount={getSumValue(form?.earning_two)}
            secondName="Gross Salary (Part A + Part B) :"
            secondAmount={getSumValue(form?.gross_component)}
          />
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Part C - Earning 3</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.earning_three_pli}
              errorText={errorData?.earning_three_pli}
              label={"PLI - Qtrly"}
              value={form?.earning_three_pli}
              onTextChange={(text) => {
                changeTextData(text, "earning_three_pli");
              }}
              onBlur={() => {
                onBlurHandler("earning_three_pli");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
        {/* <div className={"formFlex"}>
          <TotalSum
            firstName="Incremental Gross Salary + Car Component: "
            firstAmount={form?.earning_three_pli}
          />
        </div> */}
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Part D - Deduction 1</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_deduction_vpf}
              errorText={errorData?.is_deduction_vpf}
              label={"VPF Applicable"}
              value={form?.is_deduction_vpf}
              handleChange={(value) => {
                changeTextData(value, "is_deduction_vpf");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_deduction_vpf == "NO" ? true : false
              }
              type={"number"}
              isError={errorData?.deduction_vpf_pct}
              errorText={errorData?.deduction_vpf_pct}
              label={"VPF Percentage"}
              value={form?.deduction_vpf_pct}
              onTextChange={(text) => {
                changeTextData(text, "deduction_vpf_pct");
              }}
              onBlur={() => {
                onBlurHandler("deduction_vpf_pct");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.deduction_vpf}
              errorText={errorData?.deduction_vpf}
              label={"VPF"}
              value={form?.deduction_vpf}
              onTextChange={(text) => {
                changeTextData(text, "deduction_vpf");
              }}
              onBlur={() => {
                onBlurHandler("deduction_vpf");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.is_em_esi}
              errorText={errorData?.is_em_esi}
              label={"Em ESI- Deduction Part Applicable"}
              value={form?.is_em_esi}
              handleChange={(value) => {
                changeTextData(value, "is_em_esi");
              }}
            >
              <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem>
            </CustomSelectField>
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.em_esi}
              errorText={errorData?.em_esi}
              label={"Em ESI- Deduction Part"}
              value={form?.em_esi}
              onTextChange={(text) => {
                changeTextData(text, "em_esi");
              }}
              onBlur={() => {
                onBlurHandler("em_esi");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.em_lwf}
              errorText={errorData?.em_lwf}
              label={"Em LWF"}
              value={form?.em_lwf}
              onTextChange={(text) => {
                changeTextData(text, "em_lwf");
              }}
              onBlur={() => {
                onBlurHandler("em_lwf");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.em_pf}
              errorText={errorData?.em_pf}
              label={"Em PF- Deduction Part"}
              value={form?.em_pf}
              onTextChange={(text) => {
                changeTextData(text, "em_pf");
              }}
              onBlur={() => {
                onBlurHandler("em_pf");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            customClass={styles.redField}
            firstName="Total Deduction 1:  "
            firstAmount={getSumValue(form?.total_deduction)}
          />
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>
              Part E (Statutory Components of CTC Paid by Employer) - Earning 4
            </div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.er_pf}
              errorText={errorData?.er_pf}
              label={"PF - Er Contribution Part"}
              value={form?.er_pf}
              onTextChange={(text) => {
                changeTextData(text, "er_pf");
              }}
              onBlur={() => {
                onBlurHandler("er_pf");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.er_esi}
              errorText={errorData?.er_esi}
              label={"ESI - Er Contribution Part"}
              value={form?.er_esi}
              onTextChange={(text) => {
                changeTextData(text, "er_esi");
              }}
              onBlur={() => {
                onBlurHandler("er_esi");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.er_lwf}
              errorText={errorData?.er_lwf}
              label={"Er LWF"}
              value={form?.er_lwf}
              onTextChange={(text) => {
                changeTextData(text, "er_lwf");
              }}
              onBlur={() => {
                onBlurHandler("er_lwf");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Earnings 4 :"
            firstAmount={getSumValue(form?.earning_four)}
          />
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>
              Part E (Organizational Components of CTC) - Earning 5
            </div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.gratuity}
              errorText={errorData?.gratuity}
              label={"Gratuity"}
              value={form?.gratuity}
              onTextChange={(text) => {
                changeTextData(text, "gratuity");
              }}
              onBlur={() => {
                onBlurHandler("gratuity");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              // disabled={true}
              type={"number"}
              disabled={empFlag ? true : false}
              isError={errorData?.insurance}
              errorText={errorData?.insurance}
              label={"Medical Insurance Premium"}
              value={form?.insurance}
              onTextChange={(text) => {
                changeTextData(text, "insurance");
              }}
              onBlur={() => {
                onBlurHandler("insurance");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.stability_incentive}
              errorText={errorData?.stability_incentive}
              label={"Stability Allowance"}
              value={form?.stability_incentive}
              onTextChange={(text) => {
                changeTextData(text, "stability_incentive");
              }}
              onBlur={() => {
                onBlurHandler("stability_incentive");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.retention_allowance}
              errorText={errorData?.retention_allowance}
              label={"Retention Allowance"}
              value={form?.retention_allowance}
              onTextChange={(text) => {
                changeTextData(text, "retention_allowance");
              }}
              onBlur={() => {
                onBlurHandler("retention_allowance");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.perf_bonus}
              errorText={errorData?.perf_bonus}
              label={"Performance Allowance"}
              value={form?.perf_bonus}
              onTextChange={(text) => {
                changeTextData(text, "perf_bonus");
              }}
              onBlur={() => {
                onBlurHandler("perf_bonus");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={true}
              type={"number"}
              isError={errorData?.annual_bonus}
              errorText={errorData?.annual_bonus}
              label={"Bonus"}
              value={form?.annual_bonus}
              onTextChange={(text) => {
                changeTextData(text, "annual_bonus");
              }}
              onBlur={() => {
                onBlurHandler("annual_bonus");
              }}
            />
          </div>
        </div>{" "}
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.two_car_maintenance}
              errorText={errorData?.two_car_maintenance}
              label={"Type II Car Maint"}
              value={form?.two_car_maintenance}
              onTextChange={(text) => {
                changeTextData(text, "two_car_maintenance");
              }}
              onBlur={() => {
                onBlurHandler("two_car_maintenance");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.two_fuel}
              errorText={errorData?.two_fuel}
              label={"Type II Fuel"}
              value={form?.two_fuel}
              onTextChange={(text) => {
                changeTextData(text, "two_fuel");
              }}
              onBlur={() => {
                onBlurHandler("two_fuel");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.deputation_allowance}
              errorText={errorData?.deputation_allowance}
              label={"Deputation Allowance"}
              value={form?.deputation_allowance}
              onTextChange={(text) => {
                changeTextData(text, "deputation_allowance");
              }}
              onBlur={() => {
                onBlurHandler("deputation_allowance");
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.nps_part_e}
              errorText={errorData?.nps_part_e}
              label={"NPS"}
              value={form?.nps_part_e}
              onTextChange={(text) => {
                changeTextData(text, "nps_part_e");
              }}
              onBlur={() => {
                onBlurHandler("nps_part_e");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Earnings 5 :  "
            firstAmount={getSumValue(form?.earning_five)}
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
          </div>
          <ButtonBase
            type={"button"}
            className={styles.createBtn}
            onClick={handleSubmit}
          >
            SEND FOR APPROVAL
          </ButtonBase>
        </div>
      </div>
    </div>

    // USC Create file
  );
};

export default EmployeeListCreate;
