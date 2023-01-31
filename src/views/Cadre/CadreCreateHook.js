import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlpha, isAlphaNum, isAlphaNumChars, isNum} from "../../libs/RegexUtils";
import {
    serviceCreateCadre,
    serviceCheckCadreCode,
    serviceGetCadreDetails,
    serviceUpdateCadre
} from "../../services/Cadre.service";
import historyUtils from "../../libs/history.utils";
import EventEmitter from "../../libs/Events.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import {useParams} from "react-router";
import Constants from "../../config/constants";
import useDebounce from "../../hooks/DebounceHook";

const initialForm = {
    name: '',
    level: '1',
    is_active: true
};

const useCadreDetail = ({location}) => {
    const gradeCode = location?.state?.gradeCode;
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const codeDebouncer = useDebounce(form?.name, 500);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            serviceGetCadreDetails({id}).then(res => {
                if (!res.error) {
                    const data = res?.data?.details;
                    setForm({
                        ...data,
                        is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
                    });
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsLoading(false);
            });
        }
    }, []);

    const checkCodeValidation = useCallback(() => {
        serviceCheckCadreCode({name: form?.name, id: id ? id : null, grade_id: gradeCode }).then((res) => {
            if (!res.error) {
                const errors = JSON.parse(JSON.stringify(errorData));
                if (res.data.is_exists) {
                    errors['name'] = 'Cadre Name Exists'
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
        let required = ['name','level'];
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
            setIsSubmitting(true);;
            let req = serviceCreateCadre;
            if (id) {
               req = serviceUpdateCadre;
            }
            req({
                ...form,
                grade_code: gradeCode,
            }).then((res) => {
                if (!res.error) {
                    historyUtils.goBack();
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, gradeCode, id]);

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
            if (fieldName === 'name' || fieldName == 'level') {
                if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
                    t[fieldName] = text;
                }
                if (fieldName === 'name') {
                    shouldRemoveError = false;
                }
            }
            // else if(fieldName === 'level') {
            //     if (!text || isNum(text)) {
            //         t[fieldName] = text;
            //     }
            // }
            else {
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
        id,
        gradeCode
    };
};

export default useCadreDetail;
