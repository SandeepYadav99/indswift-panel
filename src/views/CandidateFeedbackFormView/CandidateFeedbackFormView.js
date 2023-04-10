import { ButtonBase } from "@material-ui/core";
import React from "react";
import useCandidateFeedbackFormView from "./CandidateFeedbackFormView.hook";
import CandidateProfileView from "./components/CandidateProfileView/CandidateProfileView";
import RatingFeedback from "./components/RatingFeedback/RatingFeedback";
import styles from "./Style.module.css";
function CandidateFeedbackFormDetail() {
  const { data ,handleSubmit} = useCandidateFeedbackFormView({});
  const getOverallRating=(value)=>{
    if(value){
      if(value === 2){
        return 5
      }
      else{
        return value
      }
    }
  }
  return (
    <div className={styles.evaluationFormWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.logoImg}>
          <img
            src={require("../../assets/img/login logo@2x.png")}
            className={styles.sky}
          />
        </div>
        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Interview Evaluation Form</h1>
          <div className={styles.newLine} />
        </div>
        <div className={styles.evaluationContainer}>
          <div className={styles.candidateInfoContainer}>
            <CandidateProfileView data={data} />
          </div>
          <div className={styles.candidateInfoContainer2}>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>Ranking Form</span>
              <div className={styles.horizontalLine}></div>
            </div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              feedback={data?.experience?.note}
              ratingValue={data?.experience?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="2. Educational Background"
              question="  Does the candidate have the appropriate educational qualifications or training for this position?"
              feedback={data?.educational?.note}
              ratingValue={data?.educational?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="3. Exposure"
              question="How diverse is the experience of candidate in different domains and how well exposed is candidate in different performance environments at Regional, National and International Levels"
              feedback={data?.exposure?.note}
              ratingValue={data?.exposure?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="4. Expertise i.e. Technical/Functional Qualifications & Skills "
              question="Does the candidate have the technical or Functional skills necessary for this position?"
              feedback={data?.expertise?.note}
              ratingValue={data?.expertise?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="5. Communication "
              question="How were the candidate’s communication skills during the interview?"
              feedback={data?.communication?.note}
              ratingValue={data?.communication?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="6. Candidate "
              question="Interest/Attitude How much interest did the candidate show in the position and the organization?"
              feedback={data?.candidate?.note}
              ratingValue={data?.candidate?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="7. Knowledge About Organization & Role "
              question="How well the candidate researched the organization & role prior to the interview?"
              feedback={data?.knowledge?.note}
              ratingValue={data?.knowledge?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="8. Teambuilding/Interpersonal Skills "
              question="Did the candidate demonstrate, through their answers, good teambuilding/interpersonal skills?s"
              feedback={data?.teambuilding?.note}
              ratingValue={data?.teambuilding?.value}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="9. Initiative, Self-Innovation "
              question="Did the candidate demonstrate, through their answers, a high degree of initiative?"
              feedback={data?.initiative?.note}
              ratingValue={data?.initiative?.value}
            />
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.candidateInfoContainer2}>
            <RatingFeedback
              isOverall={data?.interview_status}
              title="Overall Impression and Recommendation"
              question="Summary of your perceptions of the candidate’s strengths/weaknesses. Final comments and recommendations for proceeding with the candidate."
              feedback={data?.overall?.note}
              ratingValue={getOverallRating(data?.overall?.value)}
            />
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase
                type={"button"}
                onClick={()=>handleSubmit(data)}
                className={styles.createBtn}
              >
                CLOSE
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateFeedbackFormDetail;
