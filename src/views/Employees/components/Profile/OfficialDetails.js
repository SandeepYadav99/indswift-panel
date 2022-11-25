import React from 'react';
import styles from "./Style.module.css"

const OfficialDetails = () => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Official Details</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>DOJ:</span>03/10/1994</div>
                            <div className={styles.key}><span className={styles.value}>Experience With Org:</span>1</div>
                            <div className={styles.key}><span className={styles.value}>Previous Org:</span>Oracle</div>
                            <div className={styles.key}><span className={styles.value}>Past Experience:</span>2</div>
                            <div className={styles.key}><span className={styles.value}>Total Experience:</span>5</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Grade:</span>A</div>
                            <div className={styles.key}><span className={styles.value}>Cadre:</span>-</div>
                            <div className={styles.key}><span className={styles.value}>Level:</span>A</div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OfficialDetails
