import React, { useCallback, useEffect, useMemo } from "react";
import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";

import StatusPill from "../../components/Status/StatusPill.component";
import { removeUnderScore } from "../../helper/helper";

import {
  AssessmentOutlined,
  AssignmentInd,
  AssignmentOutlined,
  Edit,
  EditOutlined,
  InfoOutlined,
  Send,
  Visibility,
} from "@material-ui/icons";

import useRelievingExpLetter_hook from "./RelievingExpLetter_hook";

const RelievingExpLetter_View = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
  } = useRelievingExpLetter_hook({ location });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.RelievingExpLetter);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    console.log(obj);
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>
              <b>{obj?.name}</b>
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
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all?.employee)}</div>,
      },
      {
        key: "grade_cadre",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.grade?.code}/{all?.employee?.cadre?.code}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.location?.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.designation?.name}</div>,
      },
      {
        key: "dept_sub_dept",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.department?.code || "N/A"}/
            {all?.employee?.sub_department?.code || "N/A"}
          </div>
        ),
      },
      {
        key: "contact",
        label: "CONTACT",
        sortable: false,
        render: (temp, all) => (
          <div>
            (O) {all?.employee?.contact?.official_email || "N/A"} <br />
            (P) {all?.employee?.contact?.personal_contact || "N/A"}
          </div>
        ),
      },
      {
        key: "employee_status",
        label: "EMPLOYEE STATUS",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.employee?.status)}</div>,
      },

      {
        key: "exit_interview_status",
        label: "EXIT INTERVIEW STATUS",
        sortable: false,
        render: (temp, all) => <div>{"-"}</div>,
      },
      {
        key: "letter_status",
        label: "LETTER STATUS",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.status)}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            {(((all?.employee?.status === "RESIGNED" ||
              all?.employee?.status === "TERMINATED" ||
              all?.employee?.status === "EXPIRED" ||
              all?.employee?.status === "RETIRED" ||
              all?.employee?.status === "ABSCONDED ") &&
              all?.employee?.status === "COMPLETED") ||
              all?.employee?.status === "N/A") &&
            all?.status === "PENDING" ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewDetails(all);
                }}
              >
                <AssignmentOutlined fontSize={"small"} />
              </IconButton>
            ) : null}

            {(all?.employee?.status === "RESIGNED" &&
              all?.employee?.status === "PENDING") || // Exist Emloy code
            all?.status === "PENDING" ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewDetails(all);
                }}
              >
                <Send fontSize={"small"} />
              </IconButton>
            ) : null}

            {(((all?.employee?.status === "RESIGNED" ||
              all?.employee?.status === "TERMINATED" ||
              all?.employee?.status === "EXPIRED" ||
              all?.employee?.status === "RETIRED" ||
              all?.employee?.status === "ABSCONDED ") &&
              all?.employee?.status === "COMPLETED") ||
              all?.employee?.status === "N/A") &&
            all?.status === "PENDING" ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewDetails(all);
                }}
              >
                <Visibility fontSize={"small"} />
              </IconButton>
            ) : null}
          </div>
        ),
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
            <span className={styles.title}>Relieving & Experience Letter</span>
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

export default RelievingExpLetter_View;
