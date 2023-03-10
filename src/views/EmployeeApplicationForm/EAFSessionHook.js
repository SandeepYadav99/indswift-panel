import historyUtils from "../../libs/history.utils";
import {useEffect, useState} from "react";
import RouteName from "../../routes/Route.name";
import { useParams } from "react-router";


const useEAFSession = () => {
    const [candidateId, setCandidateId] = useState(null);
    const {id}=useParams()
    useEffect(() => {
        const canId = sessionStorage.getItem('CANDIDATE_ID');
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

export default useEAFSession;
