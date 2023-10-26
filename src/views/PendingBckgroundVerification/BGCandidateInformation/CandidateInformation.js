import Reacts from "react";
import styles from "./Style.module.css";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import classnames from "classnames";

import WaitingComponent from "../../../components/Waiting.component";

import StatusPill from "../../../components/Status/StatusPill.component";

import useCandidateInformation_Hook from "./CandidateInformation_Hook";
import BGVDetails from "../BGVerificationDetails/BGVDetails";

const CandidateInformation = () => {
  const {
    data,
    isLoading,
    id,
    isInterviewStatus,
    handleChangeInterviewStatus,
    handleViewEditDetails,
  } = useCandidateInformation_Hook({});
  // if (isLoading) {
  //   return <WaitingComponent />;
  // }
  const valencyChange = (value) => {
    return value ? value.replace(/_/, " ") : "NA";
  };
  const styleRed = {
    color: "#ff4d4f",
    backgroundColor: "rgba(255,77,79,.06274509803921569)",
    border: "none",
  };
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Background Verification Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>
              Candidate Information - <span>{data?.code}</span>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {data?.location?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Month:</span>
                {data?.department?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.sub_department?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Offer Accepted:</span>
                {data?.designation?.name}{" "}
                {data?.designation_note && <>({data?.designation_note})</>}
              </div>
            </div>

            <div className={styles.vertical}></div>
            <div className={styles.right}>
              {/* <div className={styles.key}>
                <span className={styles.value}>PRC:</span>
                {data?.code}
              </div> */}
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {valencyChange(data?.vacancy_type)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {data?.replacing_person?.code
                  ? data?.replacing_person?.code
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Offer Date:</span>
                {data?.replacing_person?.name
                  ? data?.replacing_person?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DOJ:</span>
                {data?.replacing_person?.total_experience
                  ? `${data?.replacing_person?.total_experience} yrs`
                  : "NA"}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BGVDetails/>
      {/* <CandidatePaperComponent isRecurring={data?.is_recurring} jobId={id} status={data?.status}/>
      <InterviewerListComponent jobId={id} isInterviewStatus={isInterviewStatus} handleChangeInterviewStatus={handleChangeInterviewStatus} status={data?.status}/>
      {data?.is_recurring && (<VacanciesList jobId={id} prc={data.code}/>)} */}
    </div>
  );
};

export default CandidateInformation;
