import React, { useCallback, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, Edit, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import LogUtils from "../../../libs/LogUtils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useEmployeeImprest from "./EmployeeImprest.hook";
import FilterComponent from "../../../components/Filter/Filter.component";

const EmployeeImprest = ({}) => {
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
    type,
    configFilter,
    handleFilterDataChange,
    handleSearchValueChange,
    setType,
    handleCsvDownload,
  } = useEmployeeImprest({});

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
        sortable: false,
        render: (value, all) => (
          <div>
            {all?.employee?.name} <br />
            {all?.employee?.emp_code}
          </div>
        ),
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.grade?.code} / {all?.cadre?.code}
          </div>
        ),
      },
      {
        key: "LOCATION",
        label: "LOCATION",
        sortable: false,
        render: (value, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "sub_department",
        label: "DEPT &SUB-DEPT",
        sortable: false,
        render: (value, all) => (
          <div>
            {all?.department?.name}/{all?.sub_department?.name}
          </div>
        ),
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
      // {
      //   key: "category",
      //   label: "CATEGORY",
      //   sortable: false,
      //   render: (temp, all) => <div>{all?.category}</div>,
      // },
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
        render: (temp, all) => (
          <div>{all?.totalValue && `₹ ${all?.totalValue}`}</div>
        ),
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

  const renderDropDownType = useMemo(() => {
    return (
      <CustomSelectField
        label={"Currency"}
        value={type}
        handleChange={(value) => {
          setType(value);
          sessionStorage.setItem("currency", value);
        }}
      >
        <MenuItem value="INR">₹</MenuItem>
        <MenuItem value="USD">$</MenuItem>
        <MenuItem value="EUR">€</MenuItem>
      </CustomSelectField>
    );
  }, [type]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Employee Imprest List</span>
            <div className={styles.newLine} />
          </div>
          {/* <div className={styles.rightFlex}>
            <ButtonBase className={styles.download} onClick={handleCsvDownload}>
              DOWNLOAD
            </ButtonBase>
          </div> */}
        </div>

        <div className={styles.yearFlex}>
          <div className={styles.down}>{renderDropDownType}</div>
          {/* <div className={styles.rightFlex}>
            <ButtonBase className={styles.download} onClick={handleCsvDownload}>
              DOWNLOAD
            </ButtonBase>
          </div> */}
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

export default EmployeeImprest;
