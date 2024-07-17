import React, { useCallback, useMemo } from "react";
import { ButtonBase, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";

import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";

import Datatables from "../../../components/Datatables/datatables";
import PayslipsGenerationFiled from "./Component/PayslipsGenerationFiled";
import usePayslipsGenerationHook from "./PayslipsGenerationHook";
import { InfoOutlined } from "@material-ui/icons";

const PayslipsGeneration = ({}) => {
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
    handleToggleSlipDetail,
    showSlipData
  } = usePayslipsGenerationHook({});

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
        key: "total_working_days",
        label: "TOTAL WORKING DAYS",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "present_days",
        label: "PRESENT DAYS",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "absent_days",
        label: "ABSENT DAYS",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
      {
        key: "total_salary",
        label: "TOTAL SALARY",
        sortable: false,
        render: (temp, all) => <div>{all?.serial_no}</div>,
      },
  
      {
        key: "gross_salary",
        label: "GROSS SALARY",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        style: { width: "15%" },
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
            <span className={styles.title}>Payslip Generation</span>
            <div className={styles.newLine} />
          </div>
         
        </div>

        <div>
          <PayslipsGenerationFiled handleToggleSlipDetail={handleToggleSlipDetail}/>
        </div>
      </PageBox>
    {showSlipData && 
        <div style={{ width: "100%" }}>
          <Datatables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>}
  
    </div>
  );
};




export default PayslipsGeneration;