import {useCallback, useEffect, useState} from "react";
import {isAlpha, isNum, isUrl} from "../../../../libs/RegexUtils";
import LogUtils from "../../../../libs/LogUtils";
import {serviceLocationUpdateHead} from "../../../../services/Location.service";

const initialForm = {
   name: null
}

const useHeadDialogHook = ({employees, handleToggle, isOpen, locationId, showDetails, handleUpdate}) => {
    const [form, setForm] = useState(({...initialForm}));
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        setForm({...initialForm});
    }, [isOpen]);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['name'];
        required.forEach(val => {
            if (!form?.[val]) {
                errors[val] = true;
            }
        });
        Object.keys(errors).forEach(key => {
            if (!errors[key]) {
                delete errors[key];
            }
        });

        return errors;
    }, [form, errorData]);

    const submitToServer = useCallback(() => {
        showDetails(true)
        if (!isSubmitting) {
            setIsSubmitting(true);
            serviceLocationUpdateHead({
                head_id: form?.name.id,
                location_id: locationId
            }).then(res => {
                if (!res.error) {
                    handleUpdate(res.data.details);
                }
                setIsSubmitting(false);
            })
        }
    }, [form, isSubmitting, setIsSubmitting, employees, locationId, handleUpdate]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const errors = checkFormValidation();
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return true;
        }
        submitToServer();
    },[checkFormValidation, setErrorData, form, submitToServer]);

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
        if (fieldName === 'note') {
            if (!text || (isAlpha(text))) {
                t[fieldName] = text;
            }
        } else {
            t[fieldName] = text;
        }
        LogUtils.log('temp', fieldName, text);
        setForm(t);
        shouldRemoveError && removeError(fieldName);
    }, [removeError, form, setForm]);

    const onBlurHandler = useCallback(
        type => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        }, [changeTextData]);


    return  {
        form,
        changeTextData,
        onBlurHandler,
        removeError,
        handleSubmit,
        errorData,
        isSubmitting
    }
};

export default useHeadDialogHook;
