import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlphaNum, isNum} from "../../libs/RegexUtils";
import {serviceGetCustomList, serviceGetKeywords, serviceGetList} from "../../services/Common.service";
import useDebounce from "../../hooks/DebounceHook";
import LogUtils from "../../libs/LogUtils";
import {serviceCreateJobOpenings, serviceJobOpeningsCodeCheck} from "../../services/JobOpenings.service";
import historyUtils from "../../libs/history.utils";
import EventEmitter from "../../libs/Events.utils";
import RouteName from "../../routes/Route.name";
import SnackbarUtils from "../../libs/SnackbarUtils";

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
    is_hiring: true
};

const useJobOpeningsDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
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
        serviceGetList(['LOCATION_DEPARTMENTS', 'EMPLOYEES', 'DEPARTMENTS', 'HR', 'SUB_DEPARTMENTS', 'JOB_ROLES', 'DESIGNATIONS']).then(res => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['location_id', 'department_id', 'sub_department_id', 'vacancy_type', 'assigned_to', 'job_role', 'designation'];
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
            if (form.vacancy_type === 'RAB'){
                SnackbarUtils.error('Budget Not Approved')
                setIsSubmitting(false)
                return false
            }
            serviceCreateJobOpenings({
                ...form,
                assigned_to: form?.assigned_to?.id,
                job_role_id: form?.job_role?.id,
                designation_id: form?.designation?.id,
                replace_id: form?.replacing_person?.id,
            }).then((res) => {
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
        filteredEmployees
    };
};

export default useJobOpeningsDetail;
