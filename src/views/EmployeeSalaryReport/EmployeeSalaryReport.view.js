import React, { useCallback, useMemo } from "react";
import {
  IconButton,
  MenuItem,
  ButtonBase,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import classNames from "classnames";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import Constants from "../../config/constants";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import FilterComponent from "../../components/Filter/Filter.component";
import useEmployeeSalaryReport from "./EmployeeSalaryReport.hook";
import { InfoOutlined } from "@material-ui/icons";
import TablePagination from "@material-ui/core/TablePagination";
import StatusPill from "../../components/Status/StatusPill.component";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import CustomAutoComplete from "../../components/FormFields/AutoCompleteText/CustomAutoComplete";

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

const EmployeeSalaryReport = ({ location }) => {
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
    handleDownload,
    setYear,
    formData,
    startDate,
    endDate,
    handleChangeDate,
    listData,
    listType,
    setListType,
  } = useEmployeeSalaryReport({ location });

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "EMPLOYEE NAME",
        sortable: false,
        fixed: true,
        render: (temp, all) => (
          <div className={styles.noWrapName}>
            <b>{all?.name}</b> <br /> {all?.emp_code}
          </div>
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
        key: "date",
        label: "DATE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.location}</div>
        ),
      },
      {
        key: "gross",
        label: "INCREMENTAL GROSS SALARY",
        sortable: true,
        render: (value, all) => (
          <div className={styles.noWrap}>₹ {all?.incremental_gross_salary}</div>
        ),
      },

      {
        key: "car",
        label: "CAR COMPONENT",
        sortable: true,
        render: (value, all) => (
          <div className={styles.noWrap}>₹ {all?.car_component}</div>
        ),
      },
      {
        key: "basic",
        label: "BASIC",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.basic_salary}</div>
        ),
      },
      {
        key: "hra",
        label: "HRA",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.hra}</div>
        ),
      },
      {
        key: "education",
        label: "EDUCATION ALLOWANCE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.education_allowance}</div>
        ),
      },
      {
        key: "special",
        label: "SPECIAL ALLOWANCE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.special_allowance}</div>
        ),
      },
      {
        key: "upgrade",
        label: "PROFESSIONAL UPGRADATION",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.pug}</div>
        ),
      },
      {
        key: "helper",
        label: "HELPER ALLOWANCE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.helper}</div>
        ),
      },
      {
        key: "food",
        label: "Food Coupens",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.food_coupons}</div>
        ),
      },
      ,
      {
        key: "gift",
        label: "Gift Coupens",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.gift_coupons}</div>
        ),
      },
      {
        key: "lta",
        label: "LTA",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.lta}</div>
        ),
      },
      {
        key: "super",
        label: "superannuation",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.super_annuation}</div>
        ),
      },
      {
        key: "nps",
        label: "NPS",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrapName}>
            <b>{all?.reviewer?.name}</b> <br /> {all?.nps}
          </div>
        ),
      },
      {
        key: "maint",
        label: "Vehicle maint(ctc)",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrapName}>{all?.vehicle_maintenance}</div>
        ),
      },
      {
        key: "emi",
        label: "Vehicle EMIs(ctc)",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrapName}>{all?.vehicle_emi}</div>
        ),
      },
      {
        key: "fuel",
        label: "fuel availed",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.fuel}</div>
        ),
      },
      {
        key: "vpf",
        label: "vpf",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹{all?.deduction_vpf}</div>
        ),
      },
      {
        key: "pli",
        label: "pli",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.earning_three_pli}</div>
        ),
      },
      {
        key: "empf",
        label: "em pf-deduction part",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.em_pf}</div>
        ),
      },
      {
        key: "emesi",
        label: "em esi-deduction part",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.em_esi}</div>
        ),
      },
      {
        key: "vpf2",
        label: "vpf",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.vpf}</div>
        ),
      },
      {
        key: "pli",
        label: "pli",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.earning_three_pli}</div>
        ),
      },
      {
        key: "emlwf",
        label: "em lwf",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.em_lwf}</div>
        ),
      },
      {
        key: "pfer",
        label: "pf -er contribution part",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.er_pf}</div>
        ),
      },
      {
        key: "esier",
        label: "esi -er contribution part",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.er_esi}</div>
        ),
      },
      {
        key: "erlwf",
        label: "er lwf",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.er_lwf}</div>
        ),
      },
      {
        key: "gratuity",
        label: "gratuity",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.gratuity}</div>
        ),
      },
      {
        key: "medipre",
        label: "medical insurance premium",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.medical_allowance}</div>
        ),
      },
      {
        key: "staall",
        label: "stability allowance",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.stability_incentive}</div>
        ),
      },
      {
        key: "retention",
        label: "retention allowance",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.retention_allowance}</div>
        ),
      },
      {
        key: "performance2",
        label: "performance allowance",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.perf_bonus}</div>
        ),
      },
      {
        key: "bonus",
        label: "bonus",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.annual_bonus}</div>
        ),
      },
      {
        key: "carmaint2",
        label: "type 2 car maint",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.two_car_maintenance}</div>
        ),
      },
      {
        key: "fuel2",
        label: "type 2 fuel",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.two_fuel}</div>
        ),
      },
      {
        key: "nps2",
        label: "nps",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.effectiveDateText}</div>
        ),
      },
      {
        key: "deputation",
        label: "deputation allowance",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.nps_part_e}</div>
        ),
      },
    ];
  }, [renderStatus, isCalling, formData]);

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
        label={"Filter By"}
        value={type}
        handleChange={(value) => {
          setType(value);
        }}
      >
        <MenuItem value={"LOCATION"}>LOCATION</MenuItem>
        <MenuItem value={"DEPARTMENT"}>DEPARTMENT</MenuItem>
        <MenuItem value={"DESIGNATION"}>DESIGNATION</MenuItem>
      </CustomSelectField>
    );
  }, [type, setType]);

  const renderLocation = useMemo(() => {
    return (
      <CustomSelectField
        label={"Location"}
        value={listType}
        handleChange={(value) => {
          setListType(value);
        }}
      >
        {listData?.LOCATIONS?.map((dT) => {
          return (
            <MenuItem value={dT?.id} key={dT?.id}>
              {dT?.name}
            </MenuItem>
          );
        })}
      </CustomSelectField>
    );
  }, [listType, listData, type]);

  const renderDepartment = useMemo(() => {
    return (
      <CustomSelectField
        label={"Department"}
        value={listType}
        handleChange={(value) => {
          setListType(value);
        }}
      >
        {listData?.DEPARTMENTS?.map((dT) => {
          return (
            <MenuItem value={dT?.id} key={dT?.id}>
              {dT?.name}
            </MenuItem>
          );
        })}
      </CustomSelectField>
    );
  }, [listType, listData, type]);

  const renderDesignation = useMemo(() => {
    return (
      <CustomSelectField
        label={"Designation"}
        value={listType}
        handleChange={(value) => {
          setListType(value);
        }}
      >
        {listData?.DESIGNATIONS?.map((dT) => {
          return (
            <MenuItem value={dT?.id} key={dT?.id}>
              {dT?.name}
            </MenuItem>
          );
        })}
      </CustomSelectField>
    );
  }, [listType, listData, type]);

  const renderStartDate = useMemo(() => {
    return (
      <CustomDatePicker
        clearable
        label={"Start Date"}
        maxDate={new Date()}
        onChange={(value) => {
          handleChangeDate(value, "start");
        }}
        value={startDate}
      />
    );
  }, [startDate]);

  const renderEndDate = useMemo(() => {
    return (
      <CustomDatePicker
        clearable
        label={"End Date"}
        maxDate={new Date()}
        onChange={(value) => {
          handleChangeDate(value, "end");
        }}
        value={endDate}
      />
    );
  }, [endDate]);
  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Salary Comparison Report</span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div className={styles.yearFlex}>
          <div className={styles.UpperWrap}>
            <div className={styles.down}>{renderStartDate}</div>
            <div className={styles.down}>{renderEndDate}</div>
            <div className={styles.down}>{renderDropDown}</div>

            {type && (
              <div className={styles.down}>
                {type === "LOCATION"
                  ? renderLocation
                  : type === "DEPARTMENT"
                  ? renderDepartment
                  : renderDesignation}
              </div>
            )}
          </div>
          {startDate && endDate && listType && (
            <div className={styles.rightFlex}>
              <ButtonBase
                onClick={initialApiCall}
                className={styles.downloadrun}
              >
                RUN REPORT
              </ButtonBase>
              <ButtonBase className={styles.download} onClick={handleDownload}>
                DOWNLOAD
              </ButtonBase>
            </div>
          )}
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
              {/*<DataTables*/}
              {/*    {...tableData.datatable}*/}
              {/*    {...tableData.datatableFunctions}*/}
              {/*/>*/}
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
    </div>
  );
};

export default EmployeeSalaryReport;
