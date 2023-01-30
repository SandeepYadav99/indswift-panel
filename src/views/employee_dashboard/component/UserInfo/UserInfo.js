import React from "react";
import styles from "./Style.module.css";

function UserInfo() {
  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.userInfoContainer}>
        <div className={styles.imageWrapeer}>
          <img
            src={require("../../../../assets/img/image_guy.png")}
            className={styles.img}
          />
        </div>
        <div className={styles.UserinfoRight}>
          <div className={styles.watermarkWrapper}>
            <div>
              <p className={styles.username}>Kritika Bhatt</p>
              <p className={styles.userposition}>Sr Officer, Mumbai</p>
              <p className={styles.usernumber}>E1011</p>
            </div>
            <div>
              <img
                src={require("../../../../assets/img/logo_watermark.png")}
                className={styles.logo}
              />
            </div>
          </div>
          <div className={styles.UserinfoContactWrapper}>
            <p>9876456742</p>
            <p>kritika.bhatt@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
