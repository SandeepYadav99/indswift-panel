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

import { Edit, EditOutlined, InfoOutlined } from "@material-ui/icons";

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
  } = useSelector((state) => state.newEmployee);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
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
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade_cadre",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => <div>{all?.emp_code}</div>,
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.location.name}<br/>{all?.department.name}/{all?.sub_department.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.createdBy?.name}
            <br />
            {all?.createdBy?.code} <br />
            {all?.createdAtText}
          </div>
        ),
      },
      {
        key: "dept_sub_dept",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.createdBy?.name}
            <br />
            {all?.createdBy?.code} <br />
            {all?.createdAtText}
          </div>
        ),
      },
      {
        key: "contact",
        label: "CONTACT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.createdBy?.name}
            <br />
            {all?.createdBy?.code} <br />
            {all?.createdAtText}
          </div>
        ),
      },
      {
        key: "employee_status",
        label: "EMPLOYEE STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.createdBy?.name}
            <br />
            {all?.createdBy?.code} <br />
            {all?.createdAtText}
          </div>
        ),
      },
      {
        key: "f_f_status",
        label: "F&F STATUS",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
        ),
      },
      {
        key: "exit_interview_status",
        label: "EXIT INTERVIEW STATUS",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
        ),
      },
      {
        key: "letter_status",
        label: "LETTER STATUS",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
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
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
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
