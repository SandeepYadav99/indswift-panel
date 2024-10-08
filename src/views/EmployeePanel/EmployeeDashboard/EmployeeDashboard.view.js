import React, { useEffect } from "react";
import AnnouncementInfo from "./component/AnnouncementInfo/AnnouncementInfo";
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
import { useDispatch } from "react-redux";
import { actionInitiateEmployeeDashboard } from "../../../actions/EmployeeDashboard.action";
import CoverImageGallery from "./component/CoverImageGallery/CoverImageGallery";
import useSubscriber from "../../../hooks/SubscriberHook";

function EmployeeDashboard({moduleName}) {
  const {} = useSubscriber(moduleName);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionInitiateEmployeeDashboard());
  }, []);

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
          <div className={styles.desktopView}>
            <Members />
          </div>
        </div>
        <div className={styles.EmployeecolumnWrapper}>
          <EmployeeEventList />
        </div>
        <div className={styles.memberMobile}>
        <Members />
        </div>
      </div>
      <div className={styles.RecentUpdateWrapper}>
        <div className={styles.RecentUpdateUpperCard}>
          <RecentUpdate />
          <EngagementEvents />
        </div>
        <div className={styles.RecentUpdateLowerCard}>
          <EmployeeCategories />
          <CoverImageGallery />
        </div>
      </div>
      <div className={styles.SocialMediaOuterWrapper}>
        <SocialMedia />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
