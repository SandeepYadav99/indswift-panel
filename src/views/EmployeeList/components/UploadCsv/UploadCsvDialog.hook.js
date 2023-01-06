import {useCallback, useState} from "react";
import {isAlpha, isNum, isUrl} from "../../../../libs/RegexUtils";
import {serviceEmployeeImportFile} from "../../../../services/Employee.service";

const initialForm = {
    file: null,
}

const useUploadCsvDialogHook = ({orderId, handleToggle, handleCsvUpload}) => {
    const [form, setForm] = useState(JSON.parse(JSON.stringify({...initialForm})));
    const [errorData, setErrorData] = useState({});
    const [resData, setResData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['file'];
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
        if (!isSubmitting) {
            setIsSubmitted(false);
            setResData([]);
            setIsSubmitting(true);
            const fd = new FormData();
            Object.keys(form).forEach(key => {
               fd.append(key, form[key]);
            });
            serviceEmployeeImportFile(fd).then(res => {
                if (!res.error) {
                    setIsSubmitted(true);
                    setResData(res.data);
                    handleCsvUpload();
                }
                setIsSubmitting(false);
            })
        }
    }, [form, isSubmitting, setIsSubmitting, orderId, handleToggle, setIsSubmitting, setResData, handleCsvUpload]);

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
        t[fieldName] = text;
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
        isSubmitting,
        resData,
        isSubmitted
    }
};

export default useUploadCsvDialogHook;
