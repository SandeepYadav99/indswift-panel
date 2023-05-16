import Reacts from "react";
import styles from "./Style.module.css";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import classnames from "classnames";
import useJobOpeningDetail from "./JobOpeningDetail.hook";
import WaitingComponent  from "../../components/Waiting.component";
import InterviewerListComponent from "./components/InterviewerList/InterviewerList.component";
import CandidatePaperComponent from "./components/CandidatePaper/CandidatePaper.component";
import StatusPill from "../../components/Status/StatusPill.component";
import VacanciesList from "./components/VacanciesList/VacanciesList";

const JobOpeningDetail = () => {
  const { data, isLoading, id , isInterviewStatus ,handleChangeInterviewStatus,handleViewEditDetails} = useJobOpeningDetail({});
  if (isLoading) {
    return <WaitingComponent />;
  }
  const valencyChange=(value)=>{
    return value ? value.replace(/_/, " "): "NA"
  }
  const styleRed={
    'color': "#ff4d4f",
    'backgroundColor': "rgba(255,77,79,.06274509803921569)",
    'border': "none",
  }
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Job Openings</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Job Information - <span>{data?.code}</span></div>
            <div className={styles.editBtn}>
              <ButtonBase 
              disabled={(data?.status !== "ACTIVE" ) ? true : false}
              className={(data?.status !== "ACTIVE") ? styles.disabledBtn : styles.edit}
              onClick={() => {handleViewEditDetails(data)}}>EDIT</ButtonBase>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.location?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {data?.department?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Sub-Department:</span>
                {data?.sub_department?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {data?.designation?.name} {data?.designation_note && <>({data?.designation_note})</>}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade:</span>
                {data?.grade?.code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Cadre:</span>
                {data?.cadre?.name ? data?.cadre?.code : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value} style={{ width: "190px" }}>
                  Status:
                </span>
                <StatusPill status={data?.status} style={data?.status === "ACTIVE" && styleRed}/>
                <span style={{marginLeft:'10px'}}>
                  {/* {data?.status} */}
                  <StatusPill status={data?.is_sourcing ? 'SOURCING': 'NOSOURCING'}/>
                </span>
              </div>
              <div className={styles.key21}>
                <span className={styles.value}>Notes:</span>
                <span>{data?.note ? data?.note  : "NA"}</span>

              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              {/* <div className={styles.key}>
                <span className={styles.value}>PRC:</span>
                {data?.code}
              </div> */}
              <div className={styles.key}>
                <span className={styles.value}>Vacancy Type:</span>
                {valencyChange(data?.vacancy_type)}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Employee ID:</span>
                {data?.replacing_person?.code ? data?.replacing_person?.code : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Employee Name:</span>
                {data?.replacing_person?.name ? data?.replacing_person?.name : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Employee Experience:</span>
                {data?.replacing_person?.total_experience ? `${data?.replacing_person?.total_experience} yrs`  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Replacing Employee CTC:</span>
                Rs. {data?.replacing_person?.ctc}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Indent Date:</span>
                {data?.createdAtText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Assigned To:</span>
                {data?.assigned_person?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CandidatePaperComponent isRecurring={data?.is_recurring} jobId={id} status={data?.status}/>
      <InterviewerListComponent jobId={id} isInterviewStatus={isInterviewStatus} handleChangeInterviewStatus={handleChangeInterviewStatus} status={data?.status}/>
      {data?.is_recurring && (<VacanciesList jobId={id} prc={data.code}/>)}
    </div>
  );
};

export default JobOpeningDetail;
