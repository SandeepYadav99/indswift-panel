/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {useCallback, useMemo,} from "react";
import {IconButton} from "@material-ui/core";
import classNames from "classnames";
import {useSelector} from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import useCVShortlist from "./CVShortlistHook";
import StatusPill from "../../components/Status/StatusPill.component";
import RejectDialog from "./component/RejectPopUp/RejectDialog.view";

const CVShortlist = ({}) => {
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
    handleUpdate
  } = useCVShortlist({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.cvShortlist);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.candidate?.name}</span> <br />
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
        label: "NAME",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "experience",
        label: "EXPERIENCE",
        sortable: false,
        render: (temp, all) => <div>{all?.candidate?.experience}</div>,
      },
      {
        key: "resume",
        label: "Resume",
        sortable: false,
        render: (temp, all) => <div><a target={'_blank'} href={all?.candidate?.resume}>Link</a></div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => {
          return (all?.status === Constants.GENERAL_STATUS.PENDING && (
              <div>
                <IconButton
                    className={"tableActionBtn"}
                    color="secondary"
                    disabled={isCalling}
                    onClick={() => { handleUpdate(all, 'REJECT') }}
                >
                  <span className={styles.subText}>Reject</span>
                </IconButton>
                <IconButton
                    className={"tableActionBtn"}
                    color="secondary"
                    disabled={isCalling}
                    onClick={() => { handleUpdate(all, 'ACCEPT') }}
                >
                  <span className={styles.subText}>Accept</span>
                </IconButton>
              </div>
          ))
        }
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling, handleUpdate]);

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

export default CVShortlist;
