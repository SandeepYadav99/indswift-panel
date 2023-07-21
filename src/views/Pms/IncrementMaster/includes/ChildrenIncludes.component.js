/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import IncludeFields from "./ChildrenIncludeFields.component";
import styles from "./style.module.css";
import { Button, ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import LogUtils from "../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router";
import ChildrenIncludeFields from "./ChildrenIncludeFields.component";

const TEMP_OBJ = {
  level: "",
  min: "",
  max: "",
  percenatge: "",
  criteria: "NONE",
};

const ChildrenIncludeForm = (
  {
    data,
    currency,
    listWarehouse,
    errorData: errorForm,
    form,
    changeTextData,
    updateInventory,
    vendorId,
  },
  ref
) => {
  const [fields, setFields] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [variants, setVariants] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const val=[];
    for (let i=0;i <= 11;i++) {
      val.push({...TEMP_OBJ})
    }
    setFields(val)
    // console.log(fields)
    // let sku = 0;
    // let qty = 0;
    // fields.forEach((val) => {
    //   sku++;
    //   if (val.quantity && !isNaN(val.quantity)) {
    //     qty += parseInt(val.quantity);
    //     // console.log("><>",qty)
    //   }
    // });
    // updateInventory(sku, qty);
  },[]);

  useImperativeHandle(ref, () => ({
    isValid() {
      return validateData();
    },
    setData(data) {
      setFields([...data]);
    },
    resetData() {
      setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    },
    getData() {
      fields.forEach((obj, index) => {
        obj.level = `L${index}`;
        if (obj.hasOwnProperty("employee_id")) {
          delete obj.employee_id;
        }
        if (obj.hasOwnProperty("_id")) {
          delete obj._id;
        }
      });
      return JSON.parse(JSON.stringify(fields));
    },
  }));

  const getState = () => {
    return fields;
  };

  const validateData = (index, type) => {
    const errors = {};
    // if (type) {
    //     if (errorData[index]) {
    //         errorData[index][type] = false;
    //     }
    //     setErrorData(errorData);
    //     return false;
    // }
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = ["min","max","percentage", 'criteria'];
      required?.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        }
      });
      if (Object.keys(err).length > 0) {
        errors[index] = err;
      }
    });
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };

  useEffect(() => {
    if (data) {
      setFields(data);
    }
  }, [data]);

  const isValid = () => {
    return validateData();
  };

  const checkExists = useCallback(async (index, key, value) => {}, []);

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
    const tempData = JSON.parse(JSON.stringify(fields));
    tempData[index] = { ...tempData[index], ...data };
    LogUtils.log("data", data);
    setFields(tempData);
    const errArr = [];
    Object.keys(data).forEach((key) => {
      errArr.push(key);
    });
    removeErrors(index, errArr);
  };

  const onBlur = useCallback(
    (index, key, value) => {
      if (key === "vendor_code" || key === "ean") {
        if (value) {
          // checkExists(index, key, value);
        }
      }
    },
    [checkExists]
  );

  const handlePress = async (type, index = 0) => {
    LogUtils.log("type", type, index);
    const oldState = JSON.parse(JSON.stringify(fields));
    if (type == "ADDITION") {
      oldState.push(JSON.parse(JSON.stringify(TEMP_OBJ)));
    } else {
      // if (oldState.length === 1) {
      //   return true;
      // }
      oldState.splice(index, 1);
    }
    LogUtils.log("oldState", oldState);
    setFields(oldState);
    // validateData();
  };

  const renderFields = useMemo(() => {
    return fields.map((val, index) => {
      return (
        <div>
          <ChildrenIncludeFields
            listWarehouse={listWarehouse}
            currency={currency}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
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

  return (
    <>
      {renderFields}
    </>
  );
};

export default forwardRef(ChildrenIncludeForm);
