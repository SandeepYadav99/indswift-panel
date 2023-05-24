import React from "react";
import styles from "./Style.module.css";
import DefaultImg from "../../../../../assets/img/download.png";
import { ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import useReviewerPlanner from "./ReviewerPlanner.hook";
import EmployeeDialog from "../EmployeePopUp/EmployeeDialog.view";
import Constants from "../../../../../config/constants";
import PlannerItem from "./PlannerItem";
import WaitingComponent from "../../../../../components/Waiting.component";

const ReviewerPlanner = ({ selectedUser, reviewId, togglePanel, canEdit, isOpen }) => {
  const { toggleEmployeeDialog, isEmployeeDialog,
      listData,
      handleDialogSelect,
      planner,
      handleAddClick,
      selectedType,
      handleDeleteClick,
      PLANNER_INDEX,
      errors,
      handleSubmit,
      isSubmitting,
      isLoading
  } = useReviewerPlanner({selectedUser, reviewId, togglePanel, isOpen});

  if (isLoading) {
      return (<WaitingComponent />);
  }

  return (
    <div className={styles.detailWrap}>
        {Object.keys(Constants.PLANNER_TYPES).map(key => {
            return (<PlannerItem canEdit={canEdit} errors={errors} indexes={PLANNER_INDEX} handleDelete={handleDeleteClick} handleAdd={handleAddClick} index={key} data={planner} type={key} />)
        })}
      <div className={styles.btnWrap}>
          {canEdit && (<ButtonBase
            disabled={isSubmitting}
          aria-haspopup="true"
            onClick={handleSubmit}
          className={"createBtn"}
        >
          SAVE PANEL
        </ButtonBase>)}
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

export default ReviewerPlanner;
