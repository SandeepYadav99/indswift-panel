import {useCallback, useRef, useState, useEffect} from "react";
import LogUtils from "../../../libs/LogUtils";
import {
    serviceCandidateEAFUpdateQualification,
    serviceGetCandidateEafPersonalDetails, serviceGetCandidateEAFQualification
} from "../../../services/CandidateEAF.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import useEAFSession from "../EAFSessionHook";
import RouteName from "../../../routes/Route.name";

const useQualificationForm = ({}) => {
    const { candidateId } = useEAFSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const refQualificationDetails = useRef(null);
    const refProfessionalDetails = useRef(null);
    const handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    useEffect(() => {
       if (candidateId) {
           serviceGetCandidateEAFQualification({candidate_id: candidateId}).then((res) => {
               if (!res.error) {
                   const tempData = res?.data?.details;
                   if (tempData) {
                       const { qualification, professional_details ,other_professional_certifications} = tempData;
                       qualification && refQualificationDetails.current?.setData(qualification,other_professional_certifications);
                       professional_details && refProfessionalDetails.current?.setData(professional_details);
                   }
               }
           });
       }
    }, [candidateId]);
const handlePreviousPage=useCallback(()=>{
    historyUtils.push(RouteName.EAF_PERSONAL_DATA);
    handleScrollToTop()
},[]);
    const handleSubmit = useCallback(() => {
        if (!isSubmitting) {
            const isQualificationValid = refQualificationDetails.current.isValid();
            const isProfessionalDetailsValid = refProfessionalDetails.current.isValid();
            LogUtils.log('isQualificationValid', isQualificationValid, isProfessionalDetailsValid);

            if (isQualificationValid && isProfessionalDetailsValid) {
                setIsSubmitting(true);
                const qualificationData = refQualificationDetails?.current?.getData();
                const professionalDetails = refProfessionalDetails?.current?.getData();
                serviceCandidateEAFUpdateQualification({
                    candidate_id: candidateId,
                    qualification: qualificationData.fields,
                    other_professional_certifications: qualificationData.otherCertificates,
                    professional_details: professionalDetails?.data,
                }).then((res) => {
                    if (!res.error) {
                        historyUtils.push(RouteName.EAF_EMPLOYMENT_FORM);
                        handleScrollToTop()
                    } else {
                        SnackbarUtils.error(res?.message);
                    }
                    setIsSubmitting(false);
                })
            }
        }
    }, [isSubmitting, setIsSubmitting, candidateId]);

    return {
        refQualificationDetails,
        refProfessionalDetails,
        handleSubmit,
        isSubmitting,
        handlePreviousPage
    }
};

export default useQualificationForm;
