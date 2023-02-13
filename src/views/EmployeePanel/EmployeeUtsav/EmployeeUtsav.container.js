import React from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import UtsavImage from "../../../assets/img/utsav illustration.png";
import { DeepakData } from "../../../helper/helper";
import EmployeeUtsavHook from "./EmployeeUtsavHook";
import DownArrow from "../../../assets/img/ic_dropdown.png";
import GalleryImages from "./components/GalleryImages";

function EmployeeUtsav() {
  const { staticEmployeeDeepakData, employeeData } = EmployeeUtsavHook({});
  const DeepakDescription = DeepakData;
  return (
    <div className={styles.employeeDrishtiWrapper}>
      {/* <InformationCard
        heading="Deepak - Social Welfare Programs"
        imageUrl={DeepakImage}
        data={staticEmployeeDeepakData}
      /> */}
      <div className={styles.employeeInducationWrapper}>
        <div>
          <div>
            <span className={styles.title}>Utsav @ Ind Swift</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <p className={styles.contentFormat}>
                Life is just an another name of Celebrations. Apart from work,
                recognition, growth and appreciation; organization make special
                efforts to make the stay of employees at Ind-Swift not less than
                a Celebration in itself. Based in this principle, Utsav Branch
                of “Swift E3M” works for area of Employee Engagement that works
                to organize various events and celebrations on festivals,
                birthdays etc at different sites and give time to employees for
                celebrating important events with their family @ work. UTSAV
                deals with propagating Employee Engagement in organization by
                two means- Events -
              </p>
              <div className={styles.eventsFlex}>
                <span className={styles.title}>Events</span>
                <p>- By organizing festivals & gatherings on occasions. </p>
              </div>

              <div className={styles.mappedDataWrapper}>
                <div className={styles.squareDivWrapper}>
                  <div className={styles.squareDiv}></div>
                </div>
                <span className={styles.mappedData}>
                  From 1st Jan 2023 we are launching Theme based months, when
                  every month will have an observance theme, all site HRs are
                  required to organize at least one event per month that matches
                  theme of that month. This is part from routine celebrations,
                  events and festivals.
                </span>
              </div>
              <span className={styles.title}>Subheksh</span>
              <div className={styles.mappedDataWrapper}>
                <div className={styles.squareDivWrapper}>
                  <div className={styles.squareDiv}></div>
                </div>
                <span className={styles.mappedData}>
                  In this arm we are already giving Alumni Certificates to
                  outgoing Employees. Please share list of all employees who
                  have been given Alumni Certificates since from the program
                  started with their personal working mobile numbers to create a
                  CFL (Colleagues for Life) Whatss-App group. @Bhawana please
                  take these details and let’s create the group, moving forward
                  all Alumni Details will be coordinated from Ms Bhawana.
                </span>
              </div>
              <div className={styles.mappedDataWrapper}>
                <div className={styles.squareDivWrapper}>
                  <div className={styles.squareDiv}></div>
                </div>
                <span className={styles.mappedData}>
                  Under Subheskha we are now starting another initiative in
                  which on 24th Working day of each month, each site HR will
                  organize a ceremony where those employees will be invited who
                  have completed 5 years, 10 years, 15 years. 20-year sand 25
                  years in the organization plus all retiring employees of site
                  in that month. Trophies and mementos for these cases will be
                  sent to each site in first week of January for initial 6
                  months (based on your master data), and site HR’s will
                  organize these ceremonies in a set order. Bhawana will share
                  schedule of ceremonies to each site and each site will
                  accordingly conduct this ceremony and submit back
                  pictures/details of event to Bhawana, that will be circulated
                  organization wide from Corporate HR.
                </span>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={UtsavImage} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imageGalleryWrapper}>
        <div className={styles.headingContainer}>
          <span className={styles.title}>Events Catalogue-2022</span>
          <img src={DownArrow} />
        </div>
        <div className={styles.Catalogue}>
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
        </div>
      </div>
      <div className={styles.imageGalleryWrapper}>
        <div className={styles.headingContainer}>
          <span className={styles.title}>Events Catalogue-2020</span>
          <img src={DownArrow} />
        </div>
        <div className={styles.Catalogue}>
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
          <GalleryImages />
        </div>
      </div>
    </div>
  );
}

export default EmployeeUtsav;
