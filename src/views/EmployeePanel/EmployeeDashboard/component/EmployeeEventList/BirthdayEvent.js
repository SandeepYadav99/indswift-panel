import React, { useMemo } from "react";
import styles from "./Style.module.css";
import noEvent from "./../../../../../assets/img/ic_no event today.png";

function BirthdayEvent({ data, isWorkPage }) {
  const list = useMemo(() => {
    if (data.length === 0) {
      return (
        <div className={styles.noEventWrapper}>
          <div className={styles.noEvent}>
            <img src={noEvent} />
            <span>No Events for Today!</span>
          </div>
        </div>
      );
    } else {
      return data?.map((emp) => {
        return (
          <div className={styles.birthdayEventWrapper}>
            <div className={styles.parentWrapper}>
              <div className={styles.imageNameContainer}>
                <div>
                  <img src={emp.image} className={styles.userImage} />
                </div>
                <div className={styles.profileContainer}>
                  <span className={styles.profileName}>
                     {emp?.name}
                  </span>
                  <span className={styles.profilePosition}>
                    {emp?.designation}
                  </span>
                  <span className={styles.profileAddress}>
                    {`${emp?.department} - ${emp?.location}`}
                  </span>
                </div>
              </div>
              <div>
                {isWorkPage ? (
                  <div className={styles.workLogo}>
                    <img
                      src={require("../../../../../assets/img/ic_anniversary.png")}
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={require("../../../../../assets/img/birthday.png")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      });
    }
  }, [data]);

  return <div className={styles.paperBackground}>{list} </div>;
}

export default BirthdayEvent;
