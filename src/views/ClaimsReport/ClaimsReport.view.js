import React, { useCallback, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, Edit, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import StatusPill from "../../components/Status/StatusPill.component";
import LogUtils from "../../libs/LogUtils";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import useClaimsReport from "./ClaimsReport.hook";
import FilterComponent from "../../components/Filter/Filter.component";

const ClaimsReport = ({}) => {
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
    isCalling,
    handleChangeWareHouse,
    warehouseId,
    type,
    configFilter,
    handleFilterDataChange,
    handleSearchValueChange,
    setType,
  } = useClaimsReport({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.claimsReport);
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          <div
            className={styles.driverImgCont}
            // style={{borderColor: (user.deal_of_day ? '#f44336' : (user.is_featured ? '#16b716' : 'white'))}}
          >
            <img src={product.image_url} alt="" />
          </div>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>
              <strong>{`${product.name}`}</strong>
            </span>{" "}
            <br />
            <span>{product.code}</span>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "employee",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => <div>{all?.employee?.name} <br/>{all?.employee?.emp_code}</div>,
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => <div>{console.log('>,,,',all)}</div>,
      },
      {
        key: "LOCATION",
        label: "LOCATION",
        sortable: true,
        render: (value, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "sub_department",
        label: "SUB DEPARTMENT",
        sortable: true,
        render: (value, all) => <div>{all?.sub_department?.name}</div>,
      },
      {
        key: "no",
        label: "NO OF CLAIMS",
        sortable: false,
        render: (temp, all) => <div>{all?.totalClaim}</div>,
      },
      {
        key: "processed",
        label: "PROCESSED CLAIMS",
        sortable: false,
        render: (temp, all) => <div>{all?.processedClaim}</div>,
      },
      {
        key: "TYPE",
        label: "TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.claim_type}</div>,
      },
      {
        key: "category",
        label: "CATEGORY",
        sortable: false,
        render: (temp, all) => <div>{all?.category}</div>,
      },
      {
        key: "year",
        label: "FINANCIAL YEAR",
        sortable: false,
        render: (temp, all) => <div>{all?.fy_year}</div>,
      },
      {
        key: "TOTAL VALUE",
        label: "TOTAL VALUE",
        sortable: false,
        render: (temp, all) => <div>{all?.totalValue}</div>,
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    isCalling,
    type,
  ]);

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
    type,
  ]);

  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Financial Year"}
        value={warehouseId}
        handleChange={(value) => {
          handleChangeWareHouse(value);
          sessionStorage.setItem("year", value);
        }}
      >
        <MenuItem value={"2023-2024"}>FY 2023-2024</MenuItem>
      </CustomSelectField>
    );
  }, [warehouseId]);

  const renderDropDownType = useMemo(() => {
    return (
      <CustomSelectField
        label={"Claim Type"}
        value={type}
        handleChange={(value) => {
          setType(value);
          sessionStorage.setItem("typeClaim", value);
        }}
      >
        <MenuItem value={"MARRAIGE"}>MARRAIGE</MenuItem>
        <MenuItem value={"MOBILE"}>MOBILE</MenuItem>
        <MenuItem value={"PHC"}>PHC</MenuItem>
        <MenuItem value={"LOCAL_TRAVEL"}>LOCAL TRAVEL</MenuItem>
        <MenuItem value={"INTERVIEW"}>INTERVIEW</MenuItem>
        <MenuItem value={"RELOCATION"}>RELOCATION</MenuItem>
      </CustomSelectField>
    );
  }, [type]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Claims Report</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase className={styles.download}>DOWNLOAD</ButtonBase>
          </div>
        </div>

        <div className={styles.yearFlex}>
          <div className={styles.down}>{renderDropDown}</div>
          <div className={styles.down}>{renderDropDownType}</div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <div>
          <FilterComponent
              is_progress={isFetching}
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
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

export default ClaimsReport;
