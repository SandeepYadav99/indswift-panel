import {useEffect, useState} from "react";
import { useParams } from "react-router";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";


const useIRFSession = () => {
    const [candidateId, setCandidateId] = useState(null);
    const {id}=useParams()
    useEffect(() => {
        const canId = sessionStorage.getItem('CANDIDATE_IRF_ID');
        if (canId || id) {
            setCandidateId(id ? id : canId);
        } else {
            historyUtils.push(RouteName.EAF_LOGIN);
        }
    }, [id]);

    return {
        candidateId,
    };
};

export default useIRFSession;
