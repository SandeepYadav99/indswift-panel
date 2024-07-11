import React, { useEffect } from "react";
import ShiftDetailView from "../Componet/ShiftDetailView";
import { ButtonBase } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../../libs/history.utils";
import styles from "./Style.module.css";
import AssociatedEmployees from "../AssociatedEmployees/AssociatedEmployees";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionDetailShifts } from "../../../../actions/ShiftsLists.action";
import WaitingComponent from "../../../../components/Waiting.component";
const staticShiftDetail ={
  "details": {
      "_id": "668e2ced23ffd8d5312e56fa",
      "status": "ACTIVE",
      "name": "SHOWROOM SHIFT",
      "createdAt": "2024-07-10T06:40:45.694Z",
      "updatedAt": "2024-07-10T07:00:33.267Z",
      "shiftDays": [
          {
              "_id": "668e2ced23ffd8d5312e56fc",
              "is_week_off": false,
              "is_occasional_working": false,
              "occasional_working_days": [],
              "week_day": null,
              "start_time": "2024-07-10T04:30:46.274Z",
              "end_time": "2024-07-10T15:30:46.276Z",
              "total_hours": 11,
              "name": "Sunday",
              "shift_id": "668e2ced23ffd8d5312e56fa",
              "__v": 0,
              "createdAt": "2024-07-10T06:40:45.702Z",
              "updatedAt": "2024-07-10T06:40:45.702Z",
              "startDateText": "10:00 AM",
              "endDateText": "09:00 PM"
          },
          {
              "_id": "668e2ced23ffd8d5312e56fd",
              "is_week_off": false,
              "is_occasional_working": false,
              "occasional_working_days": [],
              "week_day": null,
              "start_time": "2024-07-10T04:30:46.274Z",
              "end_time": "2024-07-10T15:30:46.371Z",
              "total_hours": 11,
              "name": "Monday",
              "shift_id": "668e2ced23ffd8d5312e56fa",
              "__v": 0,
              "createdAt": "2024-07-10T06:40:45.702Z",
              "updatedAt": "2024-07-10T06:40:45.702Z",
              "startDateText": "10:00 AM",
              "endDateText": "09:00 PM"
          },
          {
              "_id": "668e2ced23ffd8d5312e56fe",
              "is_week_off": false,
              "is_occasional_working": false,
              "occasional_working_days": [],
              "week_day": null,
              "start_time": "2024-07-10T04:30:46.274Z",
              "end_time": "2024-07-10T15:30:46.375Z",
              "total_hours": 11,
              "name": "Tuesday",
              "shift_id": "668e2ced23ffd8d5312e56fa",
              "__v": 0,
              "createdAt": "2024-07-10T06:40:45.702Z",
              "updatedAt": "2024-07-10T06:40:45.702Z",
              "startDateText": "10:00 AM",
              "endDateText": "09:00 PM"
          },
          {
              "_id": "668e2ced23ffd8d5312e56ff",
              "is_week_off": false,
              "is_occasional_working": false,
              "occasional_working_days": [],
              "week_day": null,
              "start_time": "2024-07-10T04:30:46.274Z",
              "end_time": "2024-07-10T15:30:46.377Z",
              "total_hours": 11,
              "name": "Wednesday",
              "shift_id": "668e2ced23ffd8d5312e56fa",
              "__v": 0,
              "createdAt": "2024-07-10T06:40:45.702Z",
              "updatedAt": "2024-07-10T06:40:45.702Z",
              "startDateText": "10:00 AM",
              "endDateText": "09:00 PM"
          },
          {
              "_id": "668e2ced23ffd8d5312e5700",
              "is_week_off": false,
              "is_occasional_working": false,
              "occasional_working_days": [],
              "week_day": null,
              "start_time": "2024-07-10T04:30:46.274Z",
              "end_time": "2024-07-10T15:30:46.379Z",
              "total_hours": 11,
              "name": "Thursday",
              "shift_id": "668e2ced23ffd8d5312e56fa",
              "__v": 0,
              "createdAt": "2024-07-10T06:40:45.702Z",
              "updatedAt": "2024-07-10T06:40:45.702Z",
              "startDateText": "10:00 AM",
              "endDateText": "09:00 PM"
          },
          {
              "_id": "668e2ced23ffd8d5312e5701",
              "is_week_off": false,
              "is_occasional_working": false,
              "occasional_working_days": [],
              "week_day": null,
              "start_time": "2024-07-10T04:30:46.274Z",
              "end_time": "2024-07-10T15:30:46.385Z",
              "total_hours": 11,
              "name": "Friday",
              "shift_id": "668e2ced23ffd8d5312e56fa",
              "__v": 0,
              "createdAt": "2024-07-10T06:40:45.703Z",
              "updatedAt": "2024-07-10T06:40:45.703Z",
              "startDateText": "10:00 AM",
              "endDateText": "09:00 PM"
          },
          {
              "_id": "668e2ced23ffd8d5312e5702",
              "is_week_off": false,
              "is_occasional_working": false,
              "occasional_working_days": [],
              "week_day": null,
              "start_time": "2024-07-10T04:30:46.274Z",
              "end_time": "2024-07-10T15:30:46.389Z",
              "total_hours": 11,
              "name": "Saturday",
              "shift_id": "668e2ced23ffd8d5312e56fa",
              "__v": 0,
              "createdAt": "2024-07-10T06:40:45.703Z",
              "updatedAt": "2024-07-10T06:40:45.703Z",
              "startDateText": "10:00 AM",
              "endDateText": "09:00 PM"
          }
      ],
      "id": "668e2ced23ffd8d5312e56fa",
      "is_default": false,
      "associatedEmployeesCount": 0,
      "createdAtText": "10/07/2024 12:10",
      "updatedAtText": "10/07/2024 12:30"
  }
}
const ShiftDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { shiftDetail } = useSelector((state) => state?.Shifts);

  useEffect(() => {
    dispatch(actionDetailShifts(id));
  }, [id]);

  if (shiftDetail) {
    return <WaitingComponent />;
  }
  
  return (
    <div>
      <div className={styles.container}>
        <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b> {staticShiftDetail?.details?.name}</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <ShiftDetailView shiftDays={staticShiftDetail?.details?.shiftDays || {}} />
      <div className={styles.employe}>
        <AssociatedEmployees />
      </div>
    </div>
  );
};

export default ShiftDetail;
