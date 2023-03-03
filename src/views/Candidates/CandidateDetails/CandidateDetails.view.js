import { AppBar, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Style.module.css";

import UpperCard from "./components/UpperCard/UpperCard";
import { useParams } from "react-router";
import { serviceGetCandidateDetails } from "../../../services/Candidate.service";
import CandidateProfileView from "./components/CandidateProfileView/CandidateProfileView";
import { useState } from "react";
import CandidateStatusDialog from "./components/CandidateStatusPopUp/CandidateStatusDialog.view";
import UpdatePRCDialog from "./components/UpdatePRCPopUp/UpdatePRCDialog.view";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
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
function CandidateDetails() {
  const [value, setValue] = React.useState(0);
  const [candidateData, setCandidateData] = useState([]);
  const [isResetDialog, setIsResetDialog] = useState(false);
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    let dataValues = serviceGetCandidateDetails({ id });
    dataValues
      .then((data) => {
        setCandidateData(data?.data?.details);
      })
      .catch((err) => console.log(err));
  }, []);
  //
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
  const handleOfferPage = (data) => {
    historyUtils.push(RouteName.CANDIDATES_OFFER + data?.id);
  };
  return (
    <div>
      <UpperCard
        data={candidateData}
        handleToggle={toggleResetDialog}
        handleStatusToggle={toggleStatusDialog}
        handleOfferPage={handleOfferPage}
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
            <Tab className={"iconTabs"} label="Interview History" />
          </Tabs>
        </AppBar>
        {/* <UpdatePRCDialog
          isOpen={isResetDialog}
          handleToggle={toggleResetDialog}
        />
        <CandidateStatusDialog
          isOpen={isUpdateDialog}
          handleToggle={toggleStatusDialog}
        /> */}
        <div className={styles.paperBackground}>
          <TabPanel value={value} index={0} dir={"ltr"}>
            <CandidateProfileView data={candidateData} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={"ltr"}></TabPanel>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
