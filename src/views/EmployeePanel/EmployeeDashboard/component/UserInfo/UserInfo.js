import React, { useMemo } from "react";
import styles from "./Style.module.css";
import { useSelector } from "react-redux";

function UserInfo() {
  const { user: userData } = useSelector((state) => state.auth);
  const contact = useMemo(() => {
    if (
      userData?.contact?.official_contact &&
      userData?.contact?.official_contact !== "NA"
    ) {
      return userData?.contact?.official_contact;
    }
    if (
      userData?.contact?.personal_contact &&
      userData?.contact?.personal_contact !== "NA"
    ) {
      return userData?.contact?.personal_contact;
    }
    return "";
  }, [userData]);

  const email = useMemo(() => {
    if (
      userData?.contact?.official_email &&
      userData?.contact?.official_email !== "NA"
    ) {
      return userData?.contact?.official_email;
    }
    if (
      userData?.contact?.personal_email &&
      userData?.contact?.personal_email !== "NA"
    ) {
      return userData?.contact?.personal_email;
    }
    return "";
  }, [userData]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userInfoContainer}>
          <div className={styles.imageWrapeer}>
            <img src={userData?.image} className={styles.img} />
          </div>
          <div className={styles.UserinfoRight}>
            <div className={styles.watermarkWrapper}>
              <div className={styles.description}>
                <p className={styles.username}>{userData?.name}</p>
                {userData?.designation?.name && userData?.location?.name ? (
                  <p className={styles.userposition}>
                    {userData?.designation?.name}, {userData?.location?.name}
                  </p>
                ) : (
                  <></>
                )}

                <p className={styles.usernumber}>{userData?.emp_code}</p>
              </div>
              {/* <div>
              <img
                src={require("../../../../../assets/img/logo_watermark.png")}
                className={styles.logo}
              />
            </div> */}
            </div>
            <div className={styles.UserinfoContactWrapper}>
              <div className={styles.contactInfo}>
                <img
                  src={require("../../../../../assets/img/ic_contact.png")}
                />
                <span>{contact}</span>
              </div>
              <div className={styles.contactInfo}>
                <img src={require("../../../../../assets/img/ic_email.png")} />
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
