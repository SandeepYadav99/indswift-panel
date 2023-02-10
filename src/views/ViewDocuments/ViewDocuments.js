import LogUtils from "../../libs/LogUtils";
import useViewDocuments from "./ViewDocumentsHook";
import {useEffect, useState} from "react";


const ViewDocuments = ({location}) => {
    const {} = useViewDocuments({});
    const { url } = location?.state;
    const [blob, setBlob] = useState(null);

    useEffect(() => {
        LogUtils.log(url);
        fetch(url).then(r => r.blob()).then((res) => {
            LogUtils.log('res', res);
            setBlob(res);
        })
    }, []);

    LogUtils.error('url', url);
    return (
        <div>
            <iframe src={blob} target="_parent" />
        </div>
    );
};

export default ViewDocuments;
