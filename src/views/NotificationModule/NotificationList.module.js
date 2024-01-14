import React, { Component, useCallback, useEffect, useMemo,useState } from "react";
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

const Notificationlist = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleLeaveApplicationForm,
  } = useNotificationList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.leave_list);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { user } = useSelector((state) => state.auth);
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
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
            <span className={styles.productName}>{obj?.candidate?.name}</span>{" "}
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
        key: "title",
        label: "Leave Type",
        sortable: true,
        render: (value, all) => <div></div>,
      },
      {
        key: "message",
        label: "Leave Dates",
        sortable: false,
        render: (temp, all) => (
          <div>
           
          </div>
        ),
      },
      {
        key: "created_on",
        label: "Created On",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "send_to",
        label: "Send To",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "is_sent",
        label: "IS SENT",
        sortable: false,
        render: (temp, all) => (
          <div>
           
          </div>
        ),
      },
      {
        key: "action",
        label: "ACTION",
        sortable: false,
        render: (temp, all) => (
          <div>
          
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
          <div>
      
          </div>
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
