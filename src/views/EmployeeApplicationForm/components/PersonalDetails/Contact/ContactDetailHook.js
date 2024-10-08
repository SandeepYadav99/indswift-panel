import {useCallback, useImperativeHandle, useRef, useState} from "react";
import {isAlphaNumChars, isNum} from "../../../../../libs/RegexUtils";

const initialForm = {
    emergency_contact: '',
    emergency_name: '',
    emergency_relation: '',
    permanent_address: '',
    current_address: '',
    residence_contact: '',
    is_address_same: false,
};

// const initialForm = {
//     emergency_contact: '1231231231',
//     emergency_name: 'EM NAME',
//     emergency_relation: 'FATHER',
//     permanent_address: 'PERM ADDRESS',
//     current_address: 'CURR ADDRESS',
//     residence_contact: '1231231231',
// };

const useContactDetail = ({}, ref) => {
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
        setData(data) {
            setForm({
                ...data
            });
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
        let required = [
            'emergency_contact',
            'emergency_name',
            'emergency_relation',
            'permanent_address',
            'current_address',
            // 'residence_contact',
        ];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if (['code'].indexOf(val) < 0) {
                delete errors[val]
            }
        });
        if (
            form?.emergency_contact &&
            (!isNum(form?.emergency_contact) || form?.emergency_contact?.length !== 10)
          ) {
            errors["emergency_contact"] = true;
          }
          if (
            form?.residence_contact &&
            (!isNum(form?.residence_contact) || form?.residence_contact?.length !== 10)
          ) {
            errors["residence_contact"] = true;
          }
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
            return false;
        }
        return true;
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
        }else if (fieldName === 'emergency_contact' || fieldName === 'residence_contact' ) {
            if (!text || (isNum(text) && text.toString().length <= 10)) {
                t[fieldName] = text;
            }
        }
        else if (fieldName === 'is_address_same') {
            if (text) {
                t.permanent_address = t?.current_address;
            }
            t[fieldName] = text;
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

export default useContactDetail;
