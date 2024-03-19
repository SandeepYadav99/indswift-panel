import React, { useMemo } from "react";
import styles from "./Style.module.css";
import { useSelector } from "react-redux";
import WaitingComponent from "../../../../../components/Waiting.component";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";

function RecentUpdate() {
  const { isCircularCalling, circulars } = useSelector(
    (state) => state.employeeDashboard
  );
  const startfiveValues = (value) => {
    if (value) {
      return value.slice(0, 4);
    }
  };
  const listItems = useMemo(() => {
    let listLength = startfiveValues(circulars).length - 1;
    return startfiveValues(circulars)?.map((data, index) => {
      if (data?.is_featured ) {
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
                <div
                  className={styles.descriptionName}
                  onClick={() => {
                    historyUtils.push(RouteName.VIEW_DOCUMENTS, {
                      url: data?.document,
                    });
                  }}
                >
                  {data?.name}
                </div>
                <span className={styles.effectiveDate}>
                  Effective Date: {data?.effectiveDateText}
                </span>
              </div>
            </div>
            {listLength && listLength === index ? (
              <></>
            ) : (
              <div className={styles.horizontalLine}></div>
            )}
          </div>
        );
      }
    });
  }, [circulars]);

  if (isCircularCalling) {
    return <WaitingComponent />;
  }

  return (
    <div className={styles.RecentUpdateContainer}>
      <div className={styles.containerData}>
        <div>
          <span className={styles.title}>Recent Circular & Policies </span>
          <div className={styles.newLine} />
        </div>
      </div>
      {/* <div className={styles.scrollRecentUpdate}> */}
      {listItems}
      {/* </div> */}
    </div>
  );
}

export default RecentUpdate;
