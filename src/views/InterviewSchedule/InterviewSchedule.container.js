import React, {Component, useCallback, useEffect, useMemo} from 'react';
import {Button, Paper, Checkbox, IconButton, MenuItem, ButtonBase} from '@material-ui/core';
import classNames from 'classnames';
import {connect, useSelector} from 'react-redux';
import {Add, AssignmentOutlined, InfoOutlined, OpenInNew, PeopleOutlined, PrintOutlined} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
import styles from './Style.module.css';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import { Edit, RemoveRedEyeOutlined as ViewIcon } from '@material-ui/icons';
import useInterviewSchedule from "./InterviewScheduleHook";
import StatusPill from '../../components/Status/StatusPill.component';
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
// import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import CreateView from './Candidate.view';

const InterviewSchedule = ({location}) => {

    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,changeRoute
        ,isCalling, configFilter, warehouses} = useInterviewSchedule({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.interviewSchedule);


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
                <div className={styles.prcWrapper} onClick={()=>changeRoute(obj)} >
                    <div>{obj?.job?.code}</div>
                </div>
            );
        } return null;
    }, []);


    // const renderCreateForm = useMemo(() => {
    //     return (<CreateView
    //         handleDataSave={handleDataSave}
    //         data={editData}
    //         warehouse={warehouses}
    //         handleDelete={handleDelete}/>);
    // }, [handleDataSave, editData, warehouses, handleDelete]);

    const tableStructure = useMemo(() => {
        return [
            {
                key: 'name',
                label: 'Candidate',
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
                label: 'Designation/Department',
                sortable: false,
                render: (temp, all) => <div>{all?.job?.designation}/{all?.job?.department}</div>,
            },
            {
                key: 'schedule',
                label: 'SCHEDULE',
                sortable: false,
                render: (temp, all) => <div>{all?.interviewDateText}</div>,
            },
            {
                key: 'round',
                label: 'ROUND',
                sortable: false,
                render: (temp, all) => <div>{all?.step}</div>,
            },
            {
                key: 'venue',
                label: 'VENUE/MODE',
                sortable: false,
                render: (temp, all) => <div>{all?.venue}/{all?.mode}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    {/* <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleViewDetails(all)}}><InfoOutlined fontSize={'small'} /></IconButton > */}
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleViewDetails(all)}}>
                        <PeopleOutlined fontSize={'small'} className={styles.openIcon}/> <span className={styles.subText}>View Profile</span>
                    </IconButton >
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {
                        historyUtils.push(`${RouteName.CANDIDATE_FEEDBACK}${all?.id}`)
                    }}>
                        <AssignmentOutlined fontSize={'small'} className={styles.openIcon}/> <span className={styles.subText}>Record Feedback</span>
                    </IconButton >
                    {/* <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}><Edit fontSize={'small'} /></IconButton> */}
                    {/*onClick={() => { handleEdit(all) }}*/}
                </div>),
            },


        ];
    }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

    const tableData = useMemo(() => {
        const datatableFunctions = {
            // onCellClick: this.handleCellClick,
            // onCellDoubleClick: this.handleCellDoubleClick,
            // onFilterValueChange: this._handleSearchValueChange.bind(this),
            onSortOrderChange: handleSortOrderChange,
            onPageChange: handlePageChange,
            // onRowSelection: this.handleRowSelection,
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
                        <div>
                            {/*<ButtonBase onClick={handleSideToggle} className={'createBtn'}>*/}
                            {/*    CREATE <Add fontSize={"small"} className={'plusIcon'}></Add>*/}
                            {/*</ButtonBase>*/}
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


export default InterviewSchedule;
