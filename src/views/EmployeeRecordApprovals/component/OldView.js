import React from 'react'
import styles from './Style.module.css'

const OldView = ({oldData}) => {
  
  return (
    <div class={styles.letterInfo}>
    <div>
      <span>Letter Title:</span>
      <span> {oldData?.title}</span>
    </div>
    <div>
      <span>Type of Letter:</span>
      <span>{oldData?.letter_type}</span>
    </div>
    <div>
      <span>Date of Issue:</span>
      <span>{oldData?.date_of_issue}</span>
    </div>
    <div className={styles.letterHead}>
      <div className={styles.head}>
        <span>Letter Head No. :</span>
        <span>{oldData?.letter_head_no}</span>
      </div>
      <div>
        <a href={oldData?.document} target="_blank" className={styles.link}  >
        View File
        </a>
      </div>
    </div>
  </div>

  )
}

export default OldView