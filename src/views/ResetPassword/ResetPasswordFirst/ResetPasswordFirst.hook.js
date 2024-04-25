import {useCallback, useState} from "react";
import {isAlphaNumChars} from "../../../libs/RegexUtils";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {serviceChangePassword} from "../../../services/index.services";
import RouteName from "../../../routes/Route.name";

const initialForm = {
    currentPassword: "",
    newPassword: "",
    verifyNewPassword: "",
};

const useResetPasswordFirst = ({}) => {
    const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordVerify, setShowPasswordVerify] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ ...initialForm });

    const checkFormValidation = useCallback(() => {
        const errors = { ...errorData };
        let required = ["currentPassword", "newPassword", "verifyNewPassword"];
        required.forEach((val) => {
            if (
                !form?.[val] ||
                (Array.isArray(form?.[val]) && form?.[val].length === 0)
            ) {
                errors[val] = true;
            } else if (form.newPassword !== form.verifyNewPassword) {
                errors.verifyNewPassword = "New password does not match";
            } else if (form.newPassword === form.verifyNewPassword) {
                delete errors.verifyNewPassword;
            }
        });
        console.log("===>", errors);
        Object.keys(errors).forEach((key) => {
            if (!errors[key]) {
                delete errors[key];
            }
        });
        return errors;
    }, [form, errorData]);
    const removeError = useCallback(
        (title) => {
            const temp = JSON.parse(JSON.stringify(errorData));
            temp[title] = false;
            setErrorData(temp);
        },
        [setErrorData, errorData]
    );

    const changeTextData = useCallback(
        (text, fieldName) => {
            let shouldRemoveError = true;
            const t = { ...form };
            if (
                fieldName === "currentPassword" ||
                fieldName === "newPassword" ||
                fieldName === "verifyNewPassword"
            ) {
                if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
                    t[fieldName] = text;
                }
            }
            setForm(t);
            shouldRemoveError && removeError(fieldName);
        },
        [removeError, form, setForm]
    );

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
          setIsSubmitting(true);
          serviceChangePassword({
              current_password: form?.currentPassword,
              password: form?.newPassword,
          }).then((res) => {
            if (!res.error) {
              historyUtils.push(RouteName.EMPLOYEE_DASHBOARD);
            } else {
              SnackbarUtils.error(res.message);
            }
            setIsSubmitting(false);
          });
        }
      }, [form, isSubmitting, setIsSubmitting,]);
      
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
      

    const onBlurHandler = useCallback(
        (type) => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        },
        [changeTextData]
    );

    return {
        showPasswordVerify,
        changeTextData,
        setShowPasswordCurrent,
        form,
        errorData,
        handleSubmit,
        isSubmitting,
        showPasswordCurrent,
        setShowPasswordNew,
        showPasswordNew,
        setShowPasswordVerify,
        onBlurHandler
    };
};

export default useResetPasswordFirst;
