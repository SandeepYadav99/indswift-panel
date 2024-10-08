import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useDepartmentDetail from "./DepartmentDetailHook";
import QuickHeadDeptDialog from "./component/HeadDept/HeadDeptDialog.view";

const DepartmentDetail = () => {
  const {
    isSubmitting,
    data,
    isHeadDialog,
    isDetails,
    toggleHeadDialog,
    setIsDetails,
    isActive,
    handleSwitchChange,
    employees,
    id,
    handleHeadUpdate,
    handleEditBtn,
    handleUpdateClick
  } = useDepartmentDetail({});
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const _renderInfo = useCallback(() => {
    if (!data?.hod_id) {
      return (
        <div className={styles.key}>
          <span className={styles.value}>Overall Department HOD Details</span>
          <ButtonBase className={styles.addBtn} onClick={toggleHeadDialog}>
            + Add Head
          </ButtonBase>
        </div>
      );
    } else {
      return (
        <div className={styles.left}>
          <div className={styles.key}>
            <span className={styles.value}>Overall Department HOD Details</span>
            <ButtonBase className={styles.addBtn} onClick={toggleHeadDialog}>
              {" "}
              Change Head
            </ButtonBase>
          </div>

          <div className={styles.detailFlex}>
            <div>
              <img
                src={data?.hod?.image ? data?.hod?.image :require("../../../assets/img/performance image@2x.png")}
                height={50}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.key}>
                <span className={styles.value}>Employee Name:</span>{" "}
                {data?.hod?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Employee Code:</span>
                {data?.hod?.emp_code}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Phone:</span>
                {data?.hod?.contact}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Email:</span>
                {data?.hod?.email}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }, [isDetails, setIsDetails, data]);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>{data?.name} Department</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Department Information</div>

            <div className={styles.editBtn}>
              <ButtonBase onClick={handleEditBtn} className={styles.edit}>
                EDIT
              </ButtonBase>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {data?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location Code:</span>
                {data?.code}
              </div>
              <div className={"formFlex"} style={{ alignItems: "center" }}>
                <div className={"formGroup"} style={{ fontWeight: "600" }}>
                  Status:
                </div>
                <div className={"formGroup"}>
                  <CustomSwitch
                    value={isActive}
                    handleChange={handleSwitchChange}
                    label={`Active`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>{_renderInfo()}</div>
          </div>
        </div>
      </div>
      {/* <div className={styles.btnCont}>
        <ButtonBase
          onClick={handleUpdateClick}
          type={"button"}
          className={styles.createBtn}
        >
          UPDATE INFORMATION
        </ButtonBase>
      </div> */}

      <QuickHeadDeptDialog
        handleUpdate={handleHeadUpdate}
        departmentId={id}
        employees={employees}
        isOpen={isHeadDialog}
        handleToggle={toggleHeadDialog}
        showDetails={setIsDetails}
      />
    </div>
  );
};

export default DepartmentDetail;
