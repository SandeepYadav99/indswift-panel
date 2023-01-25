import React from "react";
import styles from "./Style.module.css";

function UserInfo() {
  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.userInfoContainer}>
        <div className={styles.imageWrapeer}>
          <img
            src={require("../../../../assets/img/ic_work in progress.png")}
            className={styles.img}
          />
        </div>
        <div className={styles.UserinfoRight}>
          <div>
            <p className={styles.username}>Kritika Bhatt</p>
            <p className={styles.userposition}>Sr Officer, Mumbai</p>
            <p className={styles.usernumber}>E1011</p>
          </div>
          <div className={styles.UserinfoContactWrapper}>
            <p>9876456742</p>
            <p>kritika.bhatt@gmail.com</p>
          </div>
        </div>
        <div>
          {/* <img
            src={require("../../../../assets/img/login logo@2x.png")}
            className={styles.logo}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
