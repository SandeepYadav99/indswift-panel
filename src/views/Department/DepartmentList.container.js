/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component, useCallback, useEffect, useMemo} from 'react';
import {Button, Paper, Checkbox, IconButton, MenuItem, ButtonBase} from '@material-ui/core';
import classNames from 'classnames';
import {connect, useSelector} from 'react-redux';
import {Add, InfoOutlined, OpenInNew, PrintOutlined} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
import styles from './Style.module.css';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import { Edit, RemoveRedEyeOutlined as ViewIcon } from '@material-ui/icons';
import useDepartmentList from "./DepartmentListHook";
import StatusPill from "../../components/Status/StatusPill.component";
// import CreateView from './Department.view';

const DepartmentList = ({}) => {
    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel, handleCreate,
        isCalling, configFilter, handleSubDepartment} = useDepartmentList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.department);


    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);

    const renderFirstCell = useCallback((obj) => {
        if (obj) {
            return (
                <div className={styles.firstCellFlex}>
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        <span className={styles.productName}>{obj?.name}</span> <br/>
                    </div>
                </div>
            );
        } return null;
    }, []);

    const renderContact = useCallback(() => {
        return (
            <div>
                <div>9347873542</div>
                <div><strong>(O)</strong> hardeep.kumar@indwsiftlabs.com</div>
                <div><strong>(P)</strong> hardeepkudg@indwsiftlabs.com</div>
            </div>
        )
    },[])


    // const renderCreateForm = useMemo(() => {
    //     return (<CreateView
    //         handleDataSave={handleDataSave}
    //         data={editData}
    //
    //         handleDelete={handleDelete}/>);
    // }, [handleDataSave, editData, warehouses, handleDelete]);

    const tableStructure = useMemo(() => {
        return [
            // {
            //     key: 'sr_no',
            //     label: 'SR No.',
            //     sortable: false,
            //     render: (temp, all, index) => <div>{index + 1}</div>,
            // },
            {
                key: 'name',
                label: 'Name',
                sortable: true,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'code',
                label: 'Code',
                sortable: true,
                render: (temp, all) => <div>{all?.code}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{renderStatus(all.status)}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton onClick={() => { handleEdit(all) }} className={'tableActionBtn'} color='secondary' disabled={isCalling}><Edit fontSize={'small'} /></IconButton>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleSubDepartment(all)}}>
                        <OpenInNew fontSize={'small'} className={styles.openIcon}/> <span className={styles.subText}>Sub-Department</span>
                    </IconButton >
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
                            <span className={styles.title}>Department List</span>
                            <div className={styles.newLine}/>
                        </div>
                        <div>
                            <ButtonBase onClick={handleCreate} className={'createBtn'}>
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
            </div>
        )
}


export default DepartmentList;
