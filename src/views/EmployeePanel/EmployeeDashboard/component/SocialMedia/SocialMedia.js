import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Style.module.css";
import socialImages from "./SocialImages";
function SocialMedia() {
  const [hoveredfacebook, setHoveredfacebook] = useState(false);
  const [hoveredInsta, setHoveredInsta] = useState(false);
  const [hoveredtwitter, setHoveredtwitter] = useState(false);
  const [hoveredYouTube, setHoveredYouTube] = useState(false);
  const [hoveredLinkdin, setHoveredLinkdin] = useState(false);

  const handleHoverfacebook = () => {
    setHoveredfacebook(true);
  };
  const handleHoverInsta = () => {
    setHoveredInsta(true);
  };
  const handleHovertwitter = () => {
    setHoveredtwitter(true);
  };
  const handleHoverYouTube = () => {
    setHoveredYouTube(true);
  };
  const handleHoverLinkdin = () => {
    setHoveredLinkdin(true);
  };

  const handleMouseLeavefacebook = () => {
    setHoveredfacebook(false);
  };
  const handleMouseLeaveInsta = () => {
    setHoveredInsta(false);
  };
  const handleMouseLeavetwitter = () => {
    setHoveredtwitter(false);
  };
  const handleMouseLeaveYouTube = () => {
    setHoveredYouTube(false);
  };
  const handleMouseLeaveLinkdin = () => {
    setHoveredLinkdin(false);
  };
  return (
    <div className={styles.socialMediaWrapper}>
      <div className={styles.socialMediaDataValue}>
        <div className={styles.socialMediaHeading}>
          <span className={styles.title}>We are Social!</span>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.socialMediaCont2}>
      <div
        className={styles.logoWrapper}
        onMouseEnter={handleHoverfacebook}
        onMouseLeave={handleMouseLeavefacebook}
      >
        <Link
          to={{ pathname: "https://www.facebook.com/indswiftlabs849/" }}
          target="_blank"
        >
          <img
            className={styles.socialLogos}
            alt="Facebook"
            src={
              hoveredfacebook
                ? socialImages.facebook.active
                : socialImages.facebook.inactive
            }
          />
        </Link>
      </div>
      <div
        className={styles.logoWrapper}
        onMouseEnter={handleHoverLinkdin}
        onMouseLeave={handleMouseLeaveLinkdin}
      >
        <Link
          to={{ pathname: "https://www.linkedin.com/company/indswiftlabs" }}
          target="_blank"
        >
          <img
            className={styles.socialLogos}
            src={
              hoveredLinkdin
                ? socialImages.linkdin.active
                : socialImages.linkdin.inactive
            }
            alt="Linkedin"
          />
        </Link>
      </div>
      <div
        className={styles.logoWrapper}
        onMouseEnter={handleHovertwitter}
        onMouseLeave={handleMouseLeavetwitter}
      >
        <Link
          to={{ pathname: "https://twitter.com/indswiftlabs" }}
          target="_blank"
        >
          <img
            className={styles.socialLogos}
            alt="Twitter"
            src={
              hoveredtwitter
                ? socialImages.twitter.active
                : socialImages.twitter.inactive
            }
          />
        </Link>
      </div>
      <div
        className={styles.logoWrapper}
        onMouseEnter={handleHoverInsta}
        onMouseLeave={handleMouseLeaveInsta}
      >
        <Link
          to={{ pathname: "https://www.instagram.com/indswiftlabsltd/" }}
          target="_blank"
        >
          <img
            className={styles.socialLogos}
            alt="Instagram"
            src={
              hoveredInsta
                ? socialImages.instagram.active
                : socialImages.instagram.inactive
            }
          />
        </Link>
      </div>
      <div
        className={styles.logoWrapper}
        onMouseEnter={handleHoverYouTube}
        onMouseLeave={handleMouseLeaveYouTube}
      >
        <Link
          to={{
            pathname:
              "https://www.youtube.com/channel/UCQclIQOxy8kN8HwTqPqnchA?view_as=subscriber",
          }}
          target="_blank"
        >
          <img
            className={styles.socialLogos}
            alt="YouTube"
            src={
              hoveredYouTube
                ? socialImages.youtube.active
                : socialImages.youtube.inactive
            }
          />
        </Link>
      </div>
      </div>
    </div>
  );
}

export default SocialMedia;
