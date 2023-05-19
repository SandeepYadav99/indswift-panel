import React from "react";
import styles from "./Style.module.css";
import PersonalInfo from "./components/Profile/PersonalInfo";
import OfficialDetails from "./components/Profile/OfficialDetails";
import ContactInfo from "./components/Profile/ContactInfo";
import DepartmentInfo from "./components/Profile/DepartmentInfo";
import GovtInfo from "./components/Profile/GovtInfo";
import BankInfo from "./components/Profile/BankInfo";
import AddressInfo from "./components/Profile/Address";
import PerformanceReview from "./components/Profile/PerfomanceReview";
import ProfileDisclaimer from "./components/ProfileDisclaimer/ProfileDisclaimer";
import NomineeDetails from "./components/Profile/NomineeDetails";
import ResignInfo from "./components/Profile/ResignInfo";

const ProfileView = ({ data }) => {
  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.lhs}>
          <PersonalInfo data={data} />
          <ContactInfo contact={data?.contact} />
          <AddressInfo address={data?.address} />
          {
            data?.status !=='ACTIVE' && 
          <ResignInfo bankD={data?.resign_data}/>
          }
          {/*<Timeline />*/}
        </div>
        <div className={styles.rhs}>
          <OfficialDetails data={data} />
          <DepartmentInfo data={data} />
          <GovtInfo idCards={data?.identity_date} />
          <BankInfo bankD={data?.bank} />
          <PerformanceReview reviewer={data?.pms_reviewer} image={data?.image}/>
          <NomineeDetails nominee={data?.nominees}/>
        </div>
      </div>
      <ProfileDisclaimer />
    </div>
  );
};

export default ProfileView;
