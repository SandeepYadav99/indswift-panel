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
import LogUtils from "../../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const TEMP_OBJ = {
  da_pct: "",
  da_amount: "",
  ie_amount: "",
  currency: "",
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
    isCP,
    statusCheck
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
      let getUpdatedData = fields.map(obj => {
        let newObj = { ...obj };
        delete newObj.max_da_amount;
        delete newObj.max_ie_amount;
        return newObj;
    });
    return getUpdatedData;
    },
    setData(data) {
      const updatedData = data?.map((item)=>{
        return {
          ...item,
          da_amount : item?.da_amount ? item?.da_amount : 0,
          max_da_amount : item?.da_amount ? item?.da_amount : 0,
          ie_amount : item?.ie_amount ? item?.ie_amount : 0,
          max_ie_amount : item?.ie_amount ? item?.ie_amount : 0
        }
      })
      setFields([...updatedData]);
    },
  }));

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = ["da_pct", "da_amount","ie_amount"];

      {
        required.forEach((key) => {
          if (!val[key]) {
            err[key] = true;
          }
        });
      }
      if(val?.da_amount == 0 && val?.da_amount !== ""){
        delete err['da_amount']
      }
      if(val?.ie_amount == 0 && val?.ie_amount !== ""){
        delete err['ie_amount']
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
            isCP={isCP}
            statusCheck={statusCheck}
          />
          {fields?.length !== index + 1 && <div className={styles.verti}></div>}
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
    isCP,
  ]);

  const USDsum = useMemo(() => {
    return fields.reduce((acc, obj) => {
      if (obj.currency === "USD") {
        const daAmount = parseFloat(obj.da_amount);
        const ieAmount = parseFloat(obj.ie_amount);
        if (!isNaN(daAmount)) {
          acc += daAmount;
        }
        if (!isNaN(ieAmount)) {
          acc += ieAmount;
        }
        return acc;
      } else {
        return acc;
      }
    }, 0);
  }, [fields]);

  const Eurosum = useMemo(() => {
    return fields.reduce((acc, obj) => {
      if (obj.currency === "EUR") {
        const daAmount = parseFloat(obj.da_amount);
        const ieAmount = parseFloat(obj.ie_amount);
        if (!isNaN(daAmount)) {
          acc += daAmount;
        }
        if (!isNaN(ieAmount)) {
          acc += ieAmount;
        }
        return acc;
      } else {
        return acc;
      }
    }, 0);
  }, [fields]);

  const Inrsum = useMemo(() => {
    return fields.reduce((acc, obj) => {
      if (obj.currency === "INR") {
        const daAmount = parseFloat(obj.da_amount);
        const ieAmount = parseFloat(obj.ie_amount);
        if (!isNaN(daAmount)) {
          acc += daAmount;
        }
        if (!isNaN(ieAmount)) {
          acc += ieAmount;
        }
        return acc;
      } else {
        return acc;
      }
    }, 0);
  }, [fields]);

  // useEffect(() => {
  //   changeAmount(USDsum, "da_ie_expenses_amount_usd");
  // }, [USDsum]);

  // useEffect(() => {
  //   changeAmount(Eurosum, "da_ie_expenses_amount_eur");
  // }, [Eurosum]);

  // useEffect(() => {
  //   changeAmount(Inrsum, "da_ie_expenses_amount");
  // }, [Inrsum]);

  
  useEffect(() => {
    const value = {
      da_ie_expenses_amount: Inrsum,
      da_ie_expenses_amount_eur: Eurosum,
      da_ie_expenses_amount_usd: USDsum,
    };
    changeAmount(value);
  }, [Inrsum, USDsum, Eurosum]);

  return (
    <>
      {renderFields}

      {/*</div>*/}
      <div className={styles.totalWrap}>
        <div className={styles.inner}>
          Total USD Used:{" "}
          <span>{USDsum || USDsum === 0 ? `$ ${USDsum}` : ""}</span>
        </div>
        <div className={styles.inner}>
          Total Euro Used:{" "}
          <span>{Eurosum || Eurosum === 0 ? `€ ${Eurosum}` : ""}</span>
        </div>
        <div className={styles.inner}>
          Total INR Used:{" "}
          <span>{Inrsum || Inrsum === 0 ? `₹ ${Inrsum}` : ""}</span>
        </div>
      </div>
    </>
  );
};

export default forwardRef(DAIncludeForm);
