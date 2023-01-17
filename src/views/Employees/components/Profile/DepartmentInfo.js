import React from "react";
import styles from "./Style.module.css";

const DepartmentInfo = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Department Information</div>

          <div className={styles.mainFlex}>
            <div className={styles.left} style={{ display: "flex" }}>
              <div style={{ marginRight: "15px" }}>
                <img
                  src={require("../../../../assets/img/performance image@2x.png")}
                  height={40}
                />
              </div>

              <div>
                <div className={styles.key}>
                  <span className={styles.value} style={{ minWidth: "150px" }}>
                    HOD Name:
                  </span>
                  <span className={styles.valueWrap}>
                    {data?.hod?.hod_name}
                  </span>
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Employee Code:</span>
                  <span className={styles.valueWrap}>{data?.hod?.hod_code}</span>
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Location:</span>
                  <span className={styles.valueWrap}>Delhi</span>
                </div>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                <span className={styles.valueWrap}>
                  {data?.department?.name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Sub-Department:</span>
                <span className={styles.valueWrap}>Web</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentInfo;
