import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../assets/img/download.png";

function FinalUpperCard({ data }) {
  return (
    <div className={styles.newContainer}>
      <div className={styles.editFlex}>
        <div className={styles.heading}>Employee Information</div>
      </div>

      <div className={styles.mainFlex}>
        <div className={styles.left221}>
          <div>
            <img
              className={styles.claimimg}
              src={data?.image ? data?.image : image}
            />
          </div>
          <div>
            <div className={styles.key}>
              <span className={styles.value}>Name:</span>
              {data?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Employee ID:</span>
              {data?.emp_code}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Location:</span>
              {data?.location?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>F&F Case Number:</span>
              {data?.location?.name}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>DOB:</span>
              {data?.location?.name}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Service Years with Org (round):
              </span>
              {data?.location?.name}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Date of Resignation:</span>
              {data?.location?.name}
            </div>
          </div>
        </div>
        <div className={styles.vertical}></div>
        <div className={styles.left}>
          <div className={styles.key}>
            <span className={styles.value}>Parting Designation:</span>
            {data?.designation?.name}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Grade/Cadre:</span>
            {`${data?.grade?.code} / ${data?.cadre?.code}`}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Department:</span>
            {data?.department?.name}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>DOJ:</span>
            {data?.department?.name}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Age on Separation Date:</span>
            {data?.department?.name}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Separation By Virtue of:</span>
            {data?.department?.name}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>
              Leaves to be added in Shortfall:
            </span>
            {data?.department?.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalUpperCard;
