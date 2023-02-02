import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import DeepakImage from "../../assets/img/deepak illustartion.png";
import { DeepakData } from "../../helper/helper";
import EmployeeDeepakHook from "./EmployeeDeepakHook";

function EmployeeDeepak() {
  const { staticEmployeeDeepakData, employeeData } = EmployeeDeepakHook({});
  const DeepakDescription = DeepakData;
  return (
    <div className={styles.employeeDrishtiWrapper}>
      <InformationCard
        heading="Deepak - Social Welfare Programs"
        imageUrl={DeepakImage}
        data={staticEmployeeDeepakData}
      />
      <div className={styles.programBenefitWrapper}>
        <div>
          <div>
            <span className={styles.title}>Program Updates</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.programDescription}>
            <div>
              {DeepakDescription?.length > 0 &&
                DeepakDescription?.map((item) => {
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

export default EmployeeDeepak;
