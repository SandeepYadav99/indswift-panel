import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ButtonBase,
  makeStyles,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import FilterComponent from "../../components/Filter/Filter.component";
import useEmployeeSalaryReport from "./EmployeeSalaryReport.hook";
import TablePagination from "@material-ui/core/TablePagination";
import StatusPill from "../../components/Status/StatusPill.component";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import { getFixedValue } from "../../helper/helper";

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: "white",
    color: "black",
    fontSize: ".75rem",
    fontWeight: "normal",
    fontFamily: "Montserrat",
    borderRadius: "10px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  mobileCard: {
    marginTop: theme.spacing(2),
  },
  mobileCardContent: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
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
        left: fixed ? getFixedValue(index) : undefined,
        // border:  "2px solid #EBEDF4",
        padding: "0",
        zIndex: fixed ? 10 : 9,
        background: readOnly ? "#EDF2F5 " : "#ffffff",
      }}
    >
      {index == 0 && (
        <div className={styles.noWrapheading}>
          <b>{row._id?.name}</b>
          <br />
          {row._id?.emp_code}
        </div>
      )}
      {row?.comparisionData?.map((item, index) => {
        return render(row[key], item, index);
      })}
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
                left: fixed ? getFixedValue(key) : undefined,
                top: 0,
                zIndex: fixed ? 100 : 9,
              }}
              className={styles.thead}
            >
              <div
                className={styles.tipWrap}
                style={{ width: fixed && "150px" }}
              >
                {label}
              </div>
            </th>
          </>
        ))}
      </tr>
    </thead>
  );
};

const EmployeeSalaryReport = ({ location }) => {
  const classes = useStyles();
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
    startValid,
    endValid,
  } = useEmployeeSalaryReport({ location });

  const renderCardContent = () => {
    if (currentData?.length > 0) {
      return currentData?.map((row, index) => {
        return (
          <div>
            <Card
              key={row.id + "" + Math.random()}
              className={classNames(classes.mobileCard, "dtMobCard")}
            >
              <CardContent className={classes.mobileCardContent}>
                {renderTableCellsMobile(row, index)}
              </CardContent>
            </Card>
          </div>
        );
      });
    } else {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6">No Results Found</Typography>
            <Typography variant="subtitle1">
              No matching entries available in our record
            </Typography>
          </CardContent>
        </Card>
      );
    }
  };

  const renderTableCellsMobile = (row, indexPr) => {
    const filteredColumns = tableStructure?.filter(
      (column) => column.is_mobile !== false
    );
    return filteredColumns.map((val, index) => (
      <div className={"dtMobCell"}>
        <div className={"dtMobCellLabel"}>{val?.label}</div>
        <div className={"dtMobCellValueMultiple"}>
        {index == 0 && (
        <div className={styles.mobFixed}>
          <b>{row._id?.name}</b>
          <br />
          {row._id?.emp_code}
        </div>
      )}
          {row?.comparisionData?.map((item, index) => {
            return val?.render(row[indexPr], item, index);
          })}
        </div>
      </div>
    ));
  };

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "0",
        label: "EMPLOYEE NAME",
        sortable: false,
        fixed: true,
        render: (temp, all) => (
          <></>
          // <div className={styles.noWrapEmp}>
          //   {/* {all?.incremental_gross_salary} */}
          // </div>
        ),
      },
      {
        key: "1",
        label: "Grade/Cadre",
        sortable: true,
        fixed: true,
        render: (value, all) => (
          <div className={innerWidth > 769 ? styles.noWrapFixed : styles.mobFixed}>
            {all?.grade?.code}/{all?.cadre?.name}
          </div>
        ),
      },
      {
        key: "2",
        label: "DATE",
        sortable: false,
        fixed: true,
        render: (temp, all) => (
          <div className={innerWidth > 769 ? styles.noWrapFixed : styles.mobFixed}>{all?.effectiveDateText}</div>
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
        key: "total_1",
        label: "total",
        sortable: true,
        render: (value, all) => (
          <div className={styles.noWrap}>₹ {all?.gross}</div>
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
        key: "total_2",
        label: "total earning 1",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>₹ {all?.earning_one}</div>
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
          <div className={styles.noWrap}>
            <b>{all?.reviewer?.name}</b> <br /> {all?.nps}
          </div>
        ),
      },
      {
        key: "maint",
        label: "Vehicle maint(ctc)",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.vehicle_maintenance}</div>
        ),
      },
      {
        key: "emi",
        label: "Vehicle EMIs(ctc)",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.vehicle_emi}</div>
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
          <div className={styles.noWrap}> ₹{all?.earning2_vpf}</div>
        ),
      },
      {
        key: "total_3",
        label: "total earning 2",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹{all?.earning_two}</div>
        ),
      },
      {
        key: "gross_salary",
        label: "gross salary",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹{all?.gross_component}</div>
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
          <div className={styles.noWrap}> ₹ {all?.deduction_vpf}</div>
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
        key: "deduction_one",
        label: "total deduction",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.total_deduction}</div>
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
        key: "earning_four",
        label: "total earning 4",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.earning_four}</div>
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
          <div className={styles.noWrap}> ₹ {all?.insurance}</div>
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
          <div className={styles.noWrap}> ₹ {all?.nps_part_e}</div>
        ),
      },
      {
        key: "deputation",
        label: "deputation allowance",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.deputation_allowance}</div>
        ),
      },
      {
        key: "total_six",
        label: "total earning 5",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.earning_five}</div>
        ),
      },
      {
        key: "net_composite",
        label: "net composite ctc",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.monthly_ctc}</div>
        ),
      },
      {
        key: "net_pay",
        label: "net pay",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}> ₹ {all?.net_pay}</div>
        ),
      },
    ];
  }, [renderStatus, isCalling, formData, currentData, data,innerWidth]);

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
        isError={startValid}
      />
    );
  }, [startDate, startValid]);

  const renderEndDate = useMemo(() => {
    return (
      <CustomDatePicker
        clearable
        label={"End Date"}
        // maxDate={new Date()}
        onChange={(value) => {
          handleChangeDate(value, "end");
        }}
        value={endDate}
        isError={endValid}
      />
    );
  }, [endDate, endValid]);

  // const processedData = useMemo(() => {
  //   const data = [];
  //   if (currentData && currentData.length > 0) {
  //     currentData.forEach((dT) => {
  //       dT.comparisionData.forEach((cDt) => {
  //         data.push({ ...cDt, _id: dT._id });
  //       });
  //     });
  //   }
  //   return data;
  // }, [currentData]);

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
          </div>
          {startDate && endDate && (
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
              filters={[]}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
            <br />
            {innerWidth > 769 ? (
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
                        {currentData?.map((row, rowIndex) => (
                          <tr key={row.id} className={styles.tr}>
                            {tableStructure?.map(
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
            ) : (
              <div className={classes.paper}>
                {renderCardContent()}
                <div className={"dTMobilePagination"}>
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
            )}
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default EmployeeSalaryReport;
