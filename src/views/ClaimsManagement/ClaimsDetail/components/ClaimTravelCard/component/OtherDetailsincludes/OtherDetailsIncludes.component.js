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
import LogUtils from "../../../../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router";
import OtherDetailsIncludeFields from "./OtherDetailsIncludeFields.component";
import SnackbarUtils from "../../../../../../../libs/SnackbarUtils";

const TEMP_OBJ = {
  type: "",
  travel_date: "",
  details: "",
  amount: "",
  slip: null,
};

const OtherDetailsIncludeForm = (
  {
    data,
    currency,
    listWarehouse,
    errorData: errorForm,
    grade,
    getotherAmount,
    month,
    startDate,
      endDate

  },
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
      const required = ["type", "travel_date", "details","amount"];
      {
        required.forEach((key) => {
          if (!val[key]) {
            err[key] = true;
          }
        });
      }
      if(val?.slip === null){
        err['slip'] = true;
      }
      if (val?.type?.length === 0) {
        err["type"] = true;
        SnackbarUtils.error("Please Select the Type");
      }
      if (val?.travel_date) {
        const date = new Date(val?.travel_date);
        const today = new Date();
        var fortyFiveDaysAgo = new Date();
        fortyFiveDaysAgo.setDate(today.getDate() - 46);
        if (date > today || date < fortyFiveDaysAgo) {
          err["travel_date"] = true;
        }
      }
      // if(val?.travel_date){
      //   const date=new Date(val?.travel_date)
      //   console.log('====>',startDate , val?.travel_date ,date , endDate)
      //   if(startDate <= date <= endDate){
      //     err["travel_date"] = true;
      //   }
      // }
      if (val?.travel_date) {
        let newDate = new Date(val?.travel_date);
        if (isNaN(newDate.getTime())) {
          err["travel_date"] = true;
        }
      }
      if (val?.amount == 0) {
        err["amount"] = true;
      }
      if (Object.keys(err)?.length > 0) {
        errors[index] = err;
      }
    });
    console.log("erroros", errors);
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

  const changeData = (index, data) => {
    const tempData = [...fields];
    tempData[index] = { ...tempData[index], ...data };
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
    const oldState = ([...fields]);
    if (type == "ADDITION") {
      oldState.push((TEMP_OBJ));
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
            month={month}
            startDate={startDate}
            endDate={endDate}
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
    getotherAmount(sum);
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
            <Add fontSize={"small"} /> <span>Add Other Expense Detail</span>
          </ButtonBase>
        </div>
      )}

      <div className={styles.totalWrap}>
        <div className={styles.inner}>
          {" "}
          Total Claim Amount: <span>{sum || sum === 0 ? `₹ ${sum}` : ""}</span>
        </div>
      </div>
      {/*</div>*/}
    </>
  );
};

export default forwardRef(OtherDetailsIncludeForm);
