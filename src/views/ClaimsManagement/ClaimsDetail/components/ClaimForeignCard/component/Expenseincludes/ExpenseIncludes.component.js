import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import IncludeFields from "./ExpenseIncludeFields.component";
import styles from "./style.module.css";
import { Button, ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import LogUtils from "../../../../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";

const TEMP_OBJ = {
  travel_date: "",
  currency: "",
  from: "",
  to: "",
  mode: "",
  details: "",
  booking_by: "",
  payment_by: "",
  amount: 0,
  total_kms: "",
  payment_made_by: "",
  travel_payment_proof: null,
  travel_voucher: null,
};

const ExpenseIncludeForm = (
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
    setOfficeAmount2,
    curr,
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
        "travel_date",
        "from",
        "to",
        "mode",
        "details",
        "booking_by",
        "payment_by",
        "amount",
        "total_kms",
        "travel_voucher",
        "currency",
      ];
      if (val.payment_by !== "Cash") {
        required.push("travel_payment_proof");
      }
      {
        required.forEach((key) => {
          if (!val[key]) {
            err[key] = true;
          }
        });
      }
      if (val?.mode === "COMPANY_VEHICLE") {
        delete err["travel_payment_proof"];
        delete err["amount"];
        delete err["travel_voucher"];
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
      if (val?.travel_date) {
        let newDate = new Date(val?.travel_date);
        if (isNaN(newDate.getTime())) {
          err["travel_date"] = true;
        }
      }

      if (val.payment_by === "Cash" && !val?.travel_payment_proof) {
        delete err["travel_payment_proof"];
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

  useEffect(() => {
    changeAmount(USDsum, "travel_expenses_amount_usd");
  }, [USDsum]);

  useEffect(() => {
    changeAmount(Eurosum, "travel_expenses_amount_eur");
  }, [Eurosum]);

  useEffect(() => {
    changeAmount(Inrsum, "travel_expenses_amount");
  }, [Inrsum]);

  const totalAmount = useMemo(() => {
    let sum = 0;
    if (curr?.length > 0) {
      fields.forEach((item) => {
        if (
          (item?.booking_by === "OFFICE" && item?.amount !== "") ||
          (item?.booking_by === "SELF" && item?.mode === "COMPANY_VEHICLE")
        ) {
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
    if (USDsum || Eurosum || Inrsum) {
      setOfficeAmount2(totalAmount);
    }
  }, [fields]);

  // const getOfficeAmount = useMemo(() => {
  //   const officeBookings = fields?.filter(
  //     (booking) =>
  //       (booking.booking_by === "OFFICE" && booking.amount !== "") ||
  //       (booking?.booking_by === "SELF" && booking?.mode === "COMPANY_VEHICLE")
  //   );
  //   const sum = officeBookings?.reduce(
  //     (total, booking) => total + parseFloat(booking?.amount),
  //     0
  //   );
  //   return sum;
  // }, [fields]);

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
          Total USD Used:{" "}
          <span>{USDsum || USDsum === 0 ? `₹ ${USDsum}` : ""}</span>
        </div>
        <div className={styles.inner}>
          Total Euro Used:{" "}
          <span>{Eurosum || Eurosum === 0 ? `₹ ${Eurosum}` : ""}</span>
        </div>
        <div className={styles.inner}>
          Total INR Used:{" "}
          <span>{Inrsum || Inrsum === 0 ? `₹ ${Inrsum}` : ""}</span>
        </div>
      </div>
    </>
  );
};

export default forwardRef(ExpenseIncludeForm);
