import React, { useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import logo from "../../../assets/img/login logo@2x.png";
import styles from "./Style.module.css";
import AwardTable from "./component/AwardTable/AwardTable.view";
import useAwardSheet from "./AwardSheet.hook";
import GroupCTable from "./component/GroupCTable/GroupCTable.view";
import WaitingComponent from "../../../components/Waiting.component";
import sign from "../../../assets/img/sign.png";

const Header = ({ empData , sheetData}) => {
  const {year}=sheetData;
  
  const lostTwoDeigit = useMemo(()=>{
    const currentYear = year?.toString()
    return currentYear?.slice(-2)
  },[year])
 
  return (
    <>
      <div className={styles.upperWrapper}>
        <div className={styles.upper}>
          <div className={styles.imgWrap}>
            <img src={logo} alt="IndSwift" />
          </div>
          <div className={styles.textWrap}>
            <div className={styles.wrap}>
              <strong>Performance Feedback Sheet</strong>
              <span>For Performance cycle: Apr-{lostTwoDeigit-1} to Mar-{lostTwoDeigit}</span>
            </div>
          </div>
        </div>
        <div className={styles.dateWrap}>28/07/2023</div>
      </div>
      <div className={styles.verti}></div>
      <div className={styles.infoCont}>
        <div>
          Employee Name: <strong>{empData.name}</strong>
        </div>
        <div>
          Employee Number: <strong>{empData.code}</strong>
        </div>
        <div>
          Designation: <strong>{empData.designation}</strong>
        </div>
        <div>
          Location: <strong>{empData.location}</strong>
        </div>
        <div>
          Department: <strong>{empData.department}</strong>
        </div>
      </div>
      <div className={styles.verti}></div>
    </>
  );
};
const AwardSheetView = ({}) => {
  const { group4Data, ratingData, isFetching, empData, isLoad , prevYearRatingData, sheetData} = useAwardSheet(
    {}
  );

  if (isFetching) {
    return <WaitingComponent />;
  }

  return (
    <div className={styles.awardWrrap}>
      <div className={styles.mainContainer}>
        <Header empData={empData} sheetData={sheetData}/>
        <span className={styles.heading}>
          <u>Goal Sheet-A</u>
        </span>
        <p className={styles.txtJustify}>
          Goal Sheet-A Reflects employee’s score on his/her “Role Based
          Competencies” that are required to be possessed by employee for
          successfully doing his/her duties. These scores are based on how well
          the employee exhibited these competencies to their direct supervisors,
          HODs and/or colleagues while conducting their routine duties.
        </p>

        <AwardTable
          title="Functional Performance Index (FARS)"
          currentYearData={ratingData?.fars}
          prevYearData={prevYearRatingData?.fars}
          sheetData={sheetData}
          isSheet={false}
        />
        <AwardTable
          title="Behavioural Performance Index (BARS)"
          currentYearData={ratingData?.bars}
          prevYearData={prevYearRatingData?.bars}
          sheetData={sheetData}
          isSheet={false}
        />
         <AwardTable
          title="Total Score on Goal Sheet-A"
          sheetData={sheetData}
          isSheet={true}
        />
        <p className={styles.txtJustify}>
          Any competency that scores less than 85 % is an improvement area for
          you in next performance cycles.
          <br />
          If your competencies scored above 85 %, then it means you performance
          on Goal Sheet-A is better than average, but it has scope of
          improvement until it attains and remains at 100 % mark.
        </p>

        <span className={styles.heading}>
          <u>Goal Sheet-B</u>
        </span>
        <p className={styles.txtJustify}>
          Goal Sheet-B reflects employee’s performance on specific KRAs (Key
          Result Areas), allocated to him/her as part of his/her direct
          contributions towards achievement of departmental and organizational
          objectives. A certain set of KRAs are always specific to a certain set
          of performance cycles, however you may ask for your specific detailed
          KRA sheet from your HOD for improving yourself in next performance
          cycle.
        </p>

        <span className={styles.heading}>
          <u>Goal Sheet-C</u>
        </span>
        <p className={styles.txtJustify}>
          Goal Sheet-C reflects overall achievement of incumbent’s department on
          its set departmental objectives. An employee’s performance is always a
          sub-function of department’s overall results. For example- if a
          certain crew member sailing on a ship is doing well, but the ship has
          not been able to reach at its destination in set time, then that crew
          member is also a part of that miss. Therefore, Categorization of
          employee in certain performance category is also a dependent on how
          well the department has achieved its overall targets.
          <br />
          If you are eligible for 360 Degree feedback of your behavior, you will
          find another sheet attached. Your final performance category may make
          your eligible for a revision or CDP or PIP or some other action. If
          you have a revised compensation, then you may receive another letter
          about the same from HR. Please review your areas of improvement
          critically, and we wish you all the best for your performance in next
          cycle.
          <br />
          <br />
          <b>
            For final classification of employee in one of several performance
            categories following criteria applies-
          </b>
          <br />
          <b>
            20 % weightage to Goal Sheet A* + 60 % Weightage to Goal Sheet-B +
            20 % Weightage to Goal Sheet C{" "}
          </b>
          <br />
          This generates final score of an employee out of 100. based on which
          employee gets classified in in one of the 11 performance categories.
        </p>

        <p className={styles.txtJustify}>
          {/*<strong>Your final performance category is {empData?.increment_level}.</strong><br/>*/}
          <br />
          To refer the chart of performance categories and other PMS related
          policy guidelines please refer to the back side of this sheet. If you
          are eligible for 360 Degree feedback of your behavior, you will find
          another sheet attached.
          <br />
          Your final performance category may make your eligible for a revision
          or CDP or PIP or some other action. If you have a revised
          compensation, then you may receive another letter about the same from
          HR.
          <br />
          Please review your areas of improvement critically, and we wish you
          all the best for your performance in next cycle.
        </p>
        <div className={styles.sigWrap}>
          <p className={styles.txtJustify}>
            <div>
              <img className={styles.imgWrapSign} src={sign} />
            </div>
            <strong>Authorized Signatory</strong>
            <br />
            <strong>Corporate HR</strong>
            <br />
            <a
              className={styles.hyperlinkText}
              // href="akashdeep.sharma@indswiftlabs.com"
              target="_blank"
            >
              akashdeep.sharma@indswiftlabs.com
            </a>
            <br />
            <br /> Contents of this letter are extremely confidential and
            restricted for any circulation or discussion with anyone in
            organization. Breaching this confidently may attract suitable
            disciplinary action against the provider and receiver of this
            information. If someone influence to share this information at any
            platform, please stop the communication and immediately report to
            Corporate HR or Site HR.
          </p>
        </div>

        {empData?.form_type === "TYPE_4" && (
          <div className={styles.typeContainer}>
            <Header empData={empData} />
            <p className={styles.txtJustify2}>
              <br/>
              Incumbent’s self-rating and the team’s average on Behavioral
              competence has a difference of  <strong>{  empData?.bars_diff}</strong>.
              <br />
              <b>
                Positive Variance means you over-rate yourself on Behavioral
                capabilities and Negative Variance means you under-rated
                yourself on Behavioral Capabilities. Ideally the variance should
                be less than 10 % in positive or negative side .
              </b>
              <br/>
              <b>
                Higher the variance on either side means lower is the score on
                360 Degree Assessment.
              </b>
              {/* <br/> */}
              <br/>
              Higher the variance poor is the relation between incumbent and
              his/her team.
              <br />
              Lower score reflects that incumbent may not be able to positively
              influence his her/her team in deriving better performances from
              them and vice versa.
              {/* <br /> */}
              <br />
              A low score may also remove or dilute your right to rate your team
              on set performance standards.
              <br />
              To a certain extent, score on 360-degree feedback also affects
              compensation revision of employee, if the employee was eligible
              for that.
              <br />
              Therefore, if the score is low or if the variance is high, then
              you may receive a separate action plan form HR to improve on this
              aspect.
            </p>

            <GroupCTable title="" data={group4Data} />
            <div className={styles.graphCont}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={group4Data}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="label" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    isAnimationActive={false}
                    name="Self"
                    dataKey="self"
                    stroke="#2896E9"
                    fill="#2896E9"
                    fillOpacity={0.6}
                  />
                  <Radar
                    isAnimationActive={false}
                    name="Others"
                    dataKey="others"
                    stroke="#E92828"
                    fill="#E92828"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.sigWrapLower}>
              <p className={styles.txtJustify}>
                <div>
                  <img className={styles.imgWrapSign} src={sign} />
                </div>
                <strong>Authorized Signatory</strong>
                <br />
                <strong>Corporate HR</strong>
                <br />
                <a
                  className={styles.hyperlinkText}
                  // href="akashdeep.sharma@indswiftlabs.com"
                  target="_blank"
                >
                  akashdeep.sharma@indswiftlabs.com
                </a>
                <br />
                <br /> Contents of this letter are extremely confidential and
                restricted for any circulation or discussion with anyone in
                organization. Breaching this confidently may attract suitable
                disciplinary action against the provider and receiver of this
                information. If someone influence to share this information at
                any platform, please stop the communication and immediately
                report to Corporate HR or Site HR.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwardSheetView;
