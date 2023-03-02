import React, {useMemo} from 'react';
import useCandidateFeedback from "./CandidateFeedbackForm.hook";
import EvaluationForm from "./EvaluationForm.view";
import {WaitingComponent} from "../../components/index.component";
import NextPageForm from "./component/NextPageForm/NextPageForm";
import SnackbarComponent from "../../components/Snackbar.component";

const CandidateFeedbackForm = ({ }) => {
    const { isLoading, interviewData, handlePrev, handleNext, handleSubmit, formIndex, isSubmitting } = useCandidateFeedback({});

    const selectedForm = useMemo(() => {
        if (formIndex === 0) {
            return <EvaluationForm isSubmitting={isSubmitting} data={interviewData} handleNext={handleNext} />;
        } else {
            return (<NextPageForm isSubmitting={isSubmitting} data={interviewData} handlePrev={handlePrev} handleSubmit={handleSubmit} />);
        }
    }, [formIndex, isSubmitting, interviewData, handlePrev, handleNext, handleSubmit]);

    if (isLoading) {
        return (<WaitingComponent />);
    }

    return (
        <div>
            {selectedForm}
            <SnackbarComponent />
        </div>
    )
}

export default CandidateFeedbackForm;
