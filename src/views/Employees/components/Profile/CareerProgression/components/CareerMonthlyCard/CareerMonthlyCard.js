import React from "react";
import styles from "./Style.module.css";
import progressArrow  from '../../../../../../../assets/img/ic_arrow.png';
import uparrow  from '../../../../../../../assets/img/ic_upwards_whitearrow.png'


function CareerMonthlyCard({lastCard}) {
  return (
    <div className={styles.monthContainer}>
      <div className={styles.careerMonthlyContainer}>
        <div className={styles.monthWrap}>
          <span className={styles.ctcyear}>April 2018</span>
          <span className={styles.monthDate}>(15/06/2010 - 31/03/2011)</span>
        </div>
        <div className={styles.dgm}>
          <span>DGM</span>
        </div>
        <div className={styles.salaryinfo}>
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>CTC</span>
            <span className={styles.ctcyear}>19883</span>
          </div>
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>Salary:</span>
            <span className={styles.ctcyear}>19883</span>
          </div>
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>PLI:</span>
            <span className={styles.ctcyear}>19883</span>
          </div>{" "}
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>Others:</span>
            <span className={styles.ctcyear}>19883</span>
          </div>
        </div>
        <div className={styles.dgmGreen}>
          <span>Increment: 22948</span>
          <span>12% <img src={uparrow}/></span>
        </div>
      </div>
      {
        lastCard ? <></>:  <div className={styles.progressWrapper}>
        <img src={progressArrow}/>
      </div>
      }
     
    </div>
  );
}

export default CareerMonthlyCard;
