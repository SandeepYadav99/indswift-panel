import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlphaNum, isNum} from "../../libs/RegexUtils";
import {serviceGetCustomList, serviceGetKeywords} from "../../services/Common.service";
import useDebounce from "../../hooks/DebounceHook";
import LogUtils from "../../libs/LogUtils";
import {serviceCreateCadre, serviceCadreCodeCheck} from "../../services/Cadre.service";
import historyUtils from "../../libs/history.utils";
import EventEmitter from "../../libs/Events.utils";

const initialForm = {
    name: '',
    level: '',
    is_active: false
};

const useCadreDetail = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const includeRef = useRef(null);

    const checkCodeValidation = useCallback(() => {
        // serviceCadreCodeCheck({code: code, vendor_ref_code: vendorRefCode}).then((res) => {
        //     if (!res.error) {
        //         const errors = JSON.parse(JSON.stringify(errorData));
        //         if (res.data.code_exists) {
        //             errors['code'] = 'Cadre Code Exists'
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
        let required = ['name','level'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if ([''].indexOf(val) < 0) {
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
            const fd = new FormData();
            Object.keys(form).forEach(key => {
                if (key != 'brand' && form[key]) {
                    fd.append(key, form[key]);
                }
            });
            // serviceCreateCadre(fd).then((res) => {
            //     LogUtils.log('response', res);
            //     if (!res.error) {
            //         historyUtils.push('/products');
            //     } else {
            //         EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
            //             error: res.message,
            //             type: 'error'
            //         });
            //     }
            //     setIsSubmitting(false);
            // });
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
            if (fieldName === 'names' || fieldName === 'truck_no' || fieldName == 'idendity_proof') {
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
        includeRef,
        handleReset
    };
};

export default useCadreDetail;
