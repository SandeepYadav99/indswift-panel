import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlphaNum, isNum} from "../../libs/RegexUtils";
import {serviceGetCustomList, serviceGetKeywords, serviceGetList} from "../../services/Common.service";
import useDebounce from "../../hooks/DebounceHook";
import LogUtils from "../../libs/LogUtils";
import {serviceCreateJobOpenings, serviceJobOpeningsCodeCheck, serviceJobOpeningsDetails, serviceUpdateJobOpenings} from "../../services/JobOpenings.service";
import historyUtils from "../../libs/history.utils";
import EventEmitter from "../../libs/Events.utils";
import RouteName from "../../routes/Route.name";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { useParams } from "react-router";
import constants from "../../config/constants";
import { tr } from "date-fns/locale";

const initialForm = {
    location_id: '',
    department_id: '',
    sub_department_id: '',
    type: '',
    assigned_to: '',
    job_role: '',
    replacing_person: '',
    note: '',
    designation: '',
    is_sourcing: false,
    is_hiring: true,
    vacancy_type:''
};

const useJobOpeningsEditDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isReoccuring,setIsReoccuring]=useState(false)
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const isListReceived = useRef(false);
    const includeRef = useRef(null);
    const [listData, setListData] = useState({
        LOCATION_DEPARTMENTS: [],
        EMPLOYEES: [],
        DEPARTMENTS: [],
        SUB_DEPARTMENTS: [],
        JOB_ROLES: [],
        HR: [],
        DESIGNATIONS: [],
    });
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            serviceJobOpeningsDetails({id: id}).then((res) => {
               if (!res.error) {
                   const data = res?.data?.details;
                   setForm({
                       ...data,
                       assigned_to: data?.assigned_person,
                       replacing_person:data?.replacing_person,
                       is_active: data?.status === constants.GENERAL_STATUS.ACTIVE,
                       job_role:data?.job_role_id
                   });
                   setIsReoccuring(data?.is_recurring)
               } else {
                   SnackbarUtils.error(res?.message);
               }
               setIsLoading(false);
            });
        }
    }, [id]);

    useEffect(() => {
        if (form?.replacing_person) {
            const designationId = form?.replacing_person?.designation_id;
            const index = listData?.DESIGNATIONS.findIndex(l => l.id === designationId);
        
            if (index >= 0) {
                setForm({
                    ...form,
                    designation: listData?.DESIGNATIONS[index]
                });
            }
        }
    }, [form?.replacing_person]);

    useEffect(() => {
        if (!isLoading) {
            const assignedIndex = listData.EMPLOYEES.findIndex(val => val.id === form?.assigned_to.id);
            const replacingIndex=filteredEmployees?.findIndex(val=> val.id === form?.replacing_person?.id)
            const associatejobIndex=listData.JOB_ROLES.findIndex(val => val.id === form?.job_role)
            const tempForm = {...form};
            if (assignedIndex >= 0) {
               tempForm.assigned_to =   listData.EMPLOYEES[assignedIndex];
            } 
            if(replacingIndex >=0){
                tempForm.replacing_person=filteredEmployees[replacingIndex]
            }
            if(associatejobIndex >=0){
                tempForm.job_role=listData.JOB_ROLES[associatejobIndex]
            }
            setForm({
                ...tempForm
            });
        }
    }, [listData, isLoading,filteredEmployees]);

    useEffect(() => {
        serviceGetList(['LOCATION_DEPARTMENTS', 'EMPLOYEES', 'DEPARTMENTS', 'HR', 'SUB_DEPARTMENTS', 'JOB_ROLES', 'DESIGNATIONS']).then(res => {
            if (!res.error) {
                setListData(res.data);
            }
        
        });
    }, []);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = [];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if (['code'].indexOf(val) < 0) {
                delete errors[val]
            }
        });
        Object.keys(errors).forEach(key => {
            if (!errors[key]) {
                delete errors[key];
            }
        })
        return errors;
    }, [form, errorData]);

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            let req = null;
            if(id){
                req=serviceUpdateJobOpenings({
                    ...form,
                assigned_to: form?.assigned_to?.id,
                job_role_id: form?.job_role?.id,
                designation_id: form?.designation?.id,
                replace_id: form?.replacing_person?.id,
                })
            }
            else{
            req=serviceCreateJobOpenings({
                ...form,
                assigned_to: form?.assigned_to?.id,
                job_role_id: form?.job_role?.id,
                designation_id: form?.designation?.id,
                replace_id: form?.replacing_person?.id,
            })}
            req.then((res) => {
                LogUtils.log('response', res);
                if (!res.error) {
                    historyUtils.push(RouteName.JOB_OPENINGS);
                } else {
                    SnackbarUtils.error(res?.error);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting]);

    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        // LogUtils.log('isValid', includeRef.current.isValid(), errors);
        // const isIncludesValid = includeRef.current.isValid();
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return true;
        }
        submitToServer();

    }, [
        checkFormValidation,
        setErrorData,
        form,
        includeRef.current
    ]);

    const removeError = useCallback(
        title => {
            const temp = JSON.parse(JSON.stringify(errorData));
            temp[title] = false;
            setErrorData(temp);
        },
        [setErrorData, errorData],
    );

    const changeTextData = useCallback((text, fieldName) => {
        let shouldRemoveError = true;
        const t = {...form};
        if (fieldName === 'location_id') {
            t['department_id'] = '';
            t['sub_department_id'] = '';
            t['replacing_person'] = '';
        }
        if (fieldName === 'department_id') {
            t['sub_department_id'] = ''
            t['replacing_person'] = '';
        }
        if (fieldName === 'name') {
            if (!text || (isNum(text) && text.toString().length <= 30)) {
                t[fieldName] = text;
            }
        } else {
            t[fieldName] = text;
        }
        setForm(t);
        shouldRemoveError && removeError(fieldName);
    }, [removeError, form, setForm]);

    const onBlurHandler = useCallback(
        type => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        }, [changeTextData]);

    const handleDelete = useCallback(() => {

    }, []);


    const handleReset = useCallback(() => {
        includeRef.current.resetData();
        setForm({...initialForm})
    }, [form])

    const filteredDepartments = useMemo(() => {
        const locations = listData?.LOCATION_DEPARTMENTS;
        const index = locations.findIndex(l => l.id === form?.location_id);
        if (index >= 0) {
            const departments = locations[index]?.departments;
            return listData?.DEPARTMENTS?.filter(val => departments.indexOf(val.id) >= 0);
        }
        return [];
    }, [listData, form?.location_id]);

    const filteredSubDepartments = useMemo(() => {
        return listData?.SUB_DEPARTMENTS?.filter(val => val.department_id === form?.department_id);
    }, [listData, form?.department_id]);

    const filteredEmployees = useMemo(() => {
        return listData.EMPLOYEES.filter(val => {
            return val.department_id === form?.department_id && val.location_id === form?.location_id;
        });
    }, [form?.location_id, form?.department_id, listData]);

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
        filteredDepartments,
        filteredSubDepartments,
        listData,
        filteredEmployees,
        isReoccuring
    };
};

export default useJobOpeningsEditDetail;
