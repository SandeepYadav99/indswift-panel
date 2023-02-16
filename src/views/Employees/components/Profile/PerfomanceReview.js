import React from 'react';
import styles from "./Style.module.css"

const PerformanceReview = ({reviewer}) => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Performance Review Info</div>

                    <div className={styles.mainFlex}>
                        <div style={{marginRight:'15px'}}>
                            <img src={reviewer?.image} height={40}/>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Reviewer Name:</span>{reviewer?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Employee Code:</span>{reviewer?.code ? reviewer?.code : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.horizontal}></div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Next Review Date:</span>{reviewer?.next_review_date}</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Previous Review Date:</span>{reviewer?.previous_review_date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerformanceReview
