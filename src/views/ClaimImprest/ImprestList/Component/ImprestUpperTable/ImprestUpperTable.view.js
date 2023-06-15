import React, { useCallback, useEffect, useMemo } from "react";
import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import {
  AssignmentOutlined,
  Edit,
  InfoOutlined,
  PeopleOutlined,
} from "@material-ui/icons";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../../Datatables/Datatable.table";
import FilterComponent from "../../../../../components/Filter/Filter.component";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import historyUtils from "../../../../../libs/history.utils";
import RouteName from "../../../../../routes/Route.name";
import constants from "../../../../../config/constants";
import useImprestUpperTable from "./ImprestUpperTable.hook";
import { removeUnderScore } from "../../../../../helper/helper";

const ImprestUpperTable = ({ location }) => {
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
    changeRoute,
  } = useImprestUpperTable({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.imprest);

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

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "TAP NO.",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      {
        key: "type",
        label: "TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.imprestTypeText}</div>,
      },
      {
        key: "associated",
        label: "ASSOCIATED TAP",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.travelPlanner?.code ? (
              <div>
                {all?.travelPlanner?.code}
                <br />
                <StatusPill
                  status={removeUnderScore(all?.travelPlanner?.status)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0",
                  }}
                />
              </div>
            ) : (
              <div>N/A</div>
            )}
          </div>
        ),
      },
      {
        key: "DATE",
        label: "DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "amount",
        label: "IMPREST AMOUNT",
        sortable: false,
        render: (temp, all) => <div>{all?.amount && `₹ ${all?.amount}`}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill status={removeUnderScore(all?.status)} />
          </div>
        ),
      },
      {
        key: "issue_date",
        label: "ISSUE DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.issueDateText}</div>,
      },
      {
        key: "action_key",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
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
      ...constants.DATATABLE_PROPERTIES,
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

export default ImprestUpperTable;
