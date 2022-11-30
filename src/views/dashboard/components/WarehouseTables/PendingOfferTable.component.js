import React from "react";
import {Table, TableRow, TableHead, TableBody, TableCell, TableContainer, ButtonBase} from "@material-ui/core";
import styles from './Style.module.css';
import classNames from "classnames";
import {makeStyles} from "@material-ui/styles";

const PendingOfferTable = () => {
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
                    <TableCell colSpan={5} className={classes.textCenter}>
                        No Details Found
                    </TableCell>
                </TableRow>
            )
        }
    }

    return (
        <div className={classes.bgWhite}>
            <div className={classes.upperFlex}>
                <div className={styles.titles}>Pending Offer Letters</div>
                <div className={styles.newLine}/>
            </div>
            <div>
                <TableContainer className={classes.container}>
                    <Table stickyHeader className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.row}>SR NO.</TableCell>
                                <TableCell className={classes.row}>OFFER LETTER NO.</TableCell>
                                <TableCell className={classes.row}>POSITION</TableCell>
                                <TableCell className={classes.row}>NAME</TableCell>
                                <TableCell className={classes.row}>DATE</TableCell>
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
        fontWeight: 'bold',
        fontSize:'0.7rem'
    },
    upperFlex: {
        // display: 'flex',
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

export default PendingOfferTable
