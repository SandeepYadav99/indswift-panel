import React from "react";
import styles from "./Style.module.css";
const IndividualList = () => {
  return (
    <div className={styles.newMemberCard}>
      <div className={styles.imageNameContainer}>
        <div className={styles.imageWrapper}>
          <img src={require("../../../../../assets/img/image_guy.png")} />
        </div>
        <div className={styles.profileContainer}>
          <span className={styles.profileName}>MR RISHAB MEHTA</span>
          <span className={styles.profilePosition}>5 Jan - Sr. Officer</span>
          <span className={styles.profileAddress}>Accounts (Mumbai)</span>
        </div>
      </div>
    </div>
  );
};
function NewMembers() {
  return (
    <div className={styles.newMemberWrapper}>
      <IndividualList />
      <IndividualList />
      <IndividualList />
      <IndividualList />
    </div>
  );
}

export default NewMembers;
