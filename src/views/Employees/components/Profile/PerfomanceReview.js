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
                            <img src={require('../../../../assets/img/performance image@2x.png')} height={40}/>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Reviewer Name:</span>{reviewer?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Employee Code:</span>{reviewer?.code}</div>
                        </div>
                    </div>

                    <div className={styles.horizontal}></div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Next Review Date:</span>03/10/2023</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Previous Review Date:</span>03/10/2021</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerformanceReview
