
import React from 'react'
import styles from './Style.module.css'
const AttendanceTime = () => {
  return (
    <div className={styles.timeContainer}>
        <div className={styles.timePicker}>10:10 AM</div>
        <div className={styles.datePick}>05/07/2024 | Friday</div>
    </div>
  )
}

export default AttendanceTime