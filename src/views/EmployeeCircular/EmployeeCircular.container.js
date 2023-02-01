import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import EmployeeCircularHook from "./EmployeeCircularHook";
import Circularimages from "../../assets/img/circulars illustration.png";
import FilterComponent from "../../components/Filter/Filter.component";
import classNames from "classnames";
import { IconButton } from "@material-ui/core";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import StatusPill from "../../components/Status/StatusPill.component";
import { useMemo } from "react";
import { useCallback } from "react";

function EmployeeCircular() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    handleSubDepartment,
    employeeCircularData,
    // data,
    StaticCircularData,
  } = EmployeeCircularHook({});
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
            <span className={styles.productName}>
              {obj?.effectiveDateText}
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
        key: "",
        label: "",
        sortable: false,
        render: (temp, all) => <div className={styles.squareDiv}></div>,
      },
      {
        key: "name",
        label: "Name",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      // {
      //   key: "status",
      //   label: "Status",
      //   sortable: false,
      //   render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      // },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              // onClick={() => {
              //   handleEdit(all);
              // }}
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
            >
              <Edit fontSize={"small"} />
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
      data: employeeCircularData,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    employeeCircularData,
  ]);
  return (
    <div className={styles.EmployeeCircularWrapper}>
      <InformationCard
        heading="HR Policies"
        imageUrl={Circularimages}
        data={StaticCircularData}
      />
      <div>
        {/* <PolicyRecordTable filterWidth={false} /> */}
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Circulars List</span>
              <div className={styles.newLine} />
            </div>
          </div>

          <div>
            {/* <FilterComponent
              // is_progress={isFetching}
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            /> */}
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
    </div>
  );
}

export default EmployeeCircular;
