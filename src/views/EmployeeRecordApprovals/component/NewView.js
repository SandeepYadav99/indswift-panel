import React from 'react'
import styles from './Style.module.css'

const NewView = ({newValues}) => {
  
  return (
    <div class={styles.letterInfo}>
    <div>
      <span>Letter Title:</span>
      <span>{newValues?.title}</span>
    </div>
    <div>
      <span>Type of Letter:</span>
      <span>{newValues?.letter_type}</span>
    </div>
    <div>
      <span>Date of Issue:</span>
      <span>{newValues?.date_of_issue}</span>
    </div>
    <div className={styles.letterHead}>
      <div className={styles.head}>
        <span>Letter Head No. :</span>
        <span>{newValues?.letter_head_no}</span>
      </div>
      <div>
        <a href={newValues?.document ?? ""} target="_blank" className={styles.link}  >
        View File
        </a>
      </div>
    </div>
  </div>

  )
}

export default NewView