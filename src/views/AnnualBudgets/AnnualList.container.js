/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component, useCallback, useEffect, useMemo} from 'react';
import {Button, Paper, Checkbox, IconButton, MenuItem, ButtonBase} from '@material-ui/core';
import classNames from 'classnames';
import {connect, useSelector} from 'react-redux';
import {Add, Edit, InfoOutlined, PrintOutlined} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
import styles from './Style.module.css';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import { InputRounded as EditIcon, RemoveRedEyeOutlined as ViewIcon } from '@material-ui/icons';
import useAnnualList from "./AnnualListHook";
import StatusPill from "../../components/Status/StatusPill.component";
import CreateView from './AnnualView/Annual.view';
import InfoView from './AnnualView/AnnualInfo.view';
import LogUtils from "../../libs/LogUtils";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";


const AnnualList = ({}) => {
    const { handleSortOrderChange , handleRowSize, handlePageChange, handleDataSave, handleDelete, handleEdit,
        handleFilterDataChange, handleSearchValueChange,  handleSideToggle, handleViewDetails, editData, isSidePanel,
        isCalling, configFilter, warehouses, handleChangeWareHouse, warehouseId,selected, type, setType,
        isInfoPanel,handleSideInfo,selectedAnnualId} = useAnnualList({});

    const {data, all: allData, currentPage, is_fetching: isFetching} = useSelector(state => state.annual);

    useEffect(() => {
        console.log('data', data);
        LogUtils.log('products', data);
    }, [data]);

    // const renderStatus = useCallback((status) => {
    //     let className = 'warning';
    //     if (status in Constants.AWB_STATUS) {
    //         className = Constants.AWB_STATUS_TEXT[status];
    //     }
    //     return (<span className={classNames('status', className)}>{(status)}</span>);
    // },[])
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
                        <img src={product.image_url} alt=""/>
                    </div>
                    <div className={classNames(styles.firstCellInfo, 'openSans')}>
                        <span className={styles.productName}><strong>{`${product.name}`}</strong></span> <br/>
                        <span>{product.code}</span>
                    </div>
                </div>
            );
        } return null;
    }, []);


    const renderCreateForm = useMemo(() => {
        return (<CreateView
            closeSidePanel={handleSideToggle}
            handleDataSave={handleDataSave}
            data={editData}
            selectedAnnuals={selected}
            originWarehouseId={warehouseId}
            handleDelete={handleDelete}/>);
    }, [handleDataSave, editData, warehouses, handleDelete, selected, warehouseId]);

    const renderInfoForm = useMemo(() => {
        return (<InfoView
            closeSidePanel={handleSideInfo}
            annualId = {selectedAnnualId}
            />)
    },[selectedAnnualId,])

    const tableStructure = useMemo(() => {
        return [
            {
                key: 'department',
                label: 'Department',
                sortable: true,
                render: (value, all) => <div>HUMAN RESOURCES</div>,
            },
            {
                key: 'budget',
                label: 'Budget',
                sortable: false,
                render: (temp, all) => <div>{10}</div>,
            },
            {
                key: 'posted',
                label: 'Posted',
                sortable: false,
                render: (temp, all) => <div>10</div>,
            },
            {
                key: 'transferred',
                label: 'Transferred',
                sortable: false,
                render: (temp, all) => <div>02</div>,
            },
            {
                key: 'vacancies',
                label: 'Vacancies',
                sortable: false,
                render: (temp, all) => <div>03</div>,
            },
            {
                key: 'expense',
                label: 'Expense Budget',
                sortable: false,
                render: (temp, all) => <div>1,00,00,00</div>,
            },
            {
                key: 'spent',
                label: 'Actual Spent',
                sortable: false,
                render: (temp, all) => <div>90,00,00</div>,
            },

            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{renderStatus(all.status)}<br/><span style={{paddingTop:'5px',display:'inline-block',fontSize:'0.7rem'}}>11/10/2022 22:20:00</span></div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling} onClick={() => {handleSideInfo(all)}}><InfoOutlined fontSize={'small'} /></IconButton >
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={isCalling} onClick={() => {handleSideToggle(all)}}><Edit fontSize={'small'} /></IconButton>
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
            // showSelection: true,
            // allRowSelected: allSelected
        };

        return { datatableFunctions, datatable };
    }, [allData, tableStructure, handleSortOrderChange, handlePageChange, handleRowSize, data, currentPage]);

    const renderLocation = useMemo(() => {
        return (
            <CustomSelectField
                label={'Location'}
                // value={}
                // handleChange={value => {
                //     handleChangeWareHouse(value);
                // }}
            >
                <MenuItem value={'HEAD_OFFICE'}>Head Office</MenuItem>
            </CustomSelectField>
        )
    }, [ ]);

    const renderDropDown = useMemo(() => {
        return (
            <CustomSelectField
                label={'Financial Year'}
                value={warehouseId}
                handleChange={value => {
                    handleChangeWareHouse(value);
                }}
            >
                <MenuItem value={'2022-23'}>FY 2022-23</MenuItem>
            </CustomSelectField>
        )
    }, [ warehouseId]);

    const renderTypeDropDown = useMemo(() => {
        return (
            <CustomSelectField
                label={'Employee Type'}
                value={type}
                handleChange={value => {
                    setType(value)
                }}
            >
                <MenuItem value={'ON_ROLL'}>On Roll Employee</MenuItem>
            </CustomSelectField>
        )
    }, [setType, type]);

    return (
        <div>
            <PageBox>
                <div className={styles.headerContainer}>
                    <div>
                        <span className={styles.title}>Annual Budgets</span>
                        <div className={styles.newLine}/>
                    </div>
                    <div className={styles.rightFlex}>
                        <ButtonBase className={styles.download}>
                            DOWNLOAD TEMPLATE
                        </ButtonBase>
                        <div className={styles.drop}>
                            {renderLocation}
                        </div>
                    </div>
                </div>

                <div className={styles.yearFlex}>
                    <div className={styles.down}>
                        {renderDropDown}
                    </div>
                    <div className={styles.down} style={{marginLeft:'50px'}}>
                        {renderTypeDropDown}
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
                title={'Update Annual Budgets'} open={isSidePanel} side={'right'}>
                {renderCreateForm}
            </SidePanelComponent>
            <SidePanelComponent
                handleToggle={handleSideInfo}
                title={'Annual Budgets Log'} open={isInfoPanel} side={'right'}>
                {renderInfoForm}
            </SidePanelComponent>

        </div>
    )
}


export default AnnualList;
