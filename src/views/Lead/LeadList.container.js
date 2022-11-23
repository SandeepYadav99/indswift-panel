/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, Paper, Checkbox, IconButton,ButtonBase} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add, InfoOutlined, InputRounded as EditIcon, RemoveRedEyeOutlined as ViewIcon} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './styles.module.css';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import {BookmarkBorder, Bookmark, Check, Close,} from '@material-ui/icons';
import {
    actionFetchLead,
    actionChangePageLead,
    actionChangeStatusLead,
    actionFilterLead,
    actionResetFilterLead,
    actionSetPageLead,
    actionCreateLead,
    actionUpdateLead,
    actionSetLeadRequestType
    // actionCleanLead
} from '../../actions/Lead.action';
import csx from "classnames";
import MenuItem from "@material-ui/core/MenuItem";


let CreateProvider = null;

class LeadList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            point_selected: null,
            data: [],
            page: 1,
            total: Constants.DEFAULT_PAGE_VALUE + 1,
            side_panel: false,
            edit_data: null,
            listData: null,
            is_submit: false,
            selected: [],
            batch_id: null,
            allSelected: false,
            driver_name: '',
            selection: 'ALL',
        };
        this.configFilter = [
            // {label: 'City', name: 'city', type: 'text'},
            {label: 'Request Date', options: { maxDate: new Date() }, name: 'createdAt', type: 'date'},
            // {label: 'Concern',  name: 'concern_id', type: 'selectObject', custom: { extract: { id: 'id', title: 'name' } } , fields: []},
            // {label: 'Assigned To', name: 'assigned', type: 'text'},
            // {label: 'Status', name: 'status', type: 'select', fields: ['PENDING']},
            // {label: 'Priority', name: 'priority', type: 'select', fields: ['HIGH', 'MEDIUM', 'LOW']},
            // {label: 'Mode', name: 'mode', type: 'text'},

        ];

        this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
        this._queryFilter = this._queryFilter.bind(this);
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
        this._handleRowSize = this._handleRowSize.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleChangeStatus = this._handleChangeStatus.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleCheckbox = this._handleCheckbox.bind(this);
        this._handleSelectAll = this._handleSelectAll.bind(this);

    }

    componentDidMount() {
        this.props.actionFetchData();
    }


    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    }

    _handlePageChange(type) {
        console.log('_handlePageChange', type);
        this.props.actionSetPage(type);
    }


    _queryFilter(key, value) {
        console.log('_queryFilter', key, value);
        // this.props.actionSetPage(1);
        this.props.actionFetchData(1, this.props.sorting_data, {
            query: key == 'SEARCH_TEXT' ? value : this.props.query,
            query_data: key == 'FILTER_DATA' ? value : this.props.query_data,
        }, true);
    }

    _handleFilterDataChange(value) {
        console.log('_handleFilterDataChange', value);
        this._queryFilter('FILTER_DATA', value);
    }

    _handleSearchValueChange(value) {
        console.log('_handleSearchValueChange', value);
        this._queryFilter('SEARCH_TEXT', value);
    }

    handlePreviousPageClick() {
        console.log('handlePreviousPageClick', 'PREV');
    }

    handleNextPageClick() {
        console.log('handleNextPageClick', 'NEXT');
    }

    _handleSortOrderChange(row, order) {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
        // this.props.actionSetPage(1);
        this.props.actionFetchData(1,
            {row, order}, {
                query: this.props.query,
                query_data: this.props.query_data,
            }, row);
        // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
    }

    _handleRowSize(page) {
        console.log(page);
    }

    renderStatus(status) {
        let className = 'warning';
        if (status in Constants.LEAD_STATUS_COLOR) {
            className = Constants.LEAD_STATUS_COLOR[status].toLowerCase();
        }
        return (<span className={csx('status', className)}>{(status.replaceAll('_', ' '))}</span>);
    }


    _handleEdit(data) {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: data,
        })
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _renderCreateForm() {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            // CreateProvider = require('./Lead.container').default;
        }
        if (this.state.side_panel) {
            const {id} = this.props.match.params;
            return (<CreateProvider data={this.state.edit_data}
                                    listData={this.state.listData}
                                    changeStatus={this._handleDataSave}></CreateProvider>);
        }
        return null;
    }

    _handleChangeStatus(data, type) {
        this.props.actionChangeStatus({...data, type: type});
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }


    async _handleDataSave(data, type) {
        this.setState({
            is_submit: true
        });
    }


    _handleCheckbox(id) {
        const tempSelected = this.state.selected;
        const tempIndex = tempSelected.indexOf(id);
        if (tempIndex >= 0) {
            tempSelected.splice(tempIndex, 1);
        } else {
            tempSelected.push(id);
        }
        this.setState({
            selected: tempSelected,
            allSelected: false,
        });
    }

    _renderMenu() {
        const {batches} = this.props;
        return batches.map((val) => {
            return (<MenuItem value={val.id}>{val.name} - {val.delivery_slot.unformatted}</MenuItem>);
        })
    }

    _handleSelectAll() {
        const {data} = this.props;
        const {allSelected} = this.state;
        if (allSelected) {
            this.setState({
                selected: [],
                allSelected: false
            });
        } else {
            const temp = [];
            data.forEach((val) => {
                if (val.status == Constants.JOB_STATUS.NOT_ASSIGNED) {
                    temp.push(val.id);
                }
            });
            this.setState({
                selected: temp,
                allSelected: true
            });
        }
    }


    ccyFormat(num) {
        return `${Constants.CURRENCY} ${num.toFixed(2)}`;
    }

    _renderProducts(products) {
        return products.map((val) => {
            return (<div className={styles.productInfo}>
                <span className={styles.productName}>{val.name}</span>
                <span
                    className={styles.productQty}> {parseFloat(val.quantity * val.unit_step).toFixed(2)} {val.unit}</span>
            </div>)
        })
    }

    renderFirstCell(user) {
        // const tempEmailRender = user.referred_by ? (<span style={{textTransform: 'lowercase'}}>{(user.referred_by)}</span>) : null;
        return (
            <div className={styles.firstCellFlex}>
                {/*<div>*/}
                {/*    <img src={user.logo} alt=""/>*/}
                {/*</div>*/}
                <div className={classNames(styles.firstCellInfo, 'openSans')}>
                    <span><strong style={{textTransform:'capitalize'}}>{`${user.user.name}`}</strong></span> <br/>
                    <span>{user.lead_no}</span>
                    <div>{Constants.USER_TYPE[user.user.user_type] }</div>
                    {/*{tempEmailRender}*/}
                </div>
            </div>
        );
    }

    _handleViewLead(data){
        this.props.history.push('/lead/detail/'+data.lead_id)
    }


    _handleSearchClick(type) {
        this.setState({
            selection: type
        }, () => {
            this.props.actionSetLeadRequestType(type);
            this.props.actionFetchData(1, {}, {}, true, type);
        })
    }

    _renderServices(data){
        return data.map((val, key) => {
            return (
                <div key={key} className={styles.services}>
                    <div>{val}</div>
                </div>
            )
        })
    }

    render() {
        const {selection} = this.state;
        const tableStructure = [
            {
                key: 'lead_detail',
                label: 'Lead Info',
                sortable: false,
                //style: {width: '15%'},
                render: (temp, all) => <div >{this.renderFirstCell(all)}</div>,
            },
            {
                key: 'contact',
                label: 'Contact Info',
                sortable: false,
                // style: { width: '20%'},
                render: (temp, all) => <div><div>{all.user.contact}</div><div>{all.user.email}</div></div>,
            },
            {
                key: 'service_interest',
                label: 'Service Interest',
                sortable: false,
                // style: { width: '20%'},
                render: (temp, all) => <div>{all.services_interested.length > 0 ? this._renderServices(all.services_interested) : 'N/A'}</div>,
            },
            {
                key: 'service_country',
                label: 'Service Country',
                sortable: false,
                // style: { width: '20%'},
                render: (temp, all) => <div style={{textTransform: 'capitalize'}}>{all.service_countries.length > 0 ? all.service_countries.map(country => country).join(", ") : 'N/A'}</div>,
            },
            {
                key: 'assigned_to',
                label: 'Assigned To',
                sortable: false,
                render: (temp, all) => <div>{all.lead ?  all.lead.assigned_to_name : 'N/A'}</div>,
            },
            {
                key: 'activity',
                label: 'Activity',
                sortable: false,
                // style: { width: '20%'},
                render: (temp, all) => <div><div className={csx('status', all.lead.priority)}>{Constants.PRIORITY_TEXT[all.lead.priority]}</div><div className={styles.updated}>{all.createdAt}</div></div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div><div>{this.renderStatus(all.status)}</div><div className={styles.updated}>{all.updatedAt}</div></div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div>
                    <IconButton className={'tableActionBtn'} color='secondary' disabled={this.state.is_calling} onClick={this._handleViewLead.bind(this, all)}><InfoOutlined fontSize={'small'} /></IconButton>
                    {/*<IconButton className={'tableActionBtn'} color='secondary' disabled={this.state.is_calling} onClick={this._handleViewLead.bind(this, all)}><EditIcon fontSize={'small'} /></IconButton>*/}
                </div>),
            },

        ];
        const datatableFunctions = {
            onCellClick: this.handleCellClick,
            // onCellDoubleClick: this.handleCellDoubleClick,
            // onFilterValueChange: this._handleSearchValueChange.bind(this),
            onSortOrderChange: this._handleSortOrderChange,
            onPageChange: this._handlePageChange,
            onRowSelection: this.handleRowSelection,
            onRowSizeChange: this._handleRowSize,
            handleSelectAllClick: this._handleSelectAll

        };
        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: this.props.data,
            count: this.props.total_count,
            page: this.props.currentPage,
            showSelection: false,
            allRowSelected: this.state.allSelected
        };
        return (
            <div>
                <div className={styles.filterButtons}>
                    <ButtonBase onClick={this._handleSearchClick.bind(this, 'ALL')} style={{borderTopLeftRadius:'15px'}}
                                className={selection === 'ALL' ? styles.noColor : styles.color}>All</ButtonBase>
                    <ButtonBase onClick={this._handleSearchClick.bind(this, 'PENDING')}
                                className={selection === 'PENDING' ? styles.noColor : styles.color}>Pending</ButtonBase>
                    <ButtonBase onClick={this._handleSearchClick.bind(this, 'IN_PROGRESS')}
                                className={selection === 'IN_PROGRESS' ? styles.noColor : styles.color}>In Progress</ButtonBase>
                    <ButtonBase onClick={this._handleSearchClick.bind(this, 'QUOTE_SENT')}
                                className={selection === 'QUOTE_SENT' ? styles.noColor : styles.color}>Quote Sent</ButtonBase>
                    <ButtonBase onClick={this._handleSearchClick.bind(this, 'ARCHIVED')} style={{borderTopRightRadius:'15px'}}
                                className={selection === 'ARCHIVED' ? styles.noColor : styles.color}>Archived</ButtonBase>
                </div>

                <PageBox>
                    <div className={styles.headerContainer}>
                        <span className={styles.title}> Lead Management List</span>
                        {/*<Button onClick={this._handleSideToggle} variant={'contained'} color={'primary'} disabled={this.state.listData==null}>*/}
                        {/*<Add></Add> Create*/}
                        {/*</Button>*/}
                    </div>

                    <div>
                        <FilterComponent
                            is_progress={this.props.is_fetching}
                            filters={this.configFilter}
                            handleSearchValueChange={this._handleSearchValueChange.bind(this)}
                            handleFilterDataChange={this._handleFilterDataChange}
                        />
                        <div>

                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...datatable}
                                    {...datatableFunctions}
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>
                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'Lead'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.lead.present,
        total_count: state.lead.all.length,
        currentPage: state.lead.currentPage,
        serverPage: state.lead.serverPage,
        sorting_data: state.lead.sorting_data,
        is_fetching: state.lead.is_fetching,
        query: state.lead.query,
        query_data: state.lead.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchLead,
        actionSetPage: actionSetPageLead,
        actionResetFilter: actionResetFilterLead,
        actionSetFilter: actionFilterLead,
        actionChangeStatus: actionChangeStatusLead,
        actionCreate: actionCreateLead,
        actionUpdate: actionUpdateLead,
        actionSetLeadRequestType: actionSetLeadRequestType
        // actionCleanLead: actionCleanLead
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadList);
