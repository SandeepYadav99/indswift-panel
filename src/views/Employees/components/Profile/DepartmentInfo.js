import React from 'react';
import styles from "./Style.module.css"

const DepartmentInfo = ({data}) => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Department Information</div>

                    <div className={styles.mainFlex}>
                        <div className={styles.left} style={{display:'flex'}}>
                            <div style={{marginRight: '15px'}}>
                                <img src={require('../../../../assets/img/performance image@2x.png')} height={40}/>
                            </div>

                            <div>
                                <div className={styles.key}><span className={styles.value}>HOD Name:</span>{data?.hod?.hod_name}</div>
                                <div className={styles.key}><span className={styles.value}>Employee Code:</span>{data?.emp_code}
                                </div>
                                <div className={styles.key}><span className={styles.value}>Location:</span>Delhi</div>
                            </div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Department:</span>{data?.department?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Sub-Department:</span>Web</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DepartmentInfo
