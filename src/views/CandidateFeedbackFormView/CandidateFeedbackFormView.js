import { ButtonBase } from "@material-ui/core";
import React from "react";
import useCandidateFeedbackFormView from "./CandidateFeedbackFormView.hook";
import CandidateProfileView from "./components/CandidateProfileView/CandidateProfileView";
import RatingFeedback from "./components/RatingFeedback/RatingFeedback";
import styles from "./Style.module.css";
function CandidateFeedbackFormDetail() {
  const {data}=useCandidateFeedbackFormView({})
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
            <CandidateProfileView />
          </div>
          <div className={styles.candidateInfoContainer2}>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>Ranking Form</span>
              <div className={styles.horizontalLine}></div>
            </div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="2. Educational"
              question=" Background Does the candidate have the appropriate educational qualifications or training for this position?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
            <div className={styles.horizontalLine}></div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.candidateInfoContainer2}>
            <RatingFeedback
              title="1. Experience"
              question=" Does the candidate acquired Relevant skills or qualifications through past work experiences?"
              rating="Unsatisfactory (1)"
              feedback="Candidate does not have the skills required for the position."
              ratingValue={2}
            />
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase
                // disabled={isSubmitting}
                type={"button"}
                // onClick={handleSubmit}
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
