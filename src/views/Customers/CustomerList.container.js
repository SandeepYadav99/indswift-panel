/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, Paper,IconButton} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add, Info as EditIcon} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './styles.module.css';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import {
    actionFetchCustomers,
    actionChangePageCustomers,
    actionChangeStatusCustomers,
    actionFilterCustomers,
    actionResetFilterCustomers,
    actionSetPageCustomers,
    actionCreateCustomers,
    actionUpdateCustomers
} from '../../actions/Customers.action';
import {serviceListData} from "../../services/CustomersRequest.service";

let CreateProvider = null;
class CustomerList extends Component {
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
            listData: null
        };
        this.configFilter = [

            {label: 'Request Date', name: 'createdAt', type: 'date', options:{maxDate: new Date()}},
            {label: 'Status', name: 'status', type: 'select', fields: ['PENDING', 'ACTIVE']},
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
        this._handleDataSave = this._handleDataSave.bind(this)
    }

    componentDidMount() {
        // if (this.props.total_count <= 0) {
        this.props.actionFetchData();
        // const request = serviceListData();
        // request.then((data)=> {
        //     if(!data.error){
        //         this.setState({
        //             listData: data.data
        //         })
        //     }
        // });
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
        if (status === 'ACTIVE') {
            return (
                <span style={{
                    fontSize: '12px',
                    color: 'white',
                    background: 'green',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    textTransform: 'capitalize'
                }}>
                    {(status)}
                </span>
            );
        }
        return (<span style={{
            ...styles.spanFont,
            fontSize: '12px',
            color: 'white',
            background: `${status == 'NEW' ? 'orange' : 'orange'}`,
            padding: '3px 10px',
            borderRadius: '20px',
            textTransform: 'capitalize'
        }}>{(status)}</span>);
    }

    renderFirstCell(user) {
        return (
            <div className={styles.firstCellFlex}>
                <div>
                    <img src={user.image} alt=""/>
                </div>
                <div className={classNames(styles.firstCellInfo, 'openSans')}>
                    <span><strong>{user.name}</strong></span> <br/>
                    <span>{user.industry_name}</span>
                </div>
            </div>
        );
    }


    _handleEdit(type) {
        if(type == 'MANUFACTURE'){
            this.props.history.push('/customers/manufacturer')
        } else if(type == 'CUSTOMER'){
            this.props.history.push('/customers/customer')
        }
        // this.setState({
        //     side_panel: !this.state.side_panel,
        //     edit_data: data,
        // })
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _renderCreateForm () {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            CreateProvider = require('./components/Customer.container').default;
        }
        if (this.state.side_panel) {
            const { id } = this.props.match.params;
            return (<CreateProvider data={this.state.edit_data}
                                    listData={this.state.listData}
                                    handleDataSave={this._handleDataSave}></CreateProvider>);
        } return null;
    }
    _handleChangeStatus(data, type) {
        this.props.actionChangeStatus({...data, type: type});
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleDataSave(data, type) {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            this.props.actionCreate(data)
        } else {
            this.props.actionUpdate(data)
        }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _renderContact(all){
        return (
            <div>
                {/*{all.country_code}-*/}
                {all.contact}
                <br/>
                <div style={{ fontSize: '11px' }}>
                OTP-
                <span style={{
                    marginLeft: '5px',
                    color: 'white',
                    background: '#2c3f8b',
                    padding: '2px 7px',
                    borderRadius: '10px',
                    textTransform: 'capitalize'
                }}>
                    777777
                    {/*{all.verification_code}*/}
                </span>
                </div>
                <div>Email - {all.email}</div>
            </div>
        )
    }

    render() {
        const tableStructure = [
            {
                key: 'name',
                label: 'Name',
                sortable: true,
                style: { width: '20%'},
                render: (temp, all) => <div style={{wordBreak:'break-word'}}>{this.renderFirstCell(all)}</div>,
            },
            {
                key: 'contact_string',
                label: 'Contact',
                sortable: false,
                style: { width: '20%'},
                render: (temp, all) => <div style={{wordBreak:'break-word'}}>{this._renderContact(all)}</div>,
            },
            {
                key: 'user_type',
                label: 'User Type',
                sortable: false,
                render: (temp, all) => <div>{all.user_type ? Constants.USER_TYPES[all.user_type] : 'N/A'}</div>,
            },
            {
                key: 'orders',
                label: 'Orders',
                sortable: false,
                render: (temp, all) => <div>{all.orders}</div>,
            },
            {
                key: 'is_email_verified',
                label: 'Email / Contact Verified',
                sortable: false,
                style: { width: '20%'},
                render: (temp, all) => <div>{all.is_email_verified == true ? 'Yes' : 'No'}<div>{all.is_contact_verified == true ? 'Yes' : 'No'}</div></div>,
            },
            {
                key: 'createdAt',
                label: 'Signup Date',
                sortable: true,
                style: { width: '15%'},
                render: (temp, all) => <div>{all.createdAt}<br/>{all.last_activity_at}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{this.renderStatus(all.status)}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div><IconButton className={'tableActionBtn'} color='secondary'
                    // disabled={all.status != 'ACTIVE'}
                    onClick={this._handleEdit.bind(this, all.user_type)}>
                    <EditIcon fontSize={'small'}
                              className={styles.black}/></IconButton></div>),
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

        };
        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: this.props.data,
            count: this.props.total_count,
            page: this.props.currentPage,
        };
        return (
            <div>
                <PageBox>
                    <div className={styles.headerContainer}>
                        <span className={styles.title}>Customers List</span>
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
                            <br/>
                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...datatable}
                                    {...datatableFunctions}
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>
                {/*<SidePanelComponent*/}
                {/*    handleToggle={this._handleSideToggle}*/}
                {/*    title={'Customers '} open={this.state.side_panel} side={'right'}>*/}
                {/*    {this._renderCreateForm()}*/}
                {/*</SidePanelComponent>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.customers.present,
        total_count: state.customers.all.length,
        currentPage: state.customers.currentPage,
        serverPage: state.customers.serverPage,
        sorting_data: state.customers.sorting_data,
        is_fetching: state.customers.is_fetching,
        query: state.customers.query,
        query_data: state.customers.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchCustomers,
        actionSetPage: actionSetPageCustomers,
        actionResetFilter: actionResetFilterCustomers,
        actionSetFilter: actionFilterCustomers,
        actionChangeStatus: actionChangeStatusCustomers,
        actionCreate: actionCreateCustomers,
        actionUpdate: actionUpdateCustomers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
