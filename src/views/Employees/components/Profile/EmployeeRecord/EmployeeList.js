import React from "react";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import styles from "./Style.module.css";

function EmployeeList({className, data}) {
    return (
        <div className={styles.recordItem}>
            <div className={styles.colorCode}></div>
            <div className={styles.grossWrapper21}>
                <div className={className ? className : styles.grossSalaryWrapper} style={{gap:'15px'}}>
                    <div className={styles.tableComponentField}>
                        <div className={styles.title}>{data?.title} <span className={styles.typeCont}>{data?.letter_type &&  ` - ${data?.letter_type} LETTER` } {data?.star_type && ` - ${data?.star_type} STAR`}</span></div>
                        <div className={styles.historyDes}>Letter Head Number: {data?.letter_head_no ? data?.letter_head_no : '-'}</div>
                        <div className={styles.historyDes}>{data?.description}</div>
                    </div>
                    <div className={styles.tableAnnualField}>
                        <StatusPill status={data?.type}/>
                    </div>
                    <div className={styles.dateField}>
                        <strong>{data?.dateOfIssueText}</strong>
                        <br/>
                        <a href={data?.document} target={'_blank'}  className={styles.letterLink}>View Letter</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeList;
