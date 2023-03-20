import { ButtonBase } from "@material-ui/core";
import React from "react";
import styles from "../../Style.module.css";
import { useState } from "react";

function ProfileUpper({ data, image, handleImageChange, error, isDisabled }) {
  const getImgUrl = (image) => {
    if (image) {
      if (typeof image === "object") {
        return URL.createObjectURL(image);
      } else {
        return image;
      }
    } else {
      return require("../../../../assets/img/ic_employee image@2x.png");
    }
  };
  return (
    <div className={styles.ProfileUpperWrapper}>
      <div className={styles.profileName}>
        <h2>Personal Information</h2>
        <p>{data?.name}</p>
        <p>{data?.email}</p>
        <p>{data?.contact}</p>
      </div>
      <div className={styles.profileimg}>
        {!isDisabled && (
          <>
            <ButtonBase className={styles.edit}>
              <label htmlFor="imageUpload" className={styles.labelWrapper}>
                UPLOAD NEW PICTURE
              </label>
            </ButtonBase>
            <input
              type="file"
              id="imageUpload"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </>
        )}

        <div>
          <img className={styles.applicationImage} src={getImgUrl(image)} />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpper;
