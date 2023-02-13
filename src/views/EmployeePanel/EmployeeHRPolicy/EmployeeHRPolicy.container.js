import React from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import EmployeeHRPolicyHook from "./EmployeeHRPolicyHook";
import images from "../../../assets/img/hr policies illustartion.png";
import FilterComponent from "../../../components/Filter/Filter.component";
import classNames from "classnames";

import {Button, ButtonBase, IconButton} from "@material-ui/core";

import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import StatusPill from "../../../components/Status/StatusPill.component";
import { useMemo } from "react";
import { useCallback } from "react";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
function EmployeeHRPolicy() {
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
    StaticPolicyData,
    employeeHRData,
  } = EmployeeHRPolicyHook({});
  console.log("====>", employeeHRData);
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
            <span className={styles.productDate}>
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
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <ButtonBase
              style={{ "text-decoration": "none" }}
              onClick={() => {
                historyUtils.push(RouteName.VIEW_DOCUMENTS, { url: all?.document });
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="small"
                // onClick={() => (

                // )}
              >
                view
              </Button>
            </ButtonBase>
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
      data: employeeHRData,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    employeeHRData,
  ]);

  return (
    <div className={styles.EmployeeHRWrapper}>
      <InformationCard
        heading="HR Policies"
        imageUrl={images}
        data={StaticPolicyData}
      />
      <div>
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Policies List</span>
              <div className={styles.newLine} />
            </div>
          </div>

          <div>
            <FilterComponent
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
    </div>
  );
}

export default EmployeeHRPolicy;
