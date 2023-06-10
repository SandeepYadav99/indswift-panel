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
import OtherDetailsIncludeFields from "./OtherDetailsIncludeFields.component";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const TEMP_OBJ = {
  type: "",
  check_in: "",
  check_out: "",
  property_name: "",
  accomodation_documents: null,
};

const OtherDetailsIncludeForm = (
  { data, errorData: errorForm, grade },
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
      const required = [
        "property_name",
        "type",
        "check_in",
        "check_out",
        "accomodation_documents",
      ];
      const hasValues = Object.values(val).some(value => value !== "" && value !== null);
      {
        hasValues &&
          required.forEach((key) => {
            if (!val[key]) {
              err[key] = true;
            }
          });
      }
      if (val?.check_in && val?.check_out) {
        const joinDate = new Date(val?.check_in);
        const expectedDate = new Date(val?.check_out);
        joinDate.setHours(0, 0, 0, 0);
        expectedDate.setHours(0, 0, 0, 0);
        if (joinDate.getTime() > expectedDate.getTime()) {
          err["check_out"] = true;
          SnackbarUtils.error(
            "CheckOut Date should not be Less than CheckIn Date"
          );
        }
      }
      if(!hasValues){
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

  return (
    <>
      {renderFields}
      <div className={styles.btnWrapper}>
        <ButtonBase
          className={styles.addition}
          label={"+"}
          onClick={() => {
            handlePress("ADDITION", 0);
          }}
        >
          <Add fontSize={"small"} /> <span>Add More</span>
        </ButtonBase>
      </div>
    </>
  );
};

export default forwardRef(OtherDetailsIncludeForm);
