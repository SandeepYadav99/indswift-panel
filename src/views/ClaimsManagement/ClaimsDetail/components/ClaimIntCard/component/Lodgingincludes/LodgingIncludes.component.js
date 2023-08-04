import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import IncludeFields from "./LodgingIncludeFields.component";
import styles from "./style.module.css";
import { Button, ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import LogUtils from "../../../../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";

const TEMP_OBJ = {
  check_in: "",
  check_out: "",
  booking_by: "",
  city_cluster: "",
  city: "",
  stay_at: "",
  hotel: "",
  shared_with: [],
  total_nights: "",
  per_day_entitlement: "",
  payment_by: "",
  amount: "",
  max_entitlement: 0,
  lodging_payment_proof: null,
  lodging_voucher: null,
  currency: "",
  country: "",
  country_name: "",
};

const LodgingIncludeForm = (
  {
    data,
    currency,
    listWarehouse,
    errorData: errorForm,
    grade,
    getTravelAmount,
    startDate,
    endDate,
    CoPass,
    changeAmount,
    tourType,
    setCurrency,
  },
  ref
) => {
  const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
  const [errorData, setErrorData] = useState({});
  const [variants, setVariants] = useState([]);
  useImperativeHandle(ref, () => ({
    isValid() {
      return validateData();
    },
    resetData() {
      setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    },
    getData() {
      return fields;
    },
    setData(data) {
      setFields([...data]);
    },
  }));

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = [
        "check_in",
        "check_out",
        "booking_by",
        "stay_at",
        "hotel",
        "shared_with",
        "payment_by",
        "amount",
        "lodging_voucher",
      ];
      if (val.payment_by !== "Cash") {
        required.push("lodging_payment_proof");
      }
      if (tourType === "FOREIGN") {
        required.push("country", "country_name");
      } else {
        required.push("city_cluster", "city");
      }
      {
        required.forEach((key) => {
          if (!val[key]) {
            err[key] = true;
          }
        });
      }
      if (val?.amount && grade !== "G0") {
        if (val?.amount > val?.max_entitlement) {
          err["amount"] = true;
        }
      }
      if(val.payment_by === "Cash" && !val?.lodging_payment_proof){
        delete err['lodging_payment_proof']
      }
      // if (val?.travel_date) {
      //   const date = new Date(val?.travel_date);
      //   const today = new Date();
      //   var fortyFiveDaysAgo = new Date();
      //   fortyFiveDaysAgo.setDate(today.getDate() - 46);
      //   if (date > today || date < fortyFiveDaysAgo) {
      //     err["travel_date"] = true;
      //   }
      // }
      // if (val?.travel_date) {
      //   let newDate = new Date(val?.travel_date);
      //   if (isNaN(newDate.getTime())) {
      //     err["travel_date"] = true;
      //   }
      // }
      // if (val?.shared_with?.length === 0) {
      //   err["shared_with"] = true;
      // }
      if (Object.keys(err)?.length > 0) {
        errors[index] = err;
      }
    });
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };
  useEffect(() => {
    if (data) {
      setFields({ ...data });
    }
  }, [data]);

  const isValid = () => {
    return validateData();
  };

  const removeErrors = useCallback(
    (index, key) => {
      const errors = JSON.parse(JSON.stringify(errorData));
      if (errors[index] != undefined) {
        if (Array.isArray(key)) {
          key.forEach((k) => {
            delete errors[index][k];
          });
        } else {
          delete errors[index][key];
        }
        setErrorData(errors);
      }
    },
    [setErrorData, errorData]
  );

  const changeData = (index, data, dateValue) => {
    // const tempData = JSON.parse(JSON.stringify(fields));
    const tempData = [...fields];
    if (dateValue) {
      tempData.forEach((item) => (item.travel_date = ""));
    } else {
      tempData[index] = { ...tempData[index], ...data };
    }
    LogUtils.log("data", data);
    setFields(tempData);
    const errArr = [];
    Object.keys(data).forEach((key) => {
      errArr.push(key);
    });
    removeErrors(index, errArr);
  };

  const onBlur = useCallback(() => {}, []);

  const handlePress = async (type, index = 0) => {
    LogUtils.log("type", type, index);
    const oldState = [...fields];
    if (type == "ADDITION") {
      oldState.push(JSON.parse(JSON.stringify(TEMP_OBJ)));
    } else {
      if (oldState.length === 1) {
        return true;
      }
      oldState.splice(index, 1);
    }
    LogUtils.log("oldState", oldState);
    setFields(oldState);
    // validateData();
  };

  const renderFields = useMemo(() => {
    return fields.map((val, index) => {
      const tempFilters = variants.filter((variant) => {
        const index = fields.findIndex((val) => val?.sku?.sku === variant?.sku);
        return index < 0;
      });

      return (
        <div>
          <IncludeFields
            variants={tempFilters}
            listWarehouse={listWarehouse}
            currency={currency}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
            grade={grade}
            startDate={startDate}
            endDate={endDate}
            CoPass={CoPass}
            tourType={tourType}
            setCurrency={setCurrency}
          />
        </div>
      );
    });
  }, [
    variants,
    errorData,
    listWarehouse,
    currency,
    validateData,
    changeData,
    handlePress,
    onBlur,
    fields,
  ]);
  const sum = fields.reduce((acc, curr) => {
    const value = curr["amount"];
    if (value !== "") {
      return acc + parseFloat(value);
    } else {
      return acc;
    }
  }, 0);

  useEffect(() => {
    changeAmount(sum, "lodging_expenses_amount");
  }, [sum]);

  return (
    <>
      {renderFields}
      {fields?.length < 20 && (
        <div className={styles.btnWrapper}>
          <ButtonBase
            className={styles.addition}
            label={"+"}
            onClick={() => {
              handlePress("ADDITION", 0);
            }}
          >
            <Add fontSize={"small"} /> <span>Add Travel Detail</span>
          </ButtonBase>
        </div>
      )}

      {/*</div>*/}
      <div className={styles.totalWrap}>
        <div className={styles.inner}>
          Total Claim Amount: <span>{sum || sum === 0 ? `₹ ${sum}` : ""}</span>
        </div>
      </div>
    </>
  );
};

export default forwardRef(LodgingIncludeForm);
