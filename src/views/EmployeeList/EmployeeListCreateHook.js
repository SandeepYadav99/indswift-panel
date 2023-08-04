import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  isAadhar,
  isAccountNum,
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  IsIFSCCode,
  isNum,
  isSpace,
} from "../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../services/Common.service";
import {
  serviceCheckEmployeeExists,
  serviceGetEmployeeConversionInfo,
  serviceGetEmployeeEditInfo,
  serviceGetSalaryInfoInfo,
} from "../../services/Employee.service";
import useDebounce from "../../hooks/DebounceHook";
import { useMemo } from "react";
import { serviceCreateEmployees } from "../../services/EmployeesCreate.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import debounce from 'lodash.debounce';

const SALARY_KEYS = [
  "basic_salary",
  "hra",
  "education_allowance",
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
  "deduction_vpf_pct",
  "gross_component",
  'deputation_allowance',
  'nps_part_e'
];

const BOOLEAN_KEYS = [
  "is_pug",
  "is_pug_manual",
  "is_helper",
  "is_helper_manual",
  "is_food_coupons",
  "is_food_coupons_manual",
  "is_gift_coupons",
  "is_lta",
  "is_super_annuation",
  "is_nps",
  "is_em_pf",
  "is_deduction_vpf",
  "is_car_component_manual",
  "is_em_esi"
];

function EmployeeListCreateHook({ location }) {
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
    spouse_dob: "",
    spouse_gender: "",
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
    previous_organisation: "",
    uan_no: "",
    esi_no: "",
    father_state: "ALIVE",
    father_dob: "",
    father_dod: "",
    mother_dob: "",
    mother_state: "ALIVE",
    mother_dod: "",
    is_transport_facility: "notavailed",
    basic_salary: 0,
    hra: 0,
    education_allowance: 0,
    // medical_allowance: 0,
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
    // driver_incentive: 0,
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
    // associate: 0,
    stability_incentive: 0,
    next_review_date: "",
    previous_review_date: "",
    is_address_same: false,
    is_pug: "NO",
    is_pug_manual: "NO",
    is_helper: "NO",
    is_helper_manual: "NO",
    is_food_coupons: "NO",
    is_food_coupons_manual: "NO",
    is_gift_coupons: "NO",
    is_lta: "NO",
    is_super_annuation: "NO",
    is_nps: "NO",
    is_em_pf: "NO",
    is_deduction_vpf: "NO",
    is_car_component_manual:"NO",
    is_em_esi:"NO",
    deduction_vpf_pct: 0,
    gross_component:0,
    deputation_allowance:0,
    nps_part_e:0
  };

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isDialog, setIsDialog] = useState(false);
  const [salaryInfo, setSalaryInfo] = useState([
    ...SALARY_KEYS,
    ...BOOLEAN_KEYS,
  ]);
  const { id } = useParams();
  const includeRef = useRef(null);
  const [defaultImg, setDefaultImg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remotePath, setRemotePath] = useState("");
  const codeDebouncer = useDebounce(form?.emp_code, 500);
  const ChildenRef = useRef(null);
  const candidateId = location?.state?.empId;
  const empFlag = location?.state?.isOnboard;
  const traineeId = location?.state?.traineeId;
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
  console.log("form", form);
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

  const toggleConfirmDialog = useCallback((type) => {
    setIsDialog(e => !e);
}, [setIsDialog]);

  useEffect(() => {
    if (listData?.EMPLOYEES?.length > 0 && (candidateId || traineeId)) {
      let req;
      if (candidateId) {
        req = serviceGetEmployeeConversionInfo({ candidate_id: candidateId });
      } else if (traineeId) {
        req = serviceGetEmployeeEditInfo({ emp_id: traineeId });
      }
      req.then((res) => {
        const empData = res?.data;
        setDefaultImg(empData?.image);
        setRemotePath(empData?.remote_image_path);
        if (!candidateId) {
          const { children } = empData;
          ChildenRef?.current?.setData(children);
          const hodIndex = listData?.EMPLOYEES.findIndex(
            (val) => val.id === empData?.hod_id
          );
          if (hodIndex >= 0) {
            empData.hod_id = listData?.EMPLOYEES[hodIndex];
          }
          const pmsIndex = listData?.EMPLOYEES.findIndex(
            (val) => val.id === empData?.pms_reviewer_id
          );
          if (pmsIndex >= 0) {
            empData.pms_reviewer_id = listData?.EMPLOYEES[pmsIndex];
          }
          const jobRoleIndex = listData?.JOB_ROLES.findIndex(
            (val) => val.id === empData?.job_role_id
          );
          if (jobRoleIndex >= 0) {
            empData.job_role_id = listData?.JOB_ROLES[jobRoleIndex];
          }

          const designationIndex = listData?.DESIGNATIONS.findIndex(
            (val) => val.id === empData?.designation_id
          );
          if (designationIndex >= 0) {
            empData.designation_id = listData?.DESIGNATIONS[designationIndex];
          }
          const data = { image: "" };
          Object.keys({ ...empData }).forEach((key) => {
            if (key in initialForm && key !== "image") {
              if (key === "state") {
                data[key] = empData[key].toUpperCase();
              } else {
                data[key] = empData[key];
              }
            }
          });
          setForm({ ...initialForm, ...data });
        } else {
          const { salary } = empData;
          Object.keys(salary).forEach((key) => {
            salary[key] /= 12;
          });
          const designationIndex = listData?.DESIGNATIONS.findIndex(
            (val) => val.id === empData?.designation?.id
          );
          if (designationIndex >= 0) {
            empData.designation_id = listData?.DESIGNATIONS[designationIndex];
          }
          const data = { image: "" };
          Object.keys({ ...initialForm }).forEach((key) => {
            if (key in initialForm && key !== "image") {
              if (key === "location_id") {
                data[key] = empData["location"]?.id;
              } else if (key === "grade_id") {
                data[key] = empData["grade"]?.id;
              } else if (key === "department_id") {
                data[key] = empData["department"]?.id;
              } else if (key === "sub_department_id") {
                data[key] = empData["sub_department"]?.id;
              } else if (key === "cadre_id") {
                data[key] = empData["cadre"]?.id;
              } else if (key === "state") {
                data[key] = empData[key]?.toUpperCase();
              } else if (key === "current_address") {
                data[key] = empData["correspondence_address"];
              } else if (key === "previous_organisation") {
                if(empData?.employment_history?.length > 0){
                  data[key] = empData["employment_history"][0]?.organisation_name;
                } 
              } else {
                data[key] = empData[key];
              }
            }
          });
          setForm({ ...initialForm, ...data, ...salary });
        }
      });
    }
  }, [candidateId, traineeId, listData]);

  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e) => {checkForSalaryInfo(e)}, 1000);
      }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "emp_code",
      "name",
      "doj",
      "grade_id",
      "cadre_id",
      "location_id",
      "department_id",
      "sub_department_id",
      "designation_id",
      "hod_id",
      "pms_reviewer_id",
      "gender",
      "dob",
      // "associate",
      "state",
      "blood_group",
      "personal_contact",
      "martial_status",
      "father_name",
      "mother_name",
      "permanent_address",
      "current_address",
      "pan_no",
      "aadhar_no",
      "before_experience",
      "previous_organisation",
      "uan_no",
      "father_state",
      "father_dob",
      "mother_dob",
      "mother_state",
      // "esi_no",
      // ...SALARY_KEYS,
    ];
    if (!candidateId) {
      required.push(...SALARY_KEYS);
    }
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      } else if (["emp_code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    // if (!candidateId) {
    //   SALARY_KEYS.forEach((val) => {
    //     if (form?.[val] && form?.[val] < 0 && !isNum(form?.[val])) {
    //       errors[val] = true;
    //     }
    //   });
    // }
    if (form?.official_email && !isEmail(form?.official_email)) {
      errors["official_email"] = true;
    }
    if (form?.personal_email && !isEmail(form?.personal_email)) {
      errors["personal_email"] = true;
    }
    if (
      form?.personal_contact &&
      (!isNum(form?.personal_contact) || form?.personal_contact?.length !== 10)
    ) {
      errors["personal_contact"] = true;
    }
    if (
      form?.official_contact &&
      (!isNum(form?.official_contact) || form?.official_contact?.length !== 10)
    ) {
      errors["official_contact"] = true;
    }
    if (form?.aadhar_no && !isAadhar(form?.aadhar_no)) {
      errors["aadhar_no"] = true;
    }
    if (form?.bank_account_no && !isAccountNum(form?.bank_account_no)) {
      errors["bank_account_no"] = true;
    }
    if (form?.ifsc && !IsIFSCCode(form?.ifsc)) {
      errors["ifsc"] = true;
    }
    if (form?.father_state) {
      if (form?.father_state === "EXPIRED" && !form?.father_dod) {
        errors["father_dod"] = true;
      } else if (form?.father_state === "ALIVE") {
        delete errors["father_dod"];
      }
    }
    if (form?.mother_state) {
      if (form?.mother_state === "EXPIRED" && !form?.mother_dod) {
        errors["mother_dod"] = true;
      } else if (form?.mother_state === "ALIVE") {
        delete errors["mother_dod"];
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
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

  const checkForSalaryInfo = (data) => {
    if (data?.grade_id) {
      let filteredForm = {};
      for (let key in data) {
        if (salaryInfo.includes(key)) {
          if (BOOLEAN_KEYS.includes(key)) {
            if (data[key] === "YES") {
              filteredForm[key] = true;
            } else if (data[key] === "NO") {
              filteredForm[key] = false;
            }
          } else {
            filteredForm[key] = parseInt(data[key]);
          }
        }
      }
      let req = serviceGetSalaryInfoInfo({
        grade_id: data?.grade_id,
        ...filteredForm,
      });
      req.then((res) => {
        const salaryData = res.data;
        const booleanData = {};
        for (const key in salaryData) {
          if (salaryData.hasOwnProperty(key)) {
            let value = salaryData[key];
            if (BOOLEAN_KEYS.includes(key)) {
              value = value ? "YES" : "NO";
            }
            booleanData[key] = value;
          }
        }
        setForm({ ...data, ...booleanData });
      });
    } else {
      SnackbarUtils.error("Please Select the Grade");
    }
  };

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
      } else if (SALARY_KEYS.indexOf(fieldName) >= 0) {
        if (!text || isNum(text)) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);

      if ([...salaryInfo,'grade_id']?.includes(fieldName)) {
        checkSalaryInfoDebouncer(t);
      }
    }, [removeError, form, setForm, checkSalaryInfoDebouncer]);

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
        changeTextData(form?.[type], type);
      }
    },
    [changeTextData, checkCodeValidation]
  );
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        LogUtils.log("key", key);
        if (
          [
            "hod_id",
            "pms_reviewer_id",
            "designation_id",
            "job_role_id",
            "associate",
          ].indexOf(key) >= 0 &&
          form[key]
        ) {
          fd.append(key, form[key]?.id);
        } else if (key === "is_transport_facility") {
          fd.append("is_transport_facility", form[key] === "availed");
        } else if (BOOLEAN_KEYS.includes(key)){
          fd.append(key,form[key] === 'YES')
        }
         else if (form[key]) {
          fd.append(key, form[key]);
        }
      });
      if (remotePath?.length > 0) {
        fd.append("remote_image_path", remotePath);
      }
      fd.append("children", JSON.stringify(ChildenRef.current.getData()));
      fd.append("nominee", JSON.stringify([]));
      candidateId && fd.append("candidate_id", candidateId);
      traineeId && fd.append("trainee_id", traineeId);
      serviceCreateEmployees(fd).then((res) => {
        if (!res.error) {
          historyUtils.push("/employees");
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, candidateId, traineeId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = ChildenRef.current.isValid();
    LogUtils.log("errors==>", errors);
    if (Object.keys(errors)?.length > 0 || !isIncludesValid) {
      setErrorData(errors);
      return true;
    }
    [
      "children",
      "nominee",
      "createdAt",
      "status",
      "qualifications",
      "_id",
    ].forEach((item) => {
      delete form[item];
    });
    toggleConfirmDialog()
    // submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
    empFlag,
    defaultImg,
    toggleConfirmDialog,
    isDialog,
    submitToServer
  };
}

export default EmployeeListCreateHook;


//USC create Hook