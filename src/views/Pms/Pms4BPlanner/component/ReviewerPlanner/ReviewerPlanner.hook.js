import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { serviceGetList } from "../../../../../services/Common.service";
import LogUtils from "../../../../../libs/LogUtils";
import { useDispatch, useSelector } from "react-redux";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import {
  serviceGetReviewPlanner,
  serviceUpdateReviewPlanner,
} from "../../../../../services/PmsPlanner.service";
import { actionUpdatePlannerStatus } from "../../../../../actions/PmsPlanner.action";
import Constants from "../../../../../config/constants";

const PLANNER_INDEX = {
  SELF: 0,
  PEERS: 1,
  SUBORDINATES: 2,
  SUPERVISORS: 3,
};

function useReviewerPlanner({ selectedUser, reviewId, togglePanel }) {
  const defaultPlanner = {
    SELF: [],
    PEERS: [],
    SUBORDINATES: [],
    SUPERVISORS: [],
  };
  const [isEmployeeDialog, setIsEmployeeDialog] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });
  const { user, role } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState([]);
  const [planner, setPlanner] = useState({ ...defaultPlanner });
  const dispatch = useDispatch();

  useEffect(() => {
    serviceGetList(["EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const p = { ...planner };
      p.SELF = [selectedUser];
      setPlanner({
        ...defaultPlanner,
        SELF: [selectedUser],
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (reviewId) {
      setIsLoading(true);
      serviceGetReviewPlanner({ review_id: reviewId }).then((res) => {
        if (!res?.error) {
          const data = res?.data;
          if (data.length > 0) {
            const temp = { ...defaultPlanner };
            data.forEach((val) => {
              if (!(val.type in temp)) {
                temp[val.type] = [];
              }
              temp[val.type].push(val);
            });
            setTimeout(() => {
              setPlanner(temp);
            }, 10);
          }
        }
        setIsLoading(false);
      });
    }
  }, [reviewId]);

  useEffect(() => {
    const arr = [];
    Object.keys(planner).forEach((key) => {
      arr.push(planner[key]);
    });
    const availability = new Map();
    const err = [];
    for (let i = 0; i < arr.length; i++) {
      const empArr = arr[i];
      for (let j = 0; j < empArr.length; j++) {
        const emp = empArr[j];
        if (!availability.has(emp.id)) {
          availability.set(emp.id, `${i}_${j}`);
        } else {
          err.push(`${i}_${j}`);
        }
      }
    }
    setErrors(err);
  }, [planner]);

  const toggleEmployeeDialog = useCallback(() => {
    setIsEmployeeDialog((e) => !e);
  }, [setIsEmployeeDialog]);

  const handleDialogSelect = useCallback(
    (data) => {
      const p = { ...planner };
      p[selectedType].push(data);
      setPlanner(p);
      setSelectedType(null);
      setIsEmployeeDialog(false);
    },
    [setSelectedType, selectedType, setIsEmployeeDialog, planner, setPlanner]
  );

  const handleAddClick = useCallback(
    (type) => {
      setSelectedType(type);
      setIsEmployeeDialog(true);
    },
    [setSelectedType, setIsEmployeeDialog]
  );

  const handleDeleteClick = useCallback(
    (type, index) => {
      const p = { ...planner };
      p[type].splice(index, 1);
      setPlanner(p);
    },
    [planner, setPlanner]
  );

  const validateForm = useCallback(() => {
    let isValid = true;
    Object.keys(planner).forEach((key) => {
      const arr = planner[key];
      if (arr.length === 0) {
        isValid = false;
        return true;
      }
    });
    return isValid;
  }, [planner]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const pTemp = { ...planner };
      Object.keys(pTemp).forEach((key) => {
        pTemp[key] = pTemp[key].map((val) => val.id);
      });
      serviceUpdateReviewPlanner({
        review_id: reviewId,
        reviewers: pTemp,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Panel Set Updated Successfully");
          dispatch(
            actionUpdatePlannerStatus(
              [reviewId],
              Constants.PMS_4B_BATCH_STATUS.PANEL_SET
            )
          );
          togglePanel();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [planner, setIsSubmitting, isSubmitting, reviewId, togglePanel]);

  const handleSubmit = useCallback(() => {
    if (errors.length > 0) {
      SnackbarUtils.error("Please remove error");
      return true;
    }
    const isValid = validateForm();
    if (isValid) {
      submitToServer();
    } else {
      SnackbarUtils.error("Planner is not valid");
    }
  }, [errors, validateForm, submitToServer]);

  return {
    toggleEmployeeDialog,
    isEmployeeDialog,
    listData,
    handleDialogSelect,
    planner,
    handleAddClick,
    selectedType,
    handleDeleteClick,
    PLANNER_INDEX,
    errors,
    isSubmitting,
    handleSubmit,
    isLoading,
  };
}

export default useReviewerPlanner;
