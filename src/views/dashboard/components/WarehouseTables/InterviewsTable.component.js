import React from "react";
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
import { useEffect } from "react";
import { useState } from "react";
import { serviceGetUpcomingJoin } from "../../../../services/Dashboard.service";
import historyUtils from "../../../../libs/history.utils";
import { useCallback } from "react";
import RouteName from "../../../../routes/Route.name";

const InterviewsTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    let dataValues = serviceGetUpcomingJoin();
    dataValues
      .then((data) => {
        setData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const changeEmployeeRoute = useCallback((data) => {
    historyUtils.push(`${RouteName.CANDIDATES_DETAILS}${data?.id}`);
  }, []);
  const OlrPage = useCallback((data) => {
    historyUtils.push(`${RouteName.REVIEW_OLR}`);
  }, []);

  const _renderListData = () => {
    const tableRows = [];
    if (data) {
      data?.map((val) => {
        tableRows.push(
          <TableRow key={val.id}>
            <TableCell className="pl-3 fw-normal">
              <div
                className={styles.hyperlinkText}
                onClick={() => changeEmployeeRoute(val?.candidate)}
              >
                {val?.candidate?.name}
              </div>
            </TableCell>
            <TableCell className="pl-3 fw-normal">{val?.location}</TableCell>
            <TableCell className="pl-3 fw-normal">
                {`${val?.designation ? val?.designation : ""} / ${val?.department ? val?.department : ''}`}
              {/* {`${val?.designation !=='undefined'  && val?.designation}/${val?.department && val?.department}`} */}
            </TableCell>
            <TableCell className="pl-3 fw-normal">
              {val?.joining_date}
            </TableCell>
          </TableRow>
        );
      });
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
    <div className={classes.bgWhite}>
      <div className={classes.upperFlex}>
        <div className={styles.titles}>Upcoming Joinings</div>
        <div className={styles.newLine} />
      </div>
      <div>
        <TableContainer className={classes.container}>
          <Table stickyHeader className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell className={classes.row}>name</TableCell>
                <TableCell className={classes.row}>location</TableCell>
                <TableCell className={classes.row}>
                  DESIGNATION/DEPARTMENT
                </TableCell>
                <TableCell className={classes.row}>JOINING DATE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{_renderListData()}</TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={"txtCenter"}>
        <ButtonBase className={"viewBtn"} onClick={() => OlrPage()}>
          View All
        </ButtonBase>
      </div>
    </div>
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
    fontWeight: "600",
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

export default InterviewsTable;
