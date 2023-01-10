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
                
                {contact?.official_contact}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Phone Number:</span>
                {contact?.personal_contact}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Official Email:</span>
                {contact?.official_email}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Personal Email:</span>
                {contact?.personal_email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
