import React from "react";
import {useState} from "react";
import {useCallback} from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

const initialForm = {
    overall: {
        value: null,
        note: "",
    }
};

const useNextPage = ({handleSubmitProp}) => {
    const [form, setForm] = useState({...initialForm});
    const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isResetDialog, setIsResetDialog] = useState(false);

    const toggleResetDialog = useCallback(() => {
        setIsResetDialog((e) => !e);
    }, [setIsResetDialog]);

    const handleRatingChange = useCallback(
        (type, text) => {
            const t = {...form};
            t[type] = text;
            setForm(t);
        },
        [form, setForm, isDeclarationChecked]
    );
    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        ["overall"].forEach((val) => {
            if (!form?.[val]["value"]) {
                errors[val] = true;
            }
        });
        Object.keys(errors).forEach((key) => {
            if (!errors[key]) {
                delete errors[key];
            }
        });
        return errors;
    }, [form, errorData, isDeclarationChecked]);
    const handleSubmit = useCallback(async () => {
        if(form.overall.value == '-1'){
            SnackbarUtils.error('Please Select the Overall Rating');
            return false
        }
        const errors = checkFormValidation();
        if (Object.keys(errors).length === 0) {
            toggleResetDialog();
            // submitToServer();
        } else {
            const message = Object.keys(errors).join(", ");
            console.log("===errors", message, errors);
        }
    }, [
        checkFormValidation,
        setErrorData,
        form,
        toggleResetDialog
    ]);

    const handleDeclarationCheckbox = useCallback(() => {
        setIsDeclarationChecked((e) => !e);
    }, []);


    const handlePasswordVerified = useCallback(() => {
        toggleResetDialog();
        handleSubmitProp(form);
    }, [form, toggleResetDialog])

    return {
        isResetDialog,
        form,
        errorData,
        toggleResetDialog,
        handleRatingChange,
        handleSubmit,
        isDeclarationChecked,
        setIsDeclarationChecked,
        handleDeclarationCheckbox,
        handlePasswordVerified
    };
}

export default useNextPage;
