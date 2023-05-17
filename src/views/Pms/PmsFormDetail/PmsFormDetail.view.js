import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import logo from "../../../assets/img/login logo@2x.png";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { removeUnderScore } from "../../../helper/helper";
import UsePmsFormDetail from "./PmsFormDetail.hook";

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
    }
    else{
      return <h2>{name}</h2>
    }
    // if (group === "CPC") {
    //   return (
    //     <FormDropdown
    //       name={name}
    //       value={value ? value : ""}
    //       isError={isError}
    //       onChange={(e) => {
    //         handleInputChange(e.target.name, e.target.value, "DROPDOWN");
    //       }}
    //     />
    //   );
    // } else {
    //   return (
    //     <FormInput
    //       value={value ? value : ""}
    //       onChange={(e) => {
    //         handleInputChange(e.target.name, e.target.value, "NUMBER");
    //       }}
    //       readOnly={readOnly}
    //       name={name}
    //       isError={isError}
    //       type={"number"}
    //     />
    //   );
    // }
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
      {/* {console.log('row',row?.ratings[0]?.parameters[0])} */}
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
                // left: fixed ? 0 : undefined,
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
                  <Tooltip title={text} enterDelay={5}
                  leaveDelay={2000}>
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

const PmsFormDetail = ({ location }) => {
  const {
    columns,
    rows,
    processedColumns,
    form,
    errors,
  } = UsePmsFormDetail({ location });

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
            {/* {console.log('processedColumns',processedColumns)} */}
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
