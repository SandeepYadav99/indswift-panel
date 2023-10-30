import {useParams} from "react-router";
import  {useCallback,  useState} from "react";

import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const useCandidateInformation_Hook = ({}) => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isInterviewStatus, setIsInterviewStatus] = useState(-1)

    const handleChangeInterviewStatus = (value) => {
        setIsInterviewStatus(value)
    }

    const handleViewEditDetails = useCallback((data) => {
        historyUtils.push(RouteName.JOB_OPENINGS_UPDATE + data.id)
    }, []);

    return {
        isLoading,
        data,
        id,
        isInterviewStatus,
        handleChangeInterviewStatus,
        handleViewEditDetails
    };
};

export default useCandidateInformation_Hook;
