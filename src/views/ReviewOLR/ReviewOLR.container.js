import React, {Component, useCallback, useEffect, useMemo} from 'react';
import {Button, Paper, Checkbox, IconButton, MenuItem, ButtonBase} from '@material-ui/core';
import classNames from 'classnames';
import {connect, useSelector} from 'react-redux';
import {Add, AssignmentOutlined, InfoOutlined, OpenInNew, PeopleOutlined} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import styles from './Style.module.css';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import StatusPill from '../../components/Status/StatusPill.component';
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import useReviewOLR from './ReviewOLRHook';

const ReviewOLR = ({location}) => {

    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,changeRoute
        ,isCalling, configFilter, warehouses} = useReviewOLR({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.review_olr);

    const removeUnderScore=(value)=>{
        return value ? value.replace(/_/, " "): ""
      }
    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);

    const renderFirstCell = useCallback((obj) => {
        if (obj) {
            return (
                <div className={styles.firstCellFlex}>
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        <span className={styles.productName}>{obj?.candidate?.name}</span> <br/>
                    </div>
                </div>
            );
        } return null;
    }, []);
    const renderPRCCell = useCallback((obj) => {
        if (obj) {
            return (
                <div className={styles.hyperlinkText} onClick={()=>changeRoute(obj)} >
                    <div>{obj?.job_details?.code}</div>
                </div>
            );
        } return null;
    }, []);

    const tableStructure = useMemo(() => {
        return [
            {
                key: 'candidate_name',
                label: 'CANDIDATE NAME',
                sortable: true,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'code',
                label: 'PRC',
                sortable: false,
                render: (temp, all) => <div>{renderPRCCell(all)}</div>,
            },
            {
                key: 'department',
                label: 'DESIGNATION/ DEPARTMENT',
                sortable: false,
                render: (temp, all) => <div>{all?.job_details?.designation}/{all?.job_details?.department}</div>,
            },
            {
                key: 'replacing_person',
                label: 'REPLACING PERSON',
                sortable: false,
                render: (temp, all) => <div>{all?.replacing_person?.name} <br/> {all?.replacing_person?.code}</div>,
            },
            {
                key: 'status',
                label: 'STATUS',
                sortable: false,
                render: (temp, all) => <div><StatusPill status={all?.status} /></div>,
            },
            {
                key: 'finalized_on',
                label: 'FINALIZED ON',
                sortable: false,
                render: (temp, all) => <div>{all?.createdAtText}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div className={styles.btnWrapContainer}>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleViewDetails(all)}}>
                        <PeopleOutlined fontSize={'small'} className={styles.openIcon}/> <span className={styles.subText}>View Profile</span>
                    </IconButton >
                    {all.status === Constants.OFFER_LETTER_STATUS.PENDING && (<IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {
                        historyUtils.push(`${RouteName.CANDIDATES_OFFER_DETAILS}${all?.offer_id}`, {
                            isReview: true,
                            reviewId: all?.id
                        });
                    }}>
                        <AssignmentOutlined fontSize={'small'} className={styles.openIcon}/> <span className={styles.subText}>View OLR Sheet</span>
                    </IconButton >)}

                </div>),
            },


        ];
    }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

    const tableData = useMemo(() => {
        const datatableFunctions = {
            onSortOrderChange: handleSortOrderChange,
            onPageChange: handlePageChange,
            onRowSizeChange: handleRowSize,
        };

        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: data,
            count: allData.length,
            page: currentPage,
        };

        return { datatableFunctions, datatable };
    }, [allData, tableStructure, handleSortOrderChange, handlePageChange, handleRowSize, data, currentPage]);


        return (
            <div>
                <PageBox>
                    <div className={styles.headerContainer}>
                        <div>
                            <span className={styles.title}>Interview Schedule List</span>
                            <div className={styles.newLine}/>
                        </div>
                    </div>

                    <div>
                        <FilterComponent
                            is_progress={isFetching}
                            filters={configFilter}
                            handleSearchValueChange={handleSearchValueChange}
                            handleFilterDataChange={handleFilterDataChange}
                        />
                        <div>
                            <br/>
                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...tableData.datatable}
                                    {...tableData.datatableFunctions}
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>

            </div>
        )
}


export default ReviewOLR;
