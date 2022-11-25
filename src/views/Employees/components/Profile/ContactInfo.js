import React from 'react';
import styles from "./Style.module.css"

const ContactInfo = () => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Contact Information</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Official Number:</span>909090909</div>
                            <div className={styles.key}><span className={styles.value}>Phone Number:</span>909090909</div>
                            <div className={styles.key}><span className={styles.value}>Official Email:</span>a@indswift.com</div>
                            <div className={styles.key}><span className={styles.value}>Personal Email:</span>b@indswift.com</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ContactInfo
