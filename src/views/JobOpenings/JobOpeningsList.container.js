/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component, useCallback, useEffect, useMemo} from 'react';
import {Button, Paper, Checkbox, IconButton, MenuItem, ButtonBase} from '@material-ui/core';
import classNames from 'classnames';
import {connect, useSelector} from 'react-redux';
import {Add, InfoOutlined, PrintOutlined} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
import styles from './Style.module.css';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import { Edit, RemoveRedEyeOutlined as ViewIcon } from '@material-ui/icons';
import useJobOpeningsList from "./JobOpeningsListHook";
import StatusPill from "../../components/Status/StatusPill.component";
import CreateView from './JobOpenings.view';
import LogUtils from "../../libs/LogUtils";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";

const JobOpeningsList = ({}) => {
    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,
        isCalling, configFilter, warehouses} = useJobOpeningsList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.job_openings);


    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);

    const renderFirstCell = useCallback((product) => {
        if (product) {
            return (
                <div className={styles.firstCellFlex}>

                    {/*<div className={styles.driverImgCont}*/}
                    {/*     // style={{borderColor: (user.deal_of_day ? '#f44336' : (user.is_featured ? '#16b716' : 'white'))}}*/}
                    {/*>*/}
                    {/*    /!*<img src={product.image_url} alt=""/>*!/*/}
                    {/*</div>*/}
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        <span className={styles.productName}>GSKCH/ HR/ SOP <br/>/N/012/ 19.05.2009</span> <br/>
                        {/*<span>{product.code}</span>*/}
                    </div>
                </div>
            );
        } return null;
    }, []);

    const renderCreateForm = useMemo(() => {
        return (<CreateView
            handleDataSave={handleDataSave}
            data={editData}
            warehouse={warehouses}
            handleDelete={handleDelete}/>);
    }, [handleDataSave, editData, warehouses, handleDelete]);


    const tableStructure = useMemo(() => {
        return [
            {
                key: 'sr_no',
                label: 'PRC',
                sortable: false,
                render: (temp, all) => <div>{all?.code}</div>,
            },
            {
                key: 'location',
                label: 'Location',
                sortable: false,
                render: (temp, all) => <div>{all?.location?.name}</div>,
            },
            {
                key: 'department',
                label: 'Department',
                sortable: false,
                render: (temp, all) => <div>{all?.department?.name}/{all?.sub_department?.name}</div>,
            },
            {
                key: 'designation',
                label: 'Designation',
                sortable: false,
                render: (value, all) => <div>{all?.designation?.name}</div>,
            },
            {
                key: 'vacancy',
                label: 'Vacancy',
                sortable: false,
                render: (temp, all) => <div>01</div>,
            }, {
                key: 'assigned_to',
                label: 'Assigned To',
                sortable: false,
                render: (temp, all) => <div>{all?.assigned_person?.name}</div>,
            }, {
                key: 'candidates',
                label: 'Candidates',
                sortable: false,
                render: (temp, all) => <div>{all?.total_candidates ? all?.total_candidates : 0}</div>,
            }, {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{renderStatus(all?.is_sourcing ? 'SOURCING' : 'NOSOURCING')}<br/><br/>{renderStatus(all.status)}</div>,
            }, {
                key: 'createdAt',
                label: 'Created Date',
                sortable: false,
                render: (temp, all) => <div>{all?.createdAtText}</div>,
            }, {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleViewDetails(all)}}><InfoOutlined style={{ color: '#2896e9' }} fontSize={'small'} /></IconButton >
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
                           <span className={styles.title}>Job Openings</span>
                           <div className={styles.newLine}/>
                       </div>
                        <div>
                            <ButtonBase onClick={handleSideToggle} className={'createBtn'}>
                                 CREATE <Add fontSize={"small"} className={'plusIcon'}></Add>
                            </ButtonBase>
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
                <SidePanelComponent
                    handleToggle={handleSideToggle}
                    title={'New JobOpenings'} open={isSidePanel} side={'right'}>
                    {renderCreateForm}
                </SidePanelComponent>
            </div>
        )
}


export default JobOpeningsList;
