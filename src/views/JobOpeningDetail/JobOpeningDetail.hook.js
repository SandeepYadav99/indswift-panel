import {useParams} from "react-router";
import React, {useCallback, useEffect, useState} from "react";
import {serviceJobOpeningsDetails} from "../../services/JobOpenings.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";


const useJobOpeningDetail = ({}) => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [candidateEl, setCandidateEl] = useState(null);
    const [isCandidatePanel, setIsCandidatePanel] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        serviceJobOpeningsDetails({ id: id }).then((res) => {
            if (!res.error) {
                setData(res.data.details);
            } else {
                SnackbarUtils.error(res.message);
            }
            setIsLoading(false);
        });
    }, [id]);

    const handleAddCandidate = useCallback((event) => {
        setCandidateEl(event.currentTarget);
    }, [setCandidateEl]);

    const handleCloseCandidateEl = useCallback(() => {
        setCandidateEl(null);
    }, [setCandidateEl]);

    const handleCandidateMenu = useCallback((type) => {
        if (type === 'CREATE') {
            historyUtils.push(RouteName.CANDIDATES_CREATE, {
                job_id: id
            });
        } else {
            setIsCandidatePanel(true);
        }
        setCandidateEl(null);
    }, [setCandidateEl, setIsCandidatePanel, id])

    const toggleCandidatePanel = useCallback(() => {
        setIsCandidatePanel(e => !e);
    }, [setIsCandidatePanel]);

    return {
        isLoading,
        data,
        handleAddCandidate,
        candidateEl,
        handleCloseCandidateEl,
        handleCandidateMenu,
        toggleCandidatePanel,
        isCandidatePanel,
        id
    };
};

export default useJobOpeningDetail;
