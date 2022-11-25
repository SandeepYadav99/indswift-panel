import React from "react";
import {Table, TableRow, TableHead, TableBody, TableCell, TableContainer, ButtonBase} from "@material-ui/core";
import styles from './Style.module.css';
import classNames from "classnames";
import {makeStyles} from "@material-ui/styles";

const InterviewsTable = () => {
    const classes = useStyles();

    const _renderFirstCell = (data) => {
        return (
            <div className={'userDetailLeague'}>
                <div className={classNames('userDetailLeagueText', 'openSans', 'textCapitalize', styles.userInfo)}>
                    {/*<img src={data.user.image} className={styles.userImage} alt=""/>*/}
                    <div>
                        <span><strong>{`${data.user.name}`}</strong></span> <br/>
                        <span>{data.user.contact}</span>
                        {/*<span>{tour.tour_name}</span>*/}
                    </div>
                </div>
            </div>
        );
    }

    const _renderListData = () => {
        const tableRows = [];
        if (false) {
            ['data'].forEach((val) => {
                tableRows.push(
                    <TableRow key={val.id}>
                        <TableCell className="pl-3 fw-normal">

                        </TableCell>
                        <TableCell className="pl-3 fw-normal">

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
            )
        }
    }

    return (
        <div className={classes.bgWhite}>
            <div className={classes.upperFlex}>
                <h3>Interviews List</h3>
                <div className={classes.value}></div>
            </div>
            <div>
                <TableContainer className={classes.container}>
                    <Table stickyHeader className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.row}>SR NO.</TableCell>
                                <TableCell className={classes.row}>LOCATION</TableCell>
                                <TableCell className={classes.row}>POSITION CODE</TableCell>
                                <TableCell className={classes.row}>DESIGNATION</TableCell>
                                <TableCell className={classes.row}>CANDIDATE</TableCell>
                                <TableCell className={classes.row}>TIME</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_renderListData()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className={'txtCenter'}>
                <ButtonBase className={'viewBtn'}>View All</ButtonBase>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    },
    bgWhite: {
        borderRadius: '10px',
        padding: '1rem 1rem',
        backgroundColor: 'white',
        boxShadow: '0 0 8px rgb(0 0 0 / 15%)'
    },
    row: {
        fontWeight: '600'
    },
    upperFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        marginBottom: '20px'
    },
    value: {
        // fontSize: '0.9rem',
        marginRight: '10px'
    },
    textCenter: {
        textAlign: 'center',
        fontSize: '0.8rem'
    }
}));

export default InterviewsTable
