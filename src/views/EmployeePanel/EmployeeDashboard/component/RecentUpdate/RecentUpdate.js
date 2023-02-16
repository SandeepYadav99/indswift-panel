import React, { useMemo } from "react";
import styles from "./Style.module.css";
import { useSelector } from "react-redux";
import { WaitingComponent } from "../../../../../components/index.component";

function RecentUpdate() {
  const { isCircularCalling, circulars } = useSelector(
    (state) => state.employeeDashboard
  );
  const startfiveValues = (value) => {
    if (value) {
      return value.slice(0, 3);
    }
  };
  const listItems = useMemo(() => {
    let listLength = startfiveValues(circulars).length - 1;
    return startfiveValues(circulars)?.map((data, index) => {
      return (
        <div key={` recent_event${index}`}>
          <div className={styles.descriptionContainer}>
            <div>
              <img
                src={
                  data?.type === "CIRCULAR"
                    ? require("../../../../../assets/img/circular.png")
                    : require("../../../../../assets/img/policy.png")
                }
              />
            </div>
            <div className={styles.description}>
              <a
                target={"_blank"}
                href={data?.document}
                className={styles.descriptionName}
              >
                {data?.name}
              </a>
              <span className={styles.effectiveDate}>
                Effective Date: {data?.effectiveDateText}
              </span>
            </div>
          </div>
          { listLength && (listLength === index) ? (
            <></>
          ) : (
            <div className={styles.horizontalLine}></div>
          )}
        </div>
      );
    });
  }, [circulars]);

  if (isCircularCalling) {
    return <WaitingComponent />;
  }

  return (
    <div className={styles.RecentUpdateContainer}>
      <div>
        <span className={styles.title}>Recent Circular & Policies</span>
        <div className={styles.newLine} />
      </div>
      {/* <div className={styles.scrollRecentUpdate}> */}
      {listItems}
      {/* </div> */}
    </div>
  );
}

export default RecentUpdate;
