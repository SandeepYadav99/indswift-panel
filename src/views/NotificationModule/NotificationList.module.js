import React, { Component, useCallback, useEffect, useMemo, useState } from "react";
import { ButtonBase, IconButton, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import useNotificationList from "./NotificationList.hook";
import Datatables from "../../components/Datatables/datatables";
import { Edit } from "@material-ui/icons";

const Notificationlist = ({ }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleEdit,
  } = useNotificationList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.notification_module);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "title",
        label: "Title",
        sortable: true,
        render: (value, all) => <div>
          {all?.title}
        </div>,
      },
      {
        key: "message",
        label: "Message",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.message}
          </div>
        ),
      },
      {
        key: "created_on",
        label: "Created On",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "send_to",
        label: "Send To",
        sortable: false,
        render: (temp, all) => <div>{all?.send_to}</div>,
      },
      {
        key: "is_sent",
        label: "Is Sent",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.is_sent === true ? "True" :"False"}
          </div>
        ),
      },
      {
        key: "action",
        label: "ACTION",
        sortable: false,
        render: (temp, all) => (
          <div>
              <IconButton className={'tableActionBtn'} color='secondary' onClick={() => { handleEdit(all) }} disabled={all?.is_sent} id={all?.is_sent === true ? styles.editBtnFade :""}><Edit fontSize={'small'} /></IconButton>
          </div>
        ),
      },
    ];
  }, [renderStatus, handleViewDetails, isCalling]);

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
      count: allData?.length,
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
            <span className={styles.title}>Notification</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.btnWrapperGap}>
            <ButtonBase onClick={handleViewDetails} className={"createBtn"}>
              SEND NOTIFICATION
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
      <Datatables
        {...tableData.datatable}
        {...tableData.datatableFunctions}
      />
    </div>
  );
};

export default Notificationlist;
