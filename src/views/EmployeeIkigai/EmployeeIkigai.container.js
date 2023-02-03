import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import DrishtiImage from "../../assets/img/Ikigai illustation.png";
import { IkigaiData } from "../../helper/helper";
import EmployeeIkigaiHook from "./EmployeeIkigaiHook";

function EmployeeIkigai() {
  const { staticEmployeeIkigaiData, employeeData } = EmployeeIkigaiHook({});
  const DrishtiDescription = IkigaiData;
  return (
    <div className={styles.employeeDrishtiWrapper}>
      <InformationCard
        heading="Ikigai - Employee Empowerment"
        imageUrl={DrishtiImage}
        data={staticEmployeeIkigaiData}
      />
      <div className={styles.programBenefitWrapper}>
        <div>
          <div>
            <span className={styles.title}>Program Benefits</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.programDescription}>
            <p>
              Currently 4 Programs that are effective under branch of IKIGAI are
              stated below
            </p>
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
                  EFS (EMPLOYEE FEEDBACK SYSTEM)
                </span>
                <div>
                  <div className={styles.mappedDataWrapperLower}>
                    <div className={styles.squareDivWrapper}>
                      <div className={styles.squareDiv}></div>
                    </div>
                    <span className={styles.mappedData}>
                      Organization firmly believe that employees working down
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
                      Various actions were performed in organization based on
                      feedback of employees collected through above 3
                      interventions. Some of changes that were propagated based
                      on feedback from employees are: <br />{" "}
                      <span>
                        1. Adopting new 360 Degree based PMS and Training
                        methods effectively working
                      </span>
                      <br />
                      <span>
                        {" "}
                        2. Performing compensation fitments exercise.
                      </span>
                      <br /> <span>3. Providing GMC, GTI.</span> <br />
                      <span>
                        4. Interaction of New Canteen, New Buses, New automatic
                        Payroll systems, Revision of existing policies,
                        Automation of leave procedures, Uniformity of Salary
                        structures, Launch E-Suvidha, Launch of New Website,
                        Launch of Compensation grading activities etc
                      </span>
                    </span>
                  </div>
                  <div className={styles.mappedDataWrapperLower}>
                    <div className={styles.squareDivWrapper}>
                      <div className={styles.squareDiv}></div>
                    </div>
                    <span className={styles.mappedData}>
                      These actions are evident to establish that employees of
                      organization have very strong and fair communication
                      channels through which they can use their empowerment in
                      development of organization.
                      <br />
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
