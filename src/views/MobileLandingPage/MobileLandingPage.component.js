import styles from "./styled.module.css";
import indiSwiftIcon from "../../assets/img/indswift family illustration.png";
import { useEffect } from "react";
import history from "../../libs/history.utils";
import { Link } from "react-router-dom";
import Attendance from "../../assets/Mobile/ic_attendance.png";
import profilePic from "../../assets/Mobile/ic_profile.png";
import LoanProfile from "../../assets/Mobile/ic_loan.png";
import Imprest from "../../assets/Mobile/ic_imprest.png";
import TravelPlanner from "../../assets/Mobile/ic_travel_planner.png";
import claims from "../../assets/Mobile/ic_claims.png";
import knowledgeCenter from "../../assets/Mobile/ic_knowledge.png";
import HrPolicies from "../../assets/Mobile/ic_hr_policies.png";
import LeaveApplication from "../../assets/Mobile/ic_application.png";
import Circular from "../../assets/Mobile/ic_circular.png";
import Engagement from "../../assets/Mobile/ic_engage.png";
import HCMModule from "../../assets/Mobile/ic_hcm.png";

const MobileLandingPage = () => {
  useEffect(() => {
    if (window.innerWidth > 768) {
      history.push(`/`);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={indiSwiftIcon}
          alt="text"
          className={styles.widthImageAdjust}
        />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <Link to={"/my/profile"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" style={{height:"40px",width:"40px"}} src={profilePic}/>
              </div>
              <div className={styles.text}> My Profile</div>
            </div>
          </Link>
        </div>
        <div className={styles.plainPaper}>
          <Link to={"/employee/dashboard"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={Engagement} />
              </div>
              <div className={styles.text}>Engage Dashboard</div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <Link to={"/leave-application/list"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={LeaveApplication}/>
              </div>
              <div className={styles.text}>My leave Application</div>
            </div>
          </Link>
        </div>
        <div className={styles.plainPaper}>
          <Link to={"/cm/claims"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={claims}/>
              </div>
              <div className={styles.text}>Claims</div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <Link to={"/employee/engagement"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={HCMModule} />
              </div>
              <div className={styles.text}>HCM Module</div>
            </div>
          </Link>
        </div>
        <div className={styles.plainPaper}>
          <Link to={"/employeecircular"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={Circular} />
              </div>
              <div className={styles.text}>Circulars</div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <Link to={"/hrpolicy"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={HrPolicies}/>
              </div>
              <div className={styles.text}>HR policies</div>
            </div>
          </Link>
        </div>
        <div className={styles.plainPaper}>
          <Link to={"/employee/knowledge"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={knowledgeCenter}/>
              </div>
              <div className={styles.text}>Knowledge Centre</div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <Link to={"/employees/claim/imprest"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={Imprest}/>
              </div>
              <div className={styles.text}>Imprest</div>
            </div>
          </Link>
        </div>
        <div className={styles.plainPaper}>
          <Link to={"/travel/plan"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={TravelPlanner} />
              </div>
              <div className={styles.text}>Travel Planner</div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <a href={"http://122.186.44.85/TOS7x1/frmLogin.aspx"} className={styles.linkRoutes} target="_blank">
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={Attendance} style={{height:"40px"}}/>
              </div>
              <div className={styles.text}>Attendance</div>
            </div>
          </a>
        </div>
        <div className={styles.plainPaper}>
          <Link to={"/loan/list"} className={styles.linkRoutes}>
            <div className={styles.subPaper}>
              <div className={styles.imgBox}>
                <img alt="text" src={LoanProfile}/>
              </div>
              <div className={styles.text}>Loan</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileLandingPage;
