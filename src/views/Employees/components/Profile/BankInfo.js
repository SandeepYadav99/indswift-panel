import React from 'react';
import styles from "./Style.module.css"

const BankInfo = ({bankD}) => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Bank Details</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Bank Name:</span>{bankD?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Account Number:</span>{bankD?.account_no}</div>
                            <div className={styles.key}><span className={styles.value}>IFSC Code:</span>{bankD?.ifsc}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BankInfo
