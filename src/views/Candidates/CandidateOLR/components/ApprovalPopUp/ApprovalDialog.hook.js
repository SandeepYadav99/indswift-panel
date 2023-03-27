import { useCallback } from "react";
import {useEffect, useState} from "react";
import historyUtils from "../../../../../libs/history.utils";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import {serviceGetOLRPanelist, serviceSubmitOfferStatus} from "../../../../../services/OfferLetter.service";

const useApprovalDialog = ({offerId}) => {
    const [panelists, setPanelists] = useState([]);
    const[isSubmitting,setIsSubmitting] = useState(false)

    useEffect(() => {
        serviceGetOLRPanelist({ offer_id: offerId }).then(res => {
            if (!res?.error) {
                setPanelists(res?.data);
            }
        })
    }, [offerId]);
    const handleSubmit = useCallback((val) => {
        if (!isSubmitting) {
            setIsSubmitting(true);;
            let req = serviceSubmitOfferStatus;
            req({offer_id: offerId,
                status: val
            }).then((res) => {
                if (!res.error) {
                    historyUtils.goBack();
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [ isSubmitting, setIsSubmitting, offerId ]);
    return {
        panelists,
        handleSubmit
    };
};

export default useApprovalDialog;
