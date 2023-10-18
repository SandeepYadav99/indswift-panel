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
import ConfirmDialog from "./components/CandidateProfileView/component/ConfirmDialog/ConfirmDialog";

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
    handleStatusUpdate,
    isConfirmDialog,
    isEafDialog,
    toggleConfirmDialog,
    toggleEafDialog,
    handleCVShortlistReminder,
    handleResendEafClick,
    checkPrc
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
        checkPrc={checkPrc}
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
        <ConfirmDialog
          isOpen={isConfirmDialog}
          handleToggle={toggleConfirmDialog}
          handleSubmit={handleCVShortlistReminder}
          heading="IRF Form Confirmation"
          des="Are you sure you want to send Interview Reimbursement Form?"
        />
        <ConfirmDialog
          isOpen={isEafDialog}
          handleToggle={toggleEafDialog}
          handleSubmit={handleResendEafClick}
          heading="EAF Form Confirmation"
          des="Are you sure you want to send Employment Application Form?"
        />

        {/*<ReoccuringDialog*/}
        {/*  isOpen={isReoccuring}*/}
        {/*  handleToggle={toggleReoccuringDialog}*/}
        {/*/>*/}
        <UpdatePRCDialog
          isOpen={isResetDialog}
          handleToggle={toggleResetDialog}
          candidateId={id}
        />
        <CandidateStatusDialog
          handleStatusUpdate={handleStatusUpdate}
          isOpen={isUpdateDialog}
          handleToggle={toggleStatusDialog}
          candidateId={id}
        />

        <div className={styles.paperBackground}>
          <TabPanel value={value} index={0} dir={"ltr"}>
            <CandidateProfileView
              data={candidateData}
              handleConfirm={toggleConfirmDialog}
              handleEaf={toggleEafDialog}
            />
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
