import React, { useMemo, useState } from "react";
import styles from "./Style.module.css";
import { TableBody, TableCell, TableRow } from "@material-ui/core";


const CustomTable = ({ columns, data }) => {

  const renderCell = (item, column) => {
    if (typeof column.render === "function") {
      return column.render(item);
    }
    return item[column.key];
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns?.map((column) => (
            <th key={column.key} className={styles.thead}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr
            key={index}
            className={
              data?.length === index + 1
                ? styles.blueField
                : index % 2 === 0
                  ? styles.evenRow
                  : styles.oddRow
            }
          >
            {columns?.map((column) => (
              <td key={column.key} className={styles.columData}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function GraphTable({ data, title }) {
  const [columns, setColumns] = useState([
    {
      key: "no",
      title: "SR. NO.",
      sortable: false,
      render: (all) => <div className={styles.label}>{all?.SR_No}</div>,
    },
    {
      key: "amount",
      title: "LOAN AMOUNT",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.amountRemaining === "Total"
            ? all?.amountRemaining
            : `₹ ${all?.amountRemaining}`}
        </div>
      ),
    },
    {
      key: "emi",
      title: "EMI",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>{all?.EMI && `₹ ${all?.EMI}`}</div>
      ),
    },
    {
      key: "interest",
      title: "INTEREST",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.Interest && `₹ ${all?.Interest} `}
        </div>
      ),
    },
    {
      key: "principal",
      title: "PRINCIPAL",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.Principal && `₹ ${all?.Principal}`}
        </div>
      ),
    },
    {
      key: "out",
      title: "OUTSTATION",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>
          {all?.Outstation && `₹ ${all?.Outstation}`}
        </div>
      ),
    },
    {
      key: "date",
      title: "DATE",
      sortable: false,
      render: (all) => (
        <div className={styles.label}>{all?.loanSubmissionDate}</div>
      ),
    },
  ]);



  const _renderListDataMobile = () => {
    const datalen = data?.length ;
    const dataResult = data?.slice(0,datalen-1);

    const tableRows = [];
    if (data) {
      tableRows.push(
        <>
          {
            dataResult?.map((val) => {
              return (
                <div
                  style={{
                    padding: "10px",
                    marginBottom: "20px",
                    background: "#F7F7F7",
                    borderRadius:"8px",
                  }}
                >
                  <TableRow
                    key={data.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #00000029",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.textAdjust}>SR_No</span>
                    <span className={styles.textAdjust}>{val?.SR_No}</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #00000029",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.textAdjust}>LOAN AMOUNT</span>
                    <span className={styles.textAdjust}>{val?.amountRemaining}</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #00000029",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.textAdjust}>EMI</span>
                    <span className={styles.textAdjust}> {val?.EMI}</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #00000029",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.textAdjust}>INTEREST</span>
                    <span className={styles.textAdjust}>{val?.Interest}%</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #00000029",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.textAdjust}>PRINCIPAL</span>
                    <span className={styles.textAdjust}>{val?.Principal}</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #00000029",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.textAdjust}>OUTSTATION</span>
                    <span className={styles.textAdjust}>{val?.Outstation}</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #00000029",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.textAdjust}>DATE</span>
                    <span className={styles.textAdjust}>{val?.loanSubmissionDate}</span>
                  </TableRow>
                </div>
              )
            })
          }
           <div
                  style={{
                    padding: "10px",
                    marginBottom: "20px",
                    background: "#2896E9",
                    borderRadius:"8px",
                  }}
                >
                  <TableRow
                    key={data.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid whitesmoke",
                      alignItems: "center",
                      gap: "10px",
                      color:"white"
                    }}
                  >
                    <span className={styles.textAdjust}>TOTAL LOAN AMOUNT</span>
                    <span className={styles.textAdjust}>{data[datalen-1]?.amountRemaining}</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid whitesmoke",
                      alignItems: "center",
                      gap: "10px",
                      color:"white"
                    }}
                  >
                    <span className={styles.textAdjust}>TOTAL EMI</span>
                    <span className={styles.textAdjust}>{data[datalen-1]?.EMI}</span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid whitesmoke",
                      alignItems: "center",
                      gap: "10px",
                      color:"white"
                    }}
                  >
                    <span className={styles.textAdjust}>TOTAL INTEREST</span>
                    <span className={styles.textAdjust}>{data[datalen-1]?.Interest} </span>
                  </TableRow>
                  <TableRow
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid whitesmoke",
                      alignItems: "center",
                      gap: "10px",
                      color:"white"
                    }}
                  >
                    <span className={styles.textAdjust}>TOTAL PRINCIPAL</span>
                    <span className={styles.textAdjust}>{data[datalen-1]?.Principal}</span>
                  </TableRow>
                </div>
        </>
      );
      return tableRows;
    } else {
      return (
        <TableRow>
          <TableCell colSpan={6}>
            No Details Found
          </TableCell>
        </TableRow>
      );
    }
  };


  return (
    <>
      <div className={styles.desktopContainer}>{<CustomTable title={title} columns={columns} data={data} />}</div>
      <div className={styles.mobileContainer}>{_renderListDataMobile()}</div>
    </>

  );
}

export default GraphTable;
