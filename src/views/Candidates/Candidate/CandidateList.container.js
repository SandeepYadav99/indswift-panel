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
import useCandidateList from "./CandidateListHook";
import StatusPill from "../../../components/Status/StatusPill.component";
import CreateView from './Candidate.view';
import LogUtils from "../../../libs/LogUtils";

const CandidateList = ({location}) => {

    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,
        isCalling, configFilter, warehouses} = useCandidateList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.candidate);

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
                render: (temp, all, index) => <div>{index+1}</div>,
            },
            {
                key: 'name',
                label: 'Candidate',
                sortable: true,
                render: (value, all) => <div>{renderFirstCell(all)}</div>,
            },
            {
                key: 'contact',
                label: 'Contact',
                sortable: false,
                render: (temp, all) => <div>{all?.contact}<br/>{all?.email}</div>,
            },
            {
                key: 'code',
                label: 'PRC',
                sortable: false,
                render: (temp, all) => <div>{all?.job_details?.code}</div>,
            },
            {
                key: 'location',
                label: 'Location',
                sortable: false,
                render: (temp, all) => <div>{all?.job_details?.location}</div>,
            },
            {
                key: 'department',
                label: 'Department/SubDept',
                sortable: false,
                render: (temp, all) => <div>{all?.job_details?.department} / {all?.job_details?.sub_department}</div>,
            },
            {
                key: 'applied',
                label: 'Applied For',
                sortable: false,
                render: (temp, all) => <div>{all?.job_details?.job_role}</div>,
            },
            {
                key: 'coordinator',
                label: 'Coordinator',
                sortable: false,
                render: (temp, all) => <div>{all?.job_details?.assigned_person}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{renderStatus(removeUnderScore(all?.status))}</div>,
            },
            {
                key: 'createdAt',
                label: 'Created Date',
                sortable: false,
                render: (temp, all) => <div>{all?.createdAtText}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}  onClick={() => {handleViewDetails(all)}}><InfoOutlined fontSize={'small'} /></IconButton >
                    {/* <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling}><Edit fontSize={'small'} /></IconButton> */}
                    {/*onClick={() => { handleEdit(all) }}*/}
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
                            <span className={styles.title}>Candidate List</span>
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


export default CandidateList;
