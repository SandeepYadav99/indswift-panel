import {useCallback, useEffect, useRef, useState} from "react";
import handleSubmit from "redux-form/lib/handleSubmit";
import LogUtils from "../../../libs/LogUtils";
import {
    serviceCandidateEafUpdatePersonal,
    serviceGetCandidateEafPersonalDetails
} from "../../../services/CandidateEAF.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {serviceGetCandidateDetails} from "../../../services/Candidate.service";

const candidateId = '63d0e5eea347c9171a88d205';
const useEmployeePersonalForm = ({}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [candidateData, setCandidateData] = useState({});
    const refPersonalForm = useRef(null);
    const refContactForm = useRef(null);
    const refFamilyDetail = useRef(null);

    useEffect(() => {
        serviceGetCandidateDetails({ id: candidateId }).then((res) => {
            if(!res.error) {
                const tempData = res?.data;
                setCandidateData(tempData?.details);
            }
        });
        serviceGetCandidateEafPersonalDetails({candidate_id: candidateId}).then((res) => {
           if (!res.error) {
               const tempData = res?.data?.details;
               if (tempData) {
                   const { contact, family, ...rest } = tempData;
                   refPersonalForm.current?.setData(rest);
                   refContactForm.current?.setData(contact);
                   refFamilyDetail.current?.setData(family);
               }
           }
        });
    }, [candidateId]);

    const handleSubmit = useCallback(() => {
        if (!isSubmitting) {

            const isPersonalFormValid = refPersonalForm.current.isValid();
            const isContactFormValid = refContactForm.current.isValid();
            const isFamilyFormValid = refFamilyDetail.current.isValid();
            LogUtils.log('isPerosnalValid', isPersonalFormValid, isContactFormValid, isFamilyFormValid);
            if (isPersonalFormValid && isContactFormValid && isFamilyFormValid) {
                setIsSubmitting(true);
                const personalData = refPersonalForm.current.getData();
                const contactData = refContactForm.current.getData();
                const familyData = refFamilyDetail.current.getData();
                const fd = new FormData();
                fd.append('candidate_id', candidateId);
                Object.keys(personalData?.data).forEach(key => {
                   fd.append(key, personalData?.data?.[key]);
                });
                fd.append('contact', JSON.stringify(contactData?.data));
                fd.append('family', JSON.stringify(familyData?.data));
                serviceCandidateEafUpdatePersonal(fd).then((res) => {
                    if (!res.error) {
                        historyUtils.push('/2');
                    } else {
                        SnackbarUtils.error(res?.message);
                    }
                    setIsSubmitting(false);
                });
            }
        }
    }, [isSubmitting, setIsSubmitting]);

    return {
        refPersonalForm,
        handleSubmit,
        refContactForm,
        refFamilyDetail,
        isSubmitting,
        candidateData
    }
};

export default useEmployeePersonalForm;
