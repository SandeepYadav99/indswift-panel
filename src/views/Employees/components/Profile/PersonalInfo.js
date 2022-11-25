import React from 'react';
import styles from "./Style.module.css"

const PersonalInfo = () => {
    return (
        <div>
           <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Personal Information</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>DOB:</span>03/10/1994</div>
                            <div className={styles.key}><span className={styles.value}>Domicile State:</span>Delhi</div>
                            <div className={styles.key}><span className={styles.value}>Father's Name:</span>Aman</div>
                            <div className={styles.key}><span className={styles.value}>Mother's Name:</span>Nikita</div>
                            <div className={styles.key}><span className={styles.value}>Marital Status:</span>Unmarried</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>DOM:</span>03/10/1994</div>
                            <div className={styles.key}><span className={styles.value}>Spouse Name:</span>Naira</div>
                            <div className={styles.key}><span className={styles.value}>Children Name:</span>Aman</div>
                            <div className={styles.key}><span className={styles.value}>Gender:</span>Male</div>
                            <div className={styles.key}><span className={styles.value}>Blood Group:</span>A+</div>
                        </div>
                    </div>
                    
                </div>
           </div>
        </div>
    )
}

export default PersonalInfo
