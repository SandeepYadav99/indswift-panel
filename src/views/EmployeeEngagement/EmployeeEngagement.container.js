import React, { useState } from "react";
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
import HCM_MOBILE from "../../assets/img/MobileHCMGraph.png";
import { InfoOutlined } from "@material-ui/icons";
import { Dialog } from "@material-ui/core";

function EmployeeEngagement() {
  const { StaticEngagementData, employeeData } = EmployeeEngagementHook({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const PopupComponent = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} style={{ width: "100%" }}>
          <div className={styles.GeneralInfoWrapeer}>
            <div className={styles.alignDataToWrapper}>
              <div>
                <span className={styles.title2}>
                  Swift HCM (Swift-Happiness Capitalization Module)
                </span>
                <div className={styles.newLine} />
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoDetails}>
                Employee Engagement, Employee Welfare and Employee Empowerment
                (The 3 E’s) have remained to be 3 key priority areas for
                Ind-Swift’s performance culture since from our commencement.
              </p>
              <br />
              <p className={styles.infoDetails}>
                Organization has been doing a lot on these 3 aspects with
                coordination and corporation from all our employees who are
                integral part of our common identity i.e. “Swift Family”.
              </p>
              <br />
              <p className={styles.infoDetails}>
                We are touching all areas of Human Development & Happiness in
                organization by means our “Swift Happiness Capitalization Module
                (S-HCM)”.
              </p>
              <br />
              <p className={styles.infoDetails}>
                Swift-HCM as a module comprises of 4 branches, each of which
                contains further programs and interventions. These branches work
                with different focus on different attributes.
              </p>
              <br />
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  return (
    <div className={styles.employeeEngagementWrapper}>
      <div className={styles.mobileSwiftHCM}>
        <InformationCard
          heading="Swift HCM (Swift-Happiness Capitalization Module)"
          imageachorTag={employeeData?.document}
          imageUrl={images}
          productLink="View Induction Booklet"
          data={StaticEngagementData}
          customClass={styles.EmployeeDimensions}
        />
      </div>
      <div className={styles.chartWrapper}>
        <img alt={'skynet'} className={styles.engagementModuleImage} src={Chart} />
        <img alt={'skynet'} className={styles.engagementMobileImage} src={HCM_MOBILE} />
        <div className={styles.iconPositionResponsive}>
          <InfoOutlined
            fontSize={"small"}
            style={{ color: "blue" }}
            onClick={handleOpen}
          />
        </div>
      </div>
      {open && <PopupComponent />}
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
              name="UDESHYA"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeEngagement;
