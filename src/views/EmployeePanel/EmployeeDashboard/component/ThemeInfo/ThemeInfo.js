import React, {useMemo} from "react";
import styles from "./Style.module.css";
import {useSelector} from "react-redux";
import WaitingComponent from "../../../../../components/Waiting.component";

function ThemeInfo() {
  const { isTilesCalling, tiles } = useSelector(state => state.employeeDashboard);
  const linearGradientProp= `linear-gradient(
    90deg,
    #161616 0%,
    #262626cc 15%,
    #2d2d2dbf 30%,
    #33333399 45%,
    #40404073 68%,
    #49494900 83%,
    #63636300 100%
  )`
  const data = useMemo(() => {
    return tiles?.theme;
  }, [tiles?.theme]);

  if (isTilesCalling) {
    return (<WaitingComponent />);
  }

  return (
    <div className={styles.userInfoWrapper} style={{ backgroundImage: `${linearGradientProp}, url(${data?.cover_image})` }}>
      <div className={styles.themeContainer}>
        <div>
          <p className={styles.themeInfoUpper}>
            Theme of the Month - {data?.monthText} {data?.year}
          </p>
        </div>
        <div className={styles.themeInfoLower}>
          <p>{data?.title}</p>
        </div>
      </div>
    </div>
  );
}

export default ThemeInfo;
