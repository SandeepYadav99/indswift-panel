/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import {
  Add,
  InfoOutlined,
  OpenInNew,
  PrintOutlined,
} from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../components/Datatables/datatables.js";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import useReviewCandidate from "./ReviewCandidateHook";
import StatusPill from "../../components/Status/StatusPill.component";
import RejectDialog from "./component/RejectPopUp/RejectDialog.view";

const ReviewCandidate = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    isRejectPopUp,
    toggleRejectDialog,
    jobOpeningPage
  } = useReviewCandidate({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.cvReview);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo,styles.hyperlinkText, "openSans")} onClick={()=>jobOpeningPage(obj?.job)}>
            <span className={styles.productName}>{obj?.job?.code}</span> <br />
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
        label: "PRC",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.job?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.job?.department?.name}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.job?.location?.name}</div>,
      },
      {
        key: "cv",
        label: "CV PENDING REVIEW",
        sortable: false,
        render: (temp, all) => <div>{all?.pending_reviewers}</div>,
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
                handleEdit(all);
              }}
            >
              <OpenInNew fontSize={"small"} className={styles.openIcon} />{" "}
              <span className={styles.subText}>View Profile</span>
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

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Job Openings Pending Review</span>
            <div className={styles.newLine} />
          </div>
        </div>
        <RejectDialog
          isOpen={isRejectPopUp}
          handleToggle={toggleRejectDialog}
        />
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <div>
            <br />
          </div>
        </div>
      </PageBox>
      <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
    </div>
  );
};

export default ReviewCandidate;
