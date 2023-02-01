import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import DrishtiImage from "../../assets/img/Ikigai illustation.png";
import { DrishtiData } from "../../helper/helper";
import EmployeeIkigaiHook from "./EmployeeIkigaiHook";

function EmployeeIkigai() {
  const { staticEmployeeIkigaiData, employeeData } = EmployeeIkigaiHook({});
  const DrishtiDescription = DrishtiData;
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
            <div>
              {DrishtiDescription?.length > 0 &&
                DrishtiDescription?.map((item) => {
                  return (
                    <div className={styles.DrishtiDescriptionWrapper}>
                      <span className={styles.title}>{item?.title}</span>
                      <div>
                        {item?.content?.map((data) => (
                          <div className={styles.mappedDataWrapper}>
                            <div className={styles.squareDiv}></div>
                            <span className={styles.mappedData}>{data}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeIkigai;
