import React from "react";
import styles from "./Style.module.css";
import InfoCard from "../ExitForm/component/InfoCard/InfoCard";
import useExitDetail from "./ExitDetail.hook";
import RankingTable from "./component/RankingTable/RankingTable.view";
import LowerRankingTable from "./component/LowerRankingTable/LowerRankingTable.view";
import ExitRatingFeedback from "./component/ExitRatingFeedback/ExitRatingFeedback";
import historyUtils from "../../../libs/history.utils";
import { ButtonBase } from "@material-ui/core";
function ExitDetail() {
  const { employeeDetail, UpperTable, LowerTable,salary } = useExitDetail({});

  console.log("employeeDetail", employeeDetail);
  return (
    <div className={styles.evaluationFormWrapper}>
      <div>
        <div className={styles.logoImg}>
          <img
            src={require("../../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Exit Interview Form</h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.evaluationContainer}>
          <div className={styles.candidateInfoContainer2}>
            <InfoCard data={employeeDetail?.employee} salary={salary}/>
          </div>
          <div className={styles.candidateInfoContainer2}>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                1. You would like to change your job mainly to :
              </span>
              <div className={styles.headingDes}>
                <span>
                  An employee never leaves a job due to only one reasons, there
                  is a set of reasons that work for such decision. Please rank
                  following reasons from <strong> 1 to 9</strong> in order of
                  more to less contribution for your decision to change the job
                  ,
                  <strong>
                    1 for most responsible reason, 9 for least responsible
                    reason :-
                  </strong>
                </span>
                <div className={styles.tableWrap}>
                  <RankingTable data={UpperTable} />
                </div>
              </div>
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                2. Among the following what do you value most & least ?
              </span>
              <div className={styles.headingDes}>
                <span>
                  Please rank them by assigning number against each reason in
                  order of priority from 1 to 5, Also write whether this company
                  meets requirements by marking{" "}
                  <strong>
                    Very good/Good/Average/Poor/Very Poor against each{" "}
                  </strong>
                </span>
              </div>
              <div className={styles.tableWrap}>
                <LowerRankingTable data={LowerTable} />
              </div>
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading} >
                3. What according to you are 3 main strengths of the Company?
              </span>
            </div>
            <div className={styles.commentWrap} style={{whiteSpace:"pre-line"}}>
              {employeeDetail?.strengths_of_company}
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                4. What according to you are 3 main weaknesses of the Company?
              </span>
            </div>
            <div className={styles.commentWrap} style={{whiteSpace:"pre-line"}}>
              {employeeDetail?.weaknesses_of_company}
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                5. In reply to point No. 4 above, what in your view the Company
                should be doing alternatively or Your 3 suggestions of
                improvements ?
              </span>
            </div>
            <div className={styles.commentWrap} style={{whiteSpace:"pre-line"}}>
              {employeeDetail?.suggestions_of_improvements}
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                6. Questions relating to jobs
              </span>
            </div>
            <ExitRatingFeedback
              title="a. Was the job challenging in terms of its content and utilisation of your skill and Capabilities?"
              ratingValue={employeeDetail?.job_challenging}
            />
            <div className={styles.horizontalLine2}></div>
            <ExitRatingFeedback
              title="b. Did you regularly enhance your learning while being on the job? Did your job add value to your professional growth?"
              ratingValue={employeeDetail?.job_regularly_enhance}
            />
            <div className={styles.horizontalLine2}></div>
            <ExitRatingFeedback
              title="c. Was your job condition & location comfortable? Was working environment enjoyable?"
              ratingValue={employeeDetail?.job_condition_location}
            />{" "}
            <div className={styles.horizontalLine2}></div>
            <ExitRatingFeedback
              title="d. Did you experience growth in terms of level & responsibilities?"
              ratingValue={employeeDetail?.job_experience_growth}
            />
            <div className={styles.horizontalLine2}></div>
            <ExitRatingFeedback
              title="7.a. Did the Organisation provide you with sufficient development inputs to grow as a Professional?"
              ratingValue={employeeDetail?.job_organisation_provide}
            />{" "}
            <div className={styles.horizontalLine2}></div>
            <ExitRatingFeedback
              title="7.b. Did you feel your boss/Organisation provided you with enough freedom and space to? Allow your creativity to grow?"
              ratingValue={employeeDetail?.job_feel_boss_organisation_provide}
            />
            <div className={styles.horizontalLine2}></div>
            <ExitRatingFeedback
              title="8.a. How does your new job compare with that in this Organisation in terms of job contents? Designation/position and salary & perks ?"
              ratingValue={
                employeeDetail?.new_job_compare_with_organisation_in_term_job_contents
              }
            />
            <>
              <div className={styles.rankingWrapper}>
                <span className={styles.heading}>
                  8.b. In response to 8a, please elucidate the brief details:
                </span>
                <span className={styles.heading}>
                  8.b.1 Organization where you are going?
                </span>
              </div>
              <div className={styles.commentWrap}>
                {employeeDetail?.response_to_8a?.organization}
              </div>
              <div className={styles.rankingWrapper}>
                <span className={styles.heading}>
                  8.b.2 Area of operation of Organization where you are going?
                </span>
              </div>
              <div className={styles.commentWrap}>
                {employeeDetail?.response_to_8a?.area_of_organization}
              </div>
              <div className={styles.rankingWrapper}>
                <span className={styles.heading}>
                  8.b.3 Geographic Location of your new organization?
                </span>
              </div>
              <div className={styles.commentWrap}>
                {
                  employeeDetail?.response_to_8a
                    ?.deographic_location_of_organization
                }
              </div>{" "}
              <div className={styles.rankingWrapper}>
                <span className={styles.heading}>
                  8.b.4 You are going at how much salary growth in %?
                </span>
              </div>
              <div className={styles.commentWrap}>
                {employeeDetail?.response_to_8a?.how_much_salary_growth}
              </div>
            </>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                9. Give your view of Management towards:
              </span>
            </div>
            <ExitRatingFeedback
              title="a. Job function (e.g. Training & Learning opportunities, freedom to operate job satisfaction etc)"
              ratingValue={employeeDetail?.job_function}
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingFeedback
              title="b. People (e.g. mutual trust & respect, encouragement, counselling empathy, mentoring etc)"
              ratingValue={employeeDetail?.people}
            />
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                10.a. On a scale of (1-10) please rate your satisfaction level
                during your tenure/experience with the Organisation?
              </span>
            </div>
            <div className={styles.commentWrap}>
              {employeeDetail?.scale_of_satisfaction_level}
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                10.b. Would you like to recommend your friends/relatives to join
                this Organisation?
              </span>
            </div>
            <div className={styles.commentWrap} style={{whiteSpace:"pre-line"}}>
              {employeeDetail?.would_you_recommend_your_friend}
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                10.c. Would you like to rejoin the Organisation? Why / Why not
              </span>
            </div>
            <div className={styles.commentWrap} style={{marginBottom:"20px",whiteSpace:"pre-line"}} >
              {employeeDetail?.would_you_rejoin_organisation}
            </div>
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase
                // disabled={isSubmitting}
                type={"button"}
                onClick={() => historyUtils?.goBack()}
                className={styles.createBtn}
              >
                Close
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      {/* <SnackbarComponent /> */}
    </div>
  );
}

export default ExitDetail;
