import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import logo from "../../../assets/img/login logo@2x.png";
import { ButtonBase, IconButton, Tooltip, makeStyles } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { removeUnderScore } from "../../../helper/helper";
import usePMS4BFormDetail from "./Pms4BFormDetail.hook";

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
  name,
  value,
  group,
  ...props
}) => {

  const inputField = useMemo(() => {
    if (render) {
      return null;
    } else {
      const getIndex = name?.split("_");
      const parameterIndex = getIndex[1] - 5;
      const values =
        row?.ratings[parameterIndex]?.parameters[getIndex[2]];
      const {title,rating}=values
      return (
        <div className={styles.detailCont}>
           {title &&
            title !== "Fars" &&
            title !== "Bars" &&
            title !== "NET_SCORE" && <span>{rating}</span>}
        </div>
      );
    }
  }, [render, group, value, name]);
  return (
    <td
      key={key}
      style={{
        position: fixed ? "sticky" : "static",
        left: fixed ? 0 : undefined,
        border: "2px solid #EBEDF4",
        padding: "0",
        zIndex: fixed ? 10 : 9,
        background: readOnly ? "#EDF2F5 " : "#ffffff",
      }}
    >
      {render ? (
        render(row)
      ) : (
        <div className={styles.inputWrap}>{inputField}</div>
      )}
    </td>
  );
};

const TableHead = ({ columns }) => {
  const classes = useStyles();
  const parameterColumns = useMemo(() => {
    const thead = [];
    columns.forEach((col) => {
      if ("parameters" in col) {
        col.parameters.forEach((param) => {
          thead.push(
            <th
              style={{
                position: "sticky",
                top: 35,
                zIndex: 10,
              }}
              key={param.title}
              className={styles.thead}
            >
              <div className={styles.tipWrap}>
                {param?.title?.replace(/_/g, " ")}
                {param?.description && (
                  <Tooltip
                    enterDelay={5}
                    leaveDelay={2000}
                    title={param?.description}
                    classes={{ tooltip: classes.customTooltip }}
                  >
                    <IconButton size="small">
                      <InfoOutlined color="secondary" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </th>
          );
        });
      }
    });
    return thead;
  }, [columns]);

  return (
    <thead>
      <tr>
        {columns?.map(({ key, parameters, title, fixed, text, is_static }) => (
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
                {title?.replace(/_/g, " ")}
                {text && (
                  <Tooltip title={text} enterDelay={5} leaveDelay={2000}>
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
      <tr>{parameterColumns}</tr>
    </thead>
  );
};
const OtherTableCell = ({
  row,
  key,
  fixed,
  readOnly,
  render,
  name,
  type,
  rowsLength,
  ...props
}) => {
  const OtherField = useMemo(() => {
    if (render) {
      return null;
    } else {
      const getIndex = name?.split("_");
      const parameterIndex = getIndex[1] - 5;
      const checkIndex = getIndex[2];
      const getTitle=row?.ratings[parameterIndex]?.title
      const values = row?.ratings[parameterIndex]?.ratings;
      return (
        <div className={styles.detailCont}>
          <span>
          {checkIndex == 0 &&
              (type == "percentage"
                ? `${values?.[type]}%`
                : type === "rating" &&
                  (getTitle === "FARS" ||
                    getTitle === "BARS" ||
                    getTitle === "NET_SCORE")
                ? " "
                : values?.[type])}
               </span>
        </div>
      );
    }
  }, [render, name]);
  return (
    <td
      key={key}
      style={{
        position: fixed ? "sticky" : "static",
        left: fixed ? 0 : undefined,
        border: "2px solid #EBEDF4",
        padding: "0",
        zIndex: fixed ? 10 : 9,
        background: readOnly ? "#EDF2F5 " : "#ffffff",
        minHeight: "40px",
        borderBottom: (type == "percentage" && parseInt(name?.split('_')[0]) !== rowsLength - 1) && "2px solid #919BB0",
      }}
    >
      {render ? (
        <></>
      ) : (
        <div className={styles.inputWrap2}>{OtherField}</div>
      )}
    </td>
  );
};
const PmsFormDetail = ({ location }) => {
  const { columns, rows, processedColumns ,handleReviewPage} = usePMS4BFormDetail({
    location,
  });

  const type = location?.state?.type;

  return (
    <div>
      <div className={styles.pmsformWrap}>
        <div className={styles.formUpper}>
          <img src={logo} alt="IndSwift" />
          <p>{`${removeUnderScore(type)} FORM`}</p>
          <span>
            This form is based upon right angle methodology, in which an
            assigned mentor provide concrete feedback about the subordinate with
            an objective to apprise the performance and also to quickly align
            the performance of individual with his/her organizational career
            plan.
          </span>
        </div>
      </div>
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
            <TableHead columns={columns} />
            <tbody>
              {rows.map((row, rowIndex) => (
                <>
                  <tr key={row.id}>
                    {processedColumns.map(
                      ({ key, fixed, readOnly, render, ...props }, index) => (
                        <TableCell
                          row={row}
                          key={key}
                          name={`${rowIndex}_${key}`}
                          fixed={fixed}
                          readOnly={readOnly}
                          render={render}
                          {...props}
                        />
                      )
                    )}
                  </tr>
                  <tr key={`${row.id}_${rowIndex}`}>
                    {processedColumns.map(
                      ({ key, render, fixed, readOnly, ...props }) => (
                        <OtherTableCell
                          row={row}
                          key={key}
                          name={`${rowIndex}_${key}`}
                          fixed={fixed}
                          readOnly={readOnly}
                          render={render}
                          {...props}
                          type="rating"
                        />
                      )
                    )}
                  </tr>{" "}
                  <tr key={`${row.id}_${rowIndex}`}>
                    {processedColumns.map(
                      ({ key, render, fixed, readOnly, ...props }) => (
                        <OtherTableCell
                          row={row}
                          key={key}
                          name={`${rowIndex}_${key}`}
                          fixed={fixed}
                          readOnly={readOnly}
                          render={render}
                          {...props}
                          type="weighted"
                        />
                      )
                    )}
                  </tr>
                  <tr key={`${row.id}_${rowIndex}`} style={{borderBottom:'2px solid yelloe'}}>
                    {processedColumns.map(
                      ({ key, render, fixed, readOnly, ...props }) => (
                        <OtherTableCell
                          row={row}
                          key={key}
                          name={`${rowIndex}_${key}`}
                          fixed={fixed}
                          readOnly={readOnly}
                          render={render}
                          {...props}
                          type="percentage"
                          rowsLength={rows?.length}
                        />
                      )
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.lowerBtnwr}>
          <div className={styles.btnWrap}>
            <ButtonBase
              // disabled={isSubmitting}
              aria-haspopup="true"
              onClick={handleReviewPage}
              className={"createBtn"}
            >
              Close
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PmsFormDetail;
