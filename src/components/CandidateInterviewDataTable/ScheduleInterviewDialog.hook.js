import {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router";
import {isAlphaNumChars, isSpace} from "../../libs/RegexUtils";
import LogUtils from "../../libs/LogUtils";
import {useDispatch, useSelector} from "react-redux";
import SnackbarUtils from "../../libs/SnackbarUtils";
import {serviceScheduleInterview} from "../../services/JobOpenings.service";
import {actionGetJobOpeningCandidates} from "../../actions/JobOpeningDetail.action";


const initialForm = {
    date: null,
    time: null,
    sequence_rounds: [],
    mode: 'IN_PERSON',
    interview_link:'',
    venue: '',
    is_send_email_candidates: false,
    is_send_email_interviewers: false,
};

const useScheduleInterview = ({jobId, handleInterviewSchedule, selectedCandidates}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({...initialForm});
    const dispatch = useDispatch();
    const { interviewers } = useSelector((state) => state.job_opening_detail);

    const steps = useMemo(() => {
        return interviewers.map(val => val.step);
    }, [interviewers]);

    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ['date', 'sequence_rounds', 'mode', 'venue'];
        required.forEach(val => {
            if (!form?.[val] || (Array.isArray(form?.[val]) && form?.[val].length === 0)) {
                errors[val] = true;
            } else if ([].indexOf(val) < 0) {
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

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const candidatIds = selectedCandidates.map(val => val.id);
            serviceScheduleInterview({...form,

            id:jobId,
                candidateIds: candidatIds
            }).then((res) => {
                LogUtils.log('response', res);
                if (!res.error) {
                    dispatch(actionGetJobOpeningCandidates(jobId));
                    handleInterviewSchedule();
                } else {
                    SnackbarUtils.success(res.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, jobId, handleInterviewSchedule, selectedCandidates]);

    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        LogUtils.log('errors', errors);
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
        if (fieldName === 'venue') {
            if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
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
        handleDelete,
        handleReset,
        steps
    };
};

export default useScheduleInterview;
