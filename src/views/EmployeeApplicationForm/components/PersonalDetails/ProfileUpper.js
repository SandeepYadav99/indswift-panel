import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "../../Style.module.css";

function ProfileUpper({data, image, handleImageChange}) {
  return (
    <div className={styles.ProfileUpperWrapper}>
      <div className={styles.profileName}>
        <h2>Personal Information</h2>
        <p>{data?.name}</p>
        <p>{data?.email}</p>
        <p>{data?.contact}</p>
      </div>
      <div className={styles.profileimg}>
        <ButtonBase className={styles.edit}>UPLOAD NEW PICTURE</ButtonBase>
        <div>
        <img src={image ? require("../../../../assets/img/ic_employee image@2x.png") : URL.createObjectURL(image)} />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpper;
