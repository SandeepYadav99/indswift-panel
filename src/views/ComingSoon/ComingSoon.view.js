import React from 'react';
import styles from './Style.module.css'

const ComingSoon = () => {
    return (
        <div>
           <div className={styles.vectorImg}>
               <img src={require('../../assets/img/ic_work in progress.png')} className={styles.img}/>
               <div className={styles.wip}>Work In Progress..</div>
               <div className={styles.cs}>Coming Live Soon!</div>
           </div>
        </div>
    )
}

export default ComingSoon
