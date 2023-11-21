import React from "react";
import FinalSalaryTable from "./component/SalaryTable/FinalSalaryTable";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import FinalUpperCard from "./component/FinalUpperCard/FinalUpperCard";
import useFinalForm from "./FinalForm.hook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { Delete, Edit } from "@material-ui/icons";
import File from "../../../components/FileComponent/FileComponent.component";
import constants from "../../../config/constants";
import AttachmentIncludeDetailForm from "./component/AttachmentInclude/AttachmentIncludeDetail.component";
import TotalSum from "../../EmployeeEdit/components/TotalSum/TotalSum";

function FinalForm() {
  const {
    employeeDetail,
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    submitToServer,
    empFlag,
    ChildenRef,
  } = useFinalForm({});
  const emp = {};
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Full & Final Settlement Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <FinalUpperCard data={employeeDetail?.employee} />
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Planned Date of Separation"}
              // maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "pds");
              }}
              value={form?.pds}
              isError={errorData?.pds}
            />
          </div>
          <div className={"formGroup"}>
            <CustomDatePicker
              disabled={true}
              clearable
              label={"Actual DOL"}
              // maxDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "dol");
              }}
              value={form?.dol}
              isError={errorData?.dol}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_notice_period_manual === "NO" ? true : false
              }
              type={"number"}
              isError={errorData?.notice_period}
              errorText={errorData?.notice_period}
              label={"Notice Period in Days"}
              value={form?.notice_period}
              onTextChange={(text) => {
                changeTextData(text, "notice_period");
              }}
              onBlur={() => {
                onBlurHandler("notice_period");
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_notice_period_manual");
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
                changeTextData("NO", "is_notice_period_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_served_for_manual === "NO" ? true : false
              }
              type={"number"}
              isError={errorData?.served_for}
              errorText={errorData?.served_for}
              label={"Served For"}
              value={form?.served_for}
              onTextChange={(text) => {
                changeTextData(text, "served_for");
              }}
              onBlur={() => {
                onBlurHandler("served_for");
              }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_served_for_manual");
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
                changeTextData("NO", "is_served_for_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.notice_leave_availed}
              errorText={errorData?.notice_leave_availed}
              label={"Leaves Availed on Notice/LOP"}
              value={form?.notice_leave_availed}
              onTextChange={(text) => {
                changeTextData(text, "notice_leave_availed");
              }}
              onBlur={() => {
                onBlurHandler("notice_leave_availed");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.shortfall_remarks}
              errorText={errorData?.shortfall_remarks}
              label={"Remarks about shortfall"}
              value={form?.shortfall_remarks}
              onTextChange={(text) => {
                changeTextData(text, "shortfall_remarks");
              }}
              onBlur={() => {
                onBlurHandler("shortfall_remarks");
              }}
              multiline
              rows={3}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <span className={styles.heading}>Shortfall of Notice Period:</span>
            <span className={styles.teck}>{form?.shortfall_notice_period}</span>
          </div>
          <div className={"formGroup"}>
            {" "}
            <span className={styles.heading}>Permitted Leaves on Notice:</span>
            <span className={styles.teck}>{form?.notice_leave_permitted}</span>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            {" "}
            <span className={styles.heading}>Applicable Shortfall:</span>
            <span className={styles.teck}>{form?.shortfall_applicable}</span>
          </div>
          <div className={"formGroup"}>
            {" "}
            <span className={styles.heading}>
              {" "}
              Leaves to be added in Shortfall:
            </span>
            <span className={styles.teck}>{form?.shortfall_leaves_added}</span>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 1 : CTC of Employee</div>
        <FinalSalaryTable data={employeeDetail?.salary} />
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.salary_remark}
              errorText={errorData?.salary_remark}
              label={"Any Remarks"}
              value={form?.salary_remark}
              onTextChange={(text) => {
                changeTextData(text, "salary_remark");
              }}
              onBlur={() => {
                onBlurHandler("salary_remark");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 2 : Dues to be Paid</div>
        <div className={styles.heading}>Payroll 1</div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.payroll_one_month}
              errorText={errorData?.payroll_one_month}
              label={"Month"}
              value={form?.payroll_one_month}
              handleChange={(value) => {
                changeTextData(value, "payroll_one_month");
              }}
            >
              {constants.MONTHS?.map((item, index) => (
                <MenuItem key={`Month_${index}`} value={item?.toUpperCase()}>
                  {item?.toUpperCase()}
                </MenuItem>
              ))}
              {/* <MenuItem value={"YES"}>Yes</MenuItem>
              <MenuItem value={"NO"}>No</MenuItem> */}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.payroll_one_paid_days}
              errorText={errorData?.payroll_one_paid_days}
              label={"Paid Days"}
              value={form?.payroll_one_paid_days}
              onTextChange={(text) => {
                changeTextData(text, "payroll_one_paid_days");
              }}
              // onBlur={() => {
              //   onBlurHandler("payroll_one_paid_days");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.payroll_one_value}
              errorText={errorData?.payroll_one_value}
              label={"Value"}
              value={form?.payroll_one_value}
              onTextChange={(text) => {
                changeTextData(text, "payroll_one_value");
              }}
              // onBlur={() => {
              //   onBlurHandler("payroll_one_value");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.payroll_one_status}
              errorText={errorData?.payroll_one_status}
              label={"Status"}
              value={form?.payroll_one_status}
              handleChange={(value) => {
                changeTextData(value, "payroll_one_status");
              }}
            >
              <MenuItem value={"PAID"}>PAID</MenuItem>
              <MenuItem value={"PENDING"}>PENDING</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="image"
              label="Attach Salary Slip"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.payroll_one_salary_slip}
              value={form?.payroll_one_salary_slip}
              placeholder={"Attach Salary Slip"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "payroll_one_salary_slip");
                }
              }}
            />
          </div>
        </div>
        <div className={styles.heading}>Payroll 2</div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.payroll_two_month}
              errorText={errorData?.payroll_two_month}
              label={"Month"}
              value={form?.payroll_two_month}
              handleChange={(value) => {
                changeTextData(value, "payroll_two_month");
              }}
            >
              {constants.MONTHS?.map((item, index) => (
                <MenuItem key={`Month_2${index}`} value={item?.toUpperCase()}>
                  {item?.toUpperCase()}
                </MenuItem>
              ))}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.payroll_two_paid_days}
              errorText={errorData?.payroll_two_paid_days}
              label={"Paid Days"}
              value={form?.payroll_two_paid_days}
              onTextChange={(text) => {
                changeTextData(text, "payroll_two_paid_days");
              }}
              // onBlur={() => {
              //   onBlurHandler("payroll_two_paid_days");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.payroll_two_value}
              errorText={errorData?.payroll_two_value}
              label={"Value"}
              value={form?.payroll_two_value}
              onTextChange={(text) => {
                changeTextData(text, "payroll_two_value");
              }}
              // onBlur={() => {
              //   onBlurHandler("payroll_two_value");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.payroll_two_status}
              errorText={errorData?.payroll_two_status}
              label={"Status"}
              value={form?.payroll_two_status}
              handleChange={(value) => {
                changeTextData(value, "payroll_two_status");
              }}
            >
              <MenuItem value={"PAID"}>PAID</MenuItem>
              <MenuItem value={"PENDING"}>PENDING</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="image"
              label="Attach Salary Slip"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.payroll_two_salary_slip}
              value={form?.payroll_two_salary_slip}
              placeholder={"Attach Salary Slip"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "payroll_two_salary_slip");
                }
              }}
            />
          </div>
        </div>
        <div className={styles.heading}>Payroll 3</div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.payroll_three_month}
              errorText={errorData?.payroll_three_month}
              label={"Month"}
              value={form?.payroll_three_month}
              handleChange={(value) => {
                changeTextData(value, "payroll_three_month");
              }}
            >
              {constants.MONTHS?.map((item, index) => (
                <MenuItem key={`Month_3${index}`} value={item?.toUpperCase()}>
                  {item?.toUpperCase()}
                </MenuItem>
              ))}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.payroll_three_paid_days}
              errorText={errorData?.payroll_three_paid_days}
              label={"Paid Days"}
              value={form?.payroll_three_paid_days}
              onTextChange={(text) => {
                changeTextData(text, "payroll_three_paid_days");
              }}
              // onBlur={() => {
              //   onBlurHandler("payroll_three_paid_days");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.payroll_three_value}
              errorText={errorData?.payroll_three_value}
              label={"Value"}
              value={form?.payroll_three_value}
              onTextChange={(text) => {
                changeTextData(text, "payroll_three_value");
              }}
              // onBlur={() => {
              //   onBlurHandler("payroll_three_value");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              disabled={empFlag ? true : false}
              isError={errorData?.payroll_three_status}
              errorText={errorData?.payroll_three_status}
              label={"Status"}
              value={form?.payroll_three_status}
              handleChange={(value) => {
                changeTextData(value, "payroll_three_status");
              }}
            >
              <MenuItem value={"PAID"}>PAID</MenuItem>
              <MenuItem value={"PENDING"}>PENDING</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="image"
              label="Attach Salary Slip"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.payroll_three_salary_slip}
              value={form?.payroll_three_salary_slip}
              placeholder={"Attach Salary Slip"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "payroll_three_salary_slip");
                }
              }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.statutory_bonus}
              errorText={errorData?.statutory_bonus}
              label={"Statuory Bonus"}
              value={form?.statutory_bonus}
              onTextChange={(text) => {
                changeTextData(text, "statutory_bonus");
              }}
              // onBlur={() => {
              //   onBlurHandler("statutory_bonus");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.statutory_bonus_comment}
              errorText={errorData?.statutory_bonus_comment}
              label={"Comments"}
              value={form?.statutory_bonus_comment}
              onTextChange={(text) => {
                changeTextData(text, "statutory_bonus_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("statutory_bonus_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.gratuity}
              errorText={errorData?.gratuity}
              label={"Gratuity"}
              value={form?.gratuity}
              onTextChange={(text) => {
                changeTextData(text, "gratuity");
              }}
              // onBlur={() => {
              //   onBlurHandler("gratuity");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.gratuity_comment}
              errorText={errorData?.gratuity_comment}
              label={"Comments"}
              value={form?.gratuity_comment}
              onTextChange={(text) => {
                changeTextData(text, "gratuity_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("gratuity_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.declared_pli}
              errorText={errorData?.declared_pli}
              label={"Declared PLI"}
              value={form?.declared_pli}
              onTextChange={(text) => {
                changeTextData(text, "declared_pli");
              }}
              // onBlur={() => {
              //   onBlurHandler("declared_pli");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.declared_pli_comment}
              errorText={errorData?.declared_pli_comment}
              label={"Comments"}
              value={form?.declared_pli_comment}
              onTextChange={(text) => {
                changeTextData(text, "declared_pli_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("declared_pli_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.un_declared_pli}
              errorText={errorData?.un_declared_pli}
              label={"Un-Declared PLI"}
              value={form?.un_declared_pli}
              onTextChange={(text) => {
                changeTextData(text, "un_declared_pli");
              }}
              // onBlur={() => {
              //   onBlurHandler("un_declared_pli");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.un_declared_pli_comment}
              errorText={errorData?.un_declared_pli_comment}
              label={"Comments"}
              value={form?.un_declared_pli_comment}
              onTextChange={(text) => {
                changeTextData(text, "un_declared_pli_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("un_declared_pli_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.professional_upgradation}
              errorText={errorData?.professional_upgradation}
              label={"Professional Upgradation"}
              value={form?.professional_upgradation}
              onTextChange={(text) => {
                changeTextData(text, "professional_upgradation");
              }}
              // onBlur={() => {
              //   onBlurHandler("professional_upgradation");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.professional_upgradation_comment}
              errorText={errorData?.professional_upgradation_comment}
              label={"Comments"}
              value={form?.professional_upgradation_comment}
              onTextChange={(text) => {
                changeTextData(text, "professional_upgradation_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("professional_upgradation_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.helper_allowance}
              errorText={errorData?.helper_allowance}
              label={"Helper Allowance"}
              value={form?.helper_allowance}
              onTextChange={(text) => {
                changeTextData(text, "helper_allowance");
              }}
              // onBlur={() => {
              //   onBlurHandler("helper_allowance");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.helper_allowance_comment}
              errorText={errorData?.helper_allowance_comment}
              label={"Comments"}
              value={form?.helper_allowance_comment}
              onTextChange={(text) => {
                changeTextData(text, "helper_allowance_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("helper_allowance_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.food_coupon}
              errorText={errorData?.food_coupon}
              label={"Food Coupens"}
              value={form?.food_coupon}
              onTextChange={(text) => {
                changeTextData(text, "food_coupon");
              }}
              // onBlur={() => {
              //   onBlurHandler("food_coupon");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.food_coupon_comment}
              errorText={errorData?.food_coupon_comment}
              label={"Comments"}
              value={form?.food_coupon_comment}
              onTextChange={(text) => {
                changeTextData(text, "food_coupon_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("food_coupon_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.gift_coupon_bonus}
              errorText={errorData?.gift_coupon_bonus}
              label={"Gift Coupens"}
              value={form?.gift_coupon_bonus}
              onTextChange={(text) => {
                changeTextData(text, "gift_coupon_bonus");
              }}
              // onBlur={() => {
              //   onBlurHandler("gift_coupon_bonus");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.gift_coupon_bonus_comment}
              errorText={errorData?.gift_coupon_bonus_comment}
              label={"Comments"}
              value={form?.gift_coupon_bonus_comment}
              onTextChange={(text) => {
                changeTextData(text, "gift_coupon_bonus_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("gift_coupon_bonus_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.lta}
              errorText={errorData?.lta}
              label={"LTA"}
              value={form?.lta}
              onTextChange={(text) => {
                changeTextData(text, "lta");
              }}
              // onBlur={() => {
              //   onBlurHandler("lta");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.lta_comment}
              errorText={errorData?.lta_comment}
              label={"Comments"}
              value={form?.lta_comment}
              onTextChange={(text) => {
                changeTextData(text, "lta_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("lta_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.superannuation}
              errorText={errorData?.superannuation}
              label={"Supperannuation"}
              value={form?.superannuation}
              onTextChange={(text) => {
                changeTextData(text, "superannuation");
              }}
              // onBlur={() => {
              //   onBlurHandler("superannuation");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.superannuation_comment}
              errorText={errorData?.superannuation_comment}
              label={"Comments"}
              value={form?.superannuation_comment}
              onTextChange={(text) => {
                changeTextData(text, "superannuation_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("superannuation_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.incentive}
              errorText={errorData?.incentive}
              label={"Incentive (SI/PI/RI)"}
              value={form?.incentive}
              onTextChange={(text) => {
                changeTextData(text, "incentive");
              }}
              // onBlur={() => {
              //   onBlurHandler("incentive");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.incentive_comment}
              errorText={errorData?.incentive_comment}
              label={"Comments"}
              value={form?.incentive_comment}
              onTextChange={(text) => {
                changeTextData(text, "incentive_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("incentive_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.car_maintenance}
              errorText={errorData?.car_maintenance}
              label={"Car Maint"}
              value={form?.car_maintenance}
              onTextChange={(text) => {
                changeTextData(text, "car_maintenance");
              }}
              // onBlur={() => {
              //   onBlurHandler("car_maintenance");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.car_maintenance_comment}
              errorText={errorData?.car_maintenance_comment}
              label={"Comments"}
              value={form?.car_maintenance_comment}
              onTextChange={(text) => {
                changeTextData(text, "car_maintenance_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("car_maintenance_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.fuel}
              errorText={errorData?.fuel}
              label={"Fuel"}
              value={form?.fuel}
              onTextChange={(text) => {
                changeTextData(text, "fuel");
              }}
              // onBlur={() => {
              //   onBlurHandler("fuel");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.fuel_comment}
              errorText={errorData?.fuel_comment}
              label={"Comments"}
              value={form?.fuel_comment}
              onTextChange={(text) => {
                changeTextData(text, "fuel_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("fuel_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.vpf}
              errorText={errorData?.vpf}
              label={"VPF"}
              value={form?.vpf}
              onTextChange={(text) => {
                changeTextData(text, "vpf");
              }}
              // onBlur={() => {
              //   onBlurHandler("vpf");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.vpf_comment}
              errorText={errorData?.vpf_comment}
              label={"Comments"}
              value={form?.vpf_comment}
              onTextChange={(text) => {
                changeTextData(text, "vpf_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("vpf_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.el_balance}
              errorText={errorData?.el_balance}
              label={"EL Balance (Opening-Consumed)"}
              value={form?.el_balance}
              onTextChange={(text) => {
                changeTextData(text, "el_balance");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_balance");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_el_balance_manual === "NO" ? true : false
              }
              type={"number"}
              isError={errorData?.el_balance_value}
              errorText={errorData?.el_balance_value}
              label={"Value"}
              value={form?.el_balance_value}
              onTextChange={(text) => {
                changeTextData(text, "el_balance_value");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_balance_value");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_el_balance_manual");
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
                changeTextData("NO", "is_el_balance_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.el_balance_comment}
              errorText={errorData?.el_balance_comment}
              label={"Comments"}
              value={form?.el_balance_comment}
              onTextChange={(text) => {
                changeTextData(text, "el_balance_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_balance_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.el_currnet_service_year}
              errorText={errorData?.el_currnet_service_year}
              label={"EL of Current Service Year"}
              value={form?.el_currnet_service_year}
              onTextChange={(text) => {
                changeTextData(text, "el_currnet_service_year");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_currnet_service_year");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_el_currnet_service_year_manual === "NO"
                  ? true
                  : false
              }
              type={"number"}
              isError={errorData?.el_currnet_service_year_value}
              errorText={errorData?.el_currnet_service_year_value}
              label={"Value"}
              value={form?.el_currnet_service_year_value}
              onTextChange={(text) => {
                changeTextData(text, "el_currnet_service_year_value");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_currnet_service_year_value");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_el_currnet_service_year_manual");
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
                changeTextData("NO", "is_el_currnet_service_year_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.el_currnet_service_year_comment}
              errorText={errorData?.el_currnet_service_year_comment}
              label={"Comments"}
              value={form?.el_currnet_service_year_comment}
              onTextChange={(text) => {
                changeTextData(text, "el_currnet_service_year_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_currnet_service_year_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.fel}
              errorText={errorData?.fel}
              label={"FEL (Freezed Earned Leave)"}
              value={form?.fel}
              onTextChange={(text) => {
                changeTextData(text, "fel");
              }}
              // onBlur={() => {
              //   onBlurHandler("fel");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag ? true : false}
              type={"number"}
              isError={errorData?.fel_value}
              errorText={errorData?.fel_value}
              label={"Value"}
              value={form?.fel_value}
              onTextChange={(text) => {
                changeTextData(text, "fel_value");
              }}
              // onBlur={() => {
              //   onBlurHandler("fel_value");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.fel_comment}
              errorText={errorData?.fel_comment}
              label={"Comments"}
              value={form?.fel_comment}
              onTextChange={(text) => {
                changeTextData(text, "fel_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("fel_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.rbl}
              errorText={errorData?.rbl}
              label={"RBL (Retirement Bank Leave)"}
              value={form?.rbl}
              onTextChange={(text) => {
                changeTextData(text, "rbl");
              }}
              // onBlur={() => {
              //   onBlurHandler("rbl");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag || form?.is_rbl_manual === "NO" ? true : false}
              type={"number"}
              isError={errorData?.rbl_value}
              errorText={errorData?.rbl_value}
              label={"Value"}
              value={form?.rbl_value}
              onTextChange={(text) => {
                changeTextData(text, "rbl_value");
              }}
              // onBlur={() => {
              //   onBlurHandler("rbl_value");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_rbl_manual");
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
                changeTextData("NO", "is_rbl_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.rbl_comment}
              errorText={errorData?.rbl_comment}
              label={"Comments"}
              value={form?.rbl_comment}
              onTextChange={(text) => {
                changeTextData(text, "rbl_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("rbl_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type={"number"}
              isError={errorData?.nfh}
              errorText={errorData?.nfh}
              label={"NFH or OT Payout Value"}
              value={form?.nfh}
              onTextChange={(text) => {
                changeTextData(text, "nfh");
              }}
              // onBlur={() => {
              //   onBlurHandler("nfh");
              // }}
            />
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.nfh_comment}
              errorText={errorData?.nfh_comment}
              label={"Comments"}
              value={form?.nfh_comment}
              onTextChange={(text) => {
                changeTextData(text, "nfh_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("nfh_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Dues to be Paid : "
            firstAmount={form?.total_dues ? `₹ ${form?.total_dues}` : 0}
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 3 : Dues to be Recovered</div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.pf}
              errorText={errorData?.pf}
              label={"Employee PF"}
              value={form?.pf}
              onTextChange={(text) => {
                changeTextData(text, "pf");
              }}
              // onBlur={() => {
              //   onBlurHandler("pf");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.pf_comment}
              errorText={errorData?.pf_comment}
              label={"Comments"}
              value={form?.pf_comment}
              onTextChange={(text) => {
                changeTextData(text, "pf_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("pf_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.esi}
              errorText={errorData?.esi}
              label={"Employee ESI"}
              value={form?.esi}
              onTextChange={(text) => {
                changeTextData(text, "esi");
              }}
              // onBlur={() => {
              //   onBlurHandler("esi");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.esi_comment}
              errorText={errorData?.esi_comment}
              label={"Comments"}
              value={form?.esi_comment}
              onTextChange={(text) => {
                changeTextData(text, "esi_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("esi_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.labour_welfare_fund}
              errorText={errorData?.labour_welfare_fund}
              label={"Labour Welfare Fund"}
              value={form?.labour_welfare_fund}
              onTextChange={(text) => {
                changeTextData(text, "labour_welfare_fund");
              }}
              // onBlur={() => {
              //   onBlurHandler("labour_welfare_fund");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.labour_welfare_fund_comment}
              errorText={errorData?.labour_welfare_fund_comment}
              label={"Comments"}
              value={form?.labour_welfare_fund_comment}
              onTextChange={(text) => {
                changeTextData(text, "labour_welfare_fund_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("labour_welfare_fund_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_mobile_device_recovery_manual === "NO"
                  ? true
                  : false
              }
              type={"number"}
              isError={errorData?.mobile_device_recovery}
              errorText={errorData?.mobile_device_recovery}
              label={"Mobile Device Recovery"}
              value={form?.mobile_device_recovery}
              onTextChange={(text) => {
                changeTextData(text, "mobile_device_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("mobile_device_recovery");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_mobile_device_recovery_manual");
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
                changeTextData("NO", "is_mobile_device_recovery_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.mobile_device_recovery_comment}
              errorText={errorData?.mobile_device_recovery_comment}
              label={"Comments"}
              value={form?.mobile_device_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "mobile_device_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("mobile_device_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.car_maintenance_recovery}
              errorText={errorData?.car_maintenance_recovery}
              label={"Car Maint"}
              value={form?.car_maintenance_recovery}
              onTextChange={(text) => {
                changeTextData(text, "car_maintenance_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("car_maintenance_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.car_maintenance_recovery_comment}
              errorText={errorData?.car_maintenance_recovery_comment}
              label={"Comments"}
              value={form?.car_maintenance_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "car_maintenance_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("car_maintenance_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_notice_period_recovery_manual === "NO"
                  ? true
                  : false
              }
              type={"number"}
              isError={errorData?.notice_period_recovery}
              errorText={errorData?.notice_period_recovery}
              label={"Notice Period Recovery"}
              value={form?.notice_period_recovery}
              onTextChange={(text) => {
                changeTextData(text, "notice_period_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("notice_period_recovery");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_notice_period_recovery_manual");
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
                changeTextData("NO", "is_notice_period_recovery_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.notice_period_recovery_comment}
              errorText={errorData?.notice_period_recovery_comment}
              label={"Comments"}
              value={form?.notice_period_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "notice_period_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("notice_period_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={empFlag || form?.is_bgv_manual === "NO" ? true : false}
              type={"number"}
              isError={errorData?.bgv}
              errorText={errorData?.bgv}
              label={"BGV Recovery"}
              value={form?.bgv}
              onTextChange={(text) => {
                changeTextData(text, "bgv");
              }}
              // onBlur={() => {
              //   onBlurHandler("bgv");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_bgv_manual");
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
                changeTextData("NO", "is_bgv_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.bgv_comment}
              errorText={errorData?.bgv_comment}
              label={"Comments"}
              value={form?.bgv_comment}
              onTextChange={(text) => {
                changeTextData(text, "bgv_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("bgv_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_relocation_recovery_manual === "NO"
                  ? true
                  : false
              }
              type={"number"}
              isError={errorData?.relocation_recovery}
              errorText={errorData?.relocation_recovery}
              label={"Relocation Recovery / Paid Notice"}
              value={form?.relocation_recovery}
              onTextChange={(text) => {
                changeTextData(text, "relocation_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("relocation_recovery");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_relocation_recovery_manual");
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
                changeTextData("NO", "is_relocation_recovery_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.relocation_recovery_comment}
              errorText={errorData?.relocation_recovery_comment}
              label={"Comments"}
              value={form?.relocation_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "relocation_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("relocation_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.transportation_deduction}
              errorText={errorData?.transportation_deduction}
              label={"Transportation Deduction"}
              value={form?.transportation_deduction}
              onTextChange={(text) => {
                changeTextData(text, "transportation_deduction");
              }}
              // onBlur={() => {
              //   onBlurHandler("transportation_deduction");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.transportation_deduction_comment}
              errorText={errorData?.transportation_deduction_comment}
              label={"Comments"}
              value={form?.transportation_deduction_comment}
              onTextChange={(text) => {
                changeTextData(text, "transportation_deduction_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("transportation_deduction_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.safety_gadget_recovery}
              errorText={errorData?.safety_gadget_recovery}
              label={"Safety Gadget Recovery"}
              value={form?.safety_gadget_recovery}
              onTextChange={(text) => {
                changeTextData(text, "safety_gadget_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("safety_gadget_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.safety_gadget_recovery_comment}
              errorText={errorData?.safety_gadget_recovery_comment}
              label={"Comments"}
              value={form?.safety_gadget_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "safety_gadget_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("safety_gadget_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.it_asset_recovery}
              errorText={errorData?.it_asset_recovery}
              label={"IT Asset Recovery:"}
              value={form?.it_asset_recovery}
              onTextChange={(text) => {
                changeTextData(text, "it_asset_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("it_asset_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.it_asset_recovery_comment}
              errorText={errorData?.it_asset_recovery_comment}
              label={"Comments"}
              value={form?.it_asset_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "it_asset_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("it_asset_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.canteen_recovery}
              errorText={errorData?.canteen_recovery}
              label={"Canteen Recovery"}
              value={form?.canteen_recovery}
              onTextChange={(text) => {
                changeTextData(text, "canteen_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("canteen_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.canteen_recovery_comment}
              errorText={errorData?.canteen_recovery_comment}
              label={"Comments"}
              value={form?.canteen_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "canteen_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("canteen_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_imprest_recovery_manual === "NO"
                  ? true
                  : false
              }
              type={"number"}
              isError={errorData?.imprest_recovery}
              errorText={errorData?.imprest_recovery}
              label={"Imprest Recovery"}
              value={form?.imprest_recovery}
              onTextChange={(text) => {
                changeTextData(text, "imprest_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("imprest_recovery");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_imprest_recovery_manual");
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
                changeTextData("NO", "is_imprest_recovery_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.imprest_recovery_comment}
              errorText={errorData?.imprest_recovery_comment}
              label={"Comments"}
              value={form?.imprest_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "imprest_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("imprest_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.petro_card_recovery}
              errorText={errorData?.petro_card_recovery}
              label={"Petro Card Recovery"}
              value={form?.petro_card_recovery}
              onTextChange={(text) => {
                changeTextData(text, "petro_card_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("petro_card_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.petro_card_recovery_comment}
              errorText={errorData?.petro_card_recovery_comment}
              label={"Comments"}
              value={form?.petro_card_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "petro_card_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("petro_card_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.smart_card_recovery}
              errorText={errorData?.smart_card_recovery}
              label={"Smart Card Recovery"}
              value={form?.smart_card_recovery}
              onTextChange={(text) => {
                changeTextData(text, "smart_card_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("smart_card_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.smart_card_recovery_comment}
              errorText={errorData?.smart_card_recovery_comment}
              label={"Comments"}
              value={form?.smart_card_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "smart_card_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("smart_card_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.loan_final_recovery}
              errorText={errorData?.loan_final_recovery}
              label={"Loan Final Recovery"}
              value={form?.loan_final_recovery}
              onTextChange={(text) => {
                changeTextData(text, "loan_final_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("loan_final_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.loan_final_recovery_comment}
              errorText={errorData?.loan_final_recovery_comment}
              label={"Comments"}
              value={form?.loan_final_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "loan_final_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("loan_final_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.adv_salary_recovery}
              errorText={errorData?.adv_salary_recovery}
              label={"Advance Salary Recovery"}
              value={form?.adv_salary_recovery}
              onTextChange={(text) => {
                changeTextData(text, "adv_salary_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("adv_salary_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.adv_salary_recovery_comment}
              errorText={errorData?.adv_salary_recovery_comment}
              label={"Comments"}
              value={form?.adv_salary_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "adv_salary_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("adv_salary_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.i_card_recovery}
              errorText={errorData?.i_card_recovery}
              label={"I-Card Recovery"}
              value={form?.i_card_recovery}
              onTextChange={(text) => {
                changeTextData(text, "i_card_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("i_card_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.i_card_recovery_comment}
              errorText={errorData?.i_card_recovery_comment}
              label={"Comments"}
              value={form?.i_card_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "i_card_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("i_card_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.other_recovery}
              errorText={errorData?.other_recovery}
              label={"Any Other Recovery"}
              value={form?.other_recovery}
              onTextChange={(text) => {
                changeTextData(text, "other_recovery");
              }}
              // onBlur={() => {
              //   onBlurHandler("other_recovery");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.other_recovery_comment}
              errorText={errorData?.other_recovery_comment}
              label={"Comments"}
              value={form?.other_recovery_comment}
              onTextChange={(text) => {
                changeTextData(text, "other_recovery_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("other_recovery_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.tds}
              errorText={errorData?.tds}
              label={"TDS"}
              value={form?.tds}
              onTextChange={(text) => {
                changeTextData(text, "tds");
              }}
              // onBlur={() => {
              //   onBlurHandler("tds");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.tds_comment}
              errorText={errorData?.tds_comment}
              label={"Comments"}
              value={form?.tds_comment}
              onTextChange={(text) => {
                changeTextData(text, "tds_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("tds_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.professional_tax}
              errorText={errorData?.professional_tax}
              label={"Proffesional Tax"}
              value={form?.professional_tax}
              onTextChange={(text) => {
                changeTextData(text, "professional_tax");
              }}
              // onBlur={() => {
              //   onBlurHandler("professional_tax");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.professional_tax_comment}
              errorText={errorData?.professional_tax_comment}
              label={"Comments"}
              value={form?.professional_tax_comment}
              onTextChange={(text) => {
                changeTextData(text, "professional_tax_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("professional_tax_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.car_status}
              errorText={errorData?.car_status}
              label={"Car Status"}
              value={form?.car_status}
              onTextChange={(text) => {
                changeTextData(text, "car_status");
              }}
              // onBlur={() => {
              //   onBlurHandler("car_status");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.car_status_comment}
              errorText={errorData?.car_status_comment}
              label={"Comments"}
              value={form?.car_status_comment}
              onTextChange={(text) => {
                changeTextData(text, "car_status_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("car_status_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Dues to be Recovered :"
            reduceAmount={
              form?.total_recovery ? `₹ ${form?.total_recovery}` : 0
            }
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 4 : Uphold Dues</div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.un_declared_pli_uphold}
              errorText={errorData?.un_declared_pli_uphold}
              label={"Un-Declared PLI"}
              value={form?.un_declared_pli_uphold}
              onTextChange={(text) => {
                changeTextData(text, "un_declared_pli_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("un_declared_pli_uphold");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.un_declared_pli_uphold_comment}
              errorText={errorData?.un_declared_pli_uphold_comment}
              label={"Comments"}
              value={form?.un_declared_pli_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "un_declared_pli_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("un_declared_pli_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              disabled={
                empFlag || form?.is_gratuity_uphold_manual === "NO"
                  ? true
                  : false
              }
              type={"number"}
              isError={errorData?.gratuity_uphold}
              errorText={errorData?.gratuity_uphold}
              label={"Gratuity"}
              value={form?.gratuity_uphold}
              onTextChange={(text) => {
                changeTextData(text, "gratuity_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("gratuity_uphold");
              // }}
            />
          </div>
          <div className={styles.editBtnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={empFlag ? true : false}
              onClick={() => {
                changeTextData("YES", "is_gratuity_uphold_manual");
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
                changeTextData("NO", "is_gratuity_uphold_manual");
              }}
            >
              <Delete fontSize={"small"} />
            </IconButton>
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.gratuity_uphold_comment}
              errorText={errorData?.gratuity_uphold_comment}
              label={"Comments"}
              value={form?.gratuity_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "gratuity_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("gratuity_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.statutory_bonus_uphold}
              errorText={errorData?.statutory_bonus_uphold}
              label={"Statutory Bonus"}
              value={form?.statutory_bonus_uphold}
              onTextChange={(text) => {
                changeTextData(text, "statutory_bonus_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("statutory_bonus_uphold");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.statutory_bonus_uphold_comment}
              errorText={errorData?.statutory_bonus_uphold_comment}
              label={"Comments"}
              value={form?.statutory_bonus_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "statutory_bonus_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("statutory_bonus_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.el_balance_uphold}
              errorText={errorData?.el_balance_uphold}
              label={"EL Balance (Opening-Consumed)"}
              value={form?.el_balance_uphold}
              onTextChange={(text) => {
                changeTextData(text, "el_balance_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_balance_uphold");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.el_balance_uphold_comment}
              errorText={errorData?.el_balance_uphold_comment}
              label={"Comments"}
              value={form?.el_balance_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "el_balance_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_balance_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.el_currnet_service_year_uphold}
              errorText={errorData?.el_currnet_service_year_uphold}
              label={"EL of Current Service Year"}
              value={form?.el_currnet_service_year_uphold}
              onTextChange={(text) => {
                changeTextData(text, "el_currnet_service_year_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_currnet_service_year_uphold");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.el_currnet_service_year_uphold_comment}
              errorText={errorData?.el_currnet_service_year_uphold_comment}
              label={"Comments"}
              value={form?.el_currnet_service_year_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "el_currnet_service_year_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("el_currnet_service_year_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.fel_uphold}
              errorText={errorData?.fel_uphold}
              label={"FEL (Freezed Earned Leave)"}
              value={form?.fel_uphold}
              onTextChange={(text) => {
                changeTextData(text, "fel_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("fel_uphold");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.fel_uphold_comment}
              errorText={errorData?.fel_uphold_comment}
              label={"Comments"}
              value={form?.fel_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "fel_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("fel_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.rbl_uphold}
              errorText={errorData?.rbl_uphold}
              label={"RBL (Retirement Bank Leave)"}
              value={form?.rbl_uphold}
              onTextChange={(text) => {
                changeTextData(text, "rbl_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("rbl_uphold");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.rbl_uphold_comment}
              errorText={errorData?.rbl_uphold_comment}
              label={"Comments"}
              value={form?.rbl_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "rbl_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("rbl_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.superannuation_uphold}
              errorText={errorData?.superannuation_uphold}
              label={"Supperannuation"}
              value={form?.superannuation_uphold}
              onTextChange={(text) => {
                changeTextData(text, "superannuation_uphold");
              }}
              // onBlur={() => {
              //   onBlurHandler("superannuation_uphold");
              // }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.superannuation_uphold_comment}
              errorText={errorData?.superannuation_uphold_comment}
              label={"Comments"}
              value={form?.superannuation_uphold_comment}
              onTextChange={(text) => {
                changeTextData(text, "superannuation_uphold_comment");
              }}
              // onBlur={() => {
              //   onBlurHandler("superannuation_uphold_comment");
              // }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Upload Dues :"
            reduceAmount={
              form?.total_uphold_dues ? `₹ ${form?.total_uphold_dues}` : 0
            }
          />
        </div>
      </div>

      
        <div className={"plainPaper"}>
          <div className={styles.heading}>Part 5 : Net Payable</div>
          <div className={"formFlex"}>
            <TotalSum
              firstName="Total Payable :"
              firstAmount={
                form?.net_payable ? `₹ ${form?.net_payable}` : 0
              }
            />
          </div>
        </div>
        <div className={"plainPaper"}>
          <div className={styles.heading}>Attachments</div>
          <AttachmentIncludeDetailForm ref={ChildenRef} />
        </div>
        <div className={"plainPaper"}>
          <div className={"headerFlex wrapper"}>
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
  );
}

export default FinalForm;
