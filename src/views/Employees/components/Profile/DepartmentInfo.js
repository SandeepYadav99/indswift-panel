import React from 'react';
import styles from "./Style.module.css"

const DepartmentInfo = () => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Department Information</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>HOD Name:</span>Aman</div>
                            <div className={styles.key}><span className={styles.value}>Employee Code:</span>10023</div>
                            <div className={styles.key}><span className={styles.value}>Location:</span>Delhi</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Department:</span>Technology</div>
                            <div className={styles.key}><span className={styles.value}>Sub-Departmetn:</span>Web</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DepartmentInfo
