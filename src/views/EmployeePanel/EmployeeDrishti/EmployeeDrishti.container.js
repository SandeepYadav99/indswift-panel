import React from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import EmployeeDrishtiHook from "./EmployeeDrishtiHook";
import styles from "./Style.module.css";
import DrishtiImage from "../../../assets/img/drishti illustartion.png";
import { DrishtiData } from "../../../helper/helper";
import DrishtiList from "./Faq/DrishtiList";
import { useEffect } from "react";

function EmployeeDrishti() {
  const { staticEmployeeDrishtiData, employeeData } = EmployeeDrishtiHook({});
  const DrishtiDescription = DrishtiData;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.employeeDrishtiWrapper} >
      <InformationCard
        heading="Drishti - Employee Welfare Programs"
        imageUrl={DrishtiImage}
        data={staticEmployeeDrishtiData}
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
      <div>
        <div className={styles.cooperateWrapper}>
          <DrishtiList />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDrishti;
