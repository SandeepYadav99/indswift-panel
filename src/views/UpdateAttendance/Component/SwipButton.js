import React from 'react'
import styles from './Style.module.css'
import { ButtonBase } from '@material-ui/core'
const SwipButton = () => {
  return (
    <div className={styles.buttonContainer}>
          <ButtonBase  className={styles.swipBtn}>
          SWIPE RIGHT TO PUNCH IN
            </ButtonBase>
    </div>
  )
}

export default SwipButton