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
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import LogUtils from "../../../../../libs/LogUtils";
import LoanHistoryIncludeFields from "./LoanHistoryFields.component";
import { dropDownValuesLoan } from "../../../../../helper/helper";
import { isDate, isInvalidDateFormat } from "../../../../../libs/RegexUtils";

const TEMP_OBJ = {
  type: "",
  amount: "",
  interest: "",
  status: "",
  from: "",
  to: "",
};

const LoanHistoryIncludeForm = (
  { data, errorData: errorForm, grade, experience, isDetail },
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
      const required = ["type", "amount", "interest", "status", "from", "to"];
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
      if (!isDate(val?.to)) {
        if (isInvalidDateFormat(val?.to)) {
          err["to"] = true;
        }
      }
      if (!isDate(val?.from)) {
        if (isInvalidDateFormat(val?.from)) {
          err["from"] = true;
        }
      }
      if (val?.to && val?.from) {
        const joinDate = new Date(val?.to);
        const expectedDate = new Date(val?.from);
        joinDate.setHours(0, 0, 0, 0);
        expectedDate.setHours(0, 0, 0, 0);
        if (joinDate.getTime() < expectedDate.getTime()) {
          err["from"] = true;
          SnackbarUtils.error("From Date should not be Less than To Date");
        }
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

  const eligibleLoans = useMemo(() => {
    const eligible = dropDownValuesLoan.filter(
      (loan) => experience > loan.experienceRequired
    );
    return eligible.map((loan) => loan.type);
  }, [experience, dropDownValuesLoan]);

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
          <LoanHistoryIncludeFields
            variants={tempFilters}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
            grade={grade}
            eligibleLoans={eligibleLoans}
            isDetail={isDetail}
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

  return (
    <>
      {renderFields}
      <div className={styles.btnWrapper}>
        {!isDetail && (
          <ButtonBase
            className={styles.addition}
            label={"+"}
            onClick={() => {
              handlePress("ADDITION", 0);
            }}
          >
            <Add fontSize={"small"} /> <span>Add More</span>
          </ButtonBase>
        )}
      </div>
    </>
  );
};

export default forwardRef(LoanHistoryIncludeForm);
