/**
 * Created by charnjeetelectrovese@gmail.com on 5/1/2020.
 */
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import LoanBudget from "./components/LoanBudget/LoanBudget.view";
import EmailComp from "./components/EmailComp/EmailComp.view";
import USCView from "./components/USC/USCView";
import CurrencyView from "./components/Currency/CurrencyView.js";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const HRSettings = ({}) => {
  const { handleTabs, tabIndex } = useHRSettings({});
  const [width, setWidth] = useState(window.innerWidth);
  const classes = useStyles();
  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  useEffect(() => {
    const Resize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", Resize);
    return () => window.removeEventListener("resize", Resize);
  });

  const renderPanel = useCallback((value) => {
    if (value == 0) {
      return <EmployeeInductionComponent />;
    } else if (value === 2) {
      return <FaqListContainer />;
    } else if (value === 1) {
      return <MonthlyTheme />;
    } else if (value === 3) {
      return <CAGRView />;
    } else if (value === 4) {
      return <LoanBudget />;
    } else if (value === 5) {
      return <EmailComp />;
    } else if (value === 6) {
      return <USCView />;
    } else if (value === 7) {
      return <CurrencyView />;
    }
    return <h1>{value}</h1>;
  }, []);

  return (
    <PageBox>
      <div className={styles.mainContainer}>
        <div
          className={
            `${width}` > 1296 ? `${classes.root}` : `${styles.tabContainerView}`
          }
        >
          <Tabs
            orientation={
              `${width}` > 1296 ? `vertical` : ``
            }
            variant="scrollable"
            value={tabIndex}
            onChange={handleTabs}
            aria-label="Vertical tabs example"
            className={classes.root}
            id={styles.tabsResponsive}
          >
              <Tab label="Employee Induction" {...a11yProps(0)} />
              <Tab label="Monthly Theme" {...a11yProps(1)} />
              <Tab label="Drishti Updates" {...a11yProps(2)} />
              <Tab label="CAGR values" {...a11yProps(3)} />
              <Tab label="Loan Budget" {...a11yProps(4)} />
              <Tab label="Email Composer" {...a11yProps(5)} />
              <Tab label="USC" {...a11yProps(6)} />
              <Tab label="Currency Conversion" {...a11yProps(6)} />
          </Tabs>
          <div className={styles.tabPanel}>{renderPanel(tabIndex)}</div>
        </div>
      </div>
    </PageBox>
  );
};

export default HRSettings;
