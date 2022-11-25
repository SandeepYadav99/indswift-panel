import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Style.module.css';

const UpperInfo = () => {
    return (
        <div>
            <div className={styles.blueBackground}>
                <div className={styles.innerContainer}>
                    <div><img src={require("../../assets/img/ic_employee image@2x.png")} height={70}/> </div>
                    <div className={styles.profileInfo}>
                        <div className={styles.name}>Akash Deep Sharma</div>
                        <div>Dy General Manager (Dy GM)</div>
                        <div>Employee Code: 300002000</div>
                    </div>
                    <div className={styles.vertical}>

                    </div>
                    <div className={styles.rightInfo}>
                        <div><span className={styles.location}>Location</span> Delhi</div>
                        <div><span className={styles.location}>Department</span> Corporate HBRP</div>
                        <div><span className={styles.location}>Sub-Department</span> HR</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpperInfo
