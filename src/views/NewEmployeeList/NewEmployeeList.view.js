import React, { useCallback, useEffect, useMemo } from "react";
import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import useNewEmployeeList from "./NewEmployeeList.hook";
import StatusPill from "../../components/Status/StatusPill.component";
import { removeUnderScore } from "../../helper/helper";
import Datatables from "../../components/Datatables/datatables";

const NewEmployeeList = ({ location }) => {
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
  } = useNewEmployeeList({ location });

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
        key: "name",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "id",
        label: "EMPLOYEE ID",
        sortable: false,
        render: (temp, all) => <div>{all?.emp_code}</div>,
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div className={styles.textAlign}>{all?.location.name}<br/>{all?.department.name}/{all?.sub_department.name}</div>,
      },
      {
        key: "created_by",
        label: "CREATED BY",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.textAlign}>
            {all?.createdBy?.name}
            <br />
            {all?.createdBy?.code} <br />
            {all?.createdAtText}
          </div>
        ),
      },

      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        ishideMobile:true,
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
              <RemoveRedEyeOutlinedIcon fontSize={"small"} style={{color: "#2896E9"}}/>
              <div className={styles.textStyles}>View Profile</div>
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
            <span className={styles.title}>Pending New Employee Request</span>
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
           </div>
        </div>
      </PageBox>
      <div style={{ width: "100%" }}>
              <Datatables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
    </div>
  );
};

export default NewEmployeeList;
