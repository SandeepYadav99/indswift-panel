import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import styles from "./style.module.css";
import { Button, ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router";
import OtherDetailsIncludeFields from "./OtherDetailsIncludeFields.component";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import LogUtils from "../../../../../libs/LogUtils";

const TEMP_OBJ = {
  amount: "",
  currency: "",
};

const OtherDetailsIncludeForm = (
  { data, errorData: errorForm, grade, changeAmount,setOfficeAmount3,curr },
  ref
) => {
  const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
  const [errorData, setErrorData] = useState({});
  const [variants, setVariants] = useState([]);
  const { id } = useParams();
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

  const getState = () => {
    return fields;
  };

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = ["amount"];
      const hasValues = Object.values(val).some(
        (value) => value !== "" && value !== null
      );
      {
        hasValues &&
          required.forEach((key) => {
            if (!val[key]) {
              err[key] = true;
            }
          });
      }

      if (!hasValues) {
        for (const key in err) {
          if (err.hasOwnProperty(key)) {
            delete err[key];
          }
        }
      }
      if (Object.keys(err)?.length > 0) {
        errors[index] = err;
      }
    });

    console.log("othererroros", errors);
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };
  useEffect(() => {
    if (data) {
      setFields({ ...data });
    }
  }, [data]);

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
      oldState.push(TEMP_OBJ);
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
          <OtherDetailsIncludeFields
            variants={tempFilters}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
            grade={grade}
          />
        </div>
      );
    });
  }, [
    variants,
    errorData,
    validateData,
    changeData,
    handlePress,
    onBlur,
    fields,
  ]);

  const USDsum = useMemo(() => {
    return fields.reduce((acc, curr) => {
      if (curr?.currency === "USD") {
        const value = curr["amount"];
        if (value !== "") {
          return acc + parseFloat(value);
        } else {
          return acc;
        }
      } else {
        return acc;
      }
    }, 0);
  }, [fields]);

  const Eurosum = useMemo(() => {
    return fields.reduce((acc, curr) => {
      if (curr?.currency === "EUR") {
        const value = curr["amount"];
        if (value !== "") {
          return acc + parseFloat(value);
        } else {
          return acc;
        }
      } else {
        return acc;
      }
    }, 0);
  }, [fields]);

  const Inrsum = useMemo(() => {
    return fields.reduce((acc, curr) => {
      if (curr?.currency === "INR") {
        const value = curr["amount"];
        if (value !== "") {
          return acc + parseFloat(value);
        } else {
          return acc;
        }
      } else {
        return acc;
      }
    }, 0);
  }, [fields]);

  const totalAmount = useMemo(() => {
    let sum = 0;
    if (curr?.length > 0) {
      fields.forEach((item) => {
        if (item.booking_by !== "SELF" && item.amount !== "") {
          switch (item.currency) {
            case "USD":
              sum += parseFloat(item.amount) * Number(curr[1]?.conversion_rate);
              break;
            case "EUR":
              sum += parseFloat(item.amount) * Number(curr[0]?.conversion_rate);
              break;
            case "INR":
              sum += parseFloat(item.amount);
              break;
            default:
              break;
          }
        }
      });
    }

    return sum;
  }, [fields]);

  useEffect(() => {
    const value = {
      entertainment_expenses_amount: Inrsum,
      entertainment_expenses_amount_eur: Eurosum,
      entertainment_expenses_amount_usd: USDsum,
    };
    changeAmount(value);
  }, [Inrsum, USDsum, Eurosum]);

  // useEffect(() => {
  //   changeAmount(USDsum, "entertainment_expenses_amount_usd");
  // }, [USDsum]);

  // useEffect(() => {
  //   changeAmount(Eurosum, "entertainment_expenses_amount_eur");
  // }, [Eurosum]);

  // useEffect(() => {
  //   changeAmount(Inrsum, "entertainment_expenses_amount");
  // }, [Inrsum]);

  useEffect(() => {
    if (totalAmount || totalAmount == 0) {
      setOfficeAmount3(totalAmount);
    }
  }, [fields]);

  // useEffect(() => {
  //   changeAmount(sum, "entertainment_expenses_amount");
  // }, [sum]);

  return (
    <>
      {renderFields}
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

export default forwardRef(OtherDetailsIncludeForm);
