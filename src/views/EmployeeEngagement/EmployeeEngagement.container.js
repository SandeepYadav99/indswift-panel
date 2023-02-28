import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import EmployeeEngagementHook from "./EmployeeEngagementHook";
import styles from "./Style.module.css";
import images from "../../assets/img/indswift family illustration.png";
import Chart from "../../assets/img/Swift_HCM.png";
import EngagementCard from "./components/EngagementCards/EngagementCard";
import DrishtiImage from "../../assets/img/ic_drishti_white.png";
import DeepakImage from "../../assets/img/ic_deepak_white.png";
import IkagaiImage from "../../assets/img/ikagai_white.png";
import UtsavImage from "../../assets/img/ic_utsav_white.png";
import { Link } from "react-router-dom";

function EmployeeEngagement() {
  const { StaticEngagementData, employeeData } = EmployeeEngagementHook({});

  return (
    <div className={styles.employeeEngagementWrapper}>
      <InformationCard
        heading="Employee Engagement Events"
        imageachorTag={employeeData?.document}
        imageUrl={images}
        productLink="View Induction Booklet"
        data={StaticEngagementData}
        customClass={styles.EmployeeDimensions}
      />
      <div className={styles.chartWrapper}>
        <img className={styles.engagementModuleImage} src={Chart} />
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.flex1dir}>
          <Link
            to="/employee/drishti"
            style={{ textDecoration: "none", color: "black" }}
          >
            <EngagementCard
              imageUrl={DrishtiImage}
              department="Employee Welfare"
              name="DRISHTI"
            />
          </Link>
        </div>
        <div className={styles.flex1dir}>
          <Link
            to="/employee/deepak"
            style={{ textDecoration: "none", color: "black" }}
          >
            <EngagementCard
              imageUrl={DeepakImage}
              department="Social Welfare"
              name="DEEPAK"
            />
          </Link>
        </div>
        <div className={styles.flex1dir}>
          <Link
            to="/employee/utsav"
            style={{ textDecoration: "none", color: "black" }}
          >
            <EngagementCard
              imageUrl={UtsavImage}
              department="Employee Engagement"
              name="UTSAV"
            />
          </Link>
        </div>
        <div className={styles.flex1dir}>
          <Link
            to="/employee/udeshya"
            style={{ textDecoration: "none", color: "black" }}
          >
            <EngagementCard
              imageUrl={IkagaiImage}
              department="Employee Empowerment"
              name="Udeshya"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeEngagement;
