import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./Notification.module.css";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../libs/history.utils";
import useNotificationList from "./Notification.hook";
import DataTables from "../../components/Datatables/datatables";
import { useSelector } from "react-redux";
import Constants from "../../config/constants";
import StatusPill from "../../components/Status/StatusPill.component";

const EmployeeMobileCard = ({ data, index }) => {
  return (
    <div className={styles.downFlex}>
      <div className={styles.cardDataTwo}>
        <div className={styles.titleData}>{data?.notification_title}</div>
        <div className={styles.descriptionData}>
          {data?.title},
          <br /> {data?.body}
        </div>
        <div style={{display:'flex',justifyContent:"flex-end",fontSize:"12px",color:"gray",marginTop:"5px"}}>{data?.time}</div>
      </div>
    </div>
  );
};

const Notification = () => {
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
  } = useSelector((state) => state.notification);

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
          <div>
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
        key: "type",
        label: "Notification Type",
        sortable: true,
        render: (value, all) => <div>{all?.notification_title}</div>,
      },
      {
        key: "title",
        label: "Title",
        sortable: false,
        render: (temp, all) => <div>{all?.title}</div>,
      },
      {
        key: "message",
        label: "Message",
        sortable: false,
        render: (temp, all) => <div>{all?.body}</div>,
      },
      {
        key: "time",
        label: "Time",
        sortable: false,
        render: (temp, all) => <div>{all?.time}</div>,
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
      mobileRender: EmployeeMobileCard,
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
    <div className={styles.container}>
      <div>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIosIcon fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b>Notification</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <br />
      <DataTables {...tableData.datatable} {...tableData.datatableFunctions} />
    </div>
  );
};

export default Notification;
