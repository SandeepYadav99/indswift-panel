import React, { useCallback, useMemo } from "react";
import { ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";

import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import useAttendanceReportHook from "./AttendanceReportHook";
import AttendanceReportInputFiled from "./component/AttendanceReportInputFiled";
import Datatables from "../../../components/Datatables/datatables";

const AttendanceReport = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isSidePanel,
    isCalling,
    configFilter,
    id,
    handleToggleSidePannel,
  } = useAttendanceReportHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.interview_claims);

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

  const renderTile = useCallback(() => {
    return (
      <div>
        <span className={styles.title}>{id ? "Update" : "Add"} Machine</span>
        <div className={styles.newLine} />
      </div>
    );
  }, [id]);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "employee",
        label: "EMPLOYEE",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },
      {
        key: "date_day",
        label: "DATE/DAY",
        sortable: false,
        render: (temp, all) => <div>{all?.t_id}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },

      {
        key: "grade_cadre",
        label: "GRADE/ CADRE",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "punch_in_time",
        label: "PUNCH IN TIME",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "punch_out_time",
        label: "PUNCH OUT TIME",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "working_hours",
        label: "WORKING HOURS",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "working_hours",
        label: "WORKING HOURS",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "employee_status",
        label: "EMPLOYEE STATUS",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData?.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Attendance Report</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtnOutland"}
            >
              DOWNLOAD
            </ButtonBase>
          </div>
        </div>

        <div>
          <AttendanceReportInputFiled />
        </div>
      </PageBox>
    
        <div style={{ width: "100%" }}>
          <Datatables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
  
      {/* <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={renderTile()}
        open={isSidePanel}
        side={"right"}
        arrowBack={true}
      >
        <MachinesCreate
          isSidePanel={isSidePanel}
          handleToggleSidePannel={handleToggleSidePannel}
          machineId={id}
        />
      </SidePanelComponent> */}
    </div>
  );
};

export default AttendanceReport;
