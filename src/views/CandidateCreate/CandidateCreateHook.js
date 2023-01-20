import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {isAlphaNum, isNum, isEmail, isAadhar} from "../../libs/RegexUtils";
import {serviceGetCustomList, serviceGetKeywords, serviceGetList} from "../../services/Common.service";
import useDebounce from "../../hooks/DebounceHook";
import LogUtils from "../../libs/LogUtils";
import {serviceCreateCandidate} from "../../services/Candidate.service";
import historyUtils from "../../libs/history.utils";
import EventEmitter from "../../libs/Events.utils";
import RouteName from "../../routes/Route.name";
import SnackbarUtils from "../../libs/SnackbarUtils";
import {serviceJobOpeningsDetails} from "../../services/JobOpenings.service";

const initialForm = {
    name: '',
    contact: '',
    father_name: '',
    email: '',
    aadhar: '',
    city: '',
    state: '',
    applied_date: null,
    referred_by: '',
    permanent_address: '',
    correspondence_address: '',
    previous_ctc: '',
    resume: null,
    is_fresher: true,
    is_address_same: false,
};

const useCandidateDetail = ({location}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const qualificationRef = useRef(null);
    const historyRef = useRef(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [employees, setEmployees] = useState([]);

    const selectedJobId = useMemo(() => {
        return location?.state?.job_id;
    }, [location]);

    useEffect(() => {
        serviceJobOpeningsDetails({ id: selectedJobId }).then((res) => {
            if (!res.error) {
                setJobDetails(res?.data?.details);
            }
        })
    }, [selectedJobId]);

    useEffect(() => {
        serviceGetList(['EMPLOYEES']).then((res) => {
            if (!res.error) {
                setEmployees(res?.data?.EMPLOYEES);
            }
        });
    }, [])



    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['name', 'contact', 'email', 'applied_date', 'permanent_address', 'previous_ctc', 'resume'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if ([''].indexOf(val) < 0) {
                delete errors[val]
            }
        });
        if(form?.email && !isEmail(form?.email)){
           errors['email'] = true
        }
        if (form?.contact && (!isNum(form?.contact) || (form?.contact?.length !== 10))) {
            errors['contact'] = true;
        }
        if (form?.previous_ctc && !isNum(form?.previous_ctc)) {
            errors['previous_ctc'] = true;
        }
        if (form?.aadhar && !isAadhar(form?.aadhar)) {
            errors['aadhar'] = true;
        }
        if (form?.applied_date) {
            const date = new Date(form?.applied_date);
            const todayDate = new Date();
            date.setHours(0,0,0, 0);
            todayDate.setHours(0,0,0, 0);
            if (date.getTime() > todayDate.getTime()) {
                errors['applied_date'] = true;
            }
        }
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
                if (key != 'referred_by' && form[key]) {
                    fd.append(key, form[key]);
                }
            });
            if (form?.referred_by) {
                fd.append('referred_by', form?.referred_by?.id);
            }
            fd.append('qualifications', JSON.stringify(qualificationRef.current.getData()));
            if (!form?.is_fresher) {
                fd.append('employment_history', JSON.stringify(historyRef?.current?.getData()));
            }
            fd.append('job_opening_id', selectedJobId);
            serviceCreateCandidate(fd).then((res) => {
                if (!res.error) {
                    if (selectedJobId) {
                        historyUtils.goBack();
                    } else {
                        historyUtils.push(RouteName.CANDIDATES);
                    }
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, selectedJobId]);

    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        const isIncludesValid = qualificationRef.current.isValid();
        if (Object.keys(errors).length > 0 || !isIncludesValid || (!form?.is_fresher && !historyRef?.current?.isValid())) {
            setErrorData(errors);
            return true;
        }
        submitToServer();

    }, [
        checkFormValidation,
        setErrorData,
        form,
        qualificationRef.current
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
        LogUtils.log(text, fieldName);
            let shouldRemoveError = true;
            const t = {...form};
            if (fieldName === 'names' || fieldName === 'truck_no' || fieldName == 'idendity_proof') {
                if (!text || (isNum(text) && text.toString().length <= 30)) {
                    t[fieldName] = text;
                }
            } else if (['previous_ctc', 'contact'].indexOf(fieldName) >= 0) {
                if (!text || (isNum(text) && text.toString().length <= 10)) {
                    t[fieldName] = text;
                }
            } else if (fieldName === 'is_address_same') {
                if (text) {
                    t.correspondence_address = t?.permanent_address;
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
        qualificationRef,
        handleReset,
        historyRef,
        employees,
        jobDetails,
        selectedJobId
    };
};

export default useCandidateDetail;
