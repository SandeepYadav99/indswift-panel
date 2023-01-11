/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, {Component, useCallback, useMemo} from 'react';
// import DataTables from '../../../../Datatables/Datatable.table';
import DataTables from '../../../../../Datatables/Datatable.table'
import styles from './Style.module.css';
import classNames from "classnames"; 
// import FilterComponent from "../../../../components/Filter/Filter.component";
import useInterviewerList from './InterviewerTableHook';
import StatusPill from '../../../../../components/Status/StatusPill.component';
import constants from '../../../../../config/constants';

const InterviewerRecordTable = ({}) => {

    const { handleSortOrderChange , handleRowSize, handlePageChange,  handleEdit,
        handleFilterDataChange, handleSearchValueChange, handleViewDetails, editData, isCalling} = useInterviewerList()

    const renderStatus = useCallback((status) => {
        return <StatusPill status={status} />
    }, []);

    const renderFirstCell = useCallback((product) => {
        if (product) {
            return (
                <div className={styles.firstCellFlex}>
                    {/*<div>*/}
                    {/*    <img src={user.image} alt=""/>*/}
                    {/*</div>*/}
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        <span><strong></strong></span> <br/>
                    </div>
                </div>
            );
        } return null;
    }, []);


    const tableStructure = useMemo(() => {
        return [
            {
                key: 'interviewer',
                label: 'INTERVIEWER',
                sortable: false,
                render: (value, all) => <div>{all.date}</div>,
            },
            {
                key: 'designation',
                label: 'DESIGNATION',
                sortable: false,
                render: (temp, all) => <div>{all.rank}</div>,
            },
            {
                key: 'department',
                label: 'DEPARTMENT',
                sortable: false,
                render: (temp, all) => <div>{all.points}</div>,
            },
            {
                key: 'step sequence',
                label: 'STEP SEQUENCE',
                sortable: false,
                render: (temp, all) => <div>{all.points}</div>,
            },
            {
                key: 'shortlist approval',
                label: 'SHORTLIST APPROVAL',
                sortable: false,
                render: (temp, all) => <div>{all.points}</div>,
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
                ...constants.DATATABLE_PROPERTIES,
                columns: tableStructure,
                // data: data,
                // count: allData.length,
                // page: currentPage,
                // rowsPerPage: 10,
                // allRowSelected: false,
                // showSelection: false
            };

            return { datatableFunctions, datatable };
        }, [ tableStructure, handleSortOrderChange, handlePageChange, handleRowSize,]); // allData, data, currentPage

        return (
           <div>
               <div>
                   <div>
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
               </div>
           </div>
        )

}


export default InterviewerRecordTable
