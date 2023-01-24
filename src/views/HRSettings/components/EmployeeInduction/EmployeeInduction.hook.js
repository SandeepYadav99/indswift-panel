import {useCallback, useState} from "react";
import {serviceUploadEmployeeInduction} from "../../../../services/AppSettings.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";


const useEmployeeInduction = ({}) => {
    const [document, setDocument] = useState(null);
    const [error, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const fd = new FormData();
            fd.append('document', document);
            serviceUploadEmployeeInduction(fd).then((res) => {
                if (!res.error) {
                    SnackbarUtils.success('Employee Induction Document Uploaded');
                    setDocument(null);
                }

                setIsSubmitting(false);
            })
        }
    }, [isSubmitting, setIsSubmitting, document, setDocument]);

    const handleChange = useCallback((file) => {
        setDocument(file);
    }, [setDocument]);

    const getImageUrl = useCallback(() => {
        if (document) {
            return URL.createObjectURL(document)
        }  return require('../../../../assets/img/profile.png');
    }, [document]);

    return {
        document,
        handleChange,
        handleSubmit,
        error,
        getImageUrl,
        isSubmitting
    };
};

export default useEmployeeInduction;
