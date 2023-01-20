import {useRef, useCallback, useState} from "react";
import {serviceAddJobOpeningInterviewers} from "../../../../../services/JobOpenings.service";
import {useDispatch} from "react-redux";
import {actionGetJobOpeningInterviewers} from "../../../../../actions/JobOpeningDetail.action";


const useInterviewerHook = ({jobId, handleSubmit}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const interviewerFormRef = useRef(null);
    const dispatch = useDispatch();
    const handleUpdate = useCallback(() => {
        const isValid = interviewerFormRef?.current?.isValid();
        if (isValid) {
            if (!isSubmitting) {
                setIsSubmitting(true);
                const data = interviewerFormRef?.current.getData();
                serviceAddJobOpeningInterviewers({
                    id: jobId,
                    interviewers: data.map(val => {
                        return {
                            interviewer_id: val?.interviewer?.id,
                            is_shortlist_approval: val?.is_shortlist_approval,
                            step: val?.step
                        }
                    })
                }).then(res => {
                    if (!res.error) {
                        handleSubmit();
                        dispatch(actionGetJobOpeningInterviewers(jobId));
                    }
                    setIsSubmitting(false);
                });
            }
        }
    }, [isSubmitting, setIsSubmitting, jobId, handleSubmit]);

    return {
        handleUpdate,
        interviewerFormRef,
    }
};

export default useInterviewerHook;
