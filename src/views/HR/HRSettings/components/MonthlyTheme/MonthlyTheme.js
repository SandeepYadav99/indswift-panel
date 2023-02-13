import React, {useMemo} from "react";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import MonthlyThemeHook from "./MonthlyThemeHook";
import styles from "./Style.module.css";
import csx from "classnames";
import File from "../../../../../components/FileComponent/FileComponent.component";
import Constants from "../../../../../config/constants";
import MonthlyThemeItem from "./MonthlyThemeItem";
import {WaitingComponent} from "../../../../../components/index.component";

function MonthlyTheme() {
  const {
    isCalling,
      data,
  } = MonthlyThemeHook({});

  const list = useMemo(() => {
    return Constants.MONTHS.map((item, index) => {
      const monthIndex = data.findIndex(val => val.month === index + 1);
      let tempData = null;
      if (monthIndex >= 0) {
        tempData = data[monthIndex];
      }
      return (
          <MonthlyThemeItem key={'MONTH_INDEX'+index} index={index+1} data={tempData} month={item} />
      );
    })
  }, [data]);

  if (isCalling) {
    return (<WaitingComponent />);
  }

  return (
    <div className={styles.monthlyThemeWrapper}>
      {list}
    </div>
  );
}

export default MonthlyTheme;
