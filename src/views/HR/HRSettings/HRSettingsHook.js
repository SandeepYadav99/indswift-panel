import {useCallback, useEffect, useState} from "react";
import axios from "axios";


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
