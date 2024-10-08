import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import styles from "./style.module.css";
import { useParams } from "react-router";
import LogUtils from "../../../../../libs/LogUtils";
import EnterincludesDetailFields from "./EnterincludesDetailFields.component";

const TEMP_OBJ = {
  amount: "",
};

const EnterincludesDetailForm = (
  { data, errorData: errorForm, grade,changeAmount,setOfficeAmount3 ,statusCheck},
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
      let getUpdatedData = fields.map(obj => {
        let newObj = { ...obj };
        delete newObj.max_amount;
        return newObj;
    });
      return getUpdatedData;
    },
    setData(data) {
      const updatedData = data?.map((item)=>{
        return {
          ...item,
          amount : item?.amount ? item?.amount : 0,
          max_amount : item?.amount ? item?.amount : 0
        }
      })
      setFields([...updatedData]);
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
      required.forEach((key) => {
        if (!val[key] && val[key] !== 0) {
          err[key] = true;
        }
      });
      if(val?.amount == 0 && val?.amount !== ""){
        delete err['amount']
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
          <EnterincludesDetailFields
            variants={tempFilters}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
            grade={grade}
            statusCheck={statusCheck}
          />
          {fields?.length !== index + 1 && <div className={styles.verti}></div>}
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

  const sum = fields.reduce((acc, curr) => {
    const value = curr["amount"];
    if (value !== "") {
      return acc + parseFloat(value);
    } else {
      return acc;
    }
  }, 0);

  const getOfficeAmount = useMemo(() => {
    const officeBookings = fields?.filter(
      (booking) => booking.booking_by !== "SELF" && booking.amount !== ""
    );
    const sum = officeBookings?.reduce(
      (total, booking) => total + parseFloat(booking?.amount),
      0
    );
    return sum;
  }, [fields]);

  useEffect(() => {
    changeAmount(sum, "entertainment_expenses_amount");
  }, [sum]);

  useEffect(() => {
    if (sum) {
      setOfficeAmount3(getOfficeAmount);
    }
  }, [fields]);

  return (
    <>
      {renderFields}
      <div className={styles.totalWrap}>
        <div className={styles.inner}>
          Total Claim Amount: <span>{sum || sum === 0 ? `₹ ${sum}` : ""}</span>
        </div>
      </div>
    </>
  );
};

export default forwardRef(EnterincludesDetailForm);
