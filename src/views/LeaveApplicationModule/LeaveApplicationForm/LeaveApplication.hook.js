import { useState, useRef, useCallback, useEffect } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router-dom";
import { serviceLeaveCreate } from "../../../services/Leave.service";
import { actionLeaveCount } from "../../../actions/LeaveModule.action";
import { useDispatch, useSelector } from "react-redux";
import useClaimIntCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimIntCard/ClaimIntCard.hook";
import historyUtils from "../../../libs/history.utils";
import { useMemo } from "react";

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
  document: "",
};
const OccasionKey = [
  "type",
  // "duration",
  "duration_days",
  "comment",
  "event_type",
  // "start_date",
];

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
  const [alphabet, setAlphabet] = useState();
  const [monthhook, setMonthhook] = useState();
  const [leaveCount, setLeaveCount] = useState();
  const [bdayYear, setBdayYear] = useState("");
  const [bdayNext, setBdayNext] = useState("");
  const [anniYear, setAnniYear] = useState("");
  const [anniNext, setAnniNext] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();

  const { employeeDetails } = useClaimIntCard({});

  const { count } = useSelector((state) => state.LeaveModule);

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
      let required = ["deceased_relationship", "start_date", "end_date"];
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
      let required = ["event_type", "child", "start_date", "end_date"];
      required.forEach((val) => {
        if (
          !form?.[val] ||
          (Array.isArray(form?.[val]) && form?.[val].length === 0)
        ) {
          errors[val] = true;
        }
      });
    }
    if (
      form?.start_date &&
      form?.end_date &&
      Number(daysCount) <= 0 &&
      form?.type !== "OCCASION_LEAVE"
    ) {
      errors["dayscount"] = true;
      SnackbarUtils.error("Start date cannot be greater than end date");
    } else {
      delete errors["dayscount"];
    }
    if (Number(daysCount) > Number(count?.data?.pending_leave)) {
      errors["duration_days"] = true;
      SnackbarUtils.error(
        "Applied Leave cannot be greater than Pending Leaves"
      );
    } else {
      delete errors["duration_days"];
    }
    if (
      Number(count?.data?.pending_leave) <= 0 &&
      form?.type === "OCCASION_LEAVE"
    ) {
      errors["duration_days"] = true;
      SnackbarUtils.error("No Leaves Pending ");
    }
    if (
      Number(count?.data?.pending_leave) < Number(form?.duration_days) &&
      form?.type === "OCCASION_LEAVE"
    ) {
      errors["duration_days"] = true;
      SnackbarUtils.error(
        "Applied Leave cannot be greater than Pending Leaves"
      );
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData, daysCount, setDaysCount]);

  useEffect(() => {
    if (form?.type) {
      const type = form?.type;
      setErrorData({});
      setForm({ ...initialForm, type: type });
      setDaysCount(0);
    }
  }, [form?.type]);

  const MonthConvertor = () => {
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Jan"
    ) {
      setAlphabet("1");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Feb"
    ) {
      setAlphabet("2");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Mar"
    ) {
      setAlphabet("3");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Apr"
    ) {
      setAlphabet("4");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "May"
    ) {
      setAlphabet("5");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Jun"
    ) {
      setAlphabet("6");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Jul"
    ) {
      setAlphabet("7");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Aug"
    ) {
      setAlphabet("8");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Sep"
    ) {
      setAlphabet("9");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Oct"
    ) {
      setAlphabet("10");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Nov"
    ) {
      setAlphabet("11");
    }
    if (
      employeeDetails?.dob?.slice(startPointBday + 1, endPointBday) === "Dec"
    ) {
      setAlphabet("12");
    }
  };

  const AnniversaryConvertor = () => {
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Jan"
    ) {
      setMonthhook("1");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Feb"
    ) {
      setMonthhook("2");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Mar"
    ) {
      setMonthhook("3");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Apr"
    ) {
      setMonthhook("4");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "May"
    ) {
      setMonthhook("5");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Jun"
    ) {
      setMonthhook("6");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Jul"
    ) {
      setMonthhook("7");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Aug"
    ) {
      setMonthhook("8");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Sep"
    ) {
      setMonthhook("9");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Oct"
    ) {
      setMonthhook("10");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Nov"
    ) {
      setMonthhook("11");
    }
    if (
      employeeDetails?.dom?.slice(startPointAnni + 1, endPointAnni) === "Dec"
    ) {
      setMonthhook("12");
    }
  };

  const date = new Date();
  const CurrentMonth = date?.getMonth() + 1;
  const CurrentYear = date?.getFullYear();
  const nextYear = date?.getFullYear() + 1;

  let startPointBday = employeeDetails?.dob?.indexOf("/");
  let endPointBday = employeeDetails?.dob?.lastIndexOf("/");
  let valueMonth = employeeDetails?.dob?.slice(
    startPointBday + 1,
    endPointBday
  );
  let valueDays = employeeDetails?.dob?.slice(0, startPointBday);
  const BdayLeaveNextYear = valueDays + "/" + valueMonth + "/" + nextYear;
  const BdayLeaveThisYear = valueDays + "/" + valueMonth + "/" + CurrentYear;

  let startPointAnni = employeeDetails?.dom?.indexOf("/");
  let endPointAnni = employeeDetails?.dom?.lastIndexOf("/");
  let valueMonthAnni = employeeDetails?.dom?.slice(
    startPointAnni + 1,
    endPointAnni
  );
  let valueDaysAnni = employeeDetails?.dom?.slice(0, startPointAnni);
  const BdayLeaveNextYearAnni =
    valueDaysAnni + "/" + valueMonthAnni + "/" + nextYear;
  const BdayLeaveThisYearAnni =
    valueDaysAnni + "/" + valueMonthAnni + "/" + CurrentYear;

  useEffect(() => {
    MonthConvertor();
    AnniversaryConvertor();
    setBdayYear(BdayLeaveThisYear);
    setBdayNext(BdayLeaveNextYear);
    setAnniYear(BdayLeaveThisYearAnni);
    setAnniNext(BdayLeaveNextYearAnni);
  });

  const formatDate = (inputDate) => {
    const formattedDate = new Date(inputDate);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return formattedDate.toLocaleString("en-US", options);
  };
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

  function get30DaysAgoDate() {
    const currentDate = new Date();
    const thirtyDaysAgoDate = new Date(currentDate);
    thirtyDaysAgoDate.setDate(currentDate.getDate() - 30);

    return thirtyDaysAgoDate;
  }
  const currentDate = useMemo(() => new Date(), []); // Memoize the current date
  const thirtyDaysAgoDate = useMemo(() => get30DaysAgoDate(currentDate), [currentDate]);

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
      if (form?.type === "OCCASION_LEAVE") {
        if (form?.event_type === "BIRTHDAY") {
          if (Number(alphabet) < Number(CurrentMonth)) {
            fd.append("start_date", formatDate(bdayNext));
          } else {
            fd.append("start_date", formatDate(bdayYear));
          }
        } else {
          if (Number(alphabet) < Number(CurrentMonth)) {
            fd.append("start_date", formatDate(anniNext));
          } else {
            fd.append("start_date", formatDate(anniYear));
          }
        }
        form?.duration_days === 1
          ? fd.append("duration", "FULL_DAY")
          : fd.append("duration", "HALF_DAY");
      }
      if (form?.document) {
        fd.append("document", form?.document);
      }
      req(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Submitted SuccessFully");
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
    daysCount,
    setDaysCount,
    bdayYear,
    bdayNext,
    anniYear,
    anniNext,
    setBdayYear,
    setBdayNext,
    setAnniYear,
    setAnniNext,
    valueDaysAnni,
    valueMonthAnni,
    valueDays,
    valueMonth,
  ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
    daysCount,
    setDaysCount,
    bdayYear,
    bdayNext,
    anniYear,
    anniNext,
    setBdayYear,
    setBdayNext,
    setAnniYear,
    setAnniNext,
    valueDaysAnni,
    valueMonthAnni,
    valueDays,
    valueMonth,
    daysCount,
    setDaysCount,
  ]);

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

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  let eventTypeData = form?.event_type;

  useEffect(() => {
    if (form?.type === "PATERNITY_LEAVE") {
      dispatch(
        actionLeaveCount({
          leave_type: "PATERNITY_LEAVE",
          event_type: eventTypeData,
        })
      );
    } else if (form?.type === "OCCASION_LEAVE") {
      dispatch(
        actionLeaveCount({
          leave_type: "OCCASION_LEAVE",
        })
      );
    } else if (form?.type === "BEREAVEMENT_LEAVE") {
      dispatch(
        actionLeaveCount({
          leave_type: "BEREAVEMENT_LEAVE",
        })
      );
    } else if (form?.type === "FACILITATION_LEAVE") {
      dispatch(
        actionLeaveCount({
          leave_type: "FACILITATION_LEAVE",
        })
      );
    }
    setLeaveCount(count?.data?.pending_leave);
    MonthConvertor();
    AnniversaryConvertor();
  }, [form?.type, form?.event_type]);

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
    BdayLeaveThisYear,
    BdayLeaveNextYear,
    BdayLeaveNextYearAnni,
    BdayLeaveThisYearAnni,
    CurrentMonth,
    alphabet,
    thirtyDaysAgoDate
  };
};

export default useLeaveApplication;
