import React from "react";
import styles from "./Style.module.css";

const ResignInfo = ({ bankD }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Separation Details</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key41}>
                <span className={styles.value41}>Resignation Date::</span>
                {bankD?.resign_effective_date}
              </div>
              <div className={styles.key41}>
                <span className={styles.value41}>Last Working Date:</span>
                {bankD?.last_working_date}
              </div>
              <div className={styles.key41}>
                <span className={styles.value41}>Notes:</span>
                {bankD?.resign_note}
              </div>
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResignInfo;
