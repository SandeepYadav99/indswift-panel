import React, {Component} from 'react';
import styles from './Style.module.css'
import {Add, AddCircle} from "@material-ui/icons";
import {Button, ButtonBase, FormControl, IconButton, InputLabel, MenuItem} from "@material-ui/core";
import NoteDialog from "../Note/NoteDialog.view";
import {Field, reduxForm} from "redux-form";
import {renderOutlinedSelectField} from "../../../../libs/redux-material.utils";
import Select from "@material-ui/core/Select";
import {bindActionCreators} from "redux";
import {
    actionChangeLeadPriority,
    actionChangeLeadRequestStatus,
    actionChangeLeadStatus
} from "../../../../actions/Lead.action";
import {connect} from "react-redux";
import constants from "../../../../config/constants";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class LeadRequest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            note: false,
            status: 'RESOLVED',
            show_confirm: false,
            user_value: ''
        }
        this._handleNote = this._handleNote.bind(this);
        this._handleStatusChange = this._handleStatusChange.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this)
    }

    _handleNote(lead_id){
        // console.log(lead_id)
        this.props.handleLeadId(lead_id)
        this.setState({
            note: !this.state.note
        })
    }

    _handleStatusChange(e){
        const {actionChangeLeadRequestStatus, data} = this.props;
        this.setState({
            show_confirm: true,
            user_value: e.target.value,
        })
        // actionChangeLeadRequestStatus(data.request_id, e.target.value);
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }

    _suspendItem() {
        const {user_value} = this.state
        const {actionChangeLeadRequestStatus, data} = this.props;
        actionChangeLeadRequestStatus(data.request_id, user_value);
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

    _renderStatusButton() {
        const { data } = this.props;
        return (
            <div className={'priority'}>
                <FormControl variant={'outlined'} margin={'dense'} className={styles.selectWidth}>
                    <InputLabel id="demo-customized-select-label">Status</InputLabel>
                    <Select
                        value={data.status}
                        onChange={this._handleStatusChange}>
                        {Object.keys(constants.LEAD_REQUEST_STATUS).map(key => {
                            return (<MenuItem key={key} value={key}>{constants.LEAD_REQUEST_STATUS_TEXT[key]}</MenuItem>);
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    }

    render() {
        const {data,isDemo} = this.props;
        return(
            <div>
                <div className={styles.plain}>
                    <div>
                        <div className={styles.statusFlex}>
                            <div>
                                <div className={styles.heading}>Ref. Id</div>
                                <div className={styles.desc}>{data.lead_no}</div>
                            </div>

                            <div>
                                <div className={styles.heading}>Source</div>
                                <div className={styles.desc}>{constants.SOURCE[data.source]}</div>
                            </div>

                            <div className={styles.statusFlex}>
                                <div className={styles.statusBtn}>
                                    {this._renderStatusButton()}
                                </div>
                                <IconButton onClick={this._handleNote.bind(this,data._id)} className={'leadCircle'}>
                                    <AddCircle/>
                                </IconButton>
                            </div>

                            {/*    <div className={styles.demoStatus}>{constants.REQUEST_STATUS_TEXT[data.status]}</div>*/}
                            {/*}*/}
                        </div>

                        <div className={styles.ticketFlex}>
                            <div>
                                <div className={styles.heading}>Request Date</div>
                                <div className={styles.desc}>{data.createdAt}</div>
                            </div>


                            <div>
                                <div className={styles.heading}>Last Update</div>
                                <div className={styles.desc}>{data.updatedAt}</div>
                            </div>
                        </div>
                    </div>

                    <hr/>
                    {/*<div className={styles.heading}>Additional Information</div>*/}
                    <div className={styles.additionalFlex}>
                        <div>
                            <div className={styles.heading}>Business Name</div>
                            <div style={{textTransform:'capitalize'}}>{data.business_name ? data.business_name : 'N/A'}</div>
                        </div>
                        <div>
                            <div className={styles.heading}>Job Title</div>
                            <div style={{textTransform:'capitalize'}}>{data.job_title ? data.job_title : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.additionalFlex}>
                        <div>
                            <div className={styles.heading}>Website</div>
                            <div className={styles.desc}>{data.website ? <a href={data.website} target={'_blank'}>{data.website }</a> : 'N/A'}</div>
                        </div>
                        <div>
                            <div className={styles.heading}>Country</div>
                            <div style={{textTransform:'capitalize'}}>{data.country ? data.country : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.additionalFlex}>
                        <div>
                            <div className={styles.heading}>Service Countries</div>
                            <div style={{textTransform:'capitalize'}}>{data.service_countries.length > 0 ? data.service_countries.map(country => country).join(", ") : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.additionalFlex}>
                        <div>
                            <div className={styles.heading}>Industry</div>
                            <div className={styles.desc}>{data.business_type ? constants.INDUSTRY[data.business_type] : 'N/A'}</div>
                        </div>
                        <div>
                            <div className={styles.heading}>Average Monthly Orders</div>
                            <div>{data.avg_monthly_order ? data.avg_monthly_order : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.additionalFlex}>
                        <div>
                            <div className={styles.heading}>Services Interested In</div>
                            <div style={{textTransform:'capitalize'}}>{data.services_interested.length > 0 ? data.services_interested.map(country => country).join(", ") : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.additionalFlex}>
                        <div>
                            <div className={styles.heading}>Message</div>
                            <div className={styles.desc}>{data.message ? data.message : 'N/A'}</div>
                        </div>
                    </div>

                    <div className={styles.additionalFlex}>
                        <div>
                            <div className={styles.heading}>{data.name} [{data?.country_code ? data.country_code : ''} {data.contact}]</div>
                        </div>
                    </div>

                </div>
                {this.renderDialog()}
                <NoteDialog leadId={data.lead_id} open={this.state.note} requestLeadId={data._id} handleClose={this._handleNote}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionChangeLeadRequestStatus: actionChangeLeadRequestStatus,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LeadRequest);
