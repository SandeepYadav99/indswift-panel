import React, { useCallback, useEffect, useState } from "react";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import history from "../../../libs/history.utils";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import UpperInfo from "../../Employees/UpperInfo.view";
import ProfileView from "../../Employees/Profile.view";
import SalaryInfo from "../../Employees/components/Profile/SalaryInfo/SalaryInfo";
import useNewEmployeeDetails from "./NewEmployeeDetails.hook";
import RejectDialog from "./component/RejectPopUp/RejectDialog.view";
import DialogComponent from "./component/Dialog.component";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
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

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const NewEmployeeDetail = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const {
    employeeData,
    rejectDialog,
    toggleRejectDialog,
    approveDialog,
    toggleStatusDialog,
    handleDialogConfirm,
    id,
  } = useNewEmployeeDetails({});

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
          <UpperInfo
            data={employeeData}
            // isResetDialog={isResetDialog}
            handleStatusToggle={toggleStatusDialog}
            isNew={true}
          />
        </div>
        <DialogComponent
          isOpen={approveDialog}
          handleClose={toggleStatusDialog}
          handleConfirm={handleDialogConfirm}
        />
        <RejectDialog
          candidateId={id}
          isOpen={rejectDialog}
          handleToggle={toggleRejectDialog}
        />
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
            </Tabs>
          </AppBar>

          <div className={styles.paperBackground}>
            <TabPanel value={value} index={0} dir={"ltr"}>
              <ProfileView data={employeeData} isNew={true} />
              {employeeData?.status === "PENDING" && (
                <div className={styles.approvedWrapper}>
                  <div className={styles.editBtn2}>
                    <ButtonBase
                      className={styles.edit}
                      onClick={toggleRejectDialog}
                    >
                      REJECT
                    </ButtonBase>
                  </div>

                  <div className={styles.btnApproveWrapper}>
                    <div>
                      <ButtonBase
                        // disabled={isSubmitting}
                        className={styles.editSuccess}
                        onClick={toggleStatusDialog}
                      >
                        APPROVE
                      </ButtonBase>
                    </div>
                  </div>
                </div>
              )}
            </TabPanel>
            <TabPanel value={value} index={1} dir={"ltr"}>
              <SalaryInfo Empid={employeeData?.id} />
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployeeDetail;
