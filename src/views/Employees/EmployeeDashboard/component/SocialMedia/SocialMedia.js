import React from "react";
import { Link } from "react-router-dom";
import styles from "./Style.module.css";

function SocialMedia() {
  return (
    <div className={styles.socialMediaWrapper}>
      <div className={styles.socialMediaHeading}>
        <span className={styles.title}>We are Social!</span>
        <div className={styles.newLine} />
      </div>
      <div>
        <Link
          to={{ pathname: "https://www.facebook.com/indswiftlabs849/" }}
          target="_blank"
        >
          <img
            style={{ cursor: "pointer" }}
            alt="Facebook"
            src={require("../../../../../assets/img/facebook.png")}
          />
        </Link>
      </div>
      <div>
        <Link
          to={{ pathname: "https://www.linkedin.com/company/indswiftlabs" }}
          target="_blank"
        >
          <img
            style={{ cursor: "pointer" }}
            src={require("../../../../../assets/img/linkedin.png")}
            alt="Linkedin"
          />
        </Link>
      </div>
      <div>
        <Link
          to={{ pathname: "https://twitter.com/indswiftlabs" }}
          target="_blank"
        >
          <img
            style={{ cursor: "pointer" }}
            alt="Twitter"
            src={require("../../../../../assets/img/twitter.png")}
          />
        </Link>
      </div>
      <div>
        <Link
          to={{ pathname: "https://www.instagram.com/indswiftlabsltd/" }}
          target="_blank"
        >
          <img
            style={{ cursor: "pointer" }}
            alt="Instagram"
            src={require("../../../../../assets/img/insta.png")}
          />
        </Link>
      </div>
      <div>
        <Link
          to={{
            pathname:
              "https://www.youtube.com/channel/UCQclIQOxy8kN8HwTqPqnchA?view_as=subscriber",
          }}
          target="_blank"
        >
          <img
            style={{ cursor: "pointer" }}
            alt="YouTube"
            src={require("../../../../../assets/img/youtube.png")}
          />
        </Link>
      </div>
    </div>
  );
}

export default SocialMedia;
