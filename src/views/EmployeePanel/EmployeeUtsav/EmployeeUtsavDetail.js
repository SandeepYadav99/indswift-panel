import { ButtonBase } from "@material-ui/core";
import React from "react";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EmployeeUtsavDetailHook from "./EmployeeUtsavDetailHook";

function EmployeeUtsavDetail() {
  const { employeeUtsavDetailData } = EmployeeUtsavDetailHook();
  return (
    <div className={styles.employeeDetailWrapper}>
      {employeeUtsavDetailData && (
        <div className={styles.outerFlex}>
          <div>
            <ButtonBase onClick={() => historyUtils.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />{" "}
              <span className={"capitalize"}>
                <b>Utsav @IndSwift</b>
              </span>
            </ButtonBase>
            <div className={styles.newLineMargin} />
            <div className={styles.employeeInducationWrapper}>
              <div>
                <div>
                  {
                    employeeUtsavDetailData?.name && 
                    <>
                    <span className={styles.title}>
                    {employeeUtsavDetailData?.name}
                  </span>
                  <div className={styles.newLine} />
                    </>
                    
                  }
                  
                  <div className={styles.date}>
                    {/* <span>{employeeUtsavDetailData?.createdAtText}</span> */}
                    <span>{employeeUtsavDetailData?.eventDateText}</span>
                  </div>
                </div>
                <div className={styles.contentWrapper}>
                  <div className={styles.content}>
                    <p className={styles.contentFormat}>
                      {employeeUtsavDetailData?.description || ""}
                    </p>
                  </div>

                  {employeeUtsavDetailData?.cover_image && (
                    <div className={styles.imageWrapper}>
                      <img
                        className={styles.utsavimage}
                        src={employeeUtsavDetailData?.cover_image}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeUtsavDetailData.images && (
        <div className={styles.galleryImageWrapper}>
          <div>
            <span className={styles.title}>Event Gallery</span>
            <div className={styles.newLine} />
          </div>
          {employeeUtsavDetailData?.images && (
            <div className={styles.imageWrapper2}>
              {employeeUtsavDetailData?.images.map((item) => {
                return (
                  <div>
                    <img className={styles.imgdimesion} src={item.image} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeUtsavDetail;
