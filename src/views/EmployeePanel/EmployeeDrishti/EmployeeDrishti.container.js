import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import EmployeeDrishtiHook from "./EmployeeDrishtiHook";
import styles from "./Style.module.css";
import DrishtiImage from "../../../assets/img/drishti illustartion.png";
import { DrishtiData } from "../../../helper/helper";
import DrishtiList from "./Faq/DrishtiList";
import { useEffect } from "react";
import EventEmitter from "../../../libs/Events.utils";
import { InfoOutlined } from "@material-ui/icons";

function EmployeeDrishti() {
  const { staticEmployeeDrishtiData, employeeData } = EmployeeDrishtiHook({});
  const [open, setOpen] = useState(false);
  const DrishtiDescription = DrishtiData;

  useEffect(() => {
    EventEmitter.dispatch(EventEmitter.MOVE_TO_TOP);
  }, []);

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
                <span className={styles.title}>
                  Drishti - Employee Welfare Programs
                </span>
                <div className={styles.newLine} />
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoDetails}>
                Drishti is not just a symbol of seeing things but it also an
                epitome of “Equally seeing things”. Drishti enables every living
                being on planet to see the colours of world equally without any
                discrimination.
              </p>
              <br />
              <p className={styles.infoDetails}>
                On this principle of equality, Drishti Branch of “Swift SkyNet”
                works for area of Employee Welfare covering all employees of
                organization equally and it includes 3 programs.
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
        heading="Drishti - Employee Welfare Programs"
        imageUrl={DrishtiImage}
        data={staticEmployeeDrishtiData}
      />
      </div>
      <div className={styles.programBenefitWrapper}>
        <div>
          <div>
            <span className={styles.title}>Programs under Drishti</span>
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
