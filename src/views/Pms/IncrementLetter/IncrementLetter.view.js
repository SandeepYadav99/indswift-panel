import React, { useCallback, useMemo } from "react";
import {
  IconButton,
  MenuItem,
  ButtonBase,
  Tooltip,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import classNames from "classnames";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import FilterComponent from "../../../components/Filter/Filter.component";
import useIncrementPlanner from "./IncrementLetter.hook";
// import DialogIncComponent from "./component/confirmDialogInc";
import BottomIncActionView from "./component/BottomIncAction/BottomIncAction.view";
import BottomPanelComponent from "../../../components/BottomBar/BottomBar.component";
import { InfoOutlined } from "@material-ui/icons";
import TablePagination from "@material-ui/core/TablePagination";
import DialogIncComponent from "./component/confirmDialogInc";
import { removeUnderScore } from "../../../helper/helper";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import BarChartSharpIcon from '@material-ui/icons/BarChartSharp';
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: "white",
    color: "black",
    fontSize: ".75rem",
    fontWeight: "normal",
    fontFamily: "Montserrat",
    borderRadius: "10px",
  },
}));

const TableCell = ({
  row,
  key,
  fixed,
  readOnly,
  render,
  handleInputChange,
  name,
  value,
  isError,
  group,
  title,
  totalAvg,
  rating,
  index,
  ...props
}) => {
  return (
    <td
      key={key}
      style={{
        position: fixed ? "sticky" : "static",
        left: fixed ? 0 : undefined,
        // border:  "2px solid #EBEDF4",
        padding: "0",
        zIndex: fixed ? 10 : 9,
        background: readOnly ? "#EDF2F5 " : "#ffffff",
      }}
    >
      {render(row[key], row, index)}
    </td>
  );
};

const TableHead = ({ columns }) => {
  const classes = useStyles();

  return (
    <thead>
      <tr>
        {columns?.map(({ key, parameters, label, fixed, text, is_static }) => (
          <>
            <th
              rowSpan={is_static ? 2 : 1}
              colSpan={parameters ? parameters.length : 1}
              key={key}
              style={{
                position: "sticky",
                left: fixed ? 0 : undefined,
                top: 0,
                zIndex: fixed ? 100 : 9,
              }}
              className={styles.thead}
            >
              <div className={styles.tipWrap}>
                {label?.replace(/_/g, " ")}
                {text && (
                  <Tooltip title={text} enterDelay={2} leaveDelay={2000}>
                    <IconButton size="small">
                      <InfoOutlined color="secondary" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </th>
          </>
        ))}
      </tr>
    </thead>
  );
};

const IncrementLetter = ({ location }) => {
  const {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    isCalling,
    currentData,
    data,
    currentPage,
    year,
    type,
    setType,
    initialApiCall,
    configFilter,
    handleViewDetails,
    setYear,
    toggleConfirmDialog,
    isDialog,
    handleValueChange,
    formData,
    handleDialogConfirm,
    isSubmitting,
    isFreezed,
    selected,
    selectedEmps,
    handleCheckbox,
  } = useIncrementPlanner({ location });

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback(
    (obj) => {
      if (obj) {
        const selectedIndex = selected?.findIndex((sel) => sel?.id === obj?.id);
        return (
          <div className={styles.firstCellFlex}>
            <div className={styles.flex}>
              <Checkbox
                  disabled={obj.is_awarded}
                onChange={() => {
                  handleCheckbox(obj);
                }}
                checked={selectedIndex >= 0}
                value="secondary"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
            <div className={classNames(styles.firstCellInfo, "openSans")}>
              <span className={styles.productName}>{obj?.name}</span> <br />
              <span className={styles.productName}>{obj?.code}</span> <br />
            </div>
          </div>
        );
      }
      return null;
    },
    [selected, handleCheckbox]
  );

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "EMPLOYEE NAME",
        sortable: false,
        fixed: true,
        render: (temp, all) => (
          <div className={styles.noWrapName}>
            {renderFirstCell(all)}
            {/* <b>{all?.name}</b> <br /> {all?.code} */}
          </div>
        ),
      },

      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.designation}</div>
        ),
      },
      {
        key: "cadre",
        label: "Grade/Cadre",
        sortable: true,
        render: (value, all) => (
          <div className={styles.noWrap}>
            {all?.grade}/{all?.cadre}
          </div>
        ),
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.location}</div>
        ),
      },
      {
        key: "department",
        label: "Dept/Sub dept",
        sortable: true,
        render: (value, all) => (
          <div className={styles.noWrap}>
            {all?.department}/{all?.sub_department}
          </div>
        ),
      },

      {
        key: "doj",
        label: "D.O.J",
        sortable: true,
        render: (value, all) => <div className={styles.noWrap}>{all?.doj}</div>,
      },
      {
        key: "length",
        label: "Length of Service",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>
            {all?.experience && all?.experience > 1
              ? `${all?.experience} years`
              : `${all?.experience} year`}
          </div>
        ),
      },
      {
        key: "quali",
        label: "QUALIFICATION",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.higher_education}</div>
        ),
      },
      {
        key: "rating",
        label: "NORMALIZED RATING",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.normalized_rating}</div>
        ),
      },
      {
        key: "final",
        label: "FINAL RATING BY HOD",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.overall_hod_rating}</div>
        ),
      },

      {
        key: "cat",
        label: "Performance cat.",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.increment_level}</div>
        ),
      },
      {
        key: "salary",
        label: "G. Salary",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.incremental_gross_salary}</div>
        ),
      },
      {
        key: "pli",
        label: "PLI",
        sortable: false,
        render: (temp, all) => <div className={styles.noWrap}>{all?.pli}</div>,
      },
      {
        key: "incremental",
        label: "Current incremental salary",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.current_incremental_salary}</div>
        ),
      },

      {
        key: "increment",
        label: "increment",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.increment_amount}</div>
        ),
      },
      {
        key: "effective",
        label: "effective increment",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.effective_amount}</div>
        ),
      },
      {
        key: "new_salary",
        label: "new salary",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.new_salary}</div>
        ),
      },
      {
        key: "reviewer",
        label: "Reviewer",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrapName}>
            <b>{all?.reviewer?.name}</b> <br /> {all?.reviewer?.code}
          </div>
        ),
      },
      {
        key: "HOD",
        label: "Hod",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrapName}>
            <b>{all?.hod?.name}</b> <br /> {all?.hod?.code}
          </div>
        ),
      },
      {
        key: "overall",
        label: "Overall  HOD",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrapName}>
            <b>{all?.overall_hod?.name}</b> <br /> {all?.overall_hod?.code}
          </div>
        ),
      },
      {
        key: "remarks",
        label: "System Remarks",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.remarks}</div>
        ),
      },
      {
        key: "change",
        label: "Grade change",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>
            {all?.is_grade_change ? "YES" : "NO"}
          </div>
        ),
      },
      {
        key: "effective_date",
        label: "Effective Date",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.effectiveFromText}</div>
        ),
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>
            <StatusPill status={removeUnderScore(all?.status)} />
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.actionWrap}>
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
            <a
              style={{ "text-decoration": "none" }}
              target="_blank"
              href={all?.increment_letter_document}
              // onClick={() => {
              //   historyUtils.push(RouteName.VIEW_DOCUMENTS, {
              //     url: all?.increment_letter_document,
              //   });
              // }}
            >
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                // onClick={() => {
                //   handleViewFormDetails(all);
                // }}
              >
                <RemoveRedEyeOutlinedIcon fontSize={"small"} />
              </IconButton>
            </a>
            <a
              style={{ "text-decoration": "none" }}
              target="_blank"
              href={all?.performance_letter_path}
              // onClick={() => {
              //   historyUtils.push(RouteName.VIEW_DOCUMENTS, {
              //     url: all?.performance_letter_path,
              //   });
              // }}
            >
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                // onClick={() => {
                //   handleViewFormDetails(all);
                // }}
              >
                <BarChartSharpIcon fontSize={"small"} />
              </IconButton>
            </a>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, isCalling, handleValueChange, formData]);

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
      count: data?.length,
      page: currentPage - 1,
      rowsPerPage: 50,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Batch"}
        value={type}
        handleChange={(value) => {
          setType(value);
        }}
      >
        <MenuItem value={"APMS"}>APMS</MenuItem>
        <MenuItem value={"DTY"}>DTY</MenuItem>
      </CustomSelectField>
    );
  }, [type, setType]);

  const renderYear = useMemo(() => {
    return (
      <CustomSelectField
        label={"Year"}
        value={year}
        handleChange={(value) => {
          setYear(value);
        }}
      >
        <MenuItem value={"2023"}>2023</MenuItem>
      </CustomSelectField>
    );
  }, [year]);
  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Increment Letter</span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div className={styles.yearFlex}>
          <div className={styles.UpperWrap}>
            <div className={styles.down}>{renderYear}</div>
            <div className={styles.down}>{renderDropDown}</div>
          </div>
        </div>
        <div>
          <div>
            <FilterComponent
              is_progress={isCalling}
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
            <br />
            <div style={{ width: "100%", marginBottom: "50px" }}>
              <div className={styles.tableWrapper}>
                <div className={styles.container}>
                  <table
                    style={{
                      borderCollapse: "collapse",
                      cellSpacing: "0",
                      borderSpacing: "0",
                      cellpadding: "0",
                      height: "100px",
                    }}
                  >
                    <TableHead columns={tableStructure} />
                    <tbody>
                      {currentData.map((row, rowIndex) => (
                        <tr key={row.id}>
                          {tableStructure.map(
                            (
                              { key, fixed, readOnly, render, ...props },
                              index
                            ) => (
                              <TableCell
                                row={row}
                                key={key}
                                fixed={fixed}
                                render={render}
                                index={index}
                                {...props}
                              />
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={data?.length}
                rowsPerPage={50}
                page={currentPage - 1}
                onChangePage={(event, newPage) => {
                  handlePageChange(newPage);
                }}
              />
            </div>
          </div>
        </div>
      </PageBox>
      <DialogIncComponent
        isOpen={isDialog}
        handleClose={toggleConfirmDialog}
        handleConfirm={() => {
          !isSubmitting && handleDialogConfirm();
        }}
      />
      <BottomPanelComponent open={selected?.length > 0}>
        <BottomIncActionView
          employees={selected.length}
          handleSend={toggleConfirmDialog}
          isSubmitting={isSubmitting}
        />
      </BottomPanelComponent>
    </div>
  );
};

export default IncrementLetter;
