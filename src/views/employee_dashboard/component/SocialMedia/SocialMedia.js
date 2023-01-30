import React from "react";
import styles from "./Style.module.css";

function SocialMedia() {
  return (
    <div className={styles.socialMediaWrapper}>
      <div className={styles.socialMediaHeading}>
        <span className={styles.title}>We are Social!</span>
        <div className={styles.newLine} />
      </div>
      <div>
        <img
          style={{ cursor: "pointer" }}
          src={require("../../../../assets/img/facebook.png")}
        />
      </div>
      <div>
        <img
          style={{ cursor: "pointer" }}
          src={require("../../../../assets/img/linkedin.png")}
        />
      </div>
      <div>
        <img
          style={{ cursor: "pointer" }}
          src={require("../../../../assets/img/twitter.png")}
        />
      </div>
      <div>
        <img
          style={{ cursor: "pointer" }}
          src={require("../../../../assets/img/insta.png")}
        />
      </div>
      <div>
        <img
          style={{ cursor: "pointer" }}
          src={require("../../../../assets/img/youtube.png")}
        />
      </div>
    </div>
  );
}

export default SocialMedia;
