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
import BottomIncActionView from "./component/BottomIncAction/BottomIncAction.view";
import BottomPanelComponent from "../../../components/BottomBar/BottomBar.component";
import DialogIncComponent from "./component/confirmDialogInc";

const IncrementPlanner = ({}) => {
  const {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    isCalling,
    currentData,
    data,
    currentPage,
    year,
    isInfoPanel,
    handleQueryInfo,
    listData,
    type,
    setType,
    initialApiCall,
    configFilter,
    handleDownload,
    handleViewDetails,
    setYear,
    toggleConfirmDialog,
    isDialog,
  } = useIncrementPlanner({});

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.driverImgCont}>
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
      },
      {
        key: "due",
        label: "INCR DUE OF MONTHS",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "rating",
        label: "NORMALIZED RATING",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "final",
        label: "FINAL RATING BY HOD",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "promotion",
        label: "PROMOTION",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "cat",
        label: "Performance cat.",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "salary",
        label: "G. Salary",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "pli",
        label: "PLI",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "incremental",
        label: "Current incremental salary",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "effective",
        label: "effective increment",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "new_salary",
        label: "new salary",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "reviewer",
        label: "Reviewer",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "HOD",
        label: "Hod",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "overall",
        label: "Overal  HOD",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
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
      data: currentData,
      count: data?.length,
      page: currentPage - 1,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
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
              is_progress={isCalling}
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
      <DialogIncComponent
        isOpen={isDialog}
        handleClose={toggleConfirmDialog}
        // handleConfirm={handleDialogConfirm}
      />
      <DialogIncComponent />
      <BottomPanelComponent open={true}>
        <BottomIncActionView
          handleSend={toggleConfirmDialog}
          // isSubmitting={isSending}
        />
      </BottomPanelComponent>
    </div>
  );
};

export default IncrementPlanner;
