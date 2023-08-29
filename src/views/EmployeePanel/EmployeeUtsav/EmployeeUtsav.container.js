import React from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import UtsavImage from "../../../assets/img/utsav illustration.png";
import { DeepakData } from "../../../helper/helper";
import EmployeeUtsavHook from "./EmployeeUtsavHook";
import DownArrow from "../../../assets/img/ic_dropdown.png";
import UpArrow from "../../../assets/img/ic_up_arrow.png";
import GalleryImages from "./components/GalleryImages";
import { Accordion } from "@material-ui/core";

function EmployeeUtsav() {
  const {
    handleViewDetails,
    employeeUtsavData,
    selectedItemIndex,
    handleItemClick,
  } = EmployeeUtsavHook({});
  const DeepakDescription = DeepakData;
  const reverseArray = (arr) => {
    if (arr){
      const newArr= [...arr]
      return newArr?.reverse();
    }
  };
  const accordionStyles = {
    background: "transparent",
    boxShadow: "none",
    backgroundColor: "none",
  };

  return (
    <div className={styles.employeeDrishtiWrapper}>
      <div className={styles.employeeInducationWrapper}>
        <div>
          <div>
            <span className={styles.title}>Utsav</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <p className={styles.contentFormat}>
                Life is just an another name of Celebrations. Apart from work,
                recognition, growth and appreciation; organization make special
                efforts to make the stay of employees at Ind-Swift not less than
                a Celebration in itself. 
              </p>
              <p>
                Based in this principle, Utsav Branch of “SkyNet” works for area
                of Employee Engagement that works to organize various events and
                celebrations on festivals, birthdays etc at different sites and
                give time to employees for celebrating important events with
                their family @ work. 
              </p>
              <div className={styles.eventsFlex}>
                <span className={styles.title}>Programs under Utsav</span>
                <p>
                  UTSAV deals with propagating Employee Engagement in
                  organization by two means- -
                </p>
              </div>
              <div className={styles.mappedDataWrapper2}>
                <div>
                  <span className={styles.title}>Events</span>
                </div>
                <div>
                  {/* <div className={styles.squareDivWrapper}> */}
                  {/* <div className={styles.squareDiv}></div> */}
                  <span
                  // className={styles.mappedData}
                  >
                    Organization observes every month on a certain Theme, all
                    site HRs organize at least one event per month that matches
                    theme of that month. This is apart from routine
                    celebrations, events and festivals.
                  </span>
                  {/* </div> */}
                </div>
              </div>
              <div className={styles.SubhekshWrapper}>
                <span className={styles.title}>Subheksha</span>
                <span>
                  Under this program, organization is conducting 3
                  interventions-
                </span>
              </div>
              <div className={styles.descWrapper}>
                <span className={styles.title}>
                  Alumni Relation Management (CFL)
                </span>
                <div className={styles.mappedDataWrapper}>
                  <span className={styles.mappedData2}>
                    Employees who leave the organization but have been
                    performing well are added in a special alumni group known as
                    CFL (Colleagues for Life). These employees are awarded with
                    Alumni Certificates on separation, and they are added in a
                    special WhatsApp group to keep them connected with
                    organization. They are also eligible to re-apply in
                    organization after 6 months of separation.
                  </span>
                </div>
              </div>

              <div className={styles.descWrapper}>
                <span className={styles.title}>Service Tenure Ceremonies</span>
                <div className={styles.mappedDataWrapper}>
                  <span className={styles.mappedData2}>
                    One of the core strengths of our great organization is our
                    stable, confident, and determined workforce.
                    <br />
                    <p className={styles.restrictPadding}>
                      {" "}
                      It is very easy to start a journey, but it takes a great
                      sense of responsibility to continue that journey while
                      overcoming all the obstacles and hurdles. In Today’s
                      unstable world, it takes a lot of courage to stay
                      committed with a single cause.
                    </p>
                    <br />
                    <p className={styles.restrictPadding}>
                      Organization appreciates employees who have dedicated
                      their careers in making the dream “Ind-Swift” a reality,
                      therefore organisation commenced a monthly activity known
                      as
                      <strong> "Service Award Ceremony"</strong> .
                    </p>
                     
                    <br />
                    This ceremony is organized on every 25th working date of the
                    month, where organization honour those employees who have
                    completed 5 years, 10 years, 15 year, 20 years, 25 years,
                    25+ years, or retirement of their journey with organization.
                  </span>
                </div>
              </div>
              <div className={styles.descWrapper}>
                <span className={styles.title}>
                  Organizational Tokens (Diaries, Calendars etc)
                </span>
                <div className={styles.mappedDataWrapper}>
                  <span className={styles.mappedData2}>
                    Organization distributes several appreciation and gestures
                    tokens to employees at set periodicity.
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={UtsavImage} />
            </div>
          </div>
        </div>
      </div>
      {employeeUtsavData?.map((item, index) => {
        return (
          item?.items?.length > 0 && (
            <div className={"imageGalleryWrapper"} key={`utsav_galery${index}`}>
              <div className={styles.headingContainer}>
                <span className={styles.title}>{item?.name}</span>
                <img
                  style={{ cursor: "pointer" }}
                  src={selectedItemIndex === index ? UpArrow : DownArrow}
                  onClick={() => handleItemClick(index)}
                />
              </div>
              {item?.items?.length > 0 && (
                <Accordion
                  expanded={selectedItemIndex === index}
                  style={accordionStyles}
                >
                  <div className={styles.Catalogue}>
                    {reverseArray(item?.items)?.map((images, id) => {
                      return images?.cover_image &&
                        selectedItemIndex === index ? (
                        <GalleryImages
                          key={`gallery_image${id}`}
                          onClick={() => handleViewDetails(images?.id)}
                          imageUrl={images?.cover_image}
                          name={images?.name}
                        />
                      ) : (
                        <></>
                      );
                    })}
                  </div>
                </Accordion>
              )}
            </div>
          )
        );
      })}
    </div>
  );
}

export default EmployeeUtsav;
