import React, { useCallback, useMemo } from "react";
import styles from "./Style.module.css";
import Constants from "../../../../config/constants";
import Datatables from "../../../../components/Datatables/datatables";
import { ButtonBase, MenuItem } from "@material-ui/core";
import useFirstNormalizeTable from "./FirstNormalizeTableHook";
import NormalizeDialog from "../NormalizeDialog/NormalizeDialog.view";

function FirstNormalizeTable({ Renderdata, getPmsList,normalizeType,placeholder }) {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    isCalling,
    data,
    currentData,
    toggleNormalize,
    normalize,
  } = useFirstNormalizeTable({ Renderdata, getPmsList });

  const tableStructure = useMemo(() => {
    return [
      {
        key: "last_batch",
        label: "LAST BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.batch}</div>,
      },
      {
        key: "date",
        label: "Date",
        sortable: false,
        render: (temp, all) => <div> {all?.date ? all?.date : "-"}</div>,
      },
    ];
  }, [isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: currentData,
      count: data.length,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
      hidePagination: true,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
  ]);

  return (
    <div className={styles.plainPaper}>
      <NormalizeDialog
        isOpen={normalize}
        handleToggle={toggleNormalize}
        normalizeType={normalizeType}
        getPmsList={getPmsList}
      />
      <div className={styles.headerContainer}>
        <div>
          <span className={styles.title}>{placeholder}</span>
          {/* <div className={styles.newLine} /> */}
        </div>
      </div>
      <div className={styles.yearFlex}>
        <div className={styles.btnWrap}>
          <ButtonBase onClick={toggleNormalize} className={"createBtn"}>
            RUN NORMALIZATION
          </ButtonBase>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Datatables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </div>
  );
}

export default FirstNormalizeTable;
