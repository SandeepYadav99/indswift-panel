import React, { useCallback, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, Edit, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import StatusPill from "../../components/Status/StatusPill.component";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import useEmployeeReport from "./EmployeeReport.hook";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import FilterComponent from "../../components/Filter/Filter.component";
import Datatables from "../../components/Datatables/datatables";

const EmployeeReport = ({}) => {
  const {
    handleSortOrderChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handlePageChange,
    handleChangeDate,
    isCalling,
    startDate,
    type,
    setType,
    endDate,
    configFilter,
    initialApiCall,
    handleDownload,
    handleViewDetails
  } = useEmployeeReport({});

  const {
    data,
    all: allData,
    currentPage,
    total,
    is_fetching: isFetching,
  } = useSelector((state) => state.employeeReport);
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
        key: "name",
        label: "EMPLOYEE NAME",
        sortable: false,
        render: (temp, all) => <div><b>{all?.name}</b> <br/> {all?.emp_code}</div>,
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.grade?.code} / {all?.cadre?.name}
          </div>
        ),
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "Department",
        sortable: true,
        render: (value, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "sub_department",
        label: "SUB DEPARTMENT",
        sortable: true,
        render: (value, all) => <div>{all?.sub_department?.name}</div>,
      },
      {
        key: "date",
        label: "Date",
        sortable: false,
        render: (temp, all) => <div>{all?.type === 'SEPERATED' ? all?.resign_data?.last_working_date : all?.dojText}</div>,
      },
      {
        key: "type",
        label: "Type",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },

      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
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
  }, [renderStatus, renderFirstCell, isCalling]);

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

  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Type"}
        value={type}
        handleChange={(value) => {
          setType(value);
          sessionStorage.setItem('type', value);
        }}
      >
        <MenuItem value={"JOINED"}>JOINED</MenuItem>
        <MenuItem value={"SEPERATED"}>SEPERATED</MenuItem>
        <MenuItem value={"RESIGNED"}>RESIGNED</MenuItem>
      </CustomSelectField>
    );
  }, [type, setType]);

  const renderStartDate = useMemo(() => {
    return (
      <CustomDatePicker
        clearable
        label={"Start Date"}
        maxDate={new Date()}
        onChange={(value) => {
          handleChangeDate(value, "start");
        }}
        value={startDate}
      />
    );
  }, [startDate]);

  const renderEndDate = useMemo(() => {
    return (
      <CustomDatePicker
        clearable
        label={"End Date"}
        onChange={(value) => {
          handleChangeDate(value, "end");
        }}
        value={endDate}
      />
    );
  }, [endDate]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>
              Employee Creation & Exit Report
            </span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.download}
                onClick={handleDownload}
            >
              DOWNLOAD
            </ButtonBase>
          </div>
        </div>

        <div className={styles.yearFlex}>
          <div className={styles.down}>{renderDropDown}</div>
          <div className={styles.down}>{renderStartDate}</div>
          <div className={styles.down}>{renderEndDate}</div>
          <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.downloadrun}
              onClick={() => initialApiCall()}
            >
              RUN REPORT
            </ButtonBase>
          </div>
        </div>
        <div>
          <div className={styles.totalWrap}>Total Count : {total}</div>
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
      <div style={{ width: "100%" }}>
              <Datatables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
    </div>
  );
};

export default EmployeeReport;
