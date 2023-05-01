import React, { useMemo } from "react";
import styles from "./Style.module.css";
import noEvent from "./../../../../../assets/img/ic_no event today.png";

function BirthdayEvent({ data, isWorkPage }) {
  function addOrdinalSuffix(num) {
    if (num === 0) {
      return 0;
    } else {
      const lastTwoDigits = num % 100;
      const lastDigit = lastTwoDigits % 10;
      const suffix =
        lastDigit === 1 && lastTwoDigits !== 11
          ? "st"
          : lastDigit === 2 && lastTwoDigits !== 12
          ? "nd"
          : lastDigit === 3 && lastTwoDigits !== 13
          ? "rd"
          : "th";
      return `${num}${suffix} Anniversary!`;
    }
  }
  const list = useMemo(() => {
    if (data?.length === 0) {
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
                  <span className={styles.profileName}>{emp?.name}</span>
                  {isWorkPage ? (
                    <>
                      <span className={styles.anni}>
                        {emp?.experience?.current && addOrdinalSuffix(emp?.experience?.current)}
                      </span>
                      <span className={styles.profileAddress}>
                        {`${emp?.designation} (${emp?.department} - ${emp?.location})`}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={styles.profilePosition}>
                        {emp?.designation}
                      </span>
                      <span className={styles.profileAddress}>
                        {`${emp?.department} - ${emp?.location}`}
                      </span>
                    </>
                  )}
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
