import {useCallback, useRef} from "react";
import handleSubmit from "redux-form/lib/handleSubmit";
import LogUtils from "../../../libs/LogUtils";


const useEmployeePersonalForm = ({}) => {
    const refPersonalForm = useRef(null);

    const handleSubmit = useCallback(() => {
        const isPersonalFormValid = refPersonalForm.current.isValid();
        LogUtils.log('isPerosnalValid', isPersonalFormValid);
        if (Object.keys(isPersonalFormValid).length === 0) {
            LogUtils.log(refPersonalForm.current.getData());
        }
    }, []);

    return {
        refPersonalForm,
        handleSubmit
    }
};

export default useEmployeePersonalForm;
