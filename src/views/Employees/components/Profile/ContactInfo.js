import React from "react";
import styles from "./Style.module.css";

const ContactInfo = ({ contact }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Contact Information</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Official Number:</span>
                <span className={styles.valueWrap}>
                  {contact?.official_contact
                    ? contact?.official_contact
                    : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Phone Number:</span>
                <span className={styles.valueWrap}>
                  {contact?.personal_contact
                    ? contact?.personal_contact
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Official Email:</span>
                <span className={styles.valueWrap}>
                  {contact?.official_email ? contact?.official_email : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Personal Email:</span>
                <span className={styles.valueWrap}>
                  {contact?.personal_email ? contact?.personal_email : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
