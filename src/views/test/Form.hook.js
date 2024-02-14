import {useCallback, useEffect, useState} from "react";
import {isAlphaNumChars, isDate, isSpace} from "../../libs/RegexUtils";

const useFormHook = ({initialForm, requiredFields}) => {
    const [errorData, setErrorData] = useState({});
    const [form, setForm] = useState({ ...initialForm });


    const checkFormValidation = useCallback(() => {
        const errors = { ...errorData };
        requiredFields.forEach((val) => {
            if (
                !form?.[val] ||
                (Array.isArray(form?.[val]) && form?.[val].length === 0)
            ) {
                errors[val] = true;
            } else if (["code"].indexOf(val) < 0) {
                delete errors[val];
            }
        }, [errorData, form]);

        Object.keys(errors).forEach((key) => {
            if (!errors[key]) {
                delete errors[key];
            }
        });
        return errors;
    }, [form, errorData, requiredFields]);


    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return true;
        }

    }, [checkFormValidation, setErrorData, form]);

    const removeError = useCallback(
        (title) => {
            const temp = JSON.parse(JSON.stringify(errorData));
            temp[title] = false;
            setErrorData(temp);
        },
        [setErrorData, errorData]
    );

    const changeTextData = useCallback((text, fieldName) => {
            let shouldRemoveError = true;
            const t = { ...form };
            if (fieldName === "name" || fieldName === "revision_number") {
                if (!text || (isAlphaNumChars(text) )) { //&& text.toString().length <= 30
                    t[fieldName] = text;
                }
            } else if (fieldName === "code") {
                if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
                    t[fieldName] = text.toUpperCase();
                }
                shouldRemoveError = false;
            } else {
                t[fieldName] = text;
            }
            setForm(t);
            shouldRemoveError && removeError(fieldName);
        },
        [removeError, form, setForm]
    );

    const onBlurHandler = useCallback(
        (type) => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        },
        [changeTextData ]
    );

    const handleDelete = useCallback(() => {}, []);

    const handleReset = useCallback(() => {
        setForm({ ...initialForm });
    }, [form]);

    return {
        form,
        changeTextData,
        onBlurHandler,
        removeError,
        handleSubmit,
        errorData,
        handleDelete,
        handleReset
    };
};

export default useFormHook;
