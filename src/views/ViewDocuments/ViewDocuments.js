import LogUtils from "../../libs/LogUtils";
import useViewDocuments from "./ViewDocumentsHook";
import {useEffect, useState} from "react";
import styles from './Style.module.css';


const ViewDocuments = ({location}) => {
    const {} = useViewDocuments({});
    const { url } = location?.state;
    // const [blob, setBlob] = useState(null);
    //
    // useEffect(() => {
    //     LogUtils.log(url);
    //     fetch(url).then(r => r.blob()).then((res) => {
    //         LogUtils.log('res', res);
    //         setBlob(res);
    //     })
    // }, []);

    return (
        <div className={styles.mainContainer}>
            <iframe className={styles.iFrame} src={url} target="_parent" />
        </div>
    );
};

export default ViewDocuments;
