import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  ButtonBase,
} from "@material-ui/core";
import styles from "./Style.module.css";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { serviceGetOLStats } from "../../../../services/Dashboard.service";
import RouteName from "../../../../routes/Route.name";
import historyUtils from "../../../../libs/history.utils";

const PendingOfferTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let dataValues = serviceGetOLStats();
    dataValues
      .then((data) => {
        setData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const classes = useStyles();
  const OlrPage = useCallback(() => {
    historyUtils.push(`${RouteName.REVIEW_OLR}`);
  }, []);

  const _renderListData = () => {
    const tableRows = [];
    if (data) {
      data?.map((val) => {
        tableRows.push(
          <TableRow key={val.id}>
            <TableCell className="pl-3 fw-normal">{val?.code}</TableCell>
            <TableCell className="pl-3 fw-normal">{val?.position}</TableCell>
            <TableCell className="pl-3 fw-normal">
              {val?.candidate_name}
            </TableCell>
            <TableCell className="pl-3 fw-normal">{val?.createdAt}</TableCell>
          </TableRow>
        );
      });
      return tableRows;
    } else {
      return (
        <TableRow>
          <TableCell colSpan={5} className={classes.textCenter}>
            No Details Found
          </TableCell>
        </TableRow>
      );
    }
  };

  const _renderListDataMobile = (val) => {
    const tableRows = [];
    if (val) {
      tableRows.push(
        <>
          <TableRow
            key={val.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid whitesmoke",
              alignItems: "center",
              gap:"10px",
            }}
          >
            <span className={styles.textAdjust}>OFFER LETTER NO.</span>
            <span className={styles.textAdjust}>{val?.code} </span>
          </TableRow>
          <TableRow
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid whitesmoke",
              alignItems: "center",
              gap:"10px",
            }}
          >
            <span className={styles.textAdjust}>POSITION</span>
            <span className={styles.textAdjust}>{val?.position}</span>
          </TableRow>
          <TableRow
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid whitesmoke",
              alignItems: "center",
              gap:"10px",
            }}
          >
            <span className={styles.textAdjust}>NAME</span>
            <span className={styles.textAdjust}> {val?.candidate_name}</span>
          </TableRow>
          <TableRow
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid whitesmoke",
              alignItems: "center",
              gap:"10px",
            }}
          >
            <span className={styles.textAdjust}>DATE</span>
            <span className={styles.textAdjust}>{val?.createdAt}</span>
          </TableRow>
        </>
      );
      return tableRows;
    } else {
      return (
        <TableRow>
          <TableCell colSpan={6} className={classes.textCenter}>
            No Details Found
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <>
      <div className={classes.bgWhite}>
        <div className={styles.upperFlexData}>
          <div>
            <div className={styles.titles}>Pending Offer Letters</div>
            <div className={styles.newLine} />
          </div>
          <div className={styles.responsiveBtn}>
            <ButtonBase className={"viewBtn"} onClick={() => OlrPage()}>
              View All
            </ButtonBase>
          </div>
        </div>
        <div className={styles.desktopTable}>
          <TableContainer className={classes.container}>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.row}>
                    OFFER LETTER NO.
                  </TableCell>
                  <TableCell className={classes.row}>POSITION</TableCell>
                  <TableCell className={classes.row}>NAME</TableCell>
                  <TableCell className={classes.row}>DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{_renderListData()}</TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.responsiveBtn2}>
          <div className={"txtCenter"}>
            <ButtonBase className={"viewBtn"} onClick={() => OlrPage()}>
              View All
            </ButtonBase>
          </div>
        </div>
        <div className={styles.moileTable}>
          {data?.map((val) => {
            return (
              <TableContainer className={classes.container} key={val?.id}>
                <Table
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TableBody
                    style={{
                      width: "100%",
                      background: "#F7F7F7",
                      marginBottom: "10px",
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "12px",
                      boxShadow: "0 0 8px rgb(0 0 0 / 15%)",
                    }}
                  >
                    {_renderListDataMobile(val)}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          })}
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
  bgWhite: {
    borderRadius: "10px",
    padding: "1rem 1rem",
    backgroundColor: "white",
    boxShadow: "0 0 8px rgb(0 0 0 / 15%)",
  },
  row: {
    fontWeight: "bold",
    fontSize: "0.7rem",
  },
  upperFlex: {
    // display: 'flex',
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    marginBottom: "20px",
  },
  value: {
    // fontSize: '0.9rem',
    marginRight: "10px",
  },
  textCenter: {
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));

export default PendingOfferTable;
