import React, {Component} from 'react';
import styles from './styles.module.css'
import LeadDetail from "./components/LeadDetail/LeadDetail.component";
import Timeline from "./components/Timeline/Timeline.view";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actionGetLeadDetails,
    actionGetLeadNotes,
    actionGetLeadRequests,
    actionUpdateLeadFormData
} from "../../actions/Lead.action";
import LeadRequestList from "./components/LeadRequest/LeadRequestList.component";
import LeadNoteList from "./components/Note/NoteList.component";
import {Button, ButtonBase} from "@material-ui/core";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import Business from './components/Business/Business.component'
import ServiceInterest from "./components/ServicesInterest/ServicesInterest.component";
import {serviceGetCustomList} from "../../services/Common.service";
import {serviceGetLeadUserDetails, serviceUpdateLeadUserData} from "../../services/Lead.service";
import WaitingComponent from "../../components/Waiting.component";

let CreateProvider = null;

class Lead extends Component{
    constructor(props) {
        super(props);
        this.state = {
            is_demo: false,
            side_panel: false,
            lead_id: null,
            is_calling: true,
            users: null,
            vendors: null,
            service_countries: [],
            services_interested: []
        }
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleLeadId = this._handleLeadId.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleOnBoardForm = this._handleOnBoardForm.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const request = serviceGetCustomList(['COUNTRY', 'SERVICES'],{id:id});
        request.then((data)=> {
            if(!data.error){
                this.setState({
                    service_countries: data.data.countries,
                    services_interested: data.data.services,
                });
            }
        });

        const req = serviceGetLeadUserDetails({lead_id:id});
        req.then((data) => {
            if(!data.error) {
                this.setState({
                    users: data.data.user,
                    vendors: data.data.vendor,
                    is_calling: false
                })
            }
        })

        const {actionGetLeadDetails, actionGetLeadNotes, actionGetLeadRequests} = this.props;
        actionGetLeadDetails(id);
        actionGetLeadNotes(id);
        actionGetLeadRequests(id);
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleLeadId(id){
        this.setState({
            lead_id: id
        })
    }

    _handleDataSave(data, type) {
        const { id } = this.props.match.params;
        const req = serviceUpdateLeadUserData(data);
        req.then((data) => {
            if(!data.error) {
                this.setState({
                    users: data.data.user,
                    vendors: data.data.vendor
                })
                this.props.actionUpdateLeadFormData(data.data.user)
            }
        })
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _renderCreateForm() {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            CreateProvider = require('./components/LeadProfiling/LeadProfiling.component').default;
        }
        if (this.state.side_panel) {
            const {service_countries,services_interested,users,vendors} = this.state;
            const { id } = this.props.match.params;
            return (<CreateProvider
                service_countries={service_countries}
                services_interested={services_interested}
                handleDataSave={this._handleDataSave}
                users={users}
                vendors={vendors}
                lead_id={id}
                // listData={this.state.listData}
                data={this.props.lead_detail}
                // handleDelete={this._handleDelete}
            ></CreateProvider>);
        }
        return null;
    }

    _handleOnBoardForm(){
        const { id } = this.props.match.params;
        history.push('/on/board/' + id)
    }

    render() {
        const {is_demo,lead_id,vendors,is_calling} = this.state;
        console.log(vendors)
        if (is_calling) {
            return (<WaitingComponent/>);
        }
        return(
            <div>
                <div className={styles.updateFlex}>
                    <ButtonBase onClick={() => (history.goBack())}>
                        <ArrowBackIosIcon fontSize={'small'} className={styles.backArrow}/>
                    </ButtonBase>

                    <div>
                        <Button variant={'contained'} color={'primary'} onClick={this._handleSideToggle}>Update Information</Button>
                        <Button variant={'contained'} color={'secondary'}
                                disabled={vendors.is_on_board == true}
                                onClick={this._handleOnBoardForm}
                                className={styles.boarding}>On-Board</Button>
                    </div>
                </div>


                <div className={styles.upperFlex}>
                    <div className={styles.left}>
                        <LeadDetail/>

                        <Business data={this.state.vendors}/>

                        <ServiceInterest data={this.state.vendors}/>
                    </div>


                    <div className={styles.right}>
                        <LeadRequestList handleLeadId={this._handleLeadId}/>
                    </div>
                </div>

               <div>
                   <LeadNoteList requestLeadId={lead_id}/>
               </div>

                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'Update Information'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>

            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        lead_detail: state.lead.lead_detail,
        is_lead_detail: state.lead.is_lead_detail,
        lead_requests: state.lead.lead_requests,
        is_lead_requests: state.lead.lead_requests,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionGetLeadDetails: actionGetLeadDetails,
        actionGetLeadNotes: actionGetLeadNotes,
        actionGetLeadRequests: actionGetLeadRequests,
        actionUpdateLeadFormData: actionUpdateLeadFormData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
