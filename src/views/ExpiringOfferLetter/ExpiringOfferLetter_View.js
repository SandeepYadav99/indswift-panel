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
import { AssignmentOutlined, PeopleOutlined } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";

import useExpiringOfferLetterHook from "./ExpiringOfferLetter_hook";
import ExpireOffer_PopUp from "./component/ExpireOffer_PopUp";
import ResendOffer_PopUp from "./component/ResendOffer_PopUp";

const ExpiringOfferLetterView = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,

    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    changeRoute,
    changeEmployeeRoute,
    isCalling,
    configFilter,
    warehouses,
    toggleIsOpenDialog,
    isOpenDialog,
    toggleIsOpenResendDialog,
    isOpenResendDialog,
    letterResendId,
    expireLetter,
    olrDetailPages,
  } = useExpiringOfferLetterHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.expirOfferLetter);

  const removeUnderScore = (value) => {
    return value ? value.replace(/_/, " ") : "";
  };
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.candidate?.name}</span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const renderPRCCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.hyperlinkText} onClick={() => changeRoute(obj)}>
          <div>{obj?.job?.code}</div>
        </div>
      );
    }
    return null;
  }, []);

  const renderReplacingCell = useCallback((obj) => {
    if (obj) {
      return (
        <div>
          {obj?.job?.replacing_person?.name ? (
            <div
              className={styles.hyperlinkText}
              onClick={() => changeEmployeeRoute(obj?.job?.replacing_person)}
            >
              {obj?.job?.replacing_person?.name} <br/>
           
            </div>
          ) : (
            <div>N/A</div>
          )}
        
        {obj?.job?.replacing_person?.code}
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "candidate_name",
        label: "CANDIDATE NAME",
        sortable: false,
        render: (value, all) => <div>{all?.candidate?.name}</div>,
      },
      {
        key: "code",
        label: "PRC",
        sortable: false,
        render: (temp, all) => <div>{renderPRCCell(all)}</div>,
      },
      {
        key: "department",
        label: "DESIGNATION/ DEPARTMENT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.job?.designation_note}/{all?.job?.department?.name}
          </div>
        ),
      },
      {
        key: "replacing_person",
        label: "REPLACING PERSON",
        sortable: false,
        render: (temp, all) => <div>{renderReplacingCell(all)}</div>,
      },
      {
        key: "olr",
        label: "OLR",
        sortable: false,
        render: (temp, all) => (
          <div
            onClick={() => olrDetailPages(all)}
            className={styles.hyperlinkText}
          >
            {all?.code}
          </div>
        ),
      },
      {
        key: "offer_letter_status",
        label: "OFFER LETTER STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill status={all?.status} />
          </div>
        ),
      },
      {
        key: "candidateObj.status",
        label: "Candidate STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill status={removeUnderScore(all?.candidate?.status)} />
          </div>
        ),
      },
      {
        key: "offerObj.joining_date",
        label: "Joining Date",
        sortable: false,
        render: (temp, all) => <div>{all?.joiningDate}</div>,
      },
      {
        key: "expiring_on",
        label: "EXPIRING ON",
        sortable: false,
        render: (temp, all) => <div>{all?.expected_response_date}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.btnWrapContainer}>
            <IconButton
              className={"tableActionBtnError"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
              
                toggleIsOpenDialog(all);
              }}
            >
              <PeopleOutlined fontSize={"small"} className={styles.openIcon} />{" "}
              <span className={styles.subText}>Expire Offer</span>
            </IconButton>

            <IconButton
              className={"tableActionBtnSuccess"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                toggleIsOpenResendDialog(all);
              }}
            >
              <AssignmentOutlined
                fontSize={"small"}
                className={styles.openIconResponse}
              />{" "}
              <span className={styles.subTextResponse}>Resend Offer</span>
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
            <span className={styles.title}>Expiring Offer Letters List</span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={[]}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
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

      <ExpireOffer_PopUp
        candidateId={expireLetter}
        isOpen={isOpenDialog}
        handleToggle={toggleIsOpenDialog}
      />
      <ResendOffer_PopUp
        letter_id={letterResendId}
        isOpen={isOpenResendDialog}
        handleToggle={toggleIsOpenResendDialog}
      />
    </div>
  );
};

export default ExpiringOfferLetterView;
