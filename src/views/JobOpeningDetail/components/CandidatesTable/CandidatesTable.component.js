/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, {Component, useCallback, useMemo} from 'react';
import {Button, ButtonBase, IconButton, withStyles} from "@material-ui/core";
import DataTables from '../../../../Datatables/Datatable.table';
import Constants from '../../../../config/constants';
import styles from './Style.module.css';
import classNames from "classnames";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ReduxDatePicker from "../../../../components/ReduxDatePicker/ReduxDatePicker.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import {Add, CachedOutlined} from "@material-ui/icons";
import StatusPill from "../../../../components/Status/StatusPill.component";
import useCandidatesList from "./CandidatesHook";
import FilterComponent from "../../../../components/Filter/Filter.component";

const CandidatesRecordTable = ({}) => {

    const { handleSortOrderChange , handleRowSize, handlePageChange,  handleEdit,
        handleFilterDataChange, handleSearchValueChange, handleViewDetails, editData, isCalling} = useCandidatesList()

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
                key: 'name',
                label: 'Sr. No',
                sortable: false,
                render: (value, all) => <div>{all.date}</div>,
            },
            {
                key: 'rank',
                label: 'Candidate Name',
                sortable: false,
                render: (temp, all) => <div>{all.rank}</div>,
            },
            {
                key: 'rewards',
                label: 'Contact',
                sortable: false,
                render: (temp, all) => <div>{all.points}</div>,
            },
            {
                key: 'rewards',
                label: 'Applied On',
                sortable: false,
                render: (temp, all) => <div>{all.points}</div>,
            },
            {
                key: 'rewards',
                label: 'Status',
                sortable: false,
                render: (temp, all) => <div>{all.points}</div>,
            },
            {
                key: 'rewards',
                label: 'Last Updated On',
                sortable: false,
                render: (temp, all) => <div>{all.points}</div>,
            },
            {
                key: 'rewards',
                label: 'Action',
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
                ...Constants.DATATABLE_PROPERTIES,
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
                       <FilterComponent
                           // is_progress={isFetching}
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
               </div>
           </div>
        )

}


export default CandidatesRecordTable
