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
import useJobRolesList from "./JobRolesListHook";
import StatusPill from "../../components/Status/StatusPill.component";
import CreateView from './JobRoles.view';
import LogUtils from "../../libs/LogUtils";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";

const JobRolesList = ({}) => {
    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,
        isCalling, configFilter, warehouses,toggleBulkDialog,isBulkDialog, handleChangeWareHouse, warehouseId} = useJobRolesList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.job_roles);


    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);

    const renderFirstCell = useCallback((product) => {
        if (product) {
            return (
                <div className={styles.firstCellFlex}>

                    <div className={styles.driverImgCont}
                         // style={{borderColor: (user.deal_of_day ? '#f44336' : (user.is_featured ? '#16b716' : 'white'))}}
                    >
                        {/*<img src={product.image_url} alt=""/>*/}
                    </div>
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        {/*<span className={styles.productName}><strong>{`${product.name}`}</strong></span> <br/>*/}
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
                label: 'SR No.',
                sortable: false,
                render: (temp, all) => <div><b>{all.sr_no}</b></div>,
            },
            {
                key: 'code',
                label: 'Job Code',
                sortable: false,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'title',
                label: 'Job Title',
                sortable: false,
                render: (temp, all) => <div></div>,
            },
            {
                key: 'location',
                label: 'Location',
                sortable: false,
                render: (temp, all) => <div></div>,
            },
            {
                key: 'department',
                label: 'Department',
                sortable: false,
                render: (temp, all) => <div></div>,
            },
            {
                key: 'dept',
                label: 'Reporting',
                sortable: false,
                render: (temp, all) => <div></div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{renderStatus(all.status)}</div>,
            },
            {
                key: 'date',
                label: 'Date',
                sortable: false,
                render: (temp, all) => <div></div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleViewDetails(all)}}><InfoOutlined fontSize={'small'} /></IconButton >
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}><Edit fontSize={'small'} /></IconButton>
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
                           <span className={styles.title}>Job Roles (Designation) List</span>
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
                    title={'New JobRoles'} open={isSidePanel} side={'right'}>
                    {renderCreateForm}
                </SidePanelComponent>
            </div>
        )
}


export default JobRolesList;
