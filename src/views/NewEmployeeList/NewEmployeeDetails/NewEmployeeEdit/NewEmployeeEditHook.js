import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  isAadhar,
  isAccountNum,
  isAlpha,
  isAlphaNumChars,
  isDate,
  isEmail,
  IsIFSCCode,
  isNum,
  isSpace,
} from "../../../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../../services/Common.service";
import {
  serviceCheckEmployeeExists,
  serviceGetSalaryInfoInfo,
} from "../../../../services/Employee.service";
import useDebounce from "../../../../hooks/DebounceHook";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import historyUtils from "../../../../libs/history.utils";
import LogUtils from "../../../../libs/LogUtils";
import { serviceEditEmployeeVersion } from "../../../../services/EmployeeEdit.service";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import Constants from "../../../../config/constants";
import RolesUtils from "../../../../libs/Roles.utils";
import {
  serviceGetNewEmployeeApproveFD,
  serviceGetNewEmployeeDetails,
} from "../../../../services/NewEmployeeList.service";
import RouteName from "../../../../routes/Route.name";
import { serviceGetPendingEmployeeSalaryInfo } from "../../../../services/employeeSalaryInfo.service";

const SALARY_KEYS = [
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
  "driver_incentive",
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
  "nps_part_e",
  "deputation_allowance",
];

const BOOLEAN_KEYS = [
  "is_pug",
  "is_two_car_maintenance_manual",
  "is_two_fuel_manual",
  "is_gratuity_manual",
  "is_er_pf_manual",
  "is_er_esi_manual",
  "is_em_pf_manual",
  "is_em_esi_manual",
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
  "is_basic_salary_manual",
  "is_em_esi",
];

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
  permanent_address: "",
  current_address: "",
  pan_no: "",
  aadhar_no: "",
  bank_account_name: "",
  bank_account_no: "",
  bank_name: "",
  ifsc: "",
  is_transport_facility: "notavailed",
  variant: "",
  rc_number: "",
  father_state: "ALIVE",
  father_dob: "",
  father_dod: "",
  mother_dob: "",
  mother_state: "ALIVE",
  mother_dod: "",
  before_experience: 0,
  company_experience: 0,
  total_experience: 0,
  previous_organisation: "",
  uan_no: 0,
  esi_no: 0,
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
  job_role_id: "",
  stability_incentive: 0,
  next_review_date: "",
  previous_review_date: "",
  is_address_same: false,
  is_pug: "NO",
  is_pug_manual: "NO",
  is_two_car_maintenance_manual: "NO",
  is_two_fuel_manual: "NO",
  is_gratuity_manual: "NO",
  is_er_pf_manual: "NO",
  is_er_esi_manual: "NO",
  is_em_pf_manual: "NO",
  is_em_esi_manual: "NO",
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
  is_car_component_manual: "NO",
  is_basic_salary_manual: "NO",
  is_em_esi: "NO",
  deduction_vpf_pct: 0,
  gross_component: 0,
  deputation_allowance: 0,
  nps_part_e: 0,
};

const DropDownKeys = {
  location_id: "location",
  grade_id: "grade",
  department_id: "department",
  sub_department_id: "sub_department",
  cadre_id: "cadre",
};
const AutoCompKeys = [
  "hod_id",
  "pms_reviewer_id",
  "job_role_id",
  "designation_id",
];
const bankInfo = {
  bank_account_no: "account_no",
  bank_name: "name",
  ifsc: "ifsc",
};

function NewEmployeeEditHook() {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const [isAcceptDialog, setIsAcceptDialog] = useState(false);
  const [SalaryField, setSalaryField] = useState(false);
  const { id } = useParams();
  const changedFields = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);

  const codeDebouncer = useDebounce(form?.emp_code, 500);
  const ChildenRef = useRef(null);
  const [salaryInfo, setSalaryInfo] = useState([
    ...SALARY_KEYS,
    ...BOOLEAN_KEYS,
  ]);
  const { role } = useSelector((state) => state.auth);

  const isCorporateHR = useMemo(() => {
    return RolesUtils.canAccess([Constants.ROLES.CORPORATE_HR], role);
  }, [role]);

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

  useEffect(() => {
    Promise.allSettled([
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
      ]),
      serviceGetNewEmployeeDetails({ emp_id: id }),
      serviceGetPendingEmployeeSalaryInfo({ emp_id: id, index: 1 }),
    ]).then((promises) => {
      const listData = promises[0]?.value?.data;
      const empData = promises[1]?.value?.data;
      const salaryRes = promises[2]?.value?.data;
      listData.EMPLOYEES = listData.EMPLOYEES.filter((emp) => emp.id !== id);
      setListData(listData);
      const updatedSalValue = {};
      SALARY_KEYS?.forEach((key) => {
        updatedSalValue[key] = salaryRes[key];
      });
      const data = { image: "" };
      const hodIndex = listData?.EMPLOYEES.findIndex(
        (val) => val.id === empData?.hod_id
      );
      if (hodIndex >= 0) {
        data.hod_id = listData?.EMPLOYEES[hodIndex];
      }
      const pmsIndex = listData?.EMPLOYEES.findIndex(
        (val) => val.id === empData?.pms_reviewer?.id
      );
      if (pmsIndex >= 0) {
        data.pms_reviewer_id = listData?.EMPLOYEES[pmsIndex];
      }
      const jobRoleIndex = listData?.JOB_ROLES.findIndex(
        (val) => val.id === empData?.job_role_id
      );
      if (jobRoleIndex >= 0) {
        data.job_role_id = listData?.JOB_ROLES[jobRoleIndex];
      }

      const designationIndex = listData?.DESIGNATIONS.findIndex(
        (val) => val.id === empData?.designation_id
      );
      if (designationIndex >= 0) {
        data.designation_id = listData?.DESIGNATIONS[designationIndex];
      }
      Object.keys({ ...initialForm }).forEach((key) => {
        if (
          key in initialForm &&
          ![...SALARY_KEYS, ...AutoCompKeys]?.includes(key) &&
          key !== "image"
        ) {
          if (key === "is_transport_facility") {
            data[key] = empData["is_transport_facility"]
              ? "availed"
              : "notavailed";
          } else if (["rc_number", "variant"]?.includes(key)) {
            data[key] = empData?.vehicle?.[key] || "";
          } else if (Object.keys({ ...DropDownKeys }).includes(key)) {
            data[key] = empData?.[DropDownKeys[key]]?.id || "";
          } else if (Object.keys({ ...bankInfo }).includes(key)) {
            data[key] = empData?.bank?.[bankInfo[key]] || "";
          } else if (BOOLEAN_KEYS.includes(key)) {
            data[key] = empData[key] ? "YES" : "NO";
          } else if (key === "state") {
            data[key] = empData[key]?.toUpperCase();
          } else if (key === "current_address") {
            data[key] = empData?.address?.["current"];
          } else if (key === "permanent_address") {
            data[key] = empData?.address?.["permanent"];
          } else if (key === "previous_organisation") {
            data[key] = empData?.experience?.["previous_organisation"];
          } else if (key === "before_experience") {
            data[key] = empData?.experience?.["before"];
          } else if (key === "previous_review_date") {
            data[key] =
              (empData?.pms_reviewer?.["previous_review_date"] !== "N/A" &&
                empData?.pms_reviewer?.["previous_review_date"]) ||
              null;
          } else if (key === "next_review_date") {
            data[key] =
              (empData?.pms_reviewer?.["next_review_date"] !== "N/A" &&
                empData?.pms_reviewer?.["next_review_date"]) ||
              null;
          } else {
            data[key] = (empData[key] !== "N/A" && empData[key]) || "";
          }
        }
      });
      const IdentityData = empData?.identity_date;
      const contactInfo = empData?.contact;
      const familyInfo = empData?.family;
      setForm({
        ...initialForm,
        ...data,
        ...IdentityData,
        ...contactInfo,
        ...familyInfo,
        ...updatedSalValue,
      });
      setImage(empData?.image ? empData?.image : null);
      setIsLoading(false);
    });
  }, [id]);

  console.log("form", form);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    const required = [
      "name",
      "doj",
      "designation_id",
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
      ...SALARY_KEYS,
    ];
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
    // SALARY_KEYS.forEach((val) => {
    //   if (form?.[val] && form?.[val] < 0) {
    //     errors[val] = true;
    //   }
    // })
    if (form?.official_email && !isEmail(form?.official_email)) {
      errors["official_email"] = true;
    }
    if (form?.personal_email && !isEmail(form?.personal_email)) {
      errors["personal_email"] = true;
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
  }, [form, errorData, SalaryField]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const toggleStatusDialog = useCallback(() => {
    setIsUpdateDialog((e) => !e);
  }, [isUpdateDialog]);

  const toggleAcceptDialog = useCallback(() => {
    setIsAcceptDialog((e) => !e);
  }, [isAcceptDialog]);

  const checkForSalaryInfo = (data) => {
    if (
      data?.grade_id &&
      data?.cadre_id &&
      data?.designation_id?.id &&
      data?.location_id
    ) {
      let filteredForm = { employee_id: id };
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
        cadre_id: data?.cadre_id,
        designation_id: data?.designation_id?.id,
        location_id: data?.location_id,
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
            if (key === "designation_id") {
              const designationIndex = listData?.DESIGNATIONS.findIndex(
                (val) => val.id === value
              );
              if (designationIndex >= 0) {
                booleanData[key] = listData?.DESIGNATIONS[designationIndex];
              }
            } else {
              booleanData[key] = value;
            }
          }
        }
        setForm({ ...data, ...booleanData });
      });
    } else {
      SnackbarUtils.error("Please Select the Grade , Cadre and Designation");
    }
  };

  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e) => {
      checkForSalaryInfo(e);
    }, 1000);
  }, [listData]);

  const changeTextData = useCallback(
    (text, fieldName) => {
      LogUtils.log("changeTextData", text, fieldName);
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
      } else if (fieldName === "before_experience") {
        if (!text || isNum(text)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "is_address_same") {
        if (text) {
          t.current_address = t?.permanent_address;
          if (changedFields.current.indexOf("current_address") < 0) {
            changedFields.current = [
              ...changedFields.current,
              "current_address",
            ];
          }
        }
        t[fieldName] = text;
      } else if (SALARY_KEYS.indexOf(fieldName) >= 0) {
        if (!text || isNum(text)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "grade_id") {
        t[fieldName] = text;
        t["cadre_id"] = "";
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      if (
        [
          ...salaryInfo,
          "grade_id",
          "cadre_id",
          "designation_id",
          "location_id",
        ]?.includes(fieldName)
      ) {
        checkSalaryInfoDebouncer(t);
      }
      if (changedFields.current.indexOf(fieldName) < 0) {
        changedFields.current = [...changedFields.current, fieldName];
      }
      if (
        [
          ...salaryInfo,
          "grade_id",
          "cadre_id",
          "designation_id",
          "location_id",
        ]?.includes(fieldName)
      ) {
        setSalaryField(true);
      }
      shouldRemoveError && removeError(fieldName);
    },
    [
      removeError,
      form,
      setForm,
      checkSalaryInfoDebouncer,
      SalaryField,
      setSalaryField,
    ]
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
        changeTextData(form?.[type], type);
      }
    },
    [changeTextData, checkCodeValidation]
  );
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const vehicleObj = {};
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "image") {
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
          } else if (BOOLEAN_KEYS.includes(key)) {
            fd.append(key, form[key] === "YES");
          } else if (["variant", "rc_number"].includes(key)) {
            vehicleObj[key] = form[key];
          } else if (typeof form[key] === "string") {
            fd.append(key, form[key]);
          }
        }
      });
      fd.append("is_update", true);
      if (vehicleObj) {
        fd.append("vehicle", JSON.stringify(vehicleObj));
      }
      // if (remotePath?.length > 0) {
      //   fd.append("remote_image_path", remotePath);
      // }
      fd.append("children", JSON.stringify(ChildenRef.current.getData()));
      fd.append("emp_id", id);
      // fd.append("data", JSON.stringify(changedData));
      if (form?.image) {
        fd.append("image", form?.image);
      }
      serviceGetNewEmployeeApproveFD(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Raised!");
          historyUtils.push(RouteName.NEW_EMPLOYEES);
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, id, setIsSubmitting, SalaryField]);

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      console.log("errors", errors);
      const isIncludesValid = ChildenRef.current.isValid();
      if (Object.keys(errors)?.length > 0 || !isIncludesValid) {
        setErrorData(errors);
        return true;
      }
      submitToServer();
    },
    [
      checkFormValidation,
      setErrorData,
      ChildenRef.current,
      form,
      SalaryField,
      // includeRef.current
    ]
  );

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
    isLoading,
    toggleStatusDialog,
    isUpdateDialog,
    SalaryField,
    role,
    isSubmitting,
    isCorporateHR,
    toggleAcceptDialog,
    isAcceptDialog,
    image,
  };
}

export default NewEmployeeEditHook;

//USC edit
