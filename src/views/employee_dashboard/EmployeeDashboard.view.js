import React from "react";
import AnnouncementInfo from "./component/AnnouncementInfo/AnnouncementInfo";
import DashboardImageGallary from "./component/DashboardImageGallary/DashboardImageGallary";
import EmployeeCategories from "./component/EmployeeCategories/EmployeeCategories";
import EmployeeEventList from "./component/EmployeeEventList/EmployeeEventList";
import EngagementEvents from "./component/EngagementEvents/EngagementEvents";
import Members from "./component/Members/Members";
import QuoteInfo from "./component/QuoteInfo/QuoteInfo";
import RecentUpdate from "./component/RecentUpdate/RecentUpdate";
import SocialMedia from "./component/SocialMedia/SocialMedia";
import ThemeInfo from "./component/ThemeInfo/ThemeInfo";
import UserInfo from "./component/UserInfo/UserInfo";
import styles from "./Style.module.css";

function EmployeeDashboard() {
  return (
    <div className={styles.EmployeeDashboardWrapper}>
      <div className={styles.EmployeeDashboardFlex}>
        <UserInfo />
        <QuoteInfo />
        <ThemeInfo />
      </div>
      <div className={styles.secondRow}>
        <div className={styles.announcementRowWrapper}>
          <AnnouncementInfo />
          <Members />
        </div>
        <div className={styles.EmployeecolumnWrapper}>
          <EmployeeEventList />
        </div>
      </div>
      <div className={styles.RecentUpdateWrapper}>
        <div className={styles.RecentUpdateUpperCard}>
          <RecentUpdate />
          <EngagementEvents />
        </div>
        <div className={styles.RecentUpdateLowerCard}>
          <EmployeeCategories />
          {/* <DashboardImageGallary /> */}
        </div>
      </div>
      <div className={styles.SocialMediaOuterWrapper}>
        <SocialMedia />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
