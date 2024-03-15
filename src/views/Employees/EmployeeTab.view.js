import React, {useCallback, useEffect, useState} from "react";
import styles from "./Style.module.css";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {useDispatch, useSelector} from "react-redux";
import history from "../../libs/history.utils";
import {ButtonBase} from "@material-ui/core";
import ProfileView from "./Profile.view";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {actionGetEmployeeDetails} from "../../actions/Employee.action";
import SalaryInfo from "./components/Profile/SalaryInfo/SalaryInfo";
import CareerProgression from "./components/Profile/CareerProgression/CareerProgression";
import ResetPasswordDialog from "./components/ResetPasswordPopUp/ResetPasswordDialog.view";
import UpdateStatusDialog from "./components/UpdateStatusPopUp/UpdateStatusDialog.view";
import EmployeeRecord from "./components/Profile/EmployeeRecord/EmployeeRecord";
import {useParams} from "react-router";
import EmployeeClaim from "../EmployeePanel/EmployeeClaim/EmployeeClaim.container";
import UpperInfo from "./UpperInfo.view";
import DescriptionViewTable from "./components/Description/DescriptionViewTable";
import {useLocation} from "react-router-dom";
import useSubscriber from "../../hooks/SubscriberHook";

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

const EmployeeTab = ({moduleName}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [empId, setEmpId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const [isResetDialog, setIsResetDialog] = useState(false);
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const { user: { emp_code } } = useSelector(state => state.auth);
  const { id } = useParams();
  const location = useLocation();
  const {} = useSubscriber(moduleName);
  useEffect(() => {
    if (id) {
      setEmpId(id);
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      setEmpId(emp_code);
    }
  }, [id, emp_code])


  useEffect(() => {
    if (empId) {
      dispatch(actionGetEmployeeDetails(empId));
    }
  }, [empId]);

  const { employeeData } = useSelector((state) => state.employee);

  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue);
    },
    [setValue, value]
  );
  const toggleStatusDialog = useCallback(() => {
    setIsUpdateDialog((e) => !e);
  }, [isUpdateDialog]);
  const toggleResetDialog = useCallback(() => {
    setIsResetDialog((e) => !e);
  }, [isResetDialog]);
  return (
    <div>
      <div className={"container"}>
        {isAdmin && (<div className={styles.outerFlex}>
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
        </div>)}
        <br />
        <div>
          <UpperInfo
            isAdmin={isAdmin}
            data={employeeData}
            isResetDialog={isResetDialog}
            handleToggle={toggleResetDialog}
            handleStatusToggle={toggleStatusDialog}
          />
        </div>

        <ResetPasswordDialog
          isOpen={isResetDialog}
          handleToggle={toggleResetDialog}
        />
        <UpdateStatusDialog
          isOpen={isUpdateDialog}
          handleToggle={toggleStatusDialog}
        />
        <div className={styles.tabViewMobile}>
          <AppBar position="static" className={styles.backgroundColor} >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant={"scrollable"}
              scrollButtons={"auto" }
            >
              <Tab className={"iconTabs"} label="Profile" />
              <Tab className={"iconTabs"} label="Salary Info" />
              <Tab
                className={"iconTabs"}
                label="Career Progression Chart (CPC)"
              />
              <Tab className={"iconTabs"} label="Employee Records" />
              <Tab className={"iconTabs"} label="Job Description & Key Result Area" style={{ whiteSpace: 'nowrap' }} />
              {location?.pathname !== "/my/profile" && (
              <Tab className={"iconTabs"} label="Description" style={{ whiteSpace: 'nowrap' }} />
              )}

            </Tabs>
          </AppBar>

          <div className={styles.paperBackground}>
            <TabPanel value={value} index={0} dir={"ltr"}>
              <ProfileView data={employeeData} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={"ltr"}>
              <SalaryInfo />
            </TabPanel>
            <TabPanel value={value} index={2} dir={"ltr"}>
              <CareerProgression />
            </TabPanel>
            <TabPanel value={value} index={3} dir={"ltr"}>
              <EmployeeRecord empId={id} />
            </TabPanel>
            <TabPanel value={value} index={4} dir={"ltr"}>
              <EmployeeClaim />
            </TabPanel>
            <TabPanel value={value} index={5} dir={"ltr"}>
              <DescriptionViewTable/>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTab;
