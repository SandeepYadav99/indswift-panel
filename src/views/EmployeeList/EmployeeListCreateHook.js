import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  isAadhar,
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../services/Common.service";
import { serviceCheckEmployeeExists } from "../../services/Employee.service";
import useDebounce from "../../hooks/DebounceHook";
import { useMemo } from "react";

function EmployeeListCreateHook() {
  const initialForm = {
    emp_code: "",
    image: "",
    name: "",
    doj: "",
    designation_id: "",
    grade_id: "",
    cadre_id: "",
    location_id: "",
    department_id: "",
    sub_department_id: "",
    hod_id: "",
    pms_reviewer_id: "",
    gender: "",
    dob: "",
    state: "",
    blood_group: "",
    official_contact: "",
    personal_contact: "",
    official_email: "",
    personal_email: "",
    higher_education: "",
    martial_status: "",
    dom: "",
    father_name: "",
    mother_name: "",
    spouse_name: "",
    children_name: "",
    permanent_address: "",
    current_address: "",
    pan_no: "",
    aadhar_no: "",
    bank_account_name: "",
    bank_account_no: "",
    bank_name: "",
    ifsc: "",
    before_experience: "",
    company_experience: "",
    total_experience: "",
    previous_organisation: "",
    uan_no: "",
    esi_no: "",
    basic_salary: "",
    hra: "",
    education_allowance: "",
    medical_allowance: "",
    special_allowance: "",
    earning_one: "",
    pug: "",
    helper: "",
    food_coupons: "",
    gift_coupons: "",
    lta: "",
    super_annuation: "",
    nps: "",
    vehicle_maintenance: "",
    vehicle_emi: "",
    fuel: "",
    vpf: "",
    earning_two: "",
    gross: "",
    earning_three_pli: "",
    er_pf: "",
    er_esi: "",
    er_lwf: "",
    earning_four: "",
    gratuity: "",
    insurance: "",
    driver_incentive: "",
    perf_bonus: "",
    annual_bonus: "",
    two_car_maintenance: "",
    two_fuel: "",
    earning_five: "",
    monthly_ctc: "",
    em_pf: "",
    em_esi: "",
    em_lwf: "",
    total_deduction: "",
    total_pf: "",
    retention_allowance: "",
    car_component: "",
    incremental_gross_salary: "",
    earning2_vpf: "",
    deduction_vpf: "",
    stability_incentive: "",
    is_address_same: false,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const includeRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeDebouncer = useDebounce(form?.emp_code, 500);
  const [listData, setListData] = useState({
    LOCATION_DEPARTMENTS: [],
    EMPLOYEES: [],
    DEPARTMENTS: [],
    SUB_DEPARTMENTS: [],
    JOB_ROLES: [],
    HR: [],
    DESIGNATIONS: [],
    LEVEL: [],
    GRADES: [],
    CADRES: [],
  });
  const [label, setLabel] = useState("");

  useEffect(() => {
    serviceGetList([
      "LOCATION_DEPARTMENTS",
      "EMPLOYEES",
      "DEPARTMENTS",
      "HR",
      "SUB_DEPARTMENTS",
      "JOB_ROLES",
      "DESIGNATIONS",
      "GRADES",
      "CADRES",
      "LEVEL",
    ]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    console.log("><><><", form);
    let required = [
      "emp_code",
      "image",
      "name",
      "doj",
      // "designation_id",
      "grade_id",
      "cadre_id",
      "location_id",
      "department_id",
      "sub_department_id",
      "hod_id",
      "pms_reviewer_id",
      "gender",
      "dob",
      "state",
      "blood_group",
      "official_contact",
      "personal_contact",
      "official_email",
      "personal_email",
      // "higher_education",
      "martial_status",
      "dom",
      "father_name",
      "mother_name",
      "spouse_name",
      "children_name",
      "permanent_address",
      "current_address",
      "pan_no",
      "aadhar_no",
      // "bank_account_name",
      "bank_account_no",
      "bank_name",
      "ifsc",
      "before_experience",
      // "company_experience",
      "total_experience",
      "previous_organisation",
      "uan_no",
      "esi_no",
      "basic_salary",
      "hra",
      "education_allowance",
      "medical_allowance",
      "special_allowance",
      "earning_one",
      "pug",
      "helper",
      "food_coupons",
      "gift_coupons",
      "lta",
      "super_annuation",
      "nps",
      "vehicle_maintenance",
      "vehicle_emi",
      "fuel",
      "vpf",
      "earning_two",
      "gross",
      "earning_three_pli",
      "er_pf",
      "er_esi",
      "er_lwf",
      "earning_four",
      "gratuity",
      "insurance",
      // "driver_incentive",
      "perf_bonus",
      "annual_bonus",
      "two_car_maintenance",
      "two_fuel",
      "earning_five",
      "monthly_ctc",
      "em_pf",
      "em_esi",
      "em_lwf",
      "total_deduction",
      "total_pf",
      "retention_allowance",
      "car_component",
      "incremental_gross_salary",
      "earning2_vpf",
      "deduction_vpf",
      "stability_incentive",
    ];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["emp_code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.official_email && !isEmail(form?.official_email)) {
      errors["official_email"] = true;
    }
    if (form?.personal_email && !isEmail(form?.personal_email)) {
      errors["personal_email"] = true;
    }

    if (form?.aadhar_no && !isAadhar(form?.aadhar_no)) {
      errors["aadhar_no"] = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    console.log("===?", errors);
    return errors;
  }, [form, errorData]);
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
      if (fieldName === "name" || fieldName === "address") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "city") {
        if (!text || (isAlpha(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "emp_code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else if (fieldName === "pincode") {
        if (!text || isNum(text)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "is_address_same") {
        if (text) {
          t.correspondence_address = t?.permanent_address;
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
  const checkCodeValidation = useCallback(() => {
    if (form?.emp_code) {
      serviceCheckEmployeeExists({
        code: form?.emp_code,
        id: id ? id : null,
      }).then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["emp_code"] = "Employee Code Exists";
            setErrorData(errors);
          } else {
            delete errors.emp_code;
            setErrorData(errors);
          }
        }
      });
    }
  }, [errorData, setErrorData, form.emp_code, id]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, checkCodeValidation]
  );
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      // serviceCreateJobOpenings({
      //     ...form,
      //     assigned_to: form?.assigned_to?.id,
      //     job_role_id: form?.job_role?.id,
      //     designation_id: form?.designation?.id,
      //     replace_id: form?.replacing_person?.id,
      // }).then((res) => {
      //     LogUtils.log('response', res);
      //     if (!res.error) {
      //         historyUtils.push(RouteName.JOB_OPENINGS);
      //     } else {
      //         SnackbarUtils.error(res?.error);
      //     }
      //     setIsSubmitting(false);
      // });
    }
  }, [form, isSubmitting, setIsSubmitting]);
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
    // includeRef.current
  ]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);
  const filteredDepartments = useMemo(() => {
    const locations = listData?.LOCATION_DEPARTMENTS;
    const index = locations.findIndex((l) => l.id === form?.location_id);
    if (index >= 0) {
      const departments = locations[index]?.departments;
      return listData?.DEPARTMENTS?.filter(
        (val) => departments.indexOf(val.id) >= 0
      );
    }
    return [];
  }, [listData, form?.location_id]);

  const filteredSubDepartments = useMemo(() => {
    return listData?.SUB_DEPARTMENTS?.filter(
      (val) => val.department_id === form?.department_id
    );
  }, [listData, form?.department_id]);
  const filteredCadres = useMemo(() => {
    return listData?.CADRES?.filter((val) => val.grade_id === form?.grade_id);
  }, [listData, form?.grade_id]);
  const filteredEmployees = useMemo(() => {
    return listData.EMPLOYEES.filter((val) => {
      return (
        val.department_id === form?.department_id &&
        val.location_id === form?.location_id
      );
    });
  }, [form?.location_id, form?.department_id, listData]);
  const getLevelValues = useMemo(() => {
    return listData.GRADES.filter((value) => {
      console.log("hi", value);
      return;
    });
  });
  console.log("====>", getLevelValues);
  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    filteredDepartments,
    filteredSubDepartments,
    filteredEmployees,
    filteredCadres,
    label,
  };
}

export default EmployeeListCreateHook;
