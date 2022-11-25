import React from 'react';
import styles from "./Style.module.css"

const GovtInfo = () => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Govt ID Data</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Aadhar Number:</span>102243A34</div>
                            <div className={styles.key}><span className={styles.value}>PAN Number:</span>102243A34</div>
                            <div className={styles.key}><span className={styles.value}>ESI Number:</span>102243A34</div>
                            <div className={styles.key}><span className={styles.value}>UAN Number:</span>102243A34</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GovtInfo
