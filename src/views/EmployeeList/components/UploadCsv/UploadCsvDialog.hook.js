import {useCallback, useEffect, useState} from "react";
import {isAlpha, isNum, isUrl} from "../../../../libs/RegexUtils";
import {serviceEmployeeImportFile, serviceEmployeeImportVerify} from "../../../../services/Employee.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

const initialForm = {
    file: null,
}

const useUploadCsvDialogHook = ({orderId, isOpen, handleToggle, handleCsvUpload}) => {
    const [form, setForm] = useState(JSON.parse(JSON.stringify({...initialForm})));
    const [errorData, setErrorData] = useState({});
    const [isVerified, setIsVerified] = useState(false);
    const [resData, setResData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setForm({...initialForm});
            setResData([]);
            setIsSubmitted(false);
            setIsVerified(false);
            setErrorData({});
        }
    }, [isOpen]);

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
            setResData([]);
            setIsSubmitting(true);
            const fd = new FormData();
            Object.keys(form).forEach(key => {
               fd.append(key, form[key]);
            });
            let req = isVerified ? serviceEmployeeImportFile : serviceEmployeeImportVerify;
            req(fd).then(res => {
                if (!res.error) {
                    if (isVerified) {
                        handleCsvUpload();
                        handleToggle();
                        SnackbarUtils.success('Employee Data Imported Successfully');
                    }
                    else if (res?.data[0]?.required?.length > 0) {
                        setIsVerified(false)
                        SnackbarUtils?.error("Verification failed");
                    }
                    else {
                        setIsVerified(e => !e);
                    }
                    setIsSubmitted(true);
                    setResData(res.data);
                }
                else {
                    SnackbarUtils.error(res?.data);
                }
                setIsSubmitting(false);
            })
        }
    }, [form, isSubmitting, setIsSubmitting, orderId, handleToggle, setIsSubmitting, setResData, handleCsvUpload, isVerified, setIsVerified]);

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
        setIsVerified(false);
    }, [removeError, form, setForm, setIsVerified]);

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
        isSubmitted,
        isVerified
    }
};

export default useUploadCsvDialogHook;
