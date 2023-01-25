import { AppBar } from "@material-ui/core";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import styles from "./Style.module.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
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
  return (
    <div>
      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={"iconTabs"} label="Birthday's" />
          <Tab className={"iconTabs"} label="Work Annierversary " />
          <Tab className={"iconTabs"} label="Marrige Annierversary " />
        </Tabs>
      </AppBar>
      <div className={styles.paperBackground}>
        <TabPanel value={value} index={0} dir={"ltr"}>
          {/* <BirthdayEvent/> */}
        </TabPanel>
        <TabPanel value={value} index={1} dir={"ltr"}>
          abc
        </TabPanel>
      </div>
    </div>
  );
}

export default EmployeeEventList;
