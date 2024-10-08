import { ButtonBase, Snackbar } from "@material-ui/core";
import React from "react";
import { useCallback } from "react";
import CandidateInfo from "./component/CandidateInfo/CandidateInfo";
import PerformanceView from "./component/PerformanceView/PerformanceView";
import useEvaluationFormHook from "./EvaluationForm.hook";
import styles from "./Style.module.css";
import SnackbarComponent from "../../components/Snackbar.component";

function EvaluationForm({ data, handleNext, isSubmitting }) {
  const { handleRatingChange, handleSubmit, errorData } = useEvaluationFormHook({ handleNext });


  return (
    <div className={styles.evaluationFormWrapper}>
      <div>
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
          <div className={styles.candidateInfoContainer2}>
            <CandidateInfo data={data} />
          </div>
          <div className={styles.candidateInfoContainer2}>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>Ranking Form</span>
              <div className={styles.headingDes}>
                <span>
                  Rank the candidate’s overall qualifications for the position
                  for which they have applied. Under each heading, the
                  interviewer should select one of the numerical rating and
                  write specific job-related comments in the space provided
                </span>
              </div>
            </div>
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              handleChange={handleRatingChange}
              isError={errorData?.experience}
              type="experience"
              title="1. Experience"
              question="Does the candidate acquired Relevant skills or qualifications through past work experiences?"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.educational}
              handleChange={handleRatingChange}
              type="educational"
              title="2. Educational Background"
              question="Does the candidate have the appropriate educational qualifications or training for this position?"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.exposure}
              handleChange={handleRatingChange}
              type="exposure"
              title="3. Exposure"
              question=" How diverse is the experience of candidate in different domains and how well exposed is candidate in different performance environments at Regional, National and International Levels"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.expertise}
              handleChange={handleRatingChange}
              type="expertise"
              title="4. Expertise i.e. Technical/Functional Qualifications & Skills"
              question=" Does the candidate have the technical or Functional skills necessary for this position?"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.communication}
              handleChange={handleRatingChange}
              type="communication"
              title="5. Communication"
              question=" How were the candidate’s communication skills during the interview?"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.candidate}
              handleChange={handleRatingChange}
              type="candidate"
              title="6. Candidate Interest/Attitude"
              question="How much interest did the candidate show in the position and the organization?"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.knowledge}
              handleChange={handleRatingChange}
              type="knowledge"
              title="7. Knowledge About Organization & Role"
              question=" How well the candidate researched the organization & role prior to the interview?"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.teambuilding}
              handleChange={handleRatingChange}
              type="teambuilding"
              title="8. Teambuilding/Interpersonal Skills"
              question=" Did the candidate demonstrate, through their answers, good teambuilding/interpersonal skills?"
            />
            <div className={styles.horizontalLine}></div>
            <PerformanceView
              isError={errorData?.initiative}
              handleChange={handleRatingChange}
              type="initiative"
              title="9. Initiative, Self-Innovation"
              question=" Did the candidate demonstrate, through their answers, a high degree of initiative?"
            />
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase
                disabled={isSubmitting}
                type={"button"}
                onClick={handleSubmit}
                className={styles.createBtn}
              >
                NEXT
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      <SnackbarComponent />
    </div>
  );
}

export default EvaluationForm;
