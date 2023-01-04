import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlpha, isAlphaNum, isAlphaNumChars, isEmail, isNum, isSpace} from "../../libs/RegexUtils";
import {
    serviceCreateLocation,
    serviceGetLocationDetails,
    serviceLocationCheck,
    serviceUpdateLocation
} from "../../services/Location.service";
import useDebounce from "../../hooks/DebounceHook";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import LogUtils from "../../libs/LogUtils";
import {useParams} from "react-router";
import Constants from "../../config/constants";
import RouteName from "../../routes/Route.name";

const initialForm = {
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    is_active: true
};

const useLocationDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const includeRef = useRef(null);
    const codeDebouncer = useDebounce(form?.code, 500);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            serviceGetLocationDetails({id: id}).then((res) => {
               if (!res.error) {
                   const data = res?.data?.details;
                   setForm({
                       ...data,
                       is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
                   });
               } else {
                   SnackbarUtils.error(res?.message);
               }
            });
        }
    }, [id]);

    const checkCodeValidation = useCallback(() => {
        if (form?.code) {
            serviceLocationCheck({code: form?.code, id: id ? id: null}).then((res) => {
                if (!res.error) {
                    const errors = JSON.parse(JSON.stringify(errorData));
                    if (res.data.is_exists) {
                        errors['code'] = 'Location Code Exists'
                        setErrorData(errors)
                    } else {
                        delete errors.code;
                        setErrorData(errors);
                    }
                }
            });
        }
    }, [errorData, setErrorData, form, id]);


    useEffect(() => {
        if (codeDebouncer) {
            checkCodeValidation();
        }
    }, [codeDebouncer])


    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['name', 'code', 'address', 'city', 'state', 'pincode'];
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
            if (id) {
                req = serviceUpdateLocation({
                    ...form
                });
            } else {
                req = serviceCreateLocation({
                    ...form
                });
            }
            req.then((res) => {
                // { error: true, message: tempRequest.data.response_message, authorization: true, response_code: tempRequest.data.response_code };
                if (!res.error) {
                    historyUtils.push(RouteName.LOCATIONS);
                } else {
                    SnackbarUtils.error(res.message);
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
        form,
        submitToServer
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
        if (fieldName === 'name' || fieldName === 'address') {
            if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
                t[fieldName] = text;
            }
        } else if (fieldName === 'city') {
            if (!text || (isAlpha(text) && text.toString().length <= 30)) {
                t[fieldName] = text;
            }
        } else if (fieldName === 'code') {
            if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
                t[fieldName] = text.toUpperCase();
            }
            shouldRemoveError = false;
        } else if (fieldName === 'pincode') {
                if (!text || (isNum(text))) {
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
        }, [changeTextData, checkCodeValidation]);

    const handleDelete = useCallback(() => {

    }, []);


    const handleReset = useCallback(() => {
        setForm({...initialForm})
    }, [form])

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
        id
    };
};

export default useLocationDetail;
