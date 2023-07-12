import React, { useCallback, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, Edit, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import FilterComponent from "../../../components/Filter/Filter.component";
import useIncrementPlanner from "./IncrementPlanner.hook";


const IncrementPlanner = ({}) => {
  const {
    handleSortOrderChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handlePageChange,
    isCalling,
    year,
    type,
    setType,
    configFilter,
    initialApiCall,
    handleDownload,
    handleViewDetails,
    setYear,
  } = useIncrementPlanner({});

  const {
    data,
    all: allData,
    currentPage,
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
        render: (temp, all) => (
          <div>
            <b>{all?.name}</b> <br /> {all?.emp_code}
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
        label: "Dept/Sub dept",
        sortable: true,
        render: (value, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "doj",
        label: "D.O.J",
        sortable: true,
        render: (value, all) => <div>{all?.sub_department?.name}</div>,
      },
      {
        key: "length",
        label: "Length of Service",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "quali",
        label: "QUALIFICATION",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },{
        key: "due",
        label: "INCR DUE OF MONTHS",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },{
        key: "rating",
        label: "NORMALIZED RATING",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },{
        key: "final",
        label: "FINAL RATING BY HOD",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },{
        key: "promotion",
        label: "PROMOTION",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },{
        key: "cat",
        label: "Performance cat.",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },{
        key: "salary",
        label: "G. Salary",
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
        label={"Batch"}
        value={type}
        handleChange={(value) => {
          setType(value);
        }}
      >
        <MenuItem value={"APMS"}>APMS</MenuItem>
        <MenuItem value={"DTY"}>DTY</MenuItem>
      </CustomSelectField>
    );
  }, [type, setType]);

  const renderYear = useMemo(() => {
    return (
      <CustomSelectField
        label={"Year"}
        value={year}
        handleChange={(value) => {
          setYear(value);
        }}
      >
        <MenuItem value={"2023"}>2023</MenuItem>
      </CustomSelectField>
    );
  }, [year]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Increment Planner</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase className={styles.download} onClick={handleDownload}>
              DOWNLOAD
            </ButtonBase>
          </div>
        </div>

        <div className={styles.yearFlex}>
          <div className={styles.down}>{renderYear}</div>
          <div className={styles.down}>{renderDropDown}</div>
          <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.downloadrun}
              onClick={() => initialApiCall()}
            >
              VIEW GRAPH
            </ButtonBase>
          </div>
        </div>
        <div>
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

export default IncrementPlanner;
