import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
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
} from "../../libs/RegexUtils";
import {useParams} from "react-router";
import {serviceGetList} from "../../services/Common.service";
import {serviceCheckEmployeeExists, serviceGetEmployeeEditInfo, serviceGetSalaryInfoInfo} from "../../services/Employee.service";
import useDebounce from "../../hooks/DebounceHook";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import {serviceEditEmployeeVersion} from "../../services/EmployeeEdit.service";
import debounce from 'lodash.debounce';

const SALARY_KEYS = ['basic_salary', 'hra', 'education_allowance', 'medical_allowance', 'special_allowance', 'earning_one', 'pug', 'helper', 'food_coupons', 'gift_coupons', 'lta', 'super_annuation', 'nps', 'vehicle_maintenance', 'vehicle_emi', 'fuel', 'vpf', 'earning_two', 'gross', 'earning_three_pli', 'er_pf', 'er_esi', 'er_lwf', 'earning_four', 'gratuity', 'insurance', 'driver_incentive', 'perf_bonus', 'annual_bonus', 'two_car_maintenance', 'two_fuel', 'earning_five', 'monthly_ctc', 'em_pf', 'em_esi', 'em_lwf', 'total_deduction', 'total_pf', 'retention_allowance', 'car_component', 'incremental_gross_salary', 'earning2_vpf', 'deduction_vpf','stability_incentive','deduction_vpf_pct','gross_component','nps_part_e','deputation_allowance'];

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
  higher_education:"",
  permanent_address: "",
  current_address: "",
  pan_no: "",
  aadhar_no: "",
  bank_account_name: "",
  bank_account_no: "",
  bank_name: "",
  ifsc: "",
  is_transport_facility:'notavailed',
  vehicle_type:"",
  vehicle_number:"",
  father_state:"ALIVE",
  father_dob:"",
  father_dod:"",
  mother_dob:"",
  mother_state:"ALIVE",
  mother_dod:"",
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
  job_role_id: '',
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
  nps_part_e:0,
  effective_date:"",
  salary_notes:""
};

function EmployeeListCreateHook() {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ ...initialForm });
  const [editData, setEditData] = useState({});
  const [errorData, setErrorData] = useState({});
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const [SalaryField,setSalaryField]=useState(false)
  const { id } = useParams();
  const changedFields = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeDebouncer = useDebounce(form?.emp_code, 500);
  const ChildenRef = useRef(null);
  const [salaryInfo, setSalaryInfo] = useState([
    ...SALARY_KEYS,
    ...BOOLEAN_KEYS,
  ]);

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
      serviceGetList(["LOCATION_DEPARTMENTS", "EMPLOYEES", "DEPARTMENTS", "HR", "SUB_DEPARTMENTS", "JOB_ROLES", "DESIGNATIONS", "GRADES", "CADRES", "LEVEL",]),
      serviceGetEmployeeEditInfo({emp_id: id})
    ]).then((promises) => {
      const listData = promises[0]?.value?.data;
      const empData = promises[1]?.value?.data;
      listData.EMPLOYEES = listData.EMPLOYEES.filter((emp) => emp.id !== id);
      setListData(listData);
      const hodIndex = listData?.EMPLOYEES.findIndex((val) => val.id === empData?.hod_id);
      if (hodIndex >= 0) {
        empData.hod_id = listData?.EMPLOYEES[hodIndex];
      }
      const pmsIndex = listData?.EMPLOYEES.findIndex((val) => val.id === empData?.pms_reviewer_id);
      if (pmsIndex >= 0) {
        empData.pms_reviewer_id = listData?.EMPLOYEES[pmsIndex];
      }
      const jobRoleIndex = listData?.JOB_ROLES.findIndex((val) => val.id === empData?.job_role_id);
      if (jobRoleIndex >= 0) {
        empData.job_role_id = listData?.JOB_ROLES[jobRoleIndex];
      }

       const designationIndex = listData?.DESIGNATIONS.findIndex((val) => val.id === empData?.designation_id);
       if (designationIndex >= 0) {
         empData.designation_id = listData?.DESIGNATIONS[designationIndex];
       }
      const transportvalue = empData?.is_transport_facility ? 'availed':'notavailed';
      const updatedForm = {};
      for (const key in empData) {
        if (BOOLEAN_KEYS.includes(key)) {
          updatedForm[key] = empData[key] ? "YES" : "NO";
        }
      }
      setForm({
        ...initialForm,
        ...empData,
        image: '',
        is_transport_facility: transportvalue,
        ...updatedForm,
        effective_date:"",
        salary_notes:""
      });
      setEditData({ ...initialForm,
        ...empData,
        image: '',
        is_transport_facility: transportvalue,
        ...updatedForm});
      setIsLoading(false);
    });
  }, [id]);

  useEffect(()=>{
   if (!isUpdateDialog){
      setForm({...form,effective_date:"",salary_notes:""})
    }
  },[isUpdateDialog])
  
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
      // "next_review_date",
      // "previous_review_date",
      "gender",
      "dob",
      // "job_role_id",
      "state",
      "blood_group",
      // "official_contact",
      "personal_contact",
      // "official_email",
      // "personal_email",
      // "higher_education",
      "martial_status",
      // "dom",
      "father_name",
      "mother_name",
      // "spouse_name",
      // "spouse_dob",
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
      "father_state",
      "father_dob",
      "mother_dob",
      "mother_state",
      // "esi_no",
      ...SALARY_KEYS,
       ];
    required.forEach((val) => {
      if (
          (!form?.[val] && parseInt(form?.[val]) != 0)  ||
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
    if (SalaryField){
      if(!form?.effective_date){
        errors["effective_date"] = true
      }
      if (!isDate(form?.effective_date)) {
        errors["effective_date"] = true;
      }
      if (!form?.salary_notes){
        errors["salary_notes"] = true
      }
    }
    if (form?.effective_date) {
      const date = new Date(form?.effective_date);
      const todayDate = new Date();
      date.setHours(0, 0, 0, 0);
      todayDate.setHours(0, 0, 0, 0);
      if (date.getTime() > todayDate.getTime()) {
          errors["effective_date"] = true;
      }
  }
    if(form?.father_state){
      if(form?.father_state === "EXPIRED" && !form?.father_dod){
        errors['father_dod'] = true;
      }
      else if (form?.father_state === "ALIVE"){
        delete errors['father_dod']
      }
    }
    if(form?.mother_state){
      if(form?.mother_state === "EXPIRED" && !form?.mother_dod){
        errors['mother_dod'] = true;
      }
      else if (form?.mother_state === "ALIVE"){
        delete errors['mother_dod']
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData,SalaryField]);

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

  const checkForSalaryInfo = (data) => {
    if (data?.grade_id && data?.cadre_id) {
      let filteredForm = {employee_id:id};
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
        cadre_id:data?.cadre_id,
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
      SnackbarUtils.error("Please Select the Grade and Cadre");
    }
  };

  const changeTextData = useCallback(
      (text, fieldName) => {
        LogUtils.log('changeTextData', text, fieldName);
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
        } else if (fieldName === 'before_experience') {
          if (!text || (isNum(text))) {
            t[fieldName] = text;
          }
        } else if (fieldName === "is_address_same") {
          if (text) {
            t.current_address = t?.permanent_address;
            if (changedFields.current.indexOf('current_address') < 0) {
              changedFields.current = [...changedFields.current, 'current_address'];
            }
          }
          t[fieldName] = text;
        }else if (SALARY_KEYS.indexOf(fieldName) >= 0) {
          if (!text || (isNum(text))) {
            t[fieldName] = text;
          }
        } else if (fieldName === 'grade_id'){
          t[fieldName] = text;
          t['cadre_id'] = ""
        }
          else {
          t[fieldName] = text;
        }
        setForm(t);
        if ([...salaryInfo,'grade_id','cadre_id']?.includes(fieldName)) {
          checkSalaryInfoDebouncer(t);
        }
        if (changedFields.current.indexOf(fieldName) < 0) {
          changedFields.current = [...changedFields.current, fieldName];
        }
        if([...salaryInfo,'grade_id','cadre_id']?.includes(fieldName)){
          setSalaryField(true)
        }
        shouldRemoveError && removeError(fieldName);
      },
      [removeError, form, setForm,checkSalaryInfoDebouncer,SalaryField,setSalaryField]
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

  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e) => {checkForSalaryInfo(e)}, 1000);
      }, []);

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
      const changedData = [];
      let foundMatch = false;
      for (let i = 0; i < changedFields?.current?.length; i++) {
        if ([...salaryInfo,'grade_id','cadre_id']?.includes(changedFields?.current[i])) {
          foundMatch = true;
          break;
        }
      }
      if (foundMatch){
        salaryInfo.forEach((key)=>{
          if (BOOLEAN_KEYS.includes(key)){
            changedData.push({
              is_json: false,
              key: key,
              db_value: form?.[key] === 'YES',
              new_value: form?.[key] === 'YES',
              old_value: editData?.[key] === 'YES',
            });
          }else{
            changedData.push({
              is_json: false,
              key: key,
              db_value: form?.[key] ,
              new_value: form?.[key] ,
              old_value: editData?.[key] ,
            });
          }
        })
      }
      changedFields.current.forEach((key) => {
        if (key != 'image') {
          const newData = form?.[key];
          const oldData = editData?.[key];
          if (['hod_id', 'pms_reviewer_id', 'job_role_id', 'designation_id'].indexOf(key) >= 0) {
            changedData.push({
              is_json: false,
              key: key,
              db_value: newData?.id,
              new_value: newData?.id,
              old_value: oldData ? oldData?.id : null,
            });
          } else if (key === 'is_transport_facility'){
            const trans= form?.['is_transport_facility'] === 'availed'
            const oldtrans=editData?.['is_transport_facility'] === 'availed'
            changedData.push({
              is_json: false,
              key: key,
              db_value: trans,
              new_value: trans,
              old_value: oldtrans ? oldtrans : false,
            });
          }else if ([...salaryInfo].includes(key)){
            
          } else {
            changedData.push({
              is_json: false,
              key: key,
              db_value: newData,
              new_value: newData,
              old_value: oldData ? oldData : '',
            });
          }
        }
      });
      const {data: childrenData, isChanged: isChildrenDataChanged} = ChildenRef.current.getData();
      if (isChildrenDataChanged) {
       changedData.push({
         key: 'children',
         is_json: true,
         db_value: '',
         new_value: JSON.stringify(childrenData),
         old_value: JSON.stringify(editData?.children ? editData?.children : []),
       });
      }
      fd.append('emp_id', id);
      fd.append('data', JSON.stringify(changedData));
      if (form?.image) {
        fd.append('image', form?.image);
      }
      serviceEditEmployeeVersion(fd).then((res) => {
        if (!res.error) {
          SnackbarUtils.success('Request Raised!');
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, id, editData, setIsSubmitting,SalaryField]);


  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValid = ChildenRef.current.isValid();
    if (Object.keys(errors)?.length > 0 || !isIncludesValid) {
      setErrorData(errors);
      return true;
    }
    if (isIncludesValid) {
      const {isChanged} = ChildenRef.current.getData();
      if (changedFields.current.length === 0 && !isChanged) {
        SnackbarUtils.error('No Data Changed');
        return true;
      }
      submitToServer();
    }
  }, [
    checkFormValidation,
    setErrorData,
    ChildenRef.current,
    form,
    SalaryField
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
    editData,
    isLoading,
    toggleStatusDialog,
    isUpdateDialog,
    SalaryField
  };
}

export default EmployeeListCreateHook;


//USC edit 