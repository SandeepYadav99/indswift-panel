import React from 'react';
import styles from './Style.module.css';

const EmployeeInfoComponent = ({data}) => {
    return (
        <div className={styles.flex} style={{gap:"20px"}}>
            <img src={data?.image} className={styles.image} />
            <div>
                <div className={styles.infoLabel}> <b>{data?.name}</b> </div>
                <div className={styles.infoLabel}>{data?.code}</div>
                <div className={styles.infoLabel}>{data?.location?.name}, {data?.department?.name}/{data?.sub_department?.name}</div>
            </div>
            <div className={styles.linkContainer}>
              <a href={`/employees/details/${data?.code}` } target="_blank"  className={styles.linkText}>View Profile</a>
            </div>
        </div>
    )
};

export default EmployeeInfoComponent;
