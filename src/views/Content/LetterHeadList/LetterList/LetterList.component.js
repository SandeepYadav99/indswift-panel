import React, { Component, useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton, Menu } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Add, Edit, InfoOutlined, Telegram } from "@material-ui/icons";
import styles from "./Style.module.css";
import Constants from "../../../../config/constants";
import FilterComponent from "../../../../components/Filter/Filter.component";
import StatusPill from "../../../../components/Status/StatusPill.component";
import Datatables from "../../../../components/Datatables/datatables";
import PageBox from "../../../../components/PageBox/PageBox.component";
import useLetterHeadHook from "./LetterList.hook";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../../libs/history.utils";
import ImageDialog from "./Component/ImageDialog";

const LetterHead = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleCreate,
    handleToggle,
    isOpen,
    editData,
  } = useLetterHeadHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.letter_head);

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
      console.log("all", obj);
      return <div className={styles.firstCellFlex}>{obj?.name}</div>;
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
        key: "date",
        label: "DATE",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => <div>{all?.createdAtText}</div>,
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
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleToggle(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
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
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <div>
              <span className={styles.title}>Manage Letter Heads</span>
              <div className={styles.newLine} />
            </div>
          </ButtonBase>
          <ButtonBase
            aria-haspopup="true"
            className={"createBtn"}
            onClick={handleCreate}
          >
            <Add fontSize={"small"} className={"plusIcon"}></Add>
            ADD LETTER HEAD
          </ButtonBase>
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
      <ImageDialog
        handleToggle={handleToggle}
        isOpen={isOpen}
        editData={editData}
      />
      <Datatables {...tableData.datatable} {...tableData.datatableFunctions} />
    </div>
  );
};

export default LetterHead;
