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
import {
    serviceCheckDesignation,
    serviceCreateDesignation,
    serviceGetDesignationDetails,
    serviceUpdateDesignation
} from "../../services/Designation.service";
import {useParams} from "react-router";
import Constants from "../../config/constants";

const initialForm = {
    name: '',
    grade_id: '',
    cadre_id: '',
    parent_id: '',
    is_active: true
};

const useDesignationDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const includeRef = useRef(null);
    const codeDebouncer = useDebounce(form?.name, 500);
    const {id} = useParams();
    const [listData, setListData] = useState({
        GRADES: [],
        CADRES: [],
        DESIGNATIONS: [],
    });

    useEffect(() => {
        if (id) {
            serviceGetDesignationDetails({id: id}).then((res) => {
                if(!res.error) {
                    const data = res?.data?.details;
                    setForm({
                        ...data,
                        parent_id: data?.parent_id ? data?.parent_id : 'NONE',
                        is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE
                    });
                } else {
                    SnackbarUtils.error(res?.message);
                    historyUtils.goBack();
                }
            })
        }
    }, [id]);

    useEffect(() => {
        serviceGetList(['GRADES', 'CADRES',  'DESIGNATIONS']).then(res => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);

    const checkCodeValidation = useCallback(() => {
        serviceCheckDesignation({name: form?.name, id: id ? id : null}).then((res) => {
            if (!res.error) {
                const errors = JSON.parse(JSON.stringify(errorData));
                if (res.data.is_exists) {
                    errors['name'] = 'Designation Name Exists'
                    setErrorData(errors)
                } else {
                    delete errors.name;
                    setErrorData(errors);
                }
            }
        });
    }, [errorData, setErrorData, form?.name, id]);


    useEffect(() => {
        if (codeDebouncer) {
            checkCodeValidation();
        }
    }, [codeDebouncer])

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['name', 'grade_id', 'cadre_id'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if (['name'].indexOf(val) < 0) {
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
            let req = serviceCreateDesignation;
            if (id) {
                req = serviceUpdateDesignation;
            }
            req({
                ...form,
                parent_id: form?.parent_id === 'NONE' ? '' : form?.parent_id,
            }).then((res) => {
                LogUtils.log('response', res);
                if (!res.error) {
                    historyUtils.push(RouteName.DESIGNATION);
                } else {
                    SnackbarUtils.error(res?.error);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, id]);

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
        if (fieldName === 'grade_id') {
            t['cadre_id'] = '';
        }
        if (fieldName === 'name') {
            if (!text || (isAlphaNum(text) && text.toString().length <= 30)) {
                t[fieldName] = text;
            }
            shouldRemoveError = false;
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


    const filteredCadres = useMemo(() => {
        return listData?.CADRES?.filter(val => val.grade_id === form?.grade_id);
    }, [listData, form?.grade_id]);


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
        filteredCadres
    };
};

export default useDesignationDetail;
