import React, {Component} from 'react';
import styles from './Style.module.css'
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonBase, MenuItem} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import {renderOutlinedSelectField,renderOutlinedTextField} from "../../../../libs/redux-material.utils";
import {actionAddLeadNote} from "../../../../actions/Lead.action";

const validate = (values) => {
    const errors = {};
    const requiredFields = ['event_type','note'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors;
};


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class NoteDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            lead_no: null
        }
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.open != this.props.open) {
            if (this.props.requestLeadId) {
                console.log('seeting default value');
                this.props.change('ref_id', this.props.requestLeadId);
            } else {
                this.props.change('ref_id', '');
            }
        }
    }


    _handleSubmit(data){
        const {lead_no} = this.state;
        // console.log(lead_no)
        const {actionAddLeadNote, leadId, handleClose} = this.props;
          actionAddLeadNote(leadId, data,);
        handleClose();
        this.props.reset();
    }

    _handleChange(lead_no){
       // this.setState({
       //     lead_no: lead_no
       // })
    }

    _renderReferenceId(){
        const {requestLeadId,open,lead_requests,leadId} = this.props;
        console.log('requestLeadID', requestLeadId);
        console.log('lead_Request', lead_requests);
            return (
                <Field
                    fullWidth={true}
                    name="ref_id"
                    component={renderOutlinedSelectField}
                    margin={"dense"}
                    disabled={requestLeadId ? true : false}
                    label={"Reference Id"}>
                    {/*<MenuItem value={requestLeadId}>{requestLeadId}</MenuItem>*/}
                    <MenuItem value={'General'}>General</MenuItem>
                    {lead_requests.map((val) => {
                        return (<MenuItem value={val.request_id}>{val.lead_no}</MenuItem>)
                    })}
                </Field>
            )
    }

    _renderReasons() {
        const {handleSubmit, lead_requests, requestLeadId, open} = this.props;


        return (
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div>
                        <Field
                            fullWidth={true}
                            name="event_type"
                            component={renderOutlinedSelectField}
                            margin={"dense"}
                            label={"Event"}>

                            <MenuItem value={'CALL_LOG'}>Call Log</MenuItem>
                            <MenuItem value={'EMAIL'}>Email</MenuItem>
                            <MenuItem value={'INTERNAL'}>Internal</MenuItem>
                        </Field>
                    </div>
                    <div>
                        <Field fullWidth={true}
                               name="note"
                               component={renderOutlinedTextField}
                               label={"Note"}
                               multiline
                               rows="5"
                               margin={'dense'}
                        />
                    </div>

                    <div>
                        {this._renderReferenceId()}
                    </div>
                    <br/>
                    <div className={styles.submitBtn}>
                        <Button className={'sub'} variant={'contained'} color={'primary'} type={'submit'}>
                            Save & Submit
                        </Button>
                    </div>
                </form>
            </div>
        )
    }



    render(){
        const { data,user_details, open, requestLeadId } = this.props;
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth={true}
                    // maxWidth={'sm'}
                    onClose={() => {
                        this.props.handleClose();
                        this.props.reset();
                    }}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    {this._renderReasons()}
                </Dialog>
            </div>

        )
    }
}

const note = reduxForm({
    form:'note',
    validate
})(NoteDialog);

function mapStateToProps(state) {
    return {
        lead_requests: state.lead.lead_requests
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionAddLeadNote: actionAddLeadNote
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(note)
