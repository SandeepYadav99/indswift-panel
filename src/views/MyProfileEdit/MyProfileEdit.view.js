import React, { useMemo } from "react";
import {
  Button,
  ButtonBase,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../components/FileComponent/FileComponent.component";
import constants from "../../config/constants";
import ChildrenIncludeForm from "./components/includes/ChildrenIncludes.component";
import WaitingComponent from "../../components/Waiting.component";
import useMyProfileEdit from "./MyProfileEditHook";
import DisclaimerDialog from "./components/DisclaimerPopUp/DisclaimerDialog.view";
import ValancyFieldView from "./components/ValancyField/ValancyField.view";
const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const MyProfileEditView = ({}) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    ChildenRef,
    editData,
    isLoading,
    isOpen,
    refEsi,
    refPf,
    refGt,
    refMc,
    refGg,
    setIsOpen,
    toggleDialog,
    submitToServer
  } = useMyProfileEdit({});
  const refQuarterly = null;
  const image = useMemo(() => {
    return (
      <File
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
        default_image={editData?.image ? editData?.image : null}
        onChange={(file) => {
          if (file) {
            changeTextData(file, "image");
          }
        }}
      />
    );
  }, [form?.image, editData?.image, changeTextData]);

  if (isLoading) {
    return <WaitingComponent />;
  }
  
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>My Profile Edit</b>
            </span>
          </ButtonBase>
          <div className={styles.newLines} />
        </div>
      </div>
      <DisclaimerDialog
        handleSubmit={submitToServer}
        isOpen={isOpen}
        handleToggle={toggleDialog}
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
                  disabled={true}
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
                  disabled={true}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
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
          {form?.father_state === "EXPIRED" ?(
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
          ) : <div className={"formGroup"}></div>}
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
          {
              form?.mother_state === "EXPIRED" ? 
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
            </div> :
              <div className={"formGroup"}>
              </div>
          }
         
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
              maxDate={new Date()}
              clearable
              label={"Date of Marriage"}
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
              onChange={(date) => {
                changeTextData(date, "spouse_dob");
              }}
              value={form?.spouse_dob}
              isError={errorData?.spouse_dob}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <ChildrenIncludeForm ref={ChildenRef} data={form?.children} />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Employee Contact Details</div>
          </h4>
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
            <div className={"heading"}>Employee Nominee Details</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
              <ValancyFieldView type={"ESI"} title={"ESI"} ref={refEsi}/>
              <ValancyFieldView type={"PF"} title={"PF"} ref={refPf}/>
              <ValancyFieldView type={"GROUP_TERM"} title={"Group Term"} ref={refGt}/>
              <ValancyFieldView type={"MEDI_CLAIM"} title={"Group Medi-claim"} ref={refMc}/>
              <ValancyFieldView type={"GROUP_GRATUITY"} title={"Group Gratuity"} ref={refGg}/>

          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex3 wrapper"}>
          <ButtonBase
            type={"button"}
            className={styles.createBtn}
             //onClick={() => setIsOpen(true)}
             onClick={handleSubmit}
          >
            UPDATE
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEditView;
