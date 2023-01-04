/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component, useCallback, useEffect, useMemo} from 'react';
import {Button, Paper, Checkbox, IconButton, MenuItem} from '@material-ui/core';
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
import useEmployeeList from "./EmployeeListHook";
import StatusPill from "../../components/Status/StatusPill.component";
import CreateView from './Employee.view';
import UploadCsvDialog from "./components/UploadCsv/UploadCsvDialog.view";


const EmployeeList = ({}) => {
    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,
        isCalling, configFilter,} = useEmployeeList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.employee);


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
                        <span className={styles.productName}>Hardeep Kumar</span> <br/>
                        <span>10001212</span>
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


    const renderCreateForm = useMemo(() => {
        return (<CreateView
            handleDataSave={handleDataSave}
            data={editData}
            handleDelete={handleDelete}/>);
    }, [handleDataSave, editData, handleDelete]);

    const tableStructure = useMemo(() => {
        return [
            {
                key: 'name',
                label: 'Employee Name',
                sortable: true,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'location',
                label: 'Location',
                sortable: false,
                render: (temp, all) => <div>NABHA</div>,
            },
            {
                key: 'designation',
                label: 'Designation',
                sortable: false,
                render: (temp, all) => <div>Sr. Manager</div>,
            },
            {
                key: 'dept',
                label: 'Dept & Sub Dept.',
                sortable: false,
                style: { width: '12%'},
                render: (temp, all) => <div>GMS/HR&A</div>,
            },
            {
                key: 'contact',
                label: 'Contact',
                sortable: false,
                 style: { width: '25%'},
                render: (temp, all) => <div>{renderContact()}</div>,
            },
            {
                key: 'dept',
                label: 'HOD',
                sortable: false,
                render: (temp, all) => <div>Pawan Kumar Garg</div>,
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
                style: { width: '15%'},
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
                           <span className={styles.title}>Employee Records</span>
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
                <SidePanelComponent
                    handleToggle={handleSideToggle}
                    title={'New Employee'} open={isSidePanel} side={'right'}>
                    {renderCreateForm}
                </SidePanelComponent>
                <UploadCsvDialog isOpen={true}/>
            </div>
        )
}


export default EmployeeList;
