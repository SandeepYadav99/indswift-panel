import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router";
import {serviceGetCustomList} from "../../../services/Common.service";
import {isNum} from "../../../libs/RegexUtils";
import historyUtils from "../../../libs/history.utils";

const temp = new Date();

const initialForm = {
    approved_count: '',
    posted_manpower: '',
    transferred_manpower: '',
    vacancies: '',
    approved_budget: ''
}

const useAnnualView = ({selectedAnnuals, closeSidePanel, originWarehouseId}) => {
    const [form, setForm] = useState({...initialForm});
    const [errorData, setErrorData] = useState({});
    const [warehouses, setWarehouses] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {

    }, []);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['approved_count', 'posted_manpower', 'transferred_manpower', 'vacancies','approved_budget'];
        required.forEach(val => {
            if (!form?.[val]) {
                errors[val] = true;
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

        }
    }, []);

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
        }, [changeTextData]);


    return  {
        form,
        changeTextData,
        onBlurHandler,
        removeError,
        handleSubmit,
        errorData,
        warehouses,
        users
    }
}

export default useAnnualView;
