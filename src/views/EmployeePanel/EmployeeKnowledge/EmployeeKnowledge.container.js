import React from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import EmployeeKnowledgeHook from "./EmployeeKnowledgeHook";
import KnowledgeImages from "../../../assets/img/knowledge center illustration.png";
import FilterComponent from "../../../components/Filter/Filter.component";
import classNames from "classnames";
import { Button, IconButton } from "@material-ui/core";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import StatusPill from "../../../components/Status/StatusPill.component";
import { useMemo } from "react";
import { useCallback } from "react";

function EmployeeKnowledge() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    handleSubDepartment,
    EmployeeKnowledgeData,
    // data,
    StaticKnowledgeData,
  } = EmployeeKnowledgeHook({});
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
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
        key: "",
        label: "",
        sortable: false,
        render: (value, all) => <div>{<></>}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <a
              style={{ "text-decoration": "none" }}
              href={all?.document}
              target="_blank"
            >
              <Button color="primary" variant="contained" size="small">
                view
              </Button>
            </a>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
            <span className={styles.productDate}>
              {obj?.location.name}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: EmployeeKnowledgeData,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    EmployeeKnowledgeData,
  ]);
  return (
    <div className={styles.EmployeeKnowledgeWrapper}>
      <InformationCard
        heading="Knowledge Center"
        imageUrl={KnowledgeImages}
        data={StaticKnowledgeData}
      />
      <div>
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Knowledge Resources</span>
              <div className={styles.newLine} />
            </div>
          </div>

          <div>
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

export default EmployeeKnowledge;
