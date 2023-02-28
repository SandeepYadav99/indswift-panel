import {useEffect, useLayoutEffect, useRef, useState} from "react";
import LogUtils from "../../libs/LogUtils";


const useViewDocuments = ({}) => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        window.addEventListener('contextmenu', handleContextmenu);

        return () => {
            window.removeEventListener('contextmenu', handleContextmenu);
        }
    }, []);

    const handleContextmenu = e => {
        e.preventDefault()
    }

    return {
        width: size[0],
        height: size[1]
    };
};

export default useViewDocuments;
