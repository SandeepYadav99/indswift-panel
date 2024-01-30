import styles from "./styled.module.css";
import { useEffect } from "react";
import history from "../../libs/history.utils";
import { Link } from "react-router-dom";
import Attendance from "../../assets/Mobile/ic_attendance@2x.png";
import knowledgeCenter from "../../assets/Mobile/ic_knowledge@2x.png";
import LeaveApplication from "../../assets/Mobile/ic_application@2x.png";
import Circular from "../../assets/Mobile/ic_circular@2x.png";
import Engagement from "../../assets/Mobile/ic_engage@2x.png";
import HCMModule from "../../assets/Mobile/ic_hcm@2x (1).png";
import IndiswiftBannerImage from "../../assets/Mobile/SkyNetBannerMobile.jpg";
import Example from "./Lotties.component";
/*Looties Imported here*/
import claimsData from "../../assets/Lotties/claims.json";
import travellottie from "../../assets/Lotties/travel.json";
import loanlottie from "../../assets/Lotties/loan.json";
import imprestlottie from "../../assets/Lotties/imprest.json";
import policylotties from "../../assets/Lotties/policy.json";
import NewProfile from "../../assets/Lotties/Profile_new_new.json";

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
          src={IndiswiftBannerImage}
          alt="text"
          className={styles.widthImageAdjust}
        />
      </div>
      <div className={styles.mobileThree}>
        <div className={styles.subContainer}>
          <div className={styles.plainPaper}>
            <Link to={"/my/profile"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <Example animation={NewProfile}  style={{ height: "50px", width: "50px" }}/>
                <div className={styles.text}> My Profile</div>
              </div>
            </Link>
          </div>
          <div className={styles.plainPaper}>
            <Link to={"/employee/dashboard"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <div className={styles.imgBox}>
                  <img alt="text" src={Engagement}  style={{ height: "60px", width: "60px" }}/>
                </div>
                <div className={styles.text}>Engage Dashboard</div>
              </div>
            </Link>
          </div>
          <div className={styles.plainPaper}>
            <Link to={"/leave-application/list"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <div className={styles.imgBox}>
                  <img
                    alt="text"
                    src={LeaveApplication}
                    style={{ height: "60px", width: "60px" }}
                  />
                </div>
                <div className={styles.text}>My leave Application</div>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.plainPaper}>
            <Link to={"/employee/engagement"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <div className={styles.imgBox}>
                  <img
                    alt="text"
                    src={HCMModule}
                    style={{ height: "60px", width: "60px" }}
                  />
                </div>
                <div className={styles.text}>HCM Module</div>
              </div>
            </Link>
          </div>
          <div className={styles.plainPaper}>
            <Link to={"/employeecircular"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <div className={styles.imgBox}>
                  <img
                    alt="text"
                    src={Circular}
                    style={{ height: "50px", width: "50px" }}
                  />
                </div>
                <div className={styles.text}>Circulars</div>
              </div>
            </Link>
          </div>
          <div className={styles.plainPaper}>
            <Link to={"/cm/claims"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <Example animation={claimsData} />
                <div className={styles.text}>Claims</div>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.plainPaper}>
            <Link to={"/hrpolicy"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <Example animation={policylotties} />

                <div className={styles.text}>HR policies</div>
              </div>
            </Link>
          </div>
          <div className={styles.plainPaper}>
            <Link to={"/employee/knowledge"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <div className={styles.imgBox}>
                  <img
                    alt="text"
                    src={knowledgeCenter}
                    style={{ height: "60px", width: "60px" }}
                  />
                </div>
                <div className={styles.text}>Knowledge Centre</div>
              </div>
            </Link>
          </div>
          <div className={styles.plainPaper}>
            <Link to={"/employees/claim/imprest"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <Example animation={imprestlottie} />

                <div className={styles.text}>Imprest</div>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.plainPaper}>
            <Link to={"/travel/plan"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <Example animation={travellottie} />

                <div className={styles.text}>Travel Planner</div>
              </div>
            </Link>
          </div>
          <div className={styles.plainPaper}>
            <a
              href={"http://122.186.44.85/TOS7x1/frmLogin.aspx"}
              className={styles.linkRoutes}
              target="_blank"
            >
              <div className={styles.subPaper}>
                <div className={styles.imgBox}>
                  <img alt="text" src={Attendance} style={{ height: "40px" }} />
                </div>
                <div className={styles.text}>Attendance</div>
              </div>
            </a>
          </div>
          <div className={styles.plainPaper}>
            <Link to={"/loan/list"} className={styles.linkRoutes}>
              <div className={styles.subPaper}>
                <Example animation={loanlottie} />
                <div className={styles.text}>Loan</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLandingPage;
