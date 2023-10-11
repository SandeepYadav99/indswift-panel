import React from "react";
import styles from "./Style.module.css";
import progressArrow  from '../../../../../../../assets/img/ic_arrow.png';
import uparrow  from '../../../../../../../assets/img/ic_upwards_whitearrow.png'


function CareerMonthlyCard({isFirst, isLast, data}) {
  return (
    <div className={styles.monthContainer}>
      <div className={styles.careerMonthlyContainer}>
        <div className={styles.monthWrap}>
          <span className={styles.ctcyear}>{data?.headerText}</span>
           <span className={styles.monthDate}>({data?.fromText}{!isFirst ? (<>- {data?.toText})</>) : ')'}</span>
        </div>
        <div className={styles.dgm}>
          <span>{data?.designation?.name}</span>
        </div>
        <div className={styles.salaryinfo}>
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>CTC</span>
            <span className={styles.ctcyear}>{data?.ctc}</span>
          </div>
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>Salary:</span>
            <span className={styles.ctcyear}>{data?.salary}</span>
          </div>
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>PLI:</span>
            <span className={styles.ctcyear}>{data?.pli}</span>
          </div>{" "}
          <div className={styles.ctcWrap}>
            <span className={styles.ctclabel}>Others:</span>
            <span className={styles.ctcyear}>{data?.others}</span>
          </div>
        </div>
        <div className={styles.dgmGreen}>
          <span>Increment: {data?.increment}</span>
          <span>{data?.percentage ? `${data?.percentage} % ` : 'NA'} {data?.percentage > 0 && (<img src={uparrow}/>)}</span>
        </div>
      </div>
      {
        isLast ? <></>:  <div className={styles.progressWrapper}>
        <img src={progressArrow}/>
      </div>
      }

    </div>
  );
}

export default CareerMonthlyCard;
