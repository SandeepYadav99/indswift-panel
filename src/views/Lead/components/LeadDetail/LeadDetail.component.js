import React, {Component} from 'react';
import styles from './Style.module.css';
import {Button, FormControl, InputLabel, MenuItem} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionChangeLeadPriority, actionChangeLeadStatus} from "../../../../actions/Lead.action";
import WaitingComponent from "../../../../components/Waiting.component";
import constants from "../../../../config/constants";
import LeadAssignedUser from "../AssignedDialog/LeadAssignedUser.component";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class LeadDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: 'HIGH',
            status: 'RESOLVED',
            open: false,
            show_confirm: false,
            user_value: '',
            type: ''
        }
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handlePriorityChange = this._handlePriorityChange.bind(this);
        this._handleStatusChange = this._handleStatusChange.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this)
    }

    _handlePriorityChange(e,type) {
        this.setState({
            show_confirm: true,
            user_value: e.target.value,
            type: type
        })
        const {actionChangeLeadPriority, lead_detail: data} = this.props;
        // actionChangeLeadPriority(data.lead_id, e.target.value);
    }

    _handleStatusChange(e) {
        const {actionChangeLeadStatus, lead_detail: data} = this.props;
        // actionChangeLeadStatus(data.lead_id, e.target.value);
    }

    _handleSubmit(data) {

    }

    _handleClose() {
        this.setState({
            open: !this.state.open
        });
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }

    _suspendItem(){
        const {user_value,type} = this.state;
        const {lead_detail: data} = this.props;
       if(type == 'PRIORITY') {
           this.props.actionChangeLeadPriority(data.lead_id, user_value);
       } else {
           this.props.actionChangeLeadStatus(data.lead_id, user_value);
       }
        this.setState({
            show_confirm: false,
        })
    }

    renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to change value ?
                        <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this._suspendItem} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>)
        } return null;
    }

    render() {
        const {is_lead_detail, lead_detail: data,isDemo} = this.props;
        if (is_lead_detail || data === null) {
            return (<WaitingComponent/>)
        }
        return (
            <div>
                <div className={styles.plain}>
                    <div className={styles.request}>Personal Profile</div>
                    <div className={styles.newFlex}>
                        <div>
                            <img src={data.user.image ? data.user.image : require('../../../../assets/img/profile.png')} alt="" className={styles.profile}/>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>{data.user.name}</div>
                            <div className={styles.mobileFlex}>
                                {/*<img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>*/}
                                <div className={styles.mob}>{data.user.job_title}</div>
                            </div>
                            <div className={styles.mobileFlex}>
                                {/*<img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>*/}
                                <div className={styles.mob}>{data.user.contact_string}</div>
                            </div>
                            <div className={styles.mobs}>{data.user.email}</div>
                            <div className={styles.mob}>{data.user.country ? data.user.country : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.cases}>
                        <div className={styles.prev}>
                            <div>Created On</div>
                            <div>{data.created_at}</div>
                        </div>
                        <div className={styles.type}>{constants.USER_TYPE[data.user.user_type]}</div>
                    </div>

                   <div>
                        <LeadAssignedUser leadId={data.lead_id}/>

                        <div className={'priority'}>
                            <FormControl variant={'outlined'} margin={'dense'} className={styles.selectWidth}>
                                <InputLabel id="demo-customized-select-label">Priority</InputLabel>
                                <Select
                                     value={data.priority}
                                        onChange={(e) => this._handlePriorityChange(e,'PRIORITY')}>
                                    {Object.keys(constants.PRIORITY).map(key => {
                                        return (<MenuItem key={key} value={key}>{key}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </div>

                        <div className={'priority'}>
                            <FormControl variant={'outlined'} margin={'dense'} className={styles.selectWidth}>
                                <InputLabel id="demo-customized-select-label">Status</InputLabel>
                                <Select
                                    value={data.status}
                                    onChange={(e) => this._handlePriorityChange(e,'STATUS')}>
                                    {Object.keys(constants.LEAD_STATUS).map(key => {
                                        return (
                                            <MenuItem key={key} value={key}>{constants.LEAD_STATUS_TEXT[key]}</MenuItem>);
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                {this.renderDialog()}
            </div>
        )
    }
}

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
        actionChangeLeadStatus: actionChangeLeadStatus,
        actionChangeLeadPriority: actionChangeLeadPriority,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LeadDetailComponent)
