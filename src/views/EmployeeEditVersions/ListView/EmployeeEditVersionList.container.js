/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component, useCallback, useEffect, useMemo} from 'react';
import {Button, Paper, Checkbox, IconButton, MenuItem, ButtonBase} from '@material-ui/core';
import classNames from 'classnames';
import {connect, useSelector} from 'react-redux';
import {Add, InfoOutlined, PrintOutlined} from '@material-ui/icons';
import PageBox from '../../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../../components/SidePanel/SidePanel.component';
import styles from './Style.module.css';
import DataTables from '../../../Datatables/Datatable.table';
import Constants from '../../../config/constants';
import FilterComponent from '../../../components/Filter/Filter.component';
import { Edit, RemoveRedEyeOutlined as ViewIcon } from '@material-ui/icons';
import useEmployeeVersionList from "./EmployeeEditVersionHook";
import StatusPill from "../../../components/Status/StatusPill.component";
import CandidateTable from "../../../components/CandidateDataTable/CandidateTable.component";
import VersionDetailView from "./component/VersionDetail.view";

const EmployeeVersionList = ({}) => {
    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel, handleCreate,
        isCalling, configFilter, warehouses} = useEmployeeVersionList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.employee_versions);


    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);

    const renderFirstCell = useCallback((obj) => {
        if (obj) {
            return (
                <div className={styles.firstCellFlex}>
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        <span className={styles.productName}>{obj?.employee?.name}</span> <br/>
                    </div>
                </div>
            );
        } return null;
    }, []);


    const tableStructure = useMemo(() => {
        return [
            {
                key: 'emp.name',
                label: 'Employee Name',
                sortable: true,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'emp.emp_code',
                label: 'Code',
                sortable: false,
                render: (temp, all) => <div>{all?.employee?.code}</div>,
            },
            // {
            //     key: 'address',
            //     label: 'Address',
            //     sortable: false,
            //     render: (temp, all) => <div>{all?.address}</div>,
            // },
            {
                key: 'createdAt',
                label: 'Changed By',
                sortable: false,
                render: (temp, all) => <div>{all?.editedBy?.name} <br/> {all?.createdAtText}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: false,
                render: (temp, all) => <div><StatusPill status={all?.status} /> </div>,
            },
            {
                key: 'approvedAt',
                label: 'Approved By',
                sortable: true,
                render: (temp, all) => <div>{all?.verifiedAt ? (<div>{all?.verifiedBy?.name}  <br/> {all?.verifiedAtText} </div>) : '-'}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling} onClick={()=> handleSideToggle(all)}><Edit fontSize={'small'} /></IconButton>
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
                            <span className={styles.title}>EmployeeVersion List</span>
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
                    <SidePanelComponent
                        handleToggle={handleSideToggle}
                        title={"Profile Change Details"}
                        open={isSidePanel}
                        side={"right"}
                    >
                        <VersionDetailView handleClose={handleSideToggle} id={editData} isOpen={isSidePanel} />
                    </SidePanelComponent>
                </PageBox>
            </div>
        )
}


export default EmployeeVersionList;
