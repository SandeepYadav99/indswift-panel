import { useState, useRef, useCallback, useEffect } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router-dom";
import {
  serviceLeaveCount,
  serviceLeaveCreate,
} from "../../../services/Leave.service";
import { useDispatch, useSelector } from "react-redux";
import historyUtils from "../../../libs/history.utils";
import { useMemo } from "react";
import { serviceGetEmployeeDetails } from "../../../services/ClaimsManagement.service";

const initialForm = {
    title:"",
    message:"",
    send_to:"",
    location_id:"",
    send_priority:"",
    send_timestamp:"",
};


const useCreate = () => {
    const [form,setForm] = useState({ ...initialForm })
    const [errorData, setErrorData] = useState({});

    const removeError = useCallback(
        (title) => {
          const temp = JSON.parse(JSON.stringify(errorData));
          temp[title] = false;
          setErrorData(temp);
        },
        [setErrorData, errorData]
      );
    
      const changeTextData = useCallback(
        (text, fieldName) => {
          let shouldRemoveError = true;
          const t = { ...form };
          t[fieldName] = text;
          setForm(t);
          shouldRemoveError && removeError(fieldName);
        },
        [removeError, form, setForm]
      );
    
      const onBlurHandler = useCallback(
        (type) => {
          if (form?.[type]) {
            changeTextData(form?.[type].trim(), type);
          }
        },
        [changeTextData]
      );

    const handleSubmit=()=>{

    }

  return {
  handleSubmit,
  form,
  onBlurHandler,
  changeTextData
  };
};

export default useCreate;
