import React, { Component, useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, InfoOutlined, Telegram } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import useContentList from "./ContentList.hook";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import Datatables from "../../../components/Datatables/datatables";

const ContentList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    handleViewForm,
    isCalling,
    configFilter,
    handleResend,
    handleBankSheetDownload,
    role,
    handleLetterHead
  } = useContentList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.content_list);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>
              <strong>{obj?.employee?.name}</strong>
            </span>
            <br />
            <span className={styles.productName}>
              {obj?.employee?.emp_code}
            </span>{" "}
            <br />
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
        label: "REF NAME",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "journey",
        label: "JOURNEY",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.location?.name}
          </div>
        ),
      },
      {
        key: "letterHead",
        label: "LETTER HEAD",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.designation?.name}
          </div>
        ),
      },
      {
        key: "date",
        label: "DATE",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => (
          <div>{all?.employee?.contact?.official_contact}</div>
        ),
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.status)}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            {all?.is_submitted ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewDetails(all);
                }}
              >
                {/* <InfoOutlined fontSize={"small"} /> */}
                <RemoveRedEyeOutlinedIcon fontSize={"small"} />
              </IconButton>
            ) : (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewForm(all);
                }}
              >
                <InfoOutlined fontSize={"small"} />
              </IconButton>
            )}
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, isCalling]);

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
            <span className={styles.title}>Content Customization</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.btnWrap}>
          <ButtonBase
            className={styles.edit}
            onClick={() => {handleLetterHead('Accept')}}
          >
            MANAGE LETTER HEAD
          </ButtonBase>
          <ButtonBase
            // aria-owns={downloadCL ? "downloadCL" : undefined}
            aria-haspopup="true"
            // onClick={handleAddCandidate}
            onClick={handleBankSheetDownload}
            className={"createBtn"}
          >
            <Add fontSize={"small"} className={"plusIcon"}></Add>
            Add Content
          </ButtonBase>
          </div>
         
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
      <Datatables {...tableData.datatable} {...tableData.datatableFunctions} />
    </div>
  );
};

export default ContentList;
