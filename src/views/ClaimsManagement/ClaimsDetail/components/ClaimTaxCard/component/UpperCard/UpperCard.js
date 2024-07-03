import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../../../assets/img/download.png";
import StatusPill from "../../../../../../../components/Status/StatusPill.component";

function UpperCard({ data ,isDetail}) {
  return (
      <div className={styles.newContainer}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Employee Information</div>
            {
              isDetail && <div>
              <StatusPill status={isDetail}/>
            </div>
            }
        </div>

        <div className={styles.mainFlex}>
          <div className={styles.left221}>
            <div className={styles.imageContainer}>
              <img
                className={styles.claimimg}
                src={data?.image ? data?.image : image}
              />
            </div>
            <div className={styles.nameData}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {data?.name}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>PAN:</span>
                {data?.identity_date?.pan_no}
              </div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.left}>
            <div className={styles.nameHigher}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                <span>{data?.name}</span>
              </div>

              <div className={styles.key}>
                <span className={styles.value}>PAN:</span>
                <span>{data?.identity_date?.pan_no}</span>
              </div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.leftPartMarginMobile}>
              <div className={styles.key}>
                <span className={styles.value}>Employee ID:</span>
                <span>{data?.emp_code}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Address :</span>
                <span>{data?.address?.permanent}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UpperCard;
