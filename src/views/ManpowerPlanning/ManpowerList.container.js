import React, { useCallback, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import StatusPill from "../../components/Status/StatusPill.component";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import useManpowerList from "./ManpowerListHook";
import { Edit, InfoOutlined } from "@material-ui/icons";

const ManpowerList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
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
  } = useManpowerList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.manpower);
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
        key: "sanctioned",
        label: "SANCTIONED",
        sortable: false,
        render: (temp, all) => <div>{all?.sanctioned}</div>,
      },
      {
        key: "posted",
        label: "Posted",
        sortable: false,
        render: (temp, all) => <div>{all?.posted}</div>,
      },
      {
        key: "resignation",
        label: "RESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.resigned}</div>,
      },
      {
        key: "offered",
        label: "OFFERED",
        sortable: false,
        render: (temp, all) => <div>{all?.offered}</div>,
      },
      {
        key: "vacancies",
        label: "Vacancies",
        sortable: false,
        render: (temp, all) => <div>{all?.vacancies}</div>,
      },
      {
        key: "hiring",
        label: "ACTIVE HIRING",
        sortable: false,
        render: (temp, all) => <div>{all?.active_hiring}</div>,
      },

      // {
      //   key: "user_id",
      //   label: "Action",
      //   render: (temp, all) => (
      //     <div>
      //       <IconButton
      //         className={"tableActionBtn"}
      //         color="secondary"
      //         disabled={isCalling}
      //       //   onClick={() => {
      //       //     handleSideInfo(all);
      //       //   }}
      //       >
      //         <InfoOutlined fontSize={"small"} />
      //       </IconButton>
      //       {/* <IconButton
      //         className={"tableActionBtn"}
      //         color="secondary"
      //         disabled={isCalling}
      //         onClick={() => {
      //           handleSideToggle(all);
      //         }}
      //       >
      //         <Edit fontSize={"small"} />
      //       </IconButton> */}
      //     </div>
      //   ),
      // },
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
  const renderLocation = useMemo(() => {
    return (
      <CustomSelectField
        label={"Location"}
        value={locationId}
        handleChange={(value) => {
          setLocationId(value);
          sessionStorage.setItem("manlocation", value);
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
          sessionStorage.setItem("manwarehouse", value);
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
          sessionStorage.setItem("mantype", value);
        }}
      >
        <MenuItem value={"ON_ROLL"}>ON ROLE EMPLOYEE</MenuItem>
        {/* <MenuItem value={"OFF_ROLL"}>OFF ROLE EMPLOYEE</MenuItem> */}
      </CustomSelectField>
    );
  }, [type]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>MANPOWER PLANNING</span>
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
            POSTED :{sanction?.posted && `${sanction?.posted} `} | RESIGNATION :{" "}
            {sanction?.resigned && `${sanction?.resigned}`}| OFFERED :{" "}
            {sanction?.offered && `${sanction?.offered}`}| VACANCY :
            {sanction?.vacancies && ` ${sanction?.vacancies} `} | ACTIVE HIRING:
            {sanction?.active_hiring && `${sanction?.active_hiring}`}
          </div>
          <div className={styles.experseWrapMobile}>
            <div className={styles.innerWrapper}>
              {" "}
              SANCTIONED : {sanction?.sanctioned && `${sanction?.sanctioned}`}
            </div>
            <div className={styles.innerWrapper}>
              {" "}
              POSTED :{sanction?.posted && `${sanction?.posted} `}
            </div>
            <div className={styles.innerWrapper}>
              {" "}
              RESIGNATION :{sanction?.resigned && `${sanction?.resigned}`}
            </div>
            <div className={styles.innerWrapper}>
              {" "}
              OFFERED : {sanction?.offered && `${sanction?.offered}`}
            </div>
            <div className={styles.innerWrapper}>
              {" "}
              VACANCY : {sanction?.vacancies && ` ${sanction?.vacancies} `}
            </div>
            <div className={styles.innerWrapper}>
              {" "}
              ACTIVE HIRING:{" "}
              {sanction?.active_hiring && `${sanction?.active_hiring}`}
            </div>
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
    </div>
  );
};

export default ManpowerList;
