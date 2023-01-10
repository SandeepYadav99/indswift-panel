import React from 'react';
import styles from './Style.module.css';

const UpperInfo = ({data}) => {
    
    return (
        <div>
            <div className={styles.blueBackground}>
                <div className={styles.innerContainer}>
                    <div><img src={require("../../assets/img/ic_employee image@2x.png")} height={70}/> </div>
                    <div className={styles.profileInfo}>
                        <div className={styles.name}>{data?.name}</div>
                        <div>{data.designation}</div>
                        <div>Employee Code: {data?.emp_code}</div>
                    </div>
                    <div className={styles.vertical}>

                    </div>
                    <div className={styles.rightInfo}>
                        <div><span className={styles.location}>Location</span> {data?.location?.name}</div>
                        <div><span className={styles.location}>Department</span> Corporate HBRP</div>
                        <div><span className={styles.location}>Sub-Department</span> {data?.sub_department?.name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpperInfo
