/**
 * Created by charnjeetelectrovese@gmail.com on 5/1/2020.
 */
import React, { Component, useCallback, useMemo } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import useHRSettings from "./HRSettingsHook";
import { makeStyles } from "@material-ui/styles";
import FaqListContainer from "./components/Faq/FaqList.container";
import EmployeeInductionComponent from "./components/EmployeeInduction/EmployeeInduction.component";
import MonthlyTheme from "./components/MonthlyTheme/MonthlyTheme";
import CAGRView from "./components/CAGR/CAGRView";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const HRSettings = ({}) => {
  const { handleTabs, tabIndex } = useHRSettings({});
  const classes = useStyles();
  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  const renderPanel = useCallback((value) => {
    if (value == 0) {
      return <EmployeeInductionComponent />;
    } else if (value === 2) {
      return <FaqListContainer />;
    } else if (value === 1) {
      return <MonthlyTheme />;
    }
    else if (value ===3){
      return <CAGRView/>
    }
    return <h1>{value}</h1>;
  }, []);

  return (
    <PageBox>
      <div className={styles.mainContainer}>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={handleTabs}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Employee Induction" {...a11yProps(0)} />
            <Tab label="Monthly Theme" {...a11yProps(1)} />
            <Tab label="Drishti Updates" {...a11yProps(2)} />
            <Tab label="CAGR values" {...a11yProps(3)} />

          </Tabs>
          <div className={styles.tabPanel}>{renderPanel(tabIndex)}</div>
        </div>
      </div>
    </PageBox>
  );
};

export default HRSettings;
