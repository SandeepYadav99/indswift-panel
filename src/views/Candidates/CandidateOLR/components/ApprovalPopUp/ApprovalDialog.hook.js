import {useEffect, useState} from "react";
import {serviceGetOLRPanelist} from "../../../../../services/OfferLetter.service";

const useApprovalDialog = ({offerId}) => {
    const [panelists, setPanelists] = useState([]);

    useEffect(() => {
        serviceGetOLRPanelist({ offer_id: offerId }).then(res => {
            if (!res?.error) {
                setPanelists(res?.data);
            }
        })
    }, [offerId]);

    return {

    };
};

export default useApprovalDialog;
