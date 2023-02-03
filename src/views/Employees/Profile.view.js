import React from "react";
import styles from "./Style.module.css";
import PersonalInfo from "./components/Profile/PersonalInfo";
import OfficialDetails from "./components/Profile/OfficialDetails";
import ContactInfo from "./components/Profile/ContactInfo";
import DepartmentInfo from "./components/Profile/DepartmentInfo";
import GovtInfo from "./components/Profile/GovtInfo";
import BankInfo from "./components/Profile/BankInfo";
import AddressInfo from "./components/Profile/Address";
import Timeline from "./components/Profile/Timeline";
import PerformanceReview from "./components/Profile/PerfomanceReview";

const ProfileView = ({ data }) => {
  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.lhs}>
          <PersonalInfo data={data} />
          <ContactInfo contact={data?.contact} />
          <AddressInfo address={data?.address} />
          {/*<Timeline />*/}
        </div>
        <div className={styles.rhs}>
          <OfficialDetails data={data} />
          <DepartmentInfo data={data} />
          <GovtInfo idCards={data?.identity_date} />
          <BankInfo bankD={data?.bank} />
          <PerformanceReview reviewer={data?.pms_reviewer} />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
