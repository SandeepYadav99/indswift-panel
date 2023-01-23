import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "../../Style.module.css";

function ProfileUpper() {
  return (
    <div className={styles.ProfileUpperWrapper}>
      <div className={styles.profileName}>
        <h2>Personal Information</h2>
        <p>Aman Sharma</p>
        <p>aman@gmail.com</p>
        <p>5858855858</p>
      </div>
      <div className={styles.profileimg}>
        <ButtonBase className={styles.edit}>UPLOAD NEW PICTURE</ButtonBase>
        <div>
        <img src={require("../../../../assets/img/ic_employee image@2x.png")} />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpper;
