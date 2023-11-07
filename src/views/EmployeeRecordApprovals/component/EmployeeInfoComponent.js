import React from 'react';
import styles from './Style.module.css';

const EmployeeInfoComponent = ({data}) => {
    return (
        <div className={styles.flex}>
            <img src={data?.image} className={styles.image} />
            <div>
                <div className={styles.infoLabel}> <b>{data?.name}</b> </div>
                <div className={styles.infoLabel}>{data?.code}</div>
                <div className={styles.infoLabel}>{data?.location?.name}, {data?.department?.name}/{data?.sub_department?.name}</div>
            </div>
        </div>
    )
};

export default EmployeeInfoComponent;
