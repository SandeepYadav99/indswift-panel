import {useCallback, useState} from "react";


const useHRSettings = ({}) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabs = useCallback((value, index) => {
        setTabIndex(index)
    }, [setTabIndex]);

    return {
        tabIndex,
        handleTabs
    }
};

export default useHRSettings;
