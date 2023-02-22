import {useCallback, useRef} from "react";
import LogUtils from "../../../libs/LogUtils";


const useQualificationForm = ({}) => {
    const refQualificationDetails = useRef(null);
    const refProfessionalDetails = useRef(null);

    const handleSubmit = useCallback(() => {
        const isQualificationValid = refQualificationDetails.current.isValid();
        const isProfessionalDetailsValid = refProfessionalDetails.current.isValid();
        LogUtils.log('isQualificationValid', isQualificationValid, isProfessionalDetailsValid);
    }, []);

    return {
        refQualificationDetails,
        refProfessionalDetails,
        handleSubmit
    }
};

export default useQualificationForm;
