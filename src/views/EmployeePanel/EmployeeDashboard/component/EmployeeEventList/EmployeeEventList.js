import { AppBar } from "@material-ui/core";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import styles from "./Style.module.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import BirthdayEvent from "./BirthdayEvent";
import { useSelector } from "react-redux";
import { WaitingComponent } from "../../../../../components/index.component";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      // aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function EmployeeEventList() {
  const [value, setValue] = useState(0);
  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [setValue, value]
  );

  const { reminders, isDateReminderCalling } = useSelector(
    (state) => state.employeeDashboard
  );

  if (isDateReminderCalling) {
    return <WaitingComponent />;
  }

  return (
    <div className={styles.eventBirthdayWrapper}>
      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={"iconTabs"} label="Birthday's" />
          <Tab className={"iconTabs"} label="Work Anniversaries " />
          <Tab className={"iconTabs"} label="Marrige Anniversaries " />
        </Tabs>
      </AppBar>
      <div className={styles.paperBackground1}>
        <TabPanel value={value} index={0} dir={"ltr"}>
          <BirthdayEvent data={reminders?.birthdays} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={"ltr"}>
          <BirthdayEvent isWorkPage={true} data={reminders?.marriageAnniversaries} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={"ltr"}>
          <BirthdayEvent data={reminders?.workAnniversaries} />
        </TabPanel>
      </div>
    </div>
  );
}

export default EmployeeEventList;
