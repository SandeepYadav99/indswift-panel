/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, { useCallback, useMemo } from "react";
import { ButtonBase, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../components/Datatables/datatables";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import useCVShortlist from "./CVShortlistHook";
import StatusPill from "../../components/Status/StatusPill.component";
import RejectDialog from "./component/RejectPopUp/RejectDialog.view";
import AcceptDialog from "./component/ApproveDialog/ApproveDialog.view"
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const CVShortlist = ({ }) => {
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
    handleUpdate,
    candidatePage,
    dataValue,
    toggleApproveDialog,
    isApprovePopUp
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

  const renderExperience = useCallback((exp) => {
    if (exp == "0") {
      return exp;
    } else if (exp == "1") {
      return `${exp} yr`;
    } else if (exp > "1") {
      return `${exp} yrs`;
    } else {
      return "-";
    }
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div
            className={classNames(
              styles.firstCellInfo,
              styles.hyperlinkText,
              "openSans"
            )}
            onClick={() => candidatePage(obj?.candidate)}
          >
            <span className={styles.productName}>{obj?.candidate?.name}</span>{" "}
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
        label: "NAME",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "experience",
        label: "EXPERIENCE",
        sortable: false,
        render: (temp, all) => (
          <div>{renderExperience(all?.candidate?.experience)}</div>
        ),
      },
      {
        key: "resume",
        label: "Resume",
        sortable: false,
        render: (temp, all) => (
          <div>
            <a target={"_blank"} href={all?.candidate?.resume}>
              Link
            </a>
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => {
          return (
            all?.status === Constants.GENERAL_STATUS.PENDING &&
            all?.is_permit && (
              <div>
                <IconButton
                  className={"tableActionBtnError"}
                  color="error"
                  disabled={isCalling}
                  onClick={() => {
                    toggleRejectDialog(all)
                    // handleUpdate(all, "REJECT");
                  }}
                >
                  <span className={styles.subTextError}>Reject</span>
                </IconButton>
                <IconButton
                  className={"tableActionBtnSuccess"}
                  color="secondary"
                  disabled={isCalling}
                  onClick={() => {
                    toggleApproveDialog(all)
                    // handleUpdate(all, "ACCEPT");
                  }}
                >
                  <span className={styles.subText}>Accept</span>
                </IconButton>
              </div>
            )
          );
        },
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    isCalling,
    handleUpdate,
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
      rowsPerPage: 10,
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
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <div>
              <span className={styles.title}>Shortlist Candidates</span>
              <div className={styles.newLine} />
            </div>
          </ButtonBase>
        </div>
        <RejectDialog
          isOpen={isRejectPopUp}
          handleToggle={toggleRejectDialog}
          dataValue={dataValue}
        />
        <AcceptDialog
          isOpen={isApprovePopUp}
          handleToggle={toggleApproveDialog}
          dataValue={dataValue}
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

export default CVShortlist;
