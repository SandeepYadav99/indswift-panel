import { AppBar } from "@material-ui/core";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import styles from "./Style.module.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import GenricSlider from "./GenricSlider";
import NewMembers from "./NewMembers";

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
function Members() {
  const [value, setValue] = useState(0);
  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [setValue, value]
  );
  return (
    <div className={styles.memberWrapper}>
      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={"iconTabs"} label="New Member of Ind swift Family" />
          <Tab
            className={"iconTabs"}
            label="Seperation from Ind Swift Family"
          />
        </Tabs>
      </AppBar>
      <div className={styles.paperBackground}>
        <TabPanel value={value} index={0} dir={"ltr"}>
          {/* <GenricSlider>
            <div>
              <h1 style={{ width: "25px" }}>fdsgj</h1>
            </div>
            <div>
              <h1 style={{ width: "25px" }}>fdsgj</h1>
            </div>
            <div>
              <h1 style={{ width: "25px" }}>fdsgj</h1>
            </div>
          </GenricSlider> */}
          <NewMembers />
        </TabPanel>
        <TabPanel value={value} index={1} dir={"ltr"}>
          abc
        </TabPanel>
      </div>
    </div>
  );
}

export default Members;
