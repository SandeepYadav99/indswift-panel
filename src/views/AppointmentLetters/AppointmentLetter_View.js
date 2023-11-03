import React, { useCallback,  useMemo } from "react";
import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import { InfoOutlined } from "@material-ui/icons";
import useAppointemntLetter_Hook from "./AppointmentLetter_hook";

const AppointmentLetter_View = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
     handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    
    configFilter,
  } = useAppointemntLetter_Hook({ location });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.AppointmentLetter);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>
              <b>{obj?.name}</b>{" "}
            </span>{" "}
            <br />
            <span>{obj?.emp_code}</span>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "employee_name",
        label: "EMPLOYEE NAME",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade_cadre",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.grade?.code}/{all?.cadre?.code}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.location.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "dept_sub_dept",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.department?.name || "N/A"}/
            {all?.sub_department?.name || "N/A"}
          </div>
        ),
      },
      {
        key: "contact",
        label: "CONTACT",
        sortable: false,
        render: (temp, all) => (
          <div>
            (O) {all?.contact?.official_contact || "N/A"}
            <br />
            (O) {all?.contact?.official_email || "N/A"} <br />
            (P) {all?.contact?.personal_contact || "N/A"}
            <br />
            (P) {all?.contact?.personal_email || "N/A"}
          </div>
        ),
      },
      {
        key: "doj",
        label: "DOJ",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.dojText}
           
          </div>
        ),
      },
      {
        key: "reporting_to",
        label: "REPORTING TO",
        sortable: true,
        render: (temp, all) => (
          <div>{all?.hod?.hod_name
          }</div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
           
              onClick={() => {
                handleViewDetails(all?.appointment_letter);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit]);

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
      count: allData.length,
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
            <span className={styles.title}>Appointment Letters</span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default AppointmentLetter_View;
