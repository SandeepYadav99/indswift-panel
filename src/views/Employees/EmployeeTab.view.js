import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch, useSelector } from "react-redux";
import history from "../../libs/history.utils";
import { Button, ButtonBase } from "@material-ui/core";
import UpperInfo from "./UpperInfo.view";
import ProfileView from "./Profile.view";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useEmployeesTab from "./EmployeesTabHook";
import { actionGetEmployeeDetails } from "../../actions/Employee.action";
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const EmployeeTab = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const getEmployeeidFromUrl = () => {
    let url = window.location.pathname;
    let getValues = url.split("/")[3];
    return getValues ? getValues : "";
  };
  
  useEffect(() => {
    dispatch(actionGetEmployeeDetails(getEmployeeidFromUrl()));
  }, []);
  const { employeeData } = useSelector((state) => state.employee);

  console.log("employeeData....", employeeData);
  
  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [setValue, value]
  );

  return (
    <div>
      <div className={"container"}>
        <div className={styles.outerFlex}>
          <div>
            <ButtonBase onClick={() => history.goBack()}>
              <ArrowBackIosIcon
                fontSize={"small"}
                className={styles.backIcon}
              />
            </ButtonBase>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem" }}>
              <b>View Employee</b>
            </div>
            <div className={styles.newLine} />
          </div>
        </div>
        <br />
        <div>
          <UpperInfo data={employeeData} />
        </div>

        <div>
          <AppBar position="static" className={styles.backgroundColor}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab className={"iconTabs"} label="Profile" />
              <Tab className={"iconTabs"} label="Salary Info" />
              <Tab
                className={"iconTabs"}
                label="Career Progression Chart (CPC)"
              />
              <Tab className={"iconTabs"} label="Employee Records" />
            </Tabs>
          </AppBar>

          <div className={styles.paperBackground}>
            <TabPanel value={value} index={0} dir={"ltr"}>
              <ProfileView data={employeeData} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={"ltr"}></TabPanel>
            <TabPanel value={value} index={2} dir={"ltr"}></TabPanel>
            <TabPanel value={value} index={3} dir={"ltr"}></TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTab;
