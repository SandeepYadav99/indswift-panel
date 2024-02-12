import React, { Component, useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { InfoOutlined, Telegram } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../components/Datatables/datatables";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import SendIcon from "@material-ui/icons/Send";
import useFullFinal from "./FullFinal.hook";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";

const FullFinal = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    handleViewForm,
    isCalling,
    configFilter,
    handleResend,
  } = useFullFinal({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.final_form);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>
              <strong>{obj?.employee?.name}</strong>
            </span>
            <br />
            <span className={styles.productName}>
              {obj?.employee?.emp_code}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "EMPLOYEE",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "Grade/Cadre",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.grade?.code} / {all?.employee?.cadre?.code}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.location?.name}
          </div>
        ),
      },
      {
        key: "designation",
        label: "Designation",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.designation?.name}
          </div>
        ),
      },
      {
        key: "dept",
        label: "Dept & Sub Dept.",
        sortable: false,
        style: { width: "12%" },
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.department?.name}/
            {all?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "contact",
        label: "Contact",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => (
          <div>{all?.employee?.contact?.official_contact}</div>
        ),
      },
      {
        key: "Last",
        label: "Last working day",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => (
          <div>{all?.employee?.resign_data?.last_working_date}</div>
        ),
      },
      {
        key: "status",
        label: "EMPLOYEE STATUS",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.employee?.status)}</div>,
      },
      {
        key: "ff",
        label: "F&F STATUS",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.status)}</div>,
      },

      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            {all?.is_submitted ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewDetails(all);
                }}
              >
                {/* <InfoOutlined fontSize={"small"} /> */}
                <RemoveRedEyeOutlinedIcon fontSize={"small"} />
              </IconButton>
            ) : (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewForm(all);
                }}
              >
                <InfoOutlined fontSize={"small"} />
              </IconButton>
            )}
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, isCalling]);

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
            <span className={styles.title}>Full & Final Form List</span>
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
        </div>
      </PageBox>
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
  );
};

export default FullFinal;
