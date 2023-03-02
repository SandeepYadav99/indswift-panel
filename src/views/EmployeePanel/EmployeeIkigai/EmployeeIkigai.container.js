import React from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import DrishtiImage from "../../../assets/img/Ikigai illustation.png";
import { IkigaiData } from "../../../helper/helper";
import EmployeeIkigaiHook from "./EmployeeIkigaiHook";

function EmployeeIkigai() {
  const { staticEmployeeIkigaiData, employeeData } = EmployeeIkigaiHook({});
  const DrishtiDescription = IkigaiData;
  return (
    <div className={styles.employeeDrishtiWrapper}>
      <InformationCard
        heading="Udeshya"
        imageUrl={DrishtiImage}
        data={staticEmployeeIkigaiData}
      />
      <div className={styles.programBenefitWrapper}>
        <div>
          <div>
            <span className={styles.title}>Programs under Udeshya</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.programDescription}>
            <div>
              {DrishtiDescription?.length > 0 &&
                DrishtiDescription?.map((item) => {
                  return (
                    <div className={styles.DrishtiDescriptionWrapper}>
                      <span className={styles.title}>{item?.title}</span>
                      <div>
                        {item?.content?.map((data) => (
                          <div className={styles.mappedDataWrapper}>
                            <div className={styles.squareDivWrapper}>
                              <div className={styles.squareDiv}></div>
                            </div>
                            <span className={styles.mappedData}>{data}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              <div className={styles.DrishtiDescriptionWrapper}>
                <span className={styles.title}>
                  Employee Feedback Systems (BB, Sehyog, Surveys, Sarthak)
                </span>
                <div>
                  <div className={styles.mappedDataWrapperLower}>
                    <div className={styles.squareDivWrapper}>
                      <div className={styles.squareDiv}></div>
                    </div>
                    <span className={styles.mappedData}>
                      Organization firmly believes that employees working down
                      and across the hierarchies must have clear and equally
                      available communication channels through which they may
                      express their concerns/ideas/suggestion to top management
                      at any time. For this 4 structured interventions are
                      effectively working: <br /> <span>1. Bindass Bol</span>
                      <br />
                      <span>2. Sehyog</span>
                      <br /> <span>3. Employee Surveys</span> <br />
                      <span>4. SARTHAK</span>
                    </span>
                  </div>
                  <div className={styles.mappedDataWrapperLower}>
                    <div className={styles.squareDivWrapper}>
                      <div className={styles.squareDiv}></div>
                    </div>
                    <span className={styles.mappedData}>
                      Re-Inventing Opportunities (Role Upliftment, Succession &
                      Career Planning) <br />{" "}
                      <span>
                        This program is aimed to propagate succession & career
                        planning models of organization and provide opportunity
                        to employee for re-inventing their careers within
                        organizations
                      </span>
                    </span>
                  </div>
                  <div className={styles.mappedDataWrapperLower}>
                    <div className={styles.squareDivWrapper}>
                      <div className={styles.squareDiv}></div>
                    </div>
                    <span className={styles.mappedData}>
                      Protsahan (Employee Education and Scholarship Scheme)
                      <br />
                      <span>
                        1. Protsahan is an education assistance program that
                        offers scholarship for academic upliftment of employees
                        and their children.{" "}
                      </span>
                      <br />
                      <span>
                        2.Program aims at providing crucial financial assistance
                        to eligible children of our employees in the form of an
                        “academic scholarship, through which, they may realize
                        their dreams of building exceptional careers in fields
                        of their choice
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeIkigai;
