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
                <span className={styles.value}>Present Address:</span>
                <span className={styles.valueWrap}>
                  {contact?.current_address ? contact?.current_address : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>
                  Residence Number (with STD code):
                </span>
                <span className={styles.valueWrap}>
                  {contact?.residence_contact
                    ? contact?.residence_contact
                    : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Emergency Contact Name:</span>
                <span className={styles.valueWrap}>
                  {contact?.emergency_name ? contact?.emergency_name : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>
                  Emergency Contact Relation:
                </span>
                <span className={styles.valueWrap}>
                  {contact?.emergency_relation
                    ? contact?.emergency_relation
                    : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Emergency Contact Number:</span>
                <span className={styles.valueWrap}>
                  {contact?.emergency_contact
                    ? contact?.emergency_contact
                    : "N/A"}
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
