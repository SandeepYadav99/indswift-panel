import React from "react";
import styles from "./Style.module.css";
import InfoCard from "./component/InfoCard/InfoCard";
import UseExitForm from "./ExitForm.hook";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ExitRatingView from "./component/ExitRating/ExitRatingView";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

function ExitForm() {
  const { handleRatingChange, handleSubmit, errorData, isSubmitting ,changeTextData,form} =
    UseExitForm({});
  const data = {};
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
            <InfoCard data={data} />
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
              </div>
            </div>
            <div className={styles.first}>
              <div className={styles.headtitle}>
                Get closer to your home town
              </div>
              <div className={"formGroup1"}>
                <CustomSelectField
                  isError={errorData?.gender}
                  errorText={errorData?.gender}
                  label={"Gender"}
                  value={form?.gender}
                  handleChange={(value) => {
                    changeTextData(value, "gender");
                  }}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </CustomSelectField>
              </div>
            </div>
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              handleChange={handleRatingChange}
              isError={errorData?.experience}
              type="experience"
              title="1. Experience"
              question="Does the candidate acquired Relevant skills or qualifications through past work experiences?"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              isError={errorData?.educational}
              handleChange={handleRatingChange}
              type="educational"
              title="2. Educational Background"
              question="Does the candidate have the appropriate educational qualifications or training for this position?"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              isError={errorData?.exposure}
              handleChange={handleRatingChange}
              type="exposure"
              title="3. Exposure"
              question=" How diverse is the experience of candidate in different domains and how well exposed is candidate in different performance environments at Regional, National and International Levels"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              isError={errorData?.expertise}
              handleChange={handleRatingChange}
              type="expertise"
              title="4. Expertise i.e. Technical/Functional Qualifications & Skills"
              question=" Does the candidate have the technical or Functional skills necessary for this position?"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              isError={errorData?.communication}
              handleChange={handleRatingChange}
              type="communication"
              title="5. Communication"
              question=" How were the candidate’s communication skills during the interview?"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              isError={errorData?.candidate}
              handleChange={handleRatingChange}
              type="candidate"
              title="6. Candidate Interest/Attitude"
              question="How much interest did the candidate show in the position and the organization?"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              isError={errorData?.knowledge}
              handleChange={handleRatingChange}
              type="knowledge"
              title="7. Knowledge About Organization & Role"
              question=" How well the candidate researched the organization & role prior to the interview?"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
              isError={errorData?.teambuilding}
              handleChange={handleRatingChange}
              type="teambuilding"
              title="8. Teambuilding/Interpersonal Skills"
              question=" Did the candidate demonstrate, through their answers, good teambuilding/interpersonal skills?"
            />
            <div className={styles.horizontalLine}></div>
            <ExitRatingView
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
      {/* <SnackbarComponent /> */}
    </div>
  );
}

export default ExitForm;
