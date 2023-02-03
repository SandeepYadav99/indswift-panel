import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import DeepakImage from "../../assets/img/deepak illustartion.png";
import { DeepakData } from "../../helper/helper";
import EmployeeUtsavHook from "./EmployeeUtsavHook";
import DownArrow from "../../assets/img/ic_dropdown.png";
import GalleryImages from "./components/GalleryImages";

function EmployeeUtsav() {
  const { staticEmployeeDeepakData, employeeData } = EmployeeUtsavHook({});
  const DeepakDescription = DeepakData;
  return (
    <div className={styles.employeeDrishtiWrapper}>
      <InformationCard
        heading="Deepak - Social Welfare Programs"
        imageUrl={DeepakImage}
        data={staticEmployeeDeepakData}
      />
      <div className={styles.imageGalleryWrapper}>
        <div className={styles.headingContainer}>
          <span className={styles.title}>Events Catalogue-2022</span>
          <img src={DownArrow} />
        </div>
        <div>
          <GalleryImages />
        </div>
      </div>
    </div>
  );
}

export default EmployeeUtsav;
