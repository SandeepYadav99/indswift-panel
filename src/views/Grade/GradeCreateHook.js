import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlpha, isAlphaNum, isAlphaNumChars, isNum, isSpace} from "../../libs/RegexUtils";
import {serviceGetCustomList, serviceGetKeywords} from "../../services/Common.service";
import useDebounce from "../../hooks/DebounceHook";
import {
    serviceCheckGradeCode,
    serviceCreateGrade,
    serviceGetGradeDetails,
    serviceUpdateGrade
} from "../../services/Grade.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import {useParams} from "react-router";
import Constants from "../../config/constants";


const initialForm = {
    name: '',
    code: '',
    level: '',
    is_active: true
};

const useGradeDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const codeDebouncer = useDebounce(form?.code, 500);
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            serviceGetGradeDetails({id}).then((res) => {
                if (!res.error) {
                    const data = res?.data?.details;
                    setForm({
                        ...data,
                        is_active: Constants.GENERAL_STATUS.ACTIVE === data?.status
                    });
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsLoading(false);
            })
        }
    }, [id]);

    const checkCodeValidation = useCallback(() => {
        serviceCheckGradeCode({code: form?.code, id: id ? id: null }).then((res) => {
            if (!res.error) {
                const errors = JSON.parse(JSON.stringify(errorData));
                if (res.data.is_exists) {
                    errors['code'] = 'Grade Code Exists'
                    setErrorData(errors)
                } else {
                    delete errors.code;
                    setErrorData(errors);
                }
            }
        });
    }, [errorData, setErrorData, form?.code, id]);

    useEffect(() => {
        if (codeDebouncer) {
            checkCodeValidation();
        }
    }, [codeDebouncer])



    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['name','code','level'];
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
            let req = serviceCreateGrade;
            if (id) {
               req = serviceUpdateGrade;
            }
            req({...form}).then((res) => {
                if (!res.error) {
                    historyUtils.push(RouteName.GRADES);
                } else {
                    SnackbarUtils.error(res.error);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, id]);

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
        form
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
            if (fieldName === 'name' || fieldName === 'level') {
                if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
                    t[fieldName] = text;
                }
            }
            // else if(fieldName === 'level') {
            //     if (!text || isNum(text)) {
            //         t[fieldName] = text;
            //     }
            // }
            else if (fieldName === 'code') {
                if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
                    t[fieldName] = text.toUpperCase();
                }
                shouldRemoveError = false;
            }  else {
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
        }, [changeTextData, checkCodeValidation]);

    const handleDelete = useCallback(() => {

    }, []);


    const handleReset = useCallback(() => {
        setForm({...initialForm})
    },[form])

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
        handleReset,
        id
    };
};

export default useGradeDetail;
