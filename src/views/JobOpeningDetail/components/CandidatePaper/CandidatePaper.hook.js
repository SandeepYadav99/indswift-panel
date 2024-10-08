import {useState} from "react";
import {useCallback} from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";


const useCandidatePaper = ({jobId}) => {
    const [candidateEl, setCandidateEl] = useState(null);
    const [isCandidatePanel, setIsCandidatePanel] = useState(false);
    const [isCandidateInterviewPanel, setIsCandidateInterviewPanel] =
        useState(false);
    const [isCandidateShortlistPanel, setIsCandidateShortlistPanel] =
        useState(false);

    const handleAddCandidate = useCallback(
        (event) => {
            setCandidateEl(event.currentTarget);
        },
        [setCandidateEl]
    );

    const handleCloseCandidateEl = useCallback(() => {
        setCandidateEl(null);
    }, [setCandidateEl]);

    const handleCandidateMenu = useCallback(
        (type) => {
            if (type === "CREATE") {
                historyUtils.push(RouteName.CANDIDATES_CREATE, {
                    job_id: jobId,
                });
            } else {
                setIsCandidatePanel(true);
            }
            setCandidateEl(null);
        },
        [setCandidateEl, setIsCandidatePanel, jobId]
    );
    const handleCandidateInterviewMenu = useCallback(
        (type) => {
            if (type === "CREATE") {
                // historyUtils.push(RouteName.CANDIDATES_CREATE, {
                //   job_id: id,
                // }
                // );
            }
            else {
                setIsCandidateInterviewPanel(true);
            }
            setCandidateEl(null);
        },
        [setCandidateEl, setIsCandidatePanel, jobId]
    );
    const handleCandidateShortlistMenu = useCallback(
        (type) => {
            if (type === "CREATE") {
                // historyUtils.push(RouteName.CANDIDATES_CREATE, {
                //   job_id: id,
                // });
            }
            else {
                setIsCandidateShortlistPanel(true);
            }
            setCandidateEl(null);
        },
        [setCandidateEl, setIsCandidatePanel, jobId]
    );
    const toggleCandidatePanel = useCallback(() => {
        setIsCandidatePanel((e) => !e);
    }, [setIsCandidatePanel]);

    const toggleCandidateInterviewPanel = useCallback(() => {
        setIsCandidateInterviewPanel((e) => !e);
    }, [setIsCandidateInterviewPanel]);

    const toggleCandidateShortlistPanel = useCallback(() => {
        setIsCandidateShortlistPanel((e) => !e);
    }, [setIsCandidateShortlistPanel]);

    return {
        handleAddCandidate,
        candidateEl,
        handleCloseCandidateEl,
        handleCandidateMenu,
        handleCandidateShortlistMenu,
        handleCandidateInterviewMenu,
        toggleCandidatePanel,
        isCandidatePanel,
        isCandidateInterviewPanel,
        isCandidateShortlistPanel,
        toggleCandidateInterviewPanel,
        toggleCandidateShortlistPanel,
    }
};

export default useCandidatePaper;
