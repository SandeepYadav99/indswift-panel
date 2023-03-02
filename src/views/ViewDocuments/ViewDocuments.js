import LogUtils from "../../libs/LogUtils";
import useViewDocuments from "./ViewDocumentsHook";
import {useEffect, useState} from "react";
import styles from './Style.module.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.parcel2';
import {Button} from "@material-ui/core";


const ViewDocuments = ({location}) => {
    const { width, height } = useViewDocuments({});
    const { url } = location?.state;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [blob, setBlob] = useState(null);
    // const url = 'https://api.indswiftlabs.com/public/hr_knowledge_center/1677586396972_BES_2021.pdf';
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );

    // const [blob, setBlob] = useState(null);
    //
    useEffect(() => {
        fetch(url).then(r => r.blob()).then((res) => {
            setBlob(res);
        })
    }, []);


    return (
        <div className={styles.mainContainer}>
            <nav>
                <Button onClick={goToPrevPage}>Prev</Button>
                <Button onClick={goToNextPage}>Next</Button>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </nav>
            <Document
                file={blob}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page width={width < 400 ? 300 : 0} pageNumber={pageNumber} />
            </Document>

        </div>
    );
};

export default ViewDocuments;
