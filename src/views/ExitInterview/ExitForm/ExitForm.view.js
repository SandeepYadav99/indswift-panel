import React from "react";
import styles from "./Style.module.css";
import InfoCard from "./component/InfoCard/InfoCard";
import UseExitForm from "./ExitForm.hook";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ExitRatingView from "./component/ExitRating/ExitRatingView";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { removeUnderScore } from "../../../helper/helper";

const rankingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const rankingFive = [1, 2, 3, 4, 5];
const statusValue = ["VERY_GOOD", "GOOD", "AVERAGE", "POOR", "VERY_POOR"];
function ExitForm() {
  const {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    declaration,
    setDeclaration,
    employeeDetail,
    salary
  } = UseExitForm({});

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
              </div>
            </div>
            <>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Get closer to your home town
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.get_closer_to_your_home_town}
                    errorText={errorData?.get_closer_to_your_home_town}
                    label={"Choose Rank"}
                    value={form?.get_closer_to_your_home_town}
                    handleChange={(value) => {
                      changeTextData(value, "get_closer_to_your_home_town");
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Discharge family responsibilities or attend personal problems
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.discharge_family_responsibility}
                    errorText={errorData?.discharge_family_responsibility}
                    label={"Choose Rank"}
                    value={form?.discharge_family_responsibility}
                    handleChange={(value) => {
                      changeTextData(value, "discharge_family_responsibility");
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Get more basic salary/take home salary
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.get_more_basic_salary}
                    errorText={errorData?.get_more_basic_salary}
                    label={"Choose Rank"}
                    value={form?.get_more_basic_salary}
                    handleChange={(value) => {
                      changeTextData(value, "get_more_basic_salary");
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Get more perks and Employee benefits
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.get_more_perks_and_employee_benefits}
                    errorText={errorData?.get_more_perks_and_employee_benefits}
                    label={"Choose Rank"}
                    value={form?.get_more_perks_and_employee_benefits}
                    handleChange={(value) => {
                      changeTextData(
                        value,
                        "get_more_perks_and_employee_benefits"
                      );
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Have more job responsibilities and exposure
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={
                      errorData?.have_more_job_responsibilities_and_exposure
                    }
                    errorText={
                      errorData?.have_more_job_responsibilities_and_exposure
                    }
                    label={"Choose Rank"}
                    value={form?.have_more_job_responsibilities_and_exposure}
                    handleChange={(value) => {
                      changeTextData(
                        value,
                        "have_more_job_responsibilities_and_exposure"
                      );
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Have better career prospects (growth and development)
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.have_better_carreer_prospects}
                    errorText={errorData?.have_better_carreer_prospects}
                    label={"Choose Rank"}
                    value={form?.have_better_carreer_prospects}
                    handleChange={(value) => {
                      changeTextData(value, "have_better_carreer_prospects");
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Get more challenging, innovative & dynamic working environment
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={
                      errorData?.get_more_challenging_innovative_dynamic_working_env
                    }
                    errorText={
                      errorData?.get_more_challenging_innovative_dynamic_working_env
                    }
                    label={"Choose Rank"}
                    value={
                      form?.get_more_challenging_innovative_dynamic_working_env
                    }
                    handleChange={(value) => {
                      changeTextData(
                        value,
                        "get_more_challenging_innovative_dynamic_working_env"
                      );
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Due to my Supervisor or other work relations with Colleagues
                  etc
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={
                      errorData?.due_to_my_supervisor_work_relations_with_colleagues
                    }
                    errorText={
                      errorData?.due_to_my_supervisor_work_relations_with_colleagues
                    }
                    label={"Choose Rank"}
                    value={
                      form?.due_to_my_supervisor_work_relations_with_colleagues
                    }
                    handleChange={(value) => {
                      changeTextData(
                        value,
                        "due_to_my_supervisor_work_relations_with_colleagues"
                      );
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle}>
                  Due to some health problem
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.due_to_some_health_problem}
                    errorText={errorData?.due_to_some_health_problem}
                    label={"Choose Rank"}
                    value={form?.due_to_some_health_problem}
                    handleChange={(value) => {
                      changeTextData(value, "due_to_some_health_problem");
                    }}
                  >
                    {rankingValues?.length > 0 &&
                      rankingValues?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
            </>
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
              <div className={styles.first}>
                <div className={styles.headtitle2}>Salary & Perks</div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.salary_perks_rank}
                    errorText={errorData?.salary_perks_rank}
                    label={"Choose Rank"}
                    value={form?.salary_perks_rank}
                    handleChange={(value) => {
                      changeTextData(value, "salary_perks_rank");
                    }}
                  >
                    {rankingFive?.length > 0 &&
                      rankingFive?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.salary_perks_status}
                    errorText={errorData?.salary_perks_status}
                    label={"Status of Parameter in ISLL"}
                    value={form?.salary_perks_status}
                    handleChange={(value) => {
                      changeTextData(value, "salary_perks_status");
                    }}
                  >
                    {statusValue?.length > 0 &&
                      statusValue?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {removeUnderScore(item)}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle2}>Growth and Development</div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.growth_development_rank}
                    errorText={errorData?.growth_development_rank}
                    label={"Choose Rank"}
                    value={form?.growth_development_rank}
                    handleChange={(value) => {
                      changeTextData(value, "growth_development_rank");
                    }}
                  >
                    {rankingFive?.length > 0 &&
                      rankingFive?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.growth_development_status}
                    errorText={errorData?.growth_development_status}
                    label={"Status of Parameter in ISLL"}
                    value={form?.growth_development_status}
                    handleChange={(value) => {
                      changeTextData(value, "growth_development_status");
                    }}
                  >
                    {statusValue?.length > 0 &&
                      statusValue?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {removeUnderScore(item)}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle2}>Working condition</div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.working_condition_rank}
                    errorText={errorData?.working_condition_rank}
                    label={"Choose Rank"}
                    value={form?.working_condition_rank}
                    handleChange={(value) => {
                      changeTextData(value, "working_condition_rank");
                    }}
                  >
                    {rankingFive?.length > 0 &&
                      rankingFive?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.working_condition_status}
                    errorText={errorData?.working_condition_status}
                    label={"Status of Parameter in ISLL"}
                    value={form?.working_condition_status}
                    handleChange={(value) => {
                      changeTextData(value, "working_condition_status");
                    }}
                  >
                    {statusValue?.length > 0 &&
                      statusValue?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {removeUnderScore(item)}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle2}>
                  Job related responsibilities
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.job_responsibilities_rank}
                    errorText={errorData?.job_responsibilities_rank}
                    label={"Choose Rank"}
                    value={form?.job_responsibilities_rank}
                    handleChange={(value) => {
                      changeTextData(value, "job_responsibilities_rank");
                    }}
                  >
                    {rankingFive?.length > 0 &&
                      rankingFive?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.job_responsibilities_status}
                    errorText={errorData?.job_responsibilities_status}
                    label={"Status of Parameter in ISLL"}
                    value={form?.job_responsibilities_status}
                    handleChange={(value) => {
                      changeTextData(value, "job_responsibilities_status");
                    }}
                  >
                    {statusValue?.length > 0 &&
                      statusValue?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {removeUnderScore(item)}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.first}>
                <div className={styles.headtitle2}>Working culture</div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.working_culture_rank}
                    errorText={errorData?.working_culture_rank}
                    label={"Choose Rank"}
                    value={form?.working_culture_rank}
                    handleChange={(value) => {
                      changeTextData(value, "working_culture_rank");
                    }}
                  >
                    {rankingFive?.length > 0 &&
                      rankingFive?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {item}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
                <div className={styles.rank}>
                  <CustomSelectField
                    isError={errorData?.working_culture_status}
                    errorText={errorData?.working_culture_status}
                    label={"Status of Parameter in ISLL"}
                    value={form?.working_culture_status}
                    handleChange={(value) => {
                      changeTextData(value, "working_culture_status");
                    }}
                  >
                    {statusValue?.length > 0 &&
                      statusValue?.map((item, index) => (
                        <MenuItem value={item} key={`option_${index}`}>
                          {removeUnderScore(item)}
                        </MenuItem>
                      ))}
                  </CustomSelectField>
                </div>
              </div>
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                3. What according to you are 3 main strengths of the Company?
              </span>
            </div>
            <div className={styles.commentWrap}>
              <CustomTextField
                isError={errorData?.strengths_of_company}
                errorText={errorData?.strengths_of_company}
                label={"Please describe 3 strengths"}
                value={form?.strengths_of_company}
                onTextChange={(text) => {
                  changeTextData(text, "strengths_of_company");
                }}
                onBlur={() => {
                  onBlurHandler("strengths_of_company");
                }}
                multiline
                rows={3}
              />
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                4. What according to you are 3 main weaknesses of the Company?
              </span>
            </div>
            <div className={styles.commentWrap}>
              <CustomTextField
                isError={errorData?.weaknesses_of_company}
                errorText={errorData?.weaknesses_of_company}
                label={"Please describe 3 weakness"}
                value={form?.weaknesses_of_company}
                onTextChange={(text) => {
                  changeTextData(text, "weaknesses_of_company");
                }}
                onBlur={() => {
                  onBlurHandler("weaknesses_of_company");
                }}
                multiline
                rows={3}
              />
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                5. In reply to point No. 4 above, what in your view the Company
                should be doing alternatively or Your 3 suggestions of
                improvements ?
              </span>
            </div>
            <div className={styles.commentWrap}>
              <CustomTextField
                isError={errorData?.suggestions_of_improvements}
                errorText={errorData?.suggestions_of_improvements}
                label={"Please write related comments"}
                value={form?.suggestions_of_improvements}
                onTextChange={(text) => {
                  changeTextData(text, "suggestions_of_improvements");
                }}
                onBlur={() => {
                  onBlurHandler("suggestions_of_improvements");
                }}
                multiline
                rows={3}
              />
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                6. Questions relating to jobs
              </span>
            </div>
            <>
              <ExitRatingView
                handleChange={(val) => {
                  changeTextData(val, "job_challenging");
                }}
                isError={errorData?.job_challenging}
                title="a. Was the job challenging in terms of its content and utilisation of your skill and Capabilities?"
              />
              <div className={styles.horizontalLine}></div>
              <ExitRatingView
                handleChange={(val) => {
                  changeTextData(val, "job_regularly_enhance");
                }}
                isError={errorData?.job_regularly_enhance}
                title="b. Did you regularly enhance your learning while being on the job? Did your job add value to your professional growth?"
              />
              <div className={styles.horizontalLine}></div>
              <ExitRatingView
                isError={errorData?.job_condition_location}
                handleChange={(val) => {
                  changeTextData(val, "job_condition_location");
                }}
                title="c. Was your job condition & location comfortable? Was working environment enjoyable?"
              />
              <div className={styles.horizontalLine}></div>
              <ExitRatingView
                isError={errorData?.job_experience_growth}
                handleChange={(val) => {
                  changeTextData(val, "job_experience_growth");
                }}
                title="d. Did you experience growth in terms of level & responsibilities?"
              />
              <div className={styles.horizontalLine}></div>
              <ExitRatingView
                isError={errorData?.job_organisation_provide}
                handleChange={(val) => {
                  changeTextData(val, "job_organisation_provide");
                }}
                title="7.a. Did the Organisation provide you with sufficient development inputs to grow as a Professional?"
              />
              <div className={styles.horizontalLine}></div>
              <ExitRatingView
                isError={errorData?.job_feel_boss_organisation_provide}
                handleChange={(val) => {
                  changeTextData(val, "job_feel_boss_organisation_provide");
                }}
                title="7.b. Did you feel your boss/Organisation provided you with enough freedom and space to? Allow your creativity to grow?"
              />
              <div className={styles.horizontalLine}></div>
              <ExitRatingView
                isError={
                  errorData?.new_job_compare_with_organisation_in_term_job_contents
                }
                handleChange={(val) => {
                  changeTextData(
                    val,
                    "new_job_compare_with_organisation_in_term_job_contents"
                  );
                }}
                title="8.a. How does your new job compare with that in this Organisation in terms of job contents? Designation/position and salary & perks ?"
              />
              <div className={styles.horizontalLine}></div>
            </>
            <>
              <div className={styles.rankingWrapper}>
                <span className={styles.heading}>
                  8.b. In response to 8a, please elucidate the brief details:
                </span>
              </div>
              <div className={styles.commentWrap}>
                <CustomTextField
                  isError={errorData?.organization}
                  errorText={errorData?.organization}
                  label={"Organization where you are going"}
                  value={form?.organization}
                  onTextChange={(text) => {
                    changeTextData(text, "organization");
                  }}
                  onBlur={() => {
                    onBlurHandler("organization");
                  }}
                  // multiline
                  // rows={3}
                />
              </div>
              <div className={styles.commentWrap}>
                <CustomTextField
                  isError={errorData?.area_of_organization}
                  errorText={errorData?.area_of_organization}
                  label={
                    "Area of operation of Organization where you are going"
                  }
                  value={form?.area_of_organization}
                  onTextChange={(text) => {
                    changeTextData(text, "area_of_organization");
                  }}
                  onBlur={() => {
                    onBlurHandler("area_of_organization");
                  }}
                  // multiline
                  // rows={3}
                />
              </div>
              <div className={styles.lo}>
                <div className={styles.commentWrap} style={{ flex: "1" }}>
                  <CustomSelectField
                    isError={errorData?.deographic_location_of_organization}
                    errorText={errorData?.deographic_location_of_organization}
                    label={"Geographic Location of your new organization"}
                    value={form?.deographic_location_of_organization}
                    handleChange={(value) => {
                      changeTextData(
                        value,
                        "deographic_location_of_organization"
                      );
                    }}
                  >
                    <MenuItem value="NEAR">NEAR</MenuItem>
                    <MenuItem value="FAR">FAR</MenuItem>
                    <MenuItem value="VERY_FAR">VERY FAR</MenuItem>
                  </CustomSelectField>
                </div>
                <div className={styles.commentWrap} style={{ flex: "1" }}>
                  <CustomTextField
                    type="number"
                    isError={errorData?.how_much_salary_growth}
                    errorText={errorData?.how_much_salary_growth}
                    label={"You are going at how much salary growth in %"}
                    value={form?.how_much_salary_growth}
                    onTextChange={(text) => {
                      changeTextData(text, "how_much_salary_growth");
                    }}
                    onBlur={() => {
                      onBlurHandler("how_much_salary_growth");
                    }}
                    // multiline
                    // rows={3}
                  />
                </div>
              </div>
            </>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                9. Give your view of Management towards:
              </span>
            </div>
            <ExitRatingView
              handleChange={(val) => {
                changeTextData(val, "job_function");
              }}
              isError={errorData?.job_function}
              question={
                "e.g. Training & Learning opportunities, freedom to operate job satisfaction etc"
              }
              title="a. Job function"
            />
            <ExitRatingView
              handleChange={(val) => {
                changeTextData(val, "people");
              }}
              isError={errorData?.people}
              question={
                "e.g. mutual trust & respect, encouragement, counselling empathy, mentoring etc"
              }
              title="b. People"
            />
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                10.a. On a scale of (1-10) please rate your satisfaction level
                during your tenure/experience with the Organisation?
              </span>
            </div>
            <div className={styles.commentWrap}>
              <CustomSelectField
                isError={errorData?.scale_of_satisfaction_level}
                errorText={errorData?.scale_of_satisfaction_level}
                label={"Choose Rating"}
                value={form?.scale_of_satisfaction_level}
                handleChange={(value) => {
                  changeTextData(value, "scale_of_satisfaction_level");
                }}
              >
                {rankingValues?.length > 0 &&
                  rankingValues?.map((item, index) => (
                    <MenuItem value={item} key={`option_${index}`}>
                      {item}
                    </MenuItem>
                  ))}
              </CustomSelectField>
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                10.b. Would you like to recommend your friends/relatives to join
                this Organisation?
              </span>
            </div>
            <div className={styles.commentWrap}>
              <CustomTextField
                isError={errorData?.would_you_recommend_your_friend}
                errorText={errorData?.would_you_recommend_your_friend}
                label={"Please describe your reason"}
                value={form?.would_you_recommend_your_friend}
                onTextChange={(text) => {
                  changeTextData(text, "would_you_recommend_your_friend");
                }}
                onBlur={() => {
                  onBlurHandler("would_you_recommend_your_friend");
                }}
                multiline
                rows={3}
              />
            </div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.rankingWrapper}>
              <span className={styles.heading}>
                10.c. Would you like to rejoin the Organisation? Why / Why not
              </span>
            </div>
            <div className={styles.commentWrap}>
              <CustomTextField
                isError={errorData?.would_you_rejoin_organisation}
                errorText={errorData?.would_you_rejoin_organisation}
                label={"Please describe your reason"}
                value={form?.would_you_rejoin_organisation}
                onTextChange={(text) => {
                  changeTextData(text, "would_you_rejoin_organisation");
                }}
                onBlur={() => {
                  onBlurHandler("would_you_rejoin_organisation");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.btnCont1}>
              <ButtonBase
                disabled={isSubmitting}
                type={"button"}
                onClick={handleSubmit}
                className={styles.createBtn}
              >
                Submit
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
