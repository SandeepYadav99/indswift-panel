import {useCallback, useRef} from "react";
import handleSubmit from "redux-form/lib/handleSubmit";
import LogUtils from "../../../libs/LogUtils";


const useEmployeePersonalForm = ({}) => {
    const refPersonalForm = useRef(null);
    const refContactForm = useRef(null);
    const refFamilyDetail = useRef(null);

    const handleSubmit = useCallback(() => {
        const isPersonalFormValid = refPersonalForm.current.isValid();
        const isContactFormValid = refContactForm.current.isValid();
        const isFamilyFormValid = refFamilyDetail.current.isValid();
        LogUtils.log('isPerosnalValid', isPersonalFormValid, isContactFormValid, isFamilyFormValid);
        if (Object.keys(isPersonalFormValid).length === 0) {
            LogUtils.log(refPersonalForm.current.getData());
        }
    }, []);

    return {
        refPersonalForm,
        handleSubmit,
        refContactForm,
        refFamilyDetail
    }
};

export default useEmployeePersonalForm;
