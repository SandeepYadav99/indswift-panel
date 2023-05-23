import React from "react";
import styles from "./Style.module.css";
import DefaultImg from "../../../../../assets/img/download.png";
import { ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import useReviewerPlanner from "./ReviewerPlanner.hook";
import EmployeeDialog from "../EmployeePopUp/EmployeeDialog.view";
import Constants from "../../../../../config/constants";
import PlannerItem from "./PlannerItem";

function ReviewerDetail() {
  const { toggleEmployeeDialog, isEmployeeDialog,
      listData,
      handleDialogSelect,
      planner,
      handleAddClick,
      selectedType,
      handleDeleteClick
  } = useReviewerPlanner({});
  return (
    <div className={styles.detailWrap}>
        {Object.keys(Constants.PLANNER_TYPES).map(key => {
            return (<PlannerItem handleDelete={handleDeleteClick} handleAdd={handleAddClick} index={key} data={planner} type={key} />)
        })}
      <div className={styles.btnWrap}>
        <ButtonBase
          aria-haspopup="true"
          //   onClick={handleCsvDownload}
          className={"createBtn"}
        >
          SAVE PANEL
        </ButtonBase>
      </div>
      <EmployeeDialog
        isOpen={isEmployeeDialog}
        handleToggle={toggleEmployeeDialog}
        employees={listData?.EMPLOYEES}
        handleSelect={handleDialogSelect}
        type={selectedType}
      />
    </div>
  );
}

export default ReviewerDetail;
