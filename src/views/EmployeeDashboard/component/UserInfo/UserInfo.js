import React, {useMemo} from "react";
import styles from "./Style.module.css";
import {useSelector} from "react-redux";

function UserInfo() {
  const { user: userData  } = useSelector(state => state.auth);
  const contact = useMemo(() => {
    if (userData?.contact?.official_contact) {
      return userData?.contact?.official_contact;
    }
    if (userData?.contact?.personal_contact) {
      return userData?.contact?.personal_contact;
    }
    return '';
  }, [userData]);

  const email = useMemo(() => {
    if (userData?.contact?.official_email) {
      return userData?.contact?.official_email;
    }
    if (userData?.contact?.personal_email) {
      return userData?.contact?.personal_email;
    }
    return '';
  }, [userData]);

  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.userInfoContainer}>
        <div className={styles.imageWrapeer}>
          <img
            src={userData?.image}
            className={styles.img}
          />
        </div>
        <div className={styles.UserinfoRight}>
          <div className={styles.watermarkWrapper}>
            <div>
              <p className={styles.username}>{userData?.name}</p>
              <p className={styles.userposition}>{userData?.designation_obj?.name}, {userData?.location?.name}</p>
              <p className={styles.usernumber}>{userData?.emp_code}</p>
            </div>
            <div>
              <img
                src={require("../../../../assets/img/logo_watermark.png")}
                className={styles.logo}
              />
            </div>
          </div>
          <div className={styles.UserinfoContactWrapper}>
            <p>{contact}</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
