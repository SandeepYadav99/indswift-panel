import React, { useMemo } from "react";
import { TextField, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./style.module.css";
import CustomDatePicker from "../../../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../../../../../components/FormFields/SelectField/SelectField.component";
import { useEffect } from "react";
import File from "../../../../../../../components/FileComponent/FileComponent.component";
import { Autocomplete } from "@material-ui/lab";
import {
  entitlementAmout,
  entitlementForeign,
} from "../../../../../../../helper/helper";

const LodgingIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  grade,
  startDate,
  endDate,
  CoPass,
  tourType,
  setCurrency,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "amount") {
        if (value >= 0) {
          changeData(index, { [name]: value });
        }
      } else {
        changeData(index, { [name]: value });
      }
    }
  };
  useEffect(() => {
    if (data?.check_out && data?.check_in) {
      const startTime = new Date(data?.check_in);
      const endTime = new Date(data?.check_out);
      startTime.getHours(0, 0, 0, 0);
      endTime.getHours(0, 0, 0, 0);
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const timeDifference = endTime.getTime() - startTime.getTime();
      const numberOfNights =
        timeDifference == "0"
          ? 0
          : Math.ceil(timeDifference / millisecondsPerDay);
      changeData(index, {
        ["total_nights"]: numberOfNights,
      });
    }
  }, [data?.check_out, data?.check_in]);

  useEffect(() => {
    let result;
    if (grade && data?.country && data?.stay_at) {
      result = entitlementForeign(grade, data?.stay_at, data?.country);
      const getCurr =
        data?.country === "INDIA"
          ? "INR"
          : data?.country === "OTHERS"
          ? "USD"
          : "EUR";
      if (data?.stay_at === "GUEST_HOUSE") {
        changeData(index, {
          ["per_day_entitlement"]: result,
          ["max_entitlement"]: data?.total_nights * result,
          ["currency"]: getCurr,
          ["payment_by"]: "",
          ["amount"]: "",
          ["lodging_payment_proof"]: null,
          ["lodging_voucher"]: null,
        });
      } else {
        changeData(index, {
          ["per_day_entitlement"]: result,
          ["max_entitlement"]: data?.total_nights * result,
          ["currency"]: getCurr,
        });
      }
    }
  }, [grade, data?.stay_at, data?.country, data?.total_nights]);

  useEffect(() => {
    if (data?.stay_at === "N/A") {
      changeData(index, {
        ["payment_by"]: "",
        ["amount"]: "",
        ["lodging_payment_proof"]: null,
        ["lodging_voucher"]: null,
      });
    }
  }, [data?.stay_at]);

  useEffect(() => {
    if (data?.max_entitlement && data?.amount) {
      let amount = Number(data?.amount) - Number(data?.max_entitlement);
      console.log("amount", amount);
      changeData(index, {
        ["over_expenditure"]: amount >= 0 ? amount : 0,
      });
    }
  }, [data?.max_entitlement, data?.amount]);

  return (
    <div>
      <div className={styles.heading}>Travel Type</div>
      <div className={styles.flexContainer}>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomDatePicker
              disabled={!startDate ? true : false}
              clearable
              label={"Check In Date"}
              minDate={startDate}
              maxDate={endDate}
              onChange={(e) => handleChange(e, "check_in")}
              value={data?.check_in}
              isError={errors?.check_in}
            />
          </div>
          <div className={styles.formGrp}>
            <CustomDatePicker
              disabled={!endDate ? true : false}
              clearable
              label={"Check Out Date"}
              minDate={startDate}
              maxDate={endDate}
              onChange={(e) => handleChange(e, "check_out")}
              value={data?.check_out}
              isError={errors?.check_out}
            />
          </div>
          <div className={styles.formGrp}>
            <CustomSelectField
              isError={errors?.booking_by}
              errorText={errors?.booking_by}
              label={"Booking By"}
              value={data?.booking_by}
              handleChange={(value) => {
                handleChange(value, "booking_by");
              }}
            >
              <MenuItem value="SELF">SELF</MenuItem>
              <MenuItem value="OFFICE">OFFICE</MenuItem>
              <MenuItem value="COMPANY_ALLOTTED_CREDIT_CARD">
                COMPANY ALLOTTED CREDIT CARD
              </MenuItem>
            </CustomSelectField>
          </div>
         
        </div>
        <div className={styles.formWrp}>
          <>
            <div className={styles.formGrp}>
              <CustomSelectField
                isError={errors?.country}
                errorText={errors?.country}
                label={"Choose Country"}
                value={data?.country}
                handleChange={(value) => {
                  handleChange(value, "country");
                }}
              >
                <MenuItem value="INDIA">INDIA</MenuItem>
                <MenuItem value="RUSSIA">RUSSIA</MenuItem>
                <MenuItem value="UKRAINE">UKRAINE</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="TURKEY">TURKEY</MenuItem>
                <MenuItem value="EUROPE">EUROPE</MenuItem>
                <MenuItem value="OTHERS">OTHERS</MenuItem>
              </CustomSelectField>
            </div>
            <div className={styles.formGrp}>
              <TextField
                error={errors?.country_name}
                onChange={handleChange}
                value={data?.country_name}
                fullWidth={true}
                name={"country_name"}
                margin={"dense"}
                variant={"outlined"}
                label={"Specify Country"}
              />
            </div>
          </>
          <div className={styles.formGrp}>
            <CustomSelectField
              isError={errors?.stay_at}
              errorText={errors?.stay_at}
              label={"Stay at"}
              value={data?.stay_at}
              handleChange={(value) => {
                handleChange(value, "stay_at");
              }}
            >
              <MenuItem value="HOTEL">HOTEL</MenuItem>
              <MenuItem value="GUEST_HOUSE">GUEST HOUSE</MenuItem>
              <MenuItem value="SELF_ARRANGEMENT">SELF ARRANGEMENT</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </CustomSelectField>
          </div>
        </div>

        <div className={styles.formWrp}>
          {data?.stay_at === "HOTEL" && (
            <div className={styles.formGrp}>
              <TextField
                error={errors?.hotel}
                onChange={handleChange}
                value={data?.hotel}
                fullWidth={true}
                name={"hotel"}
                margin={"dense"}
                variant={"outlined"}
                label={"Hotel Name"}
              />
            </div>
          )}
          {CoPass?.length > 0 && (
            <div className={styles.formGrp}>
              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={(e, value) => {
                  handleChange(value, "shared_with");
                }}
                value={data?.shared_with}
                // id="tags-standard"
                options={CoPass ? CoPass : []}
                getOptionLabel={(option) =>
                  `${option?.name} - ( ${option?.emp_code} )`
                }
                defaultValue={data?.shared_with}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Shared with"
                    error={errors?.shared_with}
                  />
                )}
              />
            </div>
          )}
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomSelectField
              disabled={true}
              isError={errors?.currency}
              errorText={errors?.currency}
              label={"Choose Currency"}
              value={data?.currency}
              handleChange={(value) => {
                handleChange(value, "currency");
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </CustomSelectField>
          </div>
          <div className={styles.Low}>
            <div className={styles.flextitle}>
              <span className={styles.heading21}>No. of Nights:</span>
              <span className={styles.count}>{data?.total_nights}</span>
            </div>
            <div className={styles.flextitle}>
              <span className={styles.heading21}>Per Day Entitlement:</span>
              <span className={styles.count}>
                {data?.per_day_entitlement && `${data?.per_day_entitlement}`}
              </span>
            </div>
            <div className={styles.flextitle}>
              <span className={styles.heading21}>Total Max Entitlement:</span>
              <span className={styles.count}>
                {isNaN(data?.max_entitlement)
                  ? "-"
                  : `${data?.max_entitlement}`}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.payment_made_by}
              onChange={handleChange}
              value={data?.payment_made_by}
              fullWidth={true}
              name={"payment_made_by"}
              margin={"dense"}
              variant={"outlined"}
              label={"Choose currency of payment"}
            />
            <div className={styles.helpter}>
              Please mention the amount in spent currency and the exchange rate
              applied to reach at above currency.
            </div>
          </div>
          <div className={styles.formGrp}></div>
        </div>
        {data?.stay_at !== "N/A" && data?.stay_at !== "GUEST_HOUSE" && (
          <>
            <div className={styles.formWrp}>
              <div className={styles.formGrp}>
                <CustomSelectField
                  isError={errors?.payment_by}
                  errorText={errors?.payment_by}
                  label={"Payment Mode"}
                  value={data?.payment_by}
                  handleChange={(value) => {
                    handleChange(value, "payment_by");
                  }}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="OTHER">OTHER</MenuItem>
                </CustomSelectField>
              </div>
              <div className={styles.formGrp}>
                <TextField
                  type="number"
                  error={errors?.amount}
                  onChange={handleChange}
                  value={data?.amount}
                  fullWidth={true}
                  name={"amount"}
                  margin={"dense"}
                  variant={"outlined"}
                  label={"Expense Amount"}
                />
              </div>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGrp}>
                <File
                  max_size={10 * 1024 * 1024}
                  type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                  fullWidth={true}
                  name="proof"
                  label="Attach Proof of Payment"
                  accept={"application/pdf,application/msword,image/*"}
                  // link={data?.slip ? data?.slip : null}
                  error={errors?.lodging_payment_proof}
                  value={data?.lodging_payment_proof}
                  placeholder={"Attach Proof of Payment"}
                  onChange={(file) => {
                    if (file) {
                      handleChange(file, "lodging_payment_proof");
                    }
                  }}
                />
              </div>
              <div className={styles.formGrp}>
                <File
                  max_size={10 * 1024 * 1024}
                  type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
                  fullWidth={true}
                  name="proof"
                  label="Attach Voucher/Bill"
                  accept={"application/pdf,application/msword,image/*"}
                  // link={data?.slip ? data?.slip : null}
                  error={errors?.lodging_voucher}
                  value={data?.lodging_voucher}
                  placeholder={"Attach Voucher/Bill"}
                  onChange={(file) => {
                    if (file) {
                      handleChange(file, "lodging_voucher");
                    }
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.firstRowent}>
        <div className={styles.flextitle}>
          <span className={styles.heading21}>Over Expenditure:</span>
          <span className={styles.count}>
            {data?.over_expenditure && `₹ ${data?.over_expenditure}`}
          </span>
        </div>
      </div>
      <div className={styles.btnWrap}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
    </div>
  );
};

export default LodgingIncludeFields;
