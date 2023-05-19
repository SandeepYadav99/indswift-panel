import React, {useMemo} from 'react';
import styles from './Style.module.css';
import csx from 'classnames';
import {removeUnderScore} from '../../../../helper/helper'

const NomineeListComponent = ({data}) => {

    const table = useMemo(() => {
        return data.map((val) => {
            return (
                <div className={csx(styles.flex, styles.tableFlex)}>
                    <div className={styles.tableText}><b>Type</b>: {removeUnderScore(val?.type)}</div>
                    <div className={styles.tableText}><b>Name</b>: {val?.name}</div>
                    <div className={styles.tableText}><b>DOB</b>: {val?.dob ? val?.dob : '-'}</div>
                    <div className={styles.tableText}><b>Relation</b>: {val?.relation}</div>
                    <div className={styles.tableText}><b>Aadhar No</b>: {val?.aadhar_no}</div>
                </div>
            )
        });
    }, [data]);

    return (
        <div>
            {table}
        </div>
    )
};

export default NomineeListComponent;
