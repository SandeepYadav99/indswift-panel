import { AppBar, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Style.module.css";
import UpperCard from "./components/UpperCard/UpperCard";
import CandidateProfileView from "./components/CandidateProfileView/CandidateProfileView";
import InterviewHistory from "./components/InterviewHistory/InterviewHistory.view";
import useCandidateDetails from "./CandidateDetails.hook";
import UpdatePRCDialog from "./components/UpdatePRCPopUp/UpdatePRCDialog.view";
import CandidateStatusDialog from "./components/CandidateStatusPopUp/CandidateStatusDialog.view";
import ExtendOfferDialog from "./components/ExtendOfferPopUp/ExtendOfferDialog.view";
import ReoccuringDialog from "./components/ReoccuringPopUp/ReoccuringDialog.view";
import ShareOfferDialog from "./components/ShareOfferPopUp/ShareOfferDialog.view";

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
  const {
    value,
    candidateData,
    isResetDialog,
    isUpdateDialog,
    historyData,
    historyDetail,
    handleChange,
    toggleStatusDialog,
    handleOfferPage,
    toggleResetDialog,
    isExtendDialog,
    toggleExtendDialog,
    toggleReoccuringDialog,
    toggleShareDialog,
    isShareDialog,
    isReoccuring,
    handleShare,
    id,
  } = useCandidateDetails({});

  return (
    <div>
      <UpperCard
          handleShare={handleShare}
        data={candidateData}
        handleToggle={toggleResetDialog}
        handleStatusToggle={toggleStatusDialog}
        handleOfferPage={handleOfferPage}
        handleToggleExtendPage={toggleExtendDialog}
        handleToggleRPDialog={toggleReoccuringDialog}
        handleToggleShareDialog={toggleShareDialog}
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

        <ExtendOfferDialog
          candidateId={id}
          isOpen={isExtendDialog}
          handleToggle={toggleExtendDialog}
        />
        {/*<ReoccuringDialog*/}
        {/*  isOpen={isReoccuring}*/}
        {/*  handleToggle={toggleReoccuringDialog}*/}
        {/*/>*/}
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
          <TabPanel value={value} index={1} dir={"ltr"}>
            <InterviewHistory
              historyDetail={historyDetail}
              historyData={historyData}
            />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
