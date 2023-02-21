import {useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import useDebounce from "../../../../hooks/DebounceHook";
import {useParams} from "react-router";
import {isAlpha, isAlphaNumChars, isNum, isSpace} from "../../../../libs/RegexUtils";

const initialForm = {
    dob: '',
    gender: '',
    birthplace: '',
    blood_group: '',
    dom: '',
    aadhar_no: '',
    pan_no: '',
    passport_no: '',
    passport_expiry_date: '',
};

const useProfilePersonalForm = ({}, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const includeRef = useRef(null);

    useImperativeHandle(ref, () => ({
        isValid() {
            return handleSubmit();
        },
        resetData() {
            setForm(JSON.parse(JSON.stringify(initialForm)));
        },
        getData() {
            return {
                data: JSON.parse(JSON.stringify(form)),
            };
        },
    }));


    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['dob', 'gender', 'birthplace', 'blood_group', 'dom', 'aadhar_no', 'pan_no', 'passport_no', 'passport_expiry_date'];
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


    const handleSubmit = useCallback( () => {
        const errors = checkFormValidation();
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return errors;
        }
        return {};
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
        if (fieldName === 'name' || fieldName === 'address') {
            if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
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


    const handleReset = useCallback(() => {
        setForm({...initialForm})
    }, [form])

    return {
        form,
        changeTextData,
        onBlurHandler,
        removeError,
        isLoading,
        isSubmitting,
        errorData,
        isEdit,
        includeRef,
        handleReset,
    };
};

export default useProfilePersonalForm;
