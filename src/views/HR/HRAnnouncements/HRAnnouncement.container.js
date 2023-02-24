import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
} from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import {
  Add,
  InfoOutlined,
  OpenInNew,
  PrintOutlined,
} from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import StatusPill from "../../../components/Status/StatusPill.component";
import useHRAnnouncementList from "./HRAnnouncementHook";
// import StatusPill from "../../components/Status/StatusPill.component";

const HRAnnouncement = ({}) => {
  const {
    //   handleSortOrderChange,
    //   handleRowSize,
    //   handlePageChange,
    //   handleDataSave,
    //   handleDelete,
    //   handleEdit,
    //   handleFilterDataChange,
    //   handleSearchValueChange,
    //   handleSideToggle,
    //   handleViewDetails,
    //   editData,
    //   isSidePanel,
    handleCreate,
    //   isCalling,
    //   configFilter,
    //   handleSubDepartment,
  } = useHRAnnouncementList({});

  // const {
  //   data,
  //   all: allData,
  //   currentPage,
  //   is_fetching: isFetching,
  // } = useSelector((state) => state.HRAnnouncement);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);
  const renderSubmittion = useCallback((obj) => {
    return (
      <div>
        {obj.map((item) => (
          <ul className={styles.submittionList}>
            <li>{item.name}</li>
          </ul>
        ))}
      </div>
    );
  });
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "image",
        label: "IMAGE",
        sortable: false,
        render: (temp, all, index) => <div>{all?.image}</div>,
      },
      {
        key: "title",
        label: "ANNOUNCEMENTS TITLE",
        sortable: false,
        render: (value, all) => <div>{all?.title}</div>,
      },
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.date}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              onClick={() => {
                // handleEdit(all);
              }}
              className={"tableActionBtn"}
              color="secondary"
              // disabled={isCalling}
            >
              <Edit fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, []);
  // renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling;
  const tableData = useMemo(() => {
    const datatableFunctions = {
      // onSortOrderChange: handleSortOrderChange,
      // onPageChange: handlePageChange,
      // onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: [],
      count: 0,
      page: 1,
    };

    return { datatableFunctions, datatable };
  }, [
    // allData,
    tableStructure,
    // handleSortOrderChange,
    // handlePageChange,
    // handleRowSize,
    // data,
    // currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Announcements</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase onClick={handleCreate} className={"createBtn"}>
              CREATE <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>

        <div>
          <FilterComponent
          // is_progress={isFetching}
          // filters={configFilter}
          // handleSearchValueChange={handleSearchValueChange}
          // handleFilterDataChange={handleFilterDataChange}
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
  );
};

export default HRAnnouncement;
