import LogUtils from "../../libs/LogUtils";
import useViewDocuments from "./ViewDocumentsHook";
import {useEffect, useMemo, useState} from "react";
import styles from './Style.module.css';
import WaitingComponent from "../../components/Waiting.component";


const ViewDocuments = ({location}) => {
    const { width, height } = useViewDocuments({});
    const [isLoading, setIsLoading] = useState(true);
    let { url } = location?.state;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [blob, setBlob] = useState(null);
    const [isMount, setIsMount] = useState(false);
    // url = 'https://api.indswiftlabs.com/public/hr_circulars/1677585840273_Circular-_Pertaining_to_flow_of_papers_in_proper_channel.pdf';

    useEffect(() => {
        setIsMount(true);
        return () => {
            setIsMount(false);
        }
    }, [url]);

    // const onDocumentLoadSuccess = ({ numPages }) => {
    //     setNumPages(numPages);
    // };
    //
    // const goToPrevPage = () =>
    //     setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
    //
    // const goToNextPage = () =>
    //     setPageNumber(
    //         pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
    //     );

    // const [blob, setBlob] = useState(null);
    //
    // useEffect(() => {
    //     fetch(url).then(r => r.blob()).then((res) => {
    //         setBlob(res);
    //     })
    // }, []);

    const renderWaiting = useMemo(() => {
        return isLoading ? (<WaitingComponent/>) : (<div></div>);
    }, [isLoading]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.blockage}></div>
            <div className={styles.blockage2}></div>
            <div className={styles.topBlock}></div>
            <div className={styles.bottomBlock}></div>
            {/*<nav>*/}
            {/*    <Button onClick={goToPrevPage}>Prev</Button>*/}
            {/*    <Button onClick={goToNextPage}>Next</Button>*/}
            {/*    <p>*/}
            {/*        Page {pageNumber} of {numPages}*/}
            {/*    </p>*/}
            {/*</nav>*/}
            {renderWaiting}
            {isMount && (<iframe
                onLoad={() => { setIsLoading(false) }}
                src={`https://drive.google.com/viewer?embedded=true&url=${url}#toolbar=0&scrollbar=0`}
                height="100%"
                width="100%"
                frameBorder="0"
                scrolling="auto"
            ></iframe>)}
            {/*<Document*/}
            {/*    file={blob}*/}
            {/*    onLoadSuccess={onDocumentLoadSuccess}*/}
            {/*>*/}
            {/*    <Page width={width < 400 ? 300 : width / 1.5} pageNumber={pageNumber} />*/}
            {/*</Document>*/}

        </div>
    );
};

export default ViewDocuments;
