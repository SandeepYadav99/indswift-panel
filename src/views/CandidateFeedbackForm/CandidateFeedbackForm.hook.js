import {useCallback, useState,useEffect} from "react";
import {useParams} from "react-router";
import {serviceGetInterviewScheduleDetails} from "../../services/InterviewSchedule.service";
import LogUtils from "../../libs/LogUtils";
import {serviceAddCandidateFeedback} from "../../services/CandidateFeedback.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import SnackbarUtils from "../../libs/SnackbarUtils";

const useCandidateFeedback = ({}) => {
    const [formIndex, setFormIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [interviewData, setInterviewData] = useState(null);
    const [form, setForm] = useState({});
    const { id } = useParams();

    useEffect(() => {
        serviceGetInterviewScheduleDetails({ interview_id: id }).then((res) => {
            if (!res.error) {
                setInterviewData(res?.data);
            }
            setIsLoading(false);
        });
    }, [id]);

    const handleNext = useCallback((formData) => {
        setFormIndex(e => e + 1);
        setForm({
            ...form,
            ...formData,
        });
    }, [setFormIndex, setForm, form]);

    const handlePrev = useCallback(() => {
        setFormIndex(e => e - 1);
    }, [setFormIndex]);

    const handleSubmit = useCallback((data) => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            LogUtils.log(interviewData);
            serviceAddCandidateFeedback({
                ...form,
                ...data,
                schedule_id: interviewData?.id,
                candidate_id: interviewData?.candidate_id,
                job_opening_id: interviewData?.job_id,
                interviewer_id: interviewData?.interviewer_id,
                interview_id: interviewData?.interview_id,
                step: interviewData?.step,
            }).then((res) => {
                if (!res.error) {
                    historyUtils.push(RouteName.CANDIDATE_FEEDBACK_SUCCESS);
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            })
        }
    }, [setIsSubmitting, isSubmitting, form, interviewData]);

    return {
        formIndex,
        handleSubmit,
        handleNext,
         handlePrev,
        interviewData,
        isLoading,
        isSubmitting,
    };
};

export default useCandidateFeedback;
