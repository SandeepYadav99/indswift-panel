import { ButtonBase } from "@material-ui/core";
import React from "react";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EmployeeUtsavDetailHook from "./EmployeeUtsavDetailHook";
import ImageGalleryDialog from "./components/ImageGalleryPopUp/ImageGalleryDialog.view";
import {convertDateToMonthAbbreviation} from "../../../helper/helper"
function EmployeeUtsavDetail() {
  const { employeeUtsavDetailData, toggleDialog, isOpen,currentIndex } =
    EmployeeUtsavDetailHook();
  return (
    <div className={styles.employeeDetailWrapper}>
      {employeeUtsavDetailData && (
        <div className={styles.outerFlex}>
          <div>
            {/* <ButtonBase onClick={() => historyUtils.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />{" "}
              <span className={"capitalize"}>
                <b>Utsav @IndSwift</b>
              </span>
            </ButtonBase> */}
            {/* <div className={styles.newLineMargin} /> */}
            <div className={styles.employeeInducationWrapper21}>
              <div>
                <div>
                  {employeeUtsavDetailData?.name && (
                    <>
                      <div className={styles.headingWrapper}>
                      <ButtonBase onClick={() => historyUtils.goBack()}>
                       <ArrowBackIosIcon fontSize={"small"} />{" "}
                         <span className={styles.title}>
                            {employeeUtsavDetailData?.name}
                          <div className={styles.newLine} />
                          </span>
                         </ButtonBase>
                        {/* <div>
                          <span className={styles.title}>
                            {employeeUtsavDetailData?.name}
                          </span>
                          <div className={styles.newLine} />
                        </div> */}

                        <span className={styles.title}>
                          
                          {employeeUtsavDetailData?.eventDateText ? convertDateToMonthAbbreviation(employeeUtsavDetailData?.eventDateText) : "-"}
                        </span>
                      </div>
                    </>
                  )}

                  <div className={styles.date}>
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
                <div className={styles.contentWrapper}>
                  <div className={styles.content21}>
                    <div className={styles.contentCont}>
                      <p className={styles.contentFormat}>
                        {employeeUtsavDetailData?.description || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ImageGalleryDialog isOpen={isOpen} handleToggle={toggleDialog} data={employeeUtsavDetailData} currentIndex={currentIndex}/>
      {employeeUtsavDetailData?.images && (
        <div className={styles.galleryImageWrapper}>
          <div>
            <span className={styles.title}>Event Gallery</span>
            <div className={styles.newLine} />
          </div>
          {employeeUtsavDetailData?.images && (
            <div className={styles.imageWrapper2}>
              {employeeUtsavDetailData?.images?.map((item,index) => {
                return (
                  <div key={`utasvImage_${index}`}>
                    <img className={styles.imgdimesion} src={item?.image} id={index} onClick={(e)=>toggleDialog(e)}/>
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
