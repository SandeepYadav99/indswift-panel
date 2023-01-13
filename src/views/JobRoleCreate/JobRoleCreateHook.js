import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlphaNum, isNum} from "../../libs/RegexUtils";
import {serviceGetCustomList, serviceGetKeywords, serviceGetList} from "../../services/Common.service";
import useDebounce from "../../hooks/DebounceHook";
import LogUtils from "../../libs/LogUtils";
import {
    serviceCreateJobRoles,
    serviceGenerateJobRoleCode,
    serviceJobRolesCodeCheck
} from "../../services/JobRoles.service";
import historyUtils from "../../libs/history.utils";
import EventEmitter from "../../libs/Events.utils";
import RouteName from "../../routes/Route.name";

const initialForm = {
    name: '',
    code: '',
    location_id: '',
    department_id: '',
    sub_department_id: '',
    grade: '',
    reporting_to: '',
    min_qualification: '',
    min_experience: '',
    salary_range: '',
    description: '',
    specification: '',
    is_active: true
};

const useJobRolesDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const descriptionRef = useRef(null);
    const codeDebouncer = useDebounce(form?.department_id, 500);
    const [listData, setListData] = useState({
        LOCATION_DEPARTMENTS: [],
        EMPLOYEES: [],
        DEPARTMENTS: [],
        SUB_DEPARTMENTS: [],
        GRADES: []
    });
    const includeRef = useRef(null);

    useEffect(() => {
        serviceGetList(['LOCATION_DEPARTMENTS', 'EMPLOYEES', 'DEPARTMENTS', 'SUB_DEPARTMENTS', 'GRADES']).then(res => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);

    useEffect(() => {
        if (form?.department_id && form?.location_id) {
            serviceGenerateJobRoleCode({ department_id: form?.department_id, location_id: form?.location_id }).then((res) => {
                if (!res.error) {
                    setForm({
                        ...form,
                        code: res?.data?.code
                    });
                }
            })
        }
    }, [codeDebouncer]);

    // useEffect(() => {
    //     let locationCode = '';
    //     let departmentCode = '';
    //     const locationIndex = listData.LOCATION_DEPARTMENTS.findIndex(o => o.id === form?.location_id);
    //     if (locationIndex >= 0) {
    //         locationCode = listData.LOCATION_DEPARTMENTS[locationIndex]?.code;
    //     }
    //     const departmentIndex = listData.DEPARTMENTS.findIndex(o => o.id === form?.department_id);
    //     if (departmentIndex >= 0) {
    //         departmentCode = listData.DEPARTMENTS[departmentIndex]?.code;
    //     }
    //     LogUtils.log('departmentCode', departmentCode, locationCode);
    //     if (locationCode && departmentCode) {
    //         setForm({
    //             ...form,
    //             code: `ISLL/JAS/${locationCode}/${departmentCode}/XXX`,
    //         });
    //     }
    // }, [form?.department_id, form?.location_id]);

    const checkCodeValidation = useCallback(() => {
        // serviceJobRolesCodeCheck({code: code, vendor_ref_code: vendorRefCode}).then((res) => {
        //     if (!res.error) {
        //         const errors = JSON.parse(JSON.stringify(errorData));
        //         if (res.data.code_exists) {
        //             errors['code'] = 'JobRoles Code Exists'
        //             setErrorData(errors)
        //         } else {
        //             delete errors.code;
        //             setErrorData(errors);
        //         }
        //         if (res?.data?.vendor_ref_code) {
        //             errors['vendor_ref_code'] = 'Vendor Ref Code Exists'
        //             setErrorData(errors)
        //         } else {
        //             delete errors.vendor_ref_code;
        //             setErrorData(errors);
        //         }
        //     }
        // });
    }, [errorData]);

    useEffect(() => {
        checkCodeValidation();
    }, [])


    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['name', 'code', 'location_id', 'department_id', 'sub_department_id', 'grade_id', 'min_qualification', 'min_experience', 'salary_range'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if (['code', 'vendor_ref_code'].indexOf(val) < 0) {
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
            LogUtils.log('form', form);
            setIsSubmitting(true);
            serviceCreateJobRoles({
                ...form,
            }).then((res) => {
                LogUtils.log('response', res);
                if (!res.error) {
                    historyUtils.push(RouteName.JOB_ROLES);
                } else {
                    EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
                        error: res.message,
                        type: 'error'
                    });
                }
                setIsSubmitting(false);
            });
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
        submitToServer,
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
        }
        if (fieldName === 'department_id') {
            t['sub_department_id'] = ''
        }
        if (fieldName === 'name') {
            if (!text || (isAlphaNum(text) && text.toString().length <= 30)) {
                t[fieldName] = text;
            }
        } else {
            t[fieldName] = text;
        }
        setForm(t);
        shouldRemoveError && removeError(fieldName);
    }, [removeError, form, setForm]);

    const onBlurHandler = useCallback(type => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        }, [changeTextData, checkCodeValidation]);

    const handleDelete = useCallback(() => {

    }, []);


    const handleReset = useCallback(() => {
        includeRef.current.resetData();
        setForm({...initialForm})
    }, [form]);

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

    descriptionRef.current = changeTextData;
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
        listData,
        filteredDepartments,
        filteredSubDepartments,
        descriptionRef
    };
};

export default useJobRolesDetail;
