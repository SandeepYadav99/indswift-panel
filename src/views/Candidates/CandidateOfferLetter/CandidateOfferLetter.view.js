import { ButtonBase } from "@material-ui/core";
import React from "react";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import TotalSum from "../../EmployeeList/components/TotalSum/TotalSum";
import CandidateOfferLetterHook from "./CandidateOfferLetter.hook";
import UpperProfileCard from "./components/UpperProfileCard/UpperProfileCard";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import CustomDateTimePicker from "../../../components/FormFields/DatePicker/CustomDateTimePicker";

function CandidateOfferLetter() {
  const { form, errorData, changeTextData, onBlurHandler, handleSubmit } =
    CandidateOfferLetterHook({});
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
  return (
    <div className={styles.OfferWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Offer Letter Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLines} />
        </div>
      </div>
      <UpperProfileCard />
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Joining Details</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDateTimePicker
              clearable
              label={"Joining Date & Time"}
              minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "joining_date");
              }}
              value={form?.joining_date}
              isError={errorData?.joining_date}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.reporting_location}
              errorText={errorData?.reporting_location}
              label={"Reporting Location"}
              value={form?.reporting_location}
              onTextChange={(text) => {
                changeTextData(text, "reporting_location");
              }}
              onBlur={() => {
                onBlurHandler("reporting_location");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Expected Response Date"}
              minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "response_date");
              }}
              value={form?.response_date}
              isError={errorData?.response_date}
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
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Incremental Gross Salary + Car Component: "
            firstAmount={getSumValue(
              form?.incremental_gross_salary,
              form?.car_component
            )}
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
            firstAmount={getSumValue(
              form?.education_allowance,
              form?.special_allowance,
              form?.basic_salary,
              form?.hra
            )}
          />
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Part B - Earnings 2</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
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
          <div className={"formGroup"}>
            <CustomTextField
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
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
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
          <div className={"formGroup"}>
            <CustomTextField
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
            <CustomTextField
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
          <div className={"formGroup"}>
            <CustomTextField
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
        </div>{" "}
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
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
          <div className={"formGroup"}>
            <CustomTextField
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
        </div>{" "}
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
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
          <div className={"formGroup"}>
            <CustomTextField
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
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
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
          <div className={"formGroup"}></div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Incremental Gross Salary + Car Component: "
            firstAmount={getSumValue(
              form?.pug,
              form?.helper,
              form?.food_coupons,
              form?.gift_coupons,
              form?.lta,
              form?.super_annuation,
              form?.nps,
              form?.vehicle_maintenance,
              form?.vehicle_emi,
              form?.earning2_vpf,
              form?.fuel
            )}
            secondName="Gross Salary (Part A + Part B) :"
            secondAmount={getSumValue(
              getSumValue(
                form?.pug,
                form?.helper,
                form?.food_coupons,
                form?.gift_coupons,
                form?.lta,
                form?.super_annuation,
                form?.nps,
                form?.vehicle_maintenance,
                form?.vehicle_emi,
                form?.earning2_vpf,
                form?.fuel
              ),
              getSumValue(
                form?.basic_salary,
                form?.special_allowance,
                form?.education_allowance,
                form?.hra
              )
            )}
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
        <div className={"formFlex"}>
          <TotalSum
            firstName="Incremental Gross Salary + Car Component: "
            firstAmount={form?.earning_three_pli}
          />
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Part D - Deduction 1</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
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
          <div className={"formGroup"}>
            <CustomTextField
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
          <div className={"formGroup"}>
            <CustomTextField
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
        </div>
        <div className={"formFlex"}>
          <TotalSum
            customClass={styles.redField}
            firstName="Total Deduction 1:  "
            firstAmount={getSumValue(
              form?.em_pf,
              form?.em_esi,
              form?.deduction_vpf,
              form?.em_lwf
            )}
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
            firstAmount={getSumValue(form?.er_pf, form?.er_esi, form?.er_lwf)}
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
              type={"number"}
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
        </div>{" "}
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Earnings 5 :  "
            firstAmount={getSumValue(
              form?.gratuity,
              form?.insurance,
              form?.stability_incentive,
              form?.retention_allowance,
              form?.perf_bonus,
              form?.annual_bonus,
              form?.two_car_maintenance,
              form?.two_fuel
            )}
          />
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <ButtonBase
          type={"button"}
          className={styles.createBtn}
          onClick={handleSubmit}
        >
          preview Offer letter
        </ButtonBase>
      </div>
    </div>
  );
}

export default CandidateOfferLetter;
