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
import { serviceCreateEmployees } from "../../services/EmployeesCreate.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";

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
    designation_id:"",
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
    spouse_dob: "",
    spouse_gender:"",
    // children_name: "abc",
    permanent_address: "",
    current_address: "",
    pan_no: "",
    aadhar_no: "",
    bank_account_name: "",
    bank_account_no: "",
    bank_name: "",
    ifsc: "",
    before_experience: 0,
    company_experience: 0,
    total_experience: 0,
    previous_organisation: 0,
    uan_no: "",
    esi_no: "",
    basic_salary: 0,
    hra: 0,
    education_allowance: 0,
    medical_allowance: 0,
    special_allowance: 0,
    earning_one: 0,
    pug: 0,
    helper: 0,
    food_coupons: 0,
    gift_coupons: 0,
    lta: 0,
    super_annuation: 0,
    nps: 0,
    vehicle_maintenance: 0,
    vehicle_emi: 0,
    fuel: 0,
    vpf: 0,
    earning_two: 0,
    gross: 0,
    earning_three_pli: 0,
    er_pf: 0,
    er_esi: 0,
    er_lwf: 0,
    earning_four: 0,
    gratuity: 0,
    insurance: 0,
    driver_incentive: 0,
    perf_bonus: 0,
    annual_bonus: 0,
    two_car_maintenance: 0,
    two_fuel: 0,
    earning_five: 0,
    monthly_ctc: 0,
    em_pf: 0,
    em_esi: 0,
    em_lwf: 0,
    total_deduction: 0,
    total_pf: 0,
    retention_allowance: 0,
    car_component: 0,
    incremental_gross_salary: 0,
    earning2_vpf: 0,
    deduction_vpf: 0,
    associate: 0,
    stability_incentive: 0,
    next_review_date: "",
    previous_review_date: "",
    is_address_same: false,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const includeRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeDebouncer = useDebounce(form?.emp_code, 500);
  const ChildenRef = useRef(null);

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
      'spouse_gender',
      "location_id",
      "department_id",
      "sub_department_id",
      'designation_id',
      "hod_id",
      "pms_reviewer_id",
      "next_review_date",
      "previous_review_date",
      "gender",
      "dob",
      "associate",
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
      "spouse_dob",
      // "children_name",
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
      // "total_experience",
      "previous_organisation",
      "uan_no",
      "esi_no",
      "basic_salary",
      "hra",
      "education_allowance",
      // "medical_allowance",
      "special_allowance",
      // "earning_one",
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
      // "vpf",
      // "earning_two",
      // "gross",
      // "earning_three_pli",
      "er_pf",
      "er_esi",
      "er_lwf",
      // "earning_four",
      "gratuity",
      "insurance",
      // "driver_incentive",
      "perf_bonus",
      "annual_bonus",
      "two_car_maintenance",
      "two_fuel",
      // "earning_five",
      // "monthly_ctc",
      "em_pf",
      "em_esi",
      "em_lwf",
      // "total_deduction",
      // "total_pf",
      "retention_allowance",
      "car_component",
      "incremental_gross_salary",
      // "earning2_vpf",
      "deduction_vpf",
      "stability_incentive",
    ];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
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
          t.current_address = t?.permanent_address;
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
    console.log("before ====?",form);
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        LogUtils.log('key', key);
        if (['hod_id', 'pms_reviewer_id', 'designation_id', 'job_role_id'].indexOf(key) >= 0 && form[key]) {
          
          fd.append(key, form[key]?.id);
        } else if (form[key]) {
          fd.append(key, form[key]);
        }
      });
      fd.append("children", JSON.stringify(ChildenRef.current.getData()));

      console.log("Api hit", fd);
      serviceCreateEmployees(fd).then((res) => {
        if (!res.error) {
          historyUtils.push("/employees");
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);
  const handleSubmit = useCallback(async () => {
    console.log("before validatin");
    const errors = checkFormValidation();
    console.log("1");
    const isIncludesValid = ChildenRef.current.isValid();
    console.log("2 ===>", isIncludesValid);
    if (Object.keys(errors)?.length > 0 || !isIncludesValid) {
      // || !isIncludesValid
      setErrorData(errors);
      return true;
    }
    console.log("4");
    if (isIncludesValid) {
      submitToServer();
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    submitToServer
    // includeRef.current
  ]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);
  const filteredDepartments = useMemo(() => {
    const locations = listData?.LOCATION_DEPARTMENTS;
    const index = locations?.findIndex((l) => l.id === form?.location_id);
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

  const getLevelValues = useMemo(() => {
    const index = listData?.GRADES?.findIndex(
      (value) => value.id === form.grade_id
    );
    return index >= 0 ? listData.GRADES[index]?.name : " ";
  }, [listData, form?.grade_id]);
  const filteredEmployees = useMemo(() => {
    return listData?.EMPLOYEES?.filter((val) => {
      return (
        val.department_id === form?.department_id &&
        val.location_id === form?.location_id
      );
    });
  }, [form?.location_id, form?.department_id, listData]);
 
  const filteredAssociateJobRole = useMemo(() => {
    return listData.JOB_ROLES?.filter((val) => {
      return (
        val.department_id === form?.department_id &&
        val.location_id === form?.location_id
      );
    });
  }, [form?.location_id, form?.department_id, listData]);
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
    getLevelValues,
    filteredAssociateJobRole,
    ChildenRef,
  };
}

export default EmployeeListCreateHook;
