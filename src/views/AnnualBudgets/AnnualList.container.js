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
import useAnnualList from "./AnnualListHook";
import StatusPill from "../../components/Status/StatusPill.component";
import CreateView from "./AnnualView/Annual.view";
import InfoView from "./AnnualView/AnnualInfo.view";
import LogUtils from "../../libs/LogUtils";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";

const AnnualList = ({}) => {
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
    isCalling,
    warehouses,
    handleChangeWareHouse,
    warehouseId,
    listData,
    type,
    setType,
    selected,
    isInfoPanel,
    handleSideInfo,
    selectedAnnualId,
    locationId,
    setLocationId,
    sanction,
  } = useAnnualList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.annual);
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
  const renderCreateForm = useMemo(() => {
    return (
      <CreateView
        type={type}
        closeSidePanel={handleSideToggle}
        handleDataSave={handleDataSave}
        id={editData}
        selectedAnnuals={selected}
        originWarehouseId={warehouseId}
        handleDelete={handleDelete}
      />
    );
  }, [
    handleDataSave,
    editData,
    warehouses,
    handleDelete,
    selected,
    warehouseId,
    type,
  ]);

  const renderInfoForm = useMemo(() => {
    return (
      <InfoView closeSidePanel={handleSideInfo} annualId={selectedAnnualId} />
    );
  }, [selectedAnnualId]);

  const tableStructureOfRole = useMemo(() => {
    return [
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
        key: "budget",
        label: "Budget",
        sortable: false,
        render: (temp, all) => <div>{all?.budget}</div>,
      },
      {
        key: "posted",
        label: "Posted",
        sortable: false,
        render: (temp, all) => <div>{all?.posted}</div>,
      },
      {
        key: "vacancies",
        label: "Vacancies",
        sortable: false,
        render: (temp, all) => <div>{all?.vacancies}</div>,
      },
      {
        key: "expense",
        label: "Expense Budget",
        sortable: false,
        render: (temp, all) => <div>{all?.expense_budget}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => (
          <div>
            {renderStatus(all.status)}
            <br />
            <span
              style={{
                paddingTop: "5px",
                display: "inline-block",
                fontSize: "0.7rem",
              }}
            >
              {all?.updatedAtText}
            </span>
          </div>
        ),
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
                handleSideInfo(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleSideToggle(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
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

  const tableStructure = useMemo(() => {
    return [
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
        key: "budget",
        label: "Budget",
        sortable: false,
        render: (temp, all) => <div>{all?.budget}</div>,
      },
      {
        key: "posted",
        label: "Posted",
        sortable: false,
        render: (temp, all) => <div>{all?.posted}</div>,
      },
      {
        key: "vacancies",
        label: "Vacancies",
        sortable: false,
        render: (temp, all) => <div>{all?.vacancies}</div>,
      },
      {
        key: "expense",
        label: "Expense Budget",
        sortable: false,
        render: (temp, all) => <div>{all?.expense_budget}</div>,
      },
      {
        key: "spent",
        label: "ESTIMATED SPENT",
        sortable: false,
        render: (temp, all) => <div>{all?.estimated_spent}</div>,
      },
      {
        key: "difference",
        label: "DIFFERENCE",
        sortable: false,
        render: (temp, all) => <div>{all?.estimatedDiff}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => (
          <div>
            {renderStatus(all.status)}
            <br />
            <span
              style={{
                paddingTop: "5px",
                display: "inline-block",
                fontSize: "0.7rem",
              }}
            >
              {all?.updatedAtText}
            </span>
          </div>
        ),
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
                handleSideInfo(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleSideToggle(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
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
      columns: type == "ON_ROLL" ? tableStructure : tableStructureOfRole,
      data: data,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    tableStructureOfRole,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
    type,
  ]);
  const renderLocation = useMemo(() => {
    return (
      <CustomSelectField
        label={"Location"}
        value={locationId}
        handleChange={(value) => {
          setLocationId(value);
          sessionStorage.setItem("location", value);
        }}
      >
        {listData?.LOCATIONS?.map((dT) => {
          return (
            <MenuItem value={dT?.id} key={dT?.id}>
              {dT?.name}
            </MenuItem>
          );
        })}
      </CustomSelectField>
    );
  }, [listData?.LOCATIONS, locationId]);

  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Financial Year"}
        value={warehouseId}
        handleChange={(value) => {
          handleChangeWareHouse(value);
          sessionStorage.setItem("warehouse", value);
        }}
      >
        <MenuItem value={"2023-2024"}>FY 2023-2024</MenuItem>
      </CustomSelectField>
    );
  }, [warehouseId]);

  const renderDropDownType = useMemo(() => {
    return (
      <CustomSelectField
        label={"Employee Type"}
        value={type}
        handleChange={(value) => {
          setType(value);
          sessionStorage.setItem("type", value);
        }}
      >
        <MenuItem value={"ON_ROLL"}>ON ROLE EMPLOYEE</MenuItem>
        <MenuItem value={"OFF_ROLL"}>OFF ROLE EMPLOYEE</MenuItem>
      </CustomSelectField>
    );
  }, [type]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Annual Budgets</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            {/* <ButtonBase className={styles.download}>
              DOWNLOAD TEMPLATE
            </ButtonBase> */}
            <div className={styles.drop}>{renderLocation}</div>
          </div>
        </div>

        <div className={styles.yearFlex}>
          <div className={styles.down}>{renderDropDown}</div>
          <div className={styles.down}>{renderDropDownType}</div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <div className={styles.experseWrap}>
            SANCTIONED : {sanction?.sanctioned && `${sanction?.sanctioned}`}|
            POSTED : {sanction?.posted && `${sanction?.posted} `} | VACANCY :
            {sanction?.vacancies && ` ${sanction?.vacancies} `} | EXPENSES :
            {sanction?.expense_budget !== undefined &&
              `  ${sanction?.expense_budget}`}
          </div>
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
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"Update Annual Budgets"}
        open={isSidePanel}
        side={"right"}
      >
        {renderCreateForm}
      </SidePanelComponent>
      <SidePanelComponent
        handleToggle={handleSideInfo}
        title={"Annual Budgets Log"}
        open={isInfoPanel}
        side={"right"}
      >
        {renderInfoForm}
      </SidePanelComponent>
    </div>
  );
};

export default AnnualList;
