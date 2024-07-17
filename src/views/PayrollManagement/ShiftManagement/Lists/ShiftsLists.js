import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase, Avatar } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {
  AccessTime,
  Add,
  DeleteOutline,
  Edit,
  InfoOutlined,
} from "@material-ui/icons";

import PageBox from "../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";

import StatusPill from "../../../../components/Status/StatusPill.component";

import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";

// import StaticQrCreate from "../Create/StaticQrCreate";
import useShiftsListsHook from "./ShiftsListsHook";
import HoursCreate from "../WorkingHoursCreate/HoursCreate";

import WeekSection from "../Componet/WeekSection";
import ShiftsCreate from "../Create/ShiftsCreate";
import DeleteDialog from "./component/DeleteDialog/DeleteDialog.view";

const ShiftsLists = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,

    // handleViewDetails,
    isSidePanel,
    isCalling,
    handleViewDelete,
    id,
    isSidePanelHours,
    handleToggleSidePannelHours,
    handleToggleSidePannel,
    handleViewShiftDetail,
    updateData,
    toggleDelete,
    isDelete,
    deleteId,
  } = useShiftsListsHook({});

  // const {
  //   data,
  //   all: allData,
  //   currentPage,
  //   is_fetching: isFetching,
  // } = useSelector((state) => state?.Shifts);

  const staticData =[
    {
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
    },
    {
        "_id": "668e292623ffd8d5312e5696",
        "status": "ACTIVE",
        "name": "Factory shift",
        "createdAt": "2024-07-10T06:24:38.710Z",
        "updatedAt": "2024-07-10T06:25:44.503Z",
        "shiftDays": [
            {
                "_id": "668e292623ffd8d5312e5698",
                "is_week_off": true,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": null,
                "end_time": null,
                "total_hours": null,
                "name": "Sunday",
                "shift_id": "668e292623ffd8d5312e5696",
                "__v": 0,
                "createdAt": "2024-07-10T06:24:38.721Z",
                "updatedAt": "2024-07-10T06:24:38.721Z",
                "startDateText": "05:30 AM",
                "endDateText": "05:30 AM"
            },
            {
                "_id": "668e292623ffd8d5312e5699",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T04:30:28.163Z",
                "end_time": "2024-07-10T13:30:28.164Z",
                "total_hours": 9,
                "name": "Monday",
                "shift_id": "668e292623ffd8d5312e5696",
                "__v": 0,
                "createdAt": "2024-07-10T06:24:38.721Z",
                "updatedAt": "2024-07-10T06:24:38.721Z",
                "startDateText": "10:00 AM",
                "endDateText": "07:00 PM"
            },
            {
                "_id": "668e292623ffd8d5312e569a",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T04:30:28.163Z",
                "end_time": "2024-07-10T13:30:28.173Z",
                "total_hours": 9,
                "name": "Tuesday",
                "shift_id": "668e292623ffd8d5312e5696",
                "__v": 0,
                "createdAt": "2024-07-10T06:24:38.721Z",
                "updatedAt": "2024-07-10T06:24:38.721Z",
                "startDateText": "10:00 AM",
                "endDateText": "07:00 PM"
            },
            {
                "_id": "668e292623ffd8d5312e569b",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T04:30:28.163Z",
                "end_time": "2024-07-10T13:30:28.214Z",
                "total_hours": 9,
                "name": "Wednesday",
                "shift_id": "668e292623ffd8d5312e5696",
                "__v": 0,
                "createdAt": "2024-07-10T06:24:38.721Z",
                "updatedAt": "2024-07-10T06:24:38.721Z",
                "startDateText": "10:00 AM",
                "endDateText": "07:00 PM"
            },
            {
                "_id": "668e292623ffd8d5312e569c",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T04:30:28.163Z",
                "end_time": "2024-07-10T13:30:28.219Z",
                "total_hours": 9,
                "name": "Thursday",
                "shift_id": "668e292623ffd8d5312e5696",
                "__v": 0,
                "createdAt": "2024-07-10T06:24:38.722Z",
                "updatedAt": "2024-07-10T06:24:38.722Z",
                "startDateText": "10:00 AM",
                "endDateText": "07:00 PM"
            },
            {
                "_id": "668e292623ffd8d5312e569d",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T04:30:28.163Z",
                "end_time": "2024-07-10T13:30:28.221Z",
                "total_hours": 9,
                "name": "Friday",
                "shift_id": "668e292623ffd8d5312e5696",
                "__v": 0,
                "createdAt": "2024-07-10T06:24:38.722Z",
                "updatedAt": "2024-07-10T06:24:38.722Z",
                "startDateText": "10:00 AM",
                "endDateText": "07:00 PM"
            },
            {
                "_id": "668e292623ffd8d5312e569e",
                "is_week_off": true,
                "is_occasional_working": true,
                "occasional_working_days": [
                    4
                ],
                "week_day": null,
                "start_time": "2024-07-10T05:30:52.180Z",
                "end_time": "2024-07-10T08:30:52.182Z",
                "total_hours": 3,
                "name": "Saturday",
                "shift_id": "668e292623ffd8d5312e5696",
                "__v": 0,
                "createdAt": "2024-07-10T06:24:38.722Z",
                "updatedAt": "2024-07-10T06:24:38.722Z",
                "startDateText": "11:00 AM",
                "endDateText": "02:00 PM"
            }
        ],
        "id": "668e292623ffd8d5312e5696",
        "is_default": false,
        "associatedEmployeesCount": 27,
        "createdAtText": "10/07/2024 11:54",
        "updatedAtText": "10/07/2024 11:55"
    },
    {
        "_id": "668e24ff23ffd8d5312e5607",
        "status": "ACTIVE",
        "name": "Warehouse shift",
        "createdAt": "2024-07-10T06:06:55.210Z",
        "updatedAt": "2024-07-10T06:19:50.506Z",
        "shiftDays": [
            {
                "_id": "668e24ff23ffd8d5312e5609",
                "is_week_off": true,
                "is_occasional_working": true,
                "occasional_working_days": [
                    1,
                    3
                ],
                "week_day": null,
                "start_time": "2024-07-10T03:30:12.315Z",
                "end_time": "2024-07-10T15:30:12.320Z",
                "total_hours": 12,
                "name": "Sunday",
                "shift_id": "668e24ff23ffd8d5312e5607",
                "__v": 0,
                "createdAt": "2024-07-10T06:06:55.228Z",
                "updatedAt": "2024-07-10T06:06:55.228Z",
                "startDateText": "09:00 AM",
                "endDateText": "09:00 PM"
            },
            {
                "_id": "668e24ff23ffd8d5312e560a",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T03:30:59.096Z",
                "end_time": "2024-07-10T12:30:59.145Z",
                "total_hours": 9,
                "name": "Monday",
                "shift_id": "668e24ff23ffd8d5312e5607",
                "__v": 0,
                "createdAt": "2024-07-10T06:06:55.229Z",
                "updatedAt": "2024-07-10T06:06:55.229Z",
                "startDateText": "09:00 AM",
                "endDateText": "06:00 PM"
            },
            {
                "_id": "668e24ff23ffd8d5312e560b",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T03:30:59.096Z",
                "end_time": "2024-07-10T13:00:59.150Z",
                "total_hours": 9.5,
                "name": "Tuesday",
                "shift_id": "668e24ff23ffd8d5312e5607",
                "__v": 0,
                "createdAt": "2024-07-10T06:06:55.229Z",
                "updatedAt": "2024-07-10T06:06:55.229Z",
                "startDateText": "09:00 AM",
                "endDateText": "06:30 PM"
            },
            {
                "_id": "668e24ff23ffd8d5312e560c",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T03:30:59.096Z",
                "end_time": "2024-07-10T13:30:59.203Z",
                "total_hours": 10,
                "name": "Wednesday",
                "shift_id": "668e24ff23ffd8d5312e5607",
                "__v": 0,
                "createdAt": "2024-07-10T06:06:55.229Z",
                "updatedAt": "2024-07-10T06:06:55.229Z",
                "startDateText": "09:00 AM",
                "endDateText": "07:00 PM"
            },
            {
                "_id": "668e24ff23ffd8d5312e560d",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T03:30:59.096Z",
                "end_time": "2024-07-10T12:30:59.210Z",
                "total_hours": 9,
                "name": "Thursday",
                "shift_id": "668e24ff23ffd8d5312e5607",
                "__v": 0,
                "createdAt": "2024-07-10T06:06:55.229Z",
                "updatedAt": "2024-07-10T06:06:55.229Z",
                "startDateText": "09:00 AM",
                "endDateText": "06:00 PM"
            },
            {
                "_id": "668e24ff23ffd8d5312e560e",
                "is_week_off": false,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": "2024-07-10T04:30:59.096Z",
                "end_time": "2024-07-10T13:30:59.213Z",
                "total_hours": 9,
                "name": "Friday",
                "shift_id": "668e24ff23ffd8d5312e5607",
                "__v": 0,
                "createdAt": "2024-07-10T06:06:55.229Z",
                "updatedAt": "2024-07-10T06:06:55.229Z",
                "startDateText": "10:00 AM",
                "endDateText": "07:00 PM"
            },
            {
                "_id": "668e24ff23ffd8d5312e560f",
                "is_week_off": true,
                "is_occasional_working": false,
                "occasional_working_days": [],
                "week_day": null,
                "start_time": null,
                "end_time": null,
                "total_hours": null,
                "name": "Saturday",
                "shift_id": "668e24ff23ffd8d5312e5607",
                "__v": 0,
                "createdAt": "2024-07-10T06:06:55.230Z",
                "updatedAt": "2024-07-10T06:06:55.230Z",
                "startDateText": "05:30 AM",
                "endDateText": "05:30 AM"
            }
        ],
        "id": "668e24ff23ffd8d5312e5607",
        "is_default": false,
        "associatedEmployeesCount": 0,
        "createdAtText": "10/07/2024 11:36",
        "updatedAtText": "10/07/2024 11:49"
    },
    {
        "_id": "66879fe2e8f58b7227a2d0a5",
        "status": "ACTIVE",
        "name": "Default Shift",
        "createdAt": "2024-07-05T07:25:22.918Z",
        "updatedAt": "2024-07-05T07:25:22.918Z",
        "shiftDays": [
            {
                "_id": "66879fe2e8f58b7227a2d0a7",
                "is_week_off": true,
                "name": "Sunday",
                "week_day": 1,
                "start_time": "09:00 AM",
                "end_time": "09:00 PM",
                "total_hours": 12,
                "shift_id": "66879fe2e8f58b7227a2d0a5",
                "__v": 0,
                "createdAt": "2024-07-05T07:25:22.928Z",
                "updatedAt": "2024-07-05T07:25:22.928Z",
                "is_occasional_working": false,
                "occasional_working_days": [],
                "startDateText": "Invalid date",
                "endDateText": "Invalid date"
            },
            {
                "_id": "66879fe2e8f58b7227a2d0a8",
                "is_week_off": true,
                "name": "Monday",
                "week_day": 2,
                "start_time": "09:00 AM",
                "end_time": "09:00 PM",
                "total_hours": 12,
                "shift_id": "66879fe2e8f58b7227a2d0a5",
                "__v": 0,
                "createdAt": "2024-07-05T07:25:22.930Z",
                "updatedAt": "2024-07-05T07:25:22.930Z",
                "is_occasional_working": false,
                "occasional_working_days": [],
                "startDateText": "Invalid date",
                "endDateText": "Invalid date"
            },
            {
                "_id": "66879fe2e8f58b7227a2d0a9",
                "is_week_off": true,
                "name": "Tuesday",
                "week_day": 3,
                "start_time": "09:00 AM",
                "end_time": "09:00 PM",
                "total_hours": 12,
                "shift_id": "66879fe2e8f58b7227a2d0a5",
                "__v": 0,
                "createdAt": "2024-07-05T07:25:22.930Z",
                "updatedAt": "2024-07-05T07:25:22.930Z",
                "is_occasional_working": false,
                "occasional_working_days": [],
                "startDateText": "Invalid date",
                "endDateText": "Invalid date"
            },
            {
                "_id": "66879fe2e8f58b7227a2d0aa",
                "is_week_off": true,
                "name": "Wednesday",
                "week_day": 4,
                "start_time": "09:00 AM",
                "end_time": "09:00 PM",
                "total_hours": 12,
                "shift_id": "66879fe2e8f58b7227a2d0a5",
                "__v": 0,
                "createdAt": "2024-07-05T07:25:22.930Z",
                "updatedAt": "2024-07-05T07:25:22.930Z",
                "is_occasional_working": false,
                "occasional_working_days": [],
                "startDateText": "Invalid date",
                "endDateText": "Invalid date"
            },
            {
                "_id": "66879fe2e8f58b7227a2d0ab",
                "is_week_off": true,
                "name": "Thrusday",
                "week_day": 5,
                "start_time": "09:00 AM",
                "end_time": "09:00 PM",
                "total_hours": 12,
                "shift_id": "66879fe2e8f58b7227a2d0a5",
                "__v": 0,
                "createdAt": "2024-07-05T07:25:22.931Z",
                "updatedAt": "2024-07-05T07:25:22.931Z",
                "is_occasional_working": false,
                "occasional_working_days": [],
                "startDateText": "Invalid date",
                "endDateText": "Invalid date"
            },
            {
                "_id": "66879fe2e8f58b7227a2d0ac",
                "is_week_off": true,
                "name": "Friday",
                "week_day": 6,
                "start_time": "09:00 AM",
                "end_time": "09:00 PM",
                "total_hours": 12,
                "shift_id": "66879fe2e8f58b7227a2d0a5",
                "__v": 0,
                "createdAt": "2024-07-05T07:25:22.931Z",
                "updatedAt": "2024-07-05T07:25:22.931Z",
                "is_occasional_working": false,
                "occasional_working_days": [],
                "startDateText": "Invalid date",
                "endDateText": "Invalid date"
            },
            {
                "_id": "66879fe2e8f58b7227a2d0ad",
                "is_week_off": true,
                "name": "Saturday",
                "week_day": 7,
                "start_time": "09:00 AM",
                "end_time": "09:00 PM",
                "total_hours": 12,
                "shift_id": "66879fe2e8f58b7227a2d0a5",
                "__v": 0,
                "createdAt": "2024-07-05T07:25:22.931Z",
                "updatedAt": "2024-07-05T07:25:22.931Z",
                "is_occasional_working": false,
                "occasional_working_days": [],
                "startDateText": "Invalid date",
                "endDateText": "Invalid date"
            }
        ],
        "id": "66879fe2e8f58b7227a2d0a5",
        "is_default": true,
        "associatedEmployeesCount": 8,
        "createdAtText": "05/07/2024 12:55",
        "updatedAtText": "05/07/2024 12:55"
    }
  ]
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name || "N/A"}</span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const renderTileHours = useCallback(() => {
    return (
      <div>
        <div className={styles.titleTime}>Adjust Full Day/Half Day Hours</div>
        <div className={styles.newLine} />
      </div>
    );
  }, [id]);

  const renderTile = useCallback(() => {
    return (
      <div>
        <span className={styles.title}>
          {updateData?.id ? "Update" : "Add"} Shift
        </span>
        <div className={styles.newLine} />
      </div>
    );
  }, [updateData]);

  const workingDays = useCallback((all) => {
    return (
      <div className={styles.avatorFlex}>
        {all?.shiftDays?.map((shift) => {
          if (shift?.is_week_off && !shift?.is_occasional_working) {
            return (
              <Avatar className={styles.avator}>
                {shift?.name?.substring(0, 2)}
              </Avatar>
            );
          } else if (shift?.is_occasional_working && shift?.is_week_off) {
            return (
              <Avatar className={styles.avatorSeletedCircle}>
                {shift?.name?.substring(0, 2)}
              </Avatar>
            );
          } else {
            return (
              <Avatar className={styles.avatorSeleted}>
                {shift?.name?.substring(0, 2)}
              </Avatar>
            );
          }
        })}
      </div>
    );
  }, []);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "shift_name",
        label: "SHIFT NAME",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },
      {
        key: "assigned_employees",
        label: "ASSIGNED EMPLOYEES",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.associatedEmployeesCount ?? "N/A"}</div>
        ),
      },
      {
        key: "shift_days",
        label: "SHIFT DAYS",
        sortable: false,
        render: (temp, all) => workingDays(all),
      },

      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewShiftDetail(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            {!all?.is_default && (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleToggleSidePannel(all);
                }}
              >
                <Edit fontSize={"small"} />
              </IconButton>
            )}

            {!all?.is_default && (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  toggleDelete(all);
                }}
              >
                <DeleteOutline fontSize={"small"} />
              </IconButton>
            )}
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDelete,
    handleEdit,
    isCalling,
    handleViewShiftDetail,
    workingDays,
    handleToggleSidePannel,
  ]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: staticData,
      count: 0,
      page: 3,
    };

    return { datatableFunctions, datatable };
  }, [
    // allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    // data,
    // currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Shifts</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.actionButton}>
            <ButtonBase
              onClick={handleToggleSidePannelHours}
              className={styles.setWorking}
            >
              SET WORKING HOURS{" "}
              <AccessTime
                fontSize={"small"}
                className={"plusIcon"}
              ></AccessTime>
            </ButtonBase>
            <ButtonBase
              onClick={() => handleToggleSidePannel()}
              className={"createBtn"}
            >
              ADD SHIFT<Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div className={styles.actionTime}>
          <div className={styles.weekSection}>
            <WeekSection />
          </div>
        </div>
        <DeleteDialog
          isOpen={isDelete}
          handleToggle={toggleDelete}
          deleteId={deleteId}
        />
        <div>
          {/* <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />  */}

        </div>
      </PageBox>
          <div style={{ width: "100%" }}>
            <DataTables
              {...tableData.datatable}
              {...tableData.datatableFunctions}
            />
          </div>
      <SidePanelComponent
        handleToggle={() => handleToggleSidePannel()}
        title={renderTile()}
        open={isSidePanel}
        side={"right"}
        arrowBack={true}
      >
        <ShiftsCreate
          isSidePanel={isSidePanel}
          handleToggleSidePannel={handleToggleSidePannel}
          editData={updateData}
        />
      </SidePanelComponent>
      <SidePanelComponent
        handleToggle={handleToggleSidePannelHours}
        title={renderTileHours()}
        open={isSidePanelHours}
        side={"right"}
        arrowBack={true}
      >
        <HoursCreate
          isSidePanel={isSidePanelHours}
          handleToggleSidePannel={handleToggleSidePannelHours}
          qrId={id}
        />
      </SidePanelComponent>
    </div>
  );
};

export default ShiftsLists;
