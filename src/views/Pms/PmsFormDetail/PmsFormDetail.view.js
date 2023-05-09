import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import logo from "../../../assets/img/login logo@2x.png";
import { IconButton, Tooltip } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import LogUtils from "../../../libs/LogUtils";
import UsePmsFormDetail from "./PmsFormDetail.hook";

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
      return (
        <div>
          <p>{value}</p>
        </div>
        // <FormInput
        //   value={value ? value : ""}
        //   readOnly={readOnly}
        //   name={name}
        //   isError={isError}
        //   type={"number"}
        // />
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
  const parameterColumns = useMemo(() => {
    const thead = [];
    columns.forEach((col) => {
      if ("parameters" in col) {
        col.parameters.forEach((param) => {
          thead.push(
            <th key={param.title} className={styles.thead}>
              <div className={styles.tipWrap}>
                {param?.title}
                {param?.description && (
                  <Tooltip title={param?.description}>
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
                zIndex: fixed ? 10 : 9,
              }}
              className={styles.thead}
            >
              <div className={styles.tipWrap}>
                {title}
                {text && (
                  <Tooltip title={text}>
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

const PmsFormDetail = ({ route }) => {
  const { columns, rows, processedColumns, form } = UsePmsFormDetail({});
  return (
    <div>
      <div className={styles.pmsformWrap}>
        <div className={styles.formUpper}>
          <img src={logo} alt="IndSwift" />
          <p>Type 1 Form</p>
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
              {rows?.map((row, rowIndex) => (
                <>
                  <tr key={row?.id}>
                    {processedColumns.map(
                      (
                        { key, fixed, readOnly, render, rating, ...props },
                        index
                      ) => (
                        <TableCell
                          value={rating}
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
                  <tr key={row?.id}>
                    {processedColumns.map(
                      (
                        { key, fixed, readOnly, render, rating, ...props },
                        index
                      ) => (
                        <TableCell
                        //   value={rating}
                          
                          {...props}
                        />
                      )
                    )}
                  </tr>{" "}
                  <tr key={row?.id}>
                    {processedColumns.map(
                      (
                        { key, fixed, readOnly, render, rating, ...props },
                        index
                      ) => (
                        <TableCell
                          value={rating}
                           
                          {...props}
                        />
                      )
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PmsFormDetail;
