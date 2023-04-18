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
import StatusPill from "../../../components/Status/StatusPill.component";
import CreateView from './ClaimsList.view';
import useClaimsList from './ClaimsListHook';

const ClaimsList = ({location}) => {

    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,
        isCalling, configFilter, warehouses} = useClaimsList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.claims);

    const removeUnderScore=(value)=>{
        return value ? value.replace(/_/g, " "): ""
      }  
    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);

    const renderFirstCell = useCallback((obj) => {
        if (obj) {
            return (
                <div className={styles.firstCellFlex}>
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        <span className={styles.productName}>{obj?.employee?.name}</span> <br/>
                        <span className={styles.productName}>{obj?.employee?.emp_code}</span> <br/>
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
                key: 'name',
                label: 'EMPLOYEE',
                sortable: true,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'grade',
                label: 'GRADE/CADRE',
                sortable: false,
                render: (temp, all) => <div>{all?.contact}<br/>{`${all?.employee?.grade}/${all?.employee?.cadre}`}</div>,
            },
            {
                key: 'location',
                label: 'Location',
                sortable: false,
                render: (temp, all) => <div>{all?.employee?.location}</div>,
            },
            {
                key: 'desigination',
                label: 'DESIGNATION',
                sortable: false,
                render: (temp, all) => <div>{all?.employee?.designation}</div>,
            },
            {
                key: 'department',
                label: 'DEPT & SUB-DEPT',
                sortable: false,
                render: (temp, all) => <div>{all?.employee?.department} / {all?.employee?.sub_department}</div>,
            },
            {
                key: 'contact',
                label: 'CONTACT',
                sortable: false,
                render: (temp, all) => <div>{all?.employee?.contact}</div>,
            },
            {
                key: 'claim_type',
                label: 'CLAIM TYPE',
                sortable: false,
                render: (temp, all) => <div>{all?.claim?.claim_type}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{renderStatus(removeUnderScore(all?.status))}<br/> <br/>{renderStatus(removeUnderScore(all?.claim?.status))}</div>,
            },
            {
                key: 'claim_date',
                label: 'CLAIM DATE',
                sortable: false,
                render: (temp, all) => <div>{all?.claim?.claimedAtText}</div>,
            },
            {
                key: 'value',
                label: 'VALUE',
                sortable: false,
                render: (temp, all) => <div>{all?.claim?.claim_amount}</div>,
            },
            {
                key: 'claim_id',
                label: 'Claim ID',
                sortable: false,
                render: (temp, all) => <div>{all?.claim?.code}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleViewDetails(all)}}><InfoOutlined fontSize={'small'} /></IconButton >
                </div>),
            },


        ];
    }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

    const tableData = useMemo(() => {
        const datatableFunctions = {
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
                            <span className={styles.title}>Claim Management</span>
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
                <SidePanelComponent
                    handleToggle={handleSideToggle}
                    title={'New Candidate'} open={isSidePanel} side={'right'}>
                    {renderCreateForm}
                </SidePanelComponent>
            </div>
        )
}


export default ClaimsList;
