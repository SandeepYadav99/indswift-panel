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
import LogUtils from "../../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router";
import CoIncludeFields from "./CoincludeIncludeFields.component";
import { serviceCheckCoPassenger } from "../../../../../services/ClaimsManagement.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const TEMP_OBJ = {
  co_passengers: "",
};

const CoincludeForm = (
  { data, errorData: errorForm, employees, employeeId, start, end },
  ref
) => {
  const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
  const [empValid, setEmpValid] = useState({});
  const [filteredList, setFilteredList] = useState([]);
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
  useEffect(() => {
    if (employees) {
      const emp = [employeeId];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].co_passengers && fields[i].co_passengers?.id) {
          emp.push(fields[i].co_passengers.id);
        }
      }
      let filteredArr = employees.filter((obj) => !emp.includes(obj?.id));
      setFilteredList([...filteredArr]);
    }
  }, [fields]);

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = ["co_passengers"];
      // if (start && end && val?.co_passengers?.id) {
      //   checkCodeValidation(val.co_passengers.id, index);
      // }
      {
        required.forEach((key) => {
          if (!val[key]) {
            err[key] = true;
          }
        });
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

  const checkCodeValidation = async (empId, index) => {
    const errors = JSON.parse(JSON.stringify(errorData));
    if (start && end) {
      serviceCheckCoPassenger({
        start_date: start,
        end_date: end,
        employee_id: empId,
      }).then((res) => {
        const resData = res.data;
        if (resData) {
          errors[index] = { co_passengers: true };
          setErrorData(errors);
        } else {
          delete errors[index];
          setErrorData(errors);
        }
      });
    }
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
    if (data?.co_passengers?.id) {
      checkCodeValidation(data?.co_passengers?.id, index);
    }
    LogUtils.log("data", data.co_passengers, index);
    setFields(tempData);
    if (Object.keys(data?.co_passengers)?.length > 0) {
      const filterId = filteredList?.filter(
        (item) => item?.id !== data?.co_passengers?.id
      );
      setFilteredList([...filterId]);
    }
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
          <CoIncludeFields
            variants={tempFilters}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
            employees={employees}
            employeeId={employeeId}
            filteredList={filteredList}
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
      {fields?.length < 4 && (
        <div className={styles.btnWrapper}>
          <ButtonBase
            className={styles.addition}
            label={"+"}
            onClick={() => {
              handlePress("ADDITION", 0);
            }}
          >
            <Add fontSize={"small"} /> <span>Add Co-traveler</span>
          </ButtonBase>
        </div>
      )}
    </>
  );
};

export default forwardRef(CoincludeForm);
