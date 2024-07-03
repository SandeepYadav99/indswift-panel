import React, { useState } from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import styles from "./Style.module.css";
import DeepakImage from "../../../assets/img/deepak illustartion.png";
import { DeepakData } from "../../../helper/helper";
import EmployeeDeepakHook from "./EmployeeDeepakHook";
import { InfoOutlined } from "@material-ui/icons";
import { Dialog } from "@material-ui/core";

function EmployeeDeepak() {
  const { staticEmployeeDeepakData, employeeData } = EmployeeDeepakHook({});
  const DeepakDescription = DeepakData;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const PopupComponent = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} style={{ width: "100%" }}>
          <div className={styles.GeneralInfoWrapeer}>
            <div className={styles.alignDataToWrapper}>
              <div>
                <span className={styles.title2}>
                  Deepak - Social Welfare Programs{" "}
                </span>
                <div className={styles.newLine} />
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoDetails}>
                No matter how dark and intense the darkness is, just a single
                “Deepak” is enough to shunt that away. With this thought Deepak
                Branch of “SkyNet” works for area of Social Welfare
              </p>
              <br />
              <p className={styles.infoDetails}>
                This branch provides opportunity to employees and organization
                for coming together and do something for society as a family.
              </p>
            </div>
          </div>
        </Dialog>
      </div>
    );
  };
  return (
    <div className={styles.employeeDrishtiWrapper}>
      <div className={styles.desktopTextView}>
        <InformationCard
          heading="Deepak - Social Welfare Programs"
          imageUrl={DeepakImage}
          data={staticEmployeeDeepakData}
        />
      </div>
      <div className={styles.programBenefitWrapper}>
        <div>
          <div>
            <span className={styles.title}>
              Some interventions that organization has applied in this
              direction- 
            </span>
            <div className={styles.newLine} />
            <div className={styles.iconPositionResponsive}>
              <InfoOutlined
                fontSize={"small"}
                style={{ color: "blue" }}
                onClick={handleOpen}
              />
            </div>
          </div>
          {open && <PopupComponent />}
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
