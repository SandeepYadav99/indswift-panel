import { useState, useRef, useCallback, useEffect } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import { isAlphaNumChars, isSpace } from "../../../libs/RegexUtils";
import { useParams } from "react-router-dom";
import { serviceLeaveCreate } from "../../../services/Leave.service";
import { actionLeaveCount } from "../../../actions/LeaveModule.action";
import { useDispatch, useSelector } from "react-redux";


const initialForm = {
  type: "",
  duration: "",
  duration_days: "",
  event_type: "",
  start_date: "",
  end_date: "",
  purpose: "",
  event: "",
  child: "",
  choose_leave: "",
  select_event: "",
  comment: "",
  deceased_relationship: "",
  reason: "",
  document: null,
};
const OccasionKey = ["type", "duration", "duration_days", "comment","event_type","start_date"];

const Bereavement = [
  "deceased_relationship",
  "start_date",
  "end_date",
  "comment",
  "type",
];

const Facilitation = ["reason", "start_date", "end_date", "comment", "type"];

const Paternity = [
  "event_type",
  "child",
  "start_date",
  "end_date",
  "comment",
  "type",
];


const useLeaveApplication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaveType, setLeaveType] = useState();
  const [errorData, setErrorData] = useState({});
  const [daysCount, setDaysCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const [leaveCount,setLeaveCount] = useState();
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    count,
  } = useSelector((state) => state.LeaveModule);


  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    if (form?.type === "OCCASION_LEAVE") {
      let required = ["duration", "event_type"];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if (form?.type === "BEREAVEMENT_LEAVE") {
      let required = [
        "deceased_relationship",
        "start_date",
        "end_date",
        "comment",
      ];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if (form?.type === "FACILITATION_LEAVE") {
      let required = ["reason", "start_date", "end_date"];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if (form?.type === "PATERNITY_LEAVE") {
      let required = [
        "event_type",
        "child",
        "start_date",
        "end_date",
        "comment",
      ];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if(daysCount > count?.data?.pending_leave){
      errors["leave"] = true;
      SnackbarUtils.error("Applied Leave cannot be greater than Pending Leaves")
    }
    else{
      delete errors["leave"]
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  useEffect(() => {
    if (form?.type) {
      const type = form?.type;
      setErrorData({});
      setForm({ ...initialForm, type: type });
      setDaysCount(0)
    }
  }, [form?.type]);

  useEffect(() => {
    if (form?.start_date && form?.end_date) {
      const startTime = new Date(form?.end_date);
      const endTime = new Date(form?.start_date);
      startTime.getHours(0, 0, 0, 0);
      endTime.getHours(0, 0, 0, 0);
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const timeDifference = startTime.getTime() - endTime.getTime();
      const numberOfNights =
        timeDifference == "0"
          ? 0
          : Math.ceil(timeDifference / millisecondsPerDay);
      setDaysCount(numberOfNights ? Number(numberOfNights + 1) : 1);
    }
  }, [form?.start_date, form?.end_date]);

  const submitToServer = useCallback(() => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        let req = serviceLeaveCreate;
        const fd = new FormData();
        let reqParam =
          form?.type === "OCCASION_LEAVE"
            ? OccasionKey
            : form?.type === "BEREAVEMENT_LEAVE"
              ? Bereavement
              : form?.type === "FACILITATION_LEAVE"
                ? Facilitation
                : Paternity;
        reqParam?.forEach((key) => {
          fd.append(key, form[key]);
        });
        if (form?.type !== "OCCASION_LEAVE") {
          fd.append("duration", "FULL_DAY");
          fd.append("duration_days", daysCount);
        }
        if (form?.document) {
          fd.append("document", form?.document);
        }
        req(fd).then((res) => {
          if (!res.error) {
            SnackbarUtils.success("Submitted SuccessFully");
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
  }, [form, isSubmitting, setIsSubmitting, daysCount, setDaysCount]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, daysCount, setDaysCount]);

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
      if (fieldName === "duration") {
        if (text === "HALF_DAY") {
          t["duration_days"] = 0.5;
        } else {
          t["duration_days"] = 1;
        }
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
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

  const handleDelete = useCallback(() => { }, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  let eventTypeData = form?.event_type

  useEffect(() => {
    if (form?.type === "PATERNITY_LEAVE") {
      dispatch(actionLeaveCount({
        "leave_type": "PATERNITY_LEAVE",
        "event_type": form?.event_type
      }))
    }
    else if (form?.type === "OCCASION_LEAVE") {
      dispatch(actionLeaveCount({
        "leave_type": "OCCASION_LEAVE"
      }))
    }
    else if (form?.type === "BEREAVEMENT_LEAVE") {
      dispatch(actionLeaveCount({
        "leave_type": "BEREAVEMENT_LEAVE"
      }))
    }
    else if(form?.type === "FACILITATION_LEAVE") {
      dispatch(actionLeaveCount({
        "leave_type": "FACILITATION_LEAVE"
      }))
    }
    setLeaveCount(count?.data?.pending_leave)
  }, [form?.type])



  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    id,
    leaveType,
    setLeaveType,
    daysCount,
    leaveCount,
  };
};

export default useLeaveApplication;
