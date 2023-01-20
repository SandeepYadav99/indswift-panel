import {useCallback, useRef, useState} from "react";


const useInterviewerList = ({}) => {
    const [isPanel, setIsPanel] = useState(false);

    const toggleSidePanel = useCallback(() => {
        setIsPanel(e => !e);
    }, [setIsPanel]);

    return {
        isPanel,
        toggleSidePanel,
    }
};

export default useInterviewerList;
