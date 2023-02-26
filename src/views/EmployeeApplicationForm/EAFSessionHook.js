import historyUtils from "../../libs/history.utils";
import {useEffect, useState} from "react";
import RouteName from "../../routes/Route.name";


const useEAFSession = () => {
    const [candidateId, setCandidateId] = useState(null);

    useEffect(() => {
        const canId = sessionStorage.getItem('CANDIDATE_ID');
        if (canId) {
            setCandidateId(canId);
        } else {
            historyUtils.push(RouteName.EAF_LOGIN);
        }
    }, []);

    return {
        candidateId,
    };
};

export default useEAFSession;
