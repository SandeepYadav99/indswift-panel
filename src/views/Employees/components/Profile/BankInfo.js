import React from 'react';
import styles from "./Style.module.css"

const BankInfo = () => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Bank Details</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Bank Name:</span>HDFC Bank</div>
                            <div className={styles.key}><span className={styles.value}>Account Number:</span>123125432</div>
                            <div className={styles.key}><span className={styles.value}>IFSC Code:</span>123HDFC2345</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BankInfo
