import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./Notification.module.css";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../libs/history.utils";
import useNotificationList from "./Notification.hook";
import DataTables from "../../components/Datatables/datatables";
import { useDispatch, useSelector } from "react-redux";
import Constants from "../../config/constants";
import StatusPill from "../../components/Status/StatusPill.component";
import { Link } from "react-router-dom";
import { serviceNotificationReadUnRead,serviceNotificationCountData } from "../../services/Notification.services.js";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";

const EmployeeMobileCard = ({ data, index }) => {

  const handleReadNotification = () => {
    if (data?.is_read === false) {
      serviceNotificationReadUnRead({ id: data?._id }).then((res)=>window.location.reload());
    }
  };

  return (
    <div className={styles.downFlex}>
      <Link
        to={data?.next_screen ? data?.next_screen : "/notification"}
        className={styles.colorLinkData}
        onClick={handleReadNotification}
      >
        <div
          className={`${
            data?.is_read ? styles.cardDataTwo : styles.cardUnRead
          }`}
        >
          <div className={styles.titleData}>
            <span>{data?.title}</span>
            {!data?.is_read && <span className={styles.blueDot}></span>}
          </div>
          <div className={styles.descriptionData}>
            {data?.body} <br />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "12px",
              color: "gray",
              marginTop: "5px",
            }}
          >
            {data?.createdAt} | {data?.time}
          </div>
        </div>
      </Link>
    </div>
  );
};

const Notification = () => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleViewDetails,
    isCalling,
  } = useNotificationList({});

  const location = useLocation();


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
  }, [innerWidth]);

  
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

  const handleReadNotification = (data) => {
    if (data?.is_read === false) {
      serviceNotificationReadUnRead({ id: data?._id });
      serviceNotificationCountData()
    }
  };

  const tableStructure = useMemo(() => {
    return [
      {
        key: "type",
        label: "Notification Type",
        sortable: true,
        render: (value, all) => (
          <div onClick={() => handleReadNotification(all)}>
            <Link
              to={all?.next_screen ? all?.next_screen : "/notification"}
              className={styles.colorLinkData}
            >
              {all?.notification_title}
            </Link>
          </div>
        ),
      },
      {
        key: "title",
        label: "Title",
        sortable: false,
        render: (temp, all) => (
          <div onClick={() => handleReadNotification(all)}>
            <Link
              to={all?.next_screen ? all?.next_screen : "/notification"}
              className={styles.colorLinkData}
            >
              {all?.title}
            </Link>
          </div>
        ),
      },
      {
        key: "message",
        label: "Message",
        sortable: false,
        render: (temp, all) => (
          <div onClick={() => handleReadNotification(all)}>
            <Link
              to={all?.next_screen ? all?.next_screen : "/notification"}
              className={styles.colorLinkData}
            >
              {all?.body}
            </Link>
          </div>
        ),
      },
      {
        key: "time",
        label: "Time",
        sortable: false,
        render: (temp, all) => (
          <div onClick={() => handleReadNotification(all)}>
            <Link
              to={all?.next_screen ? all?.next_screen : "/notification"}
              className={styles.colorLinkData}
            >
              {all?.createdAt} | {all?.time}
            </Link>
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    isCalling,
    data,
    allData,
    EmployeeMobileCard
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
    allData.length,
    currentPage,
    EmployeeMobileCard
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
