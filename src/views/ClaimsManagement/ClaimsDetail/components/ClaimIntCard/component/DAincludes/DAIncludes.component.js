import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import IncludeFields from "./DAIncludeFields.component";
import styles from "./style.module.css";
import { Button, ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import LogUtils from "../../../../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";
import SnackbarUtils from "../../../../../../../libs/SnackbarUtils";

const TEMP_OBJ = {
  stay_at: "",
  date: "",
  start_time: new Date(0, 0, 0, 10, 0),
  end_time: new Date(0, 0, 0, 10, 0),
  da_pct: "",
  da_entitlement: "",
  da_amount: "",
  ie_entitlement: "",
  ie_amount: "",
  hours: "",
  da_payment_proof: null,
  ie_payment_proof: null,
};

const DAIncludeForm = (
  {
    data,
    currency,
    listWarehouse,
    errorData: errorForm,
    grade,
    changeAmount,
    startDate,
    endDate,
    CoPass,
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

  const checkDays = useMemo(() => {
    if (startDate && endDate) {
      const startDateValue = new Date(startDate);
      const endDateValue = new Date(endDate);
      startDateValue.setHours(0, 0, 0, 0);
      endDateValue.setHours(0, 0, 0, 0);
      const daysDiff = (endDateValue - startDateValue) / (1000 * 60 * 60 * 24);
      return daysDiff + 1;
    } else {
      return 0;
    }
  }, [startDate, endDate]);

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = [
        "stay_at",
        "date",
        "start_time",
        "end_time",
        "da_pct",
        "da_entitlement",
        "da_amount",
      ];

      {
        required.forEach((key) => {
          if (!val[key]) {
            err[key] = true;
          }
        });
      }
      if (val?.hours < 0) {
        err["hours"] = true;
        SnackbarUtils.error("End time should be greater than start time");
      }
      if (val.da_amount && val?.da_entitlement) {
        if (!val?.da_payment_proof) {
          if (val?.da_amount > val?.da_entitlement) {
            err["da_amount"] = true;
          }
        } else if (
          val?.da_payment_proof &&
          val?.stay_at === "SELF_ARRANGEMENT" &&
          grade === "G1"
        ) {
          if (val?.da_amount > val?.da_entitlement) {
            err["da_amount"] = true;
          }
        } else {
          delete err["da_amount"];
        }
      }
      if (checkDays >= 5 && val?.ie_amount && val?.ie_entitlement) {
        if (!val?.ie_payment_proof) {
          if (val?.ie_amount > val?.ie_entitlement) {
            err["ie_amount"] = true;
          }
        } else if (val?.ie_payment_proof && grade === "G0") {
          if (val?.ie_amount > 1000) {
            err["ie_amount"] = true;
          }else{
            delete err ['ie_amount']
          }
        }
      }
      if (val?.date) {
        let newDate = new Date(val?.date);
        if (isNaN(newDate.getTime())) {
          err["date"] = true;
        }
      }
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
            checkDays={checkDays}
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

  const totalSum = fields.reduce((acc, obj) => {
    const daAmount = parseFloat(obj.da_amount);
    const ieAmount = parseFloat(obj.ie_amount);
    if (!isNaN(daAmount)) {
      acc += daAmount;
    }
    if (!isNaN(ieAmount)) {
      acc += ieAmount;
    }
    return acc;
  }, 0);

  useEffect(() => {
    changeAmount(totalSum, "da_ie_expenses_amount");
  }, [totalSum]);

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
          Total Claim Amount:{" "}
          <span>{totalSum || totalSum === 0 ? `₹ ${totalSum}` : ""}</span>
        </div>
      </div>
    </>
  );
};

export default forwardRef(DAIncludeForm);
