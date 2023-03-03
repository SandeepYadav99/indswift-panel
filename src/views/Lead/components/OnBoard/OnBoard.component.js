import React, {Component} from 'react';
import {Button, MenuItem, withStyles, FormControlLabel, Switch, IconButton, ButtonBase} from '@material-ui/core';
import styles from './Style.module.css';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {
    renderTextField,
    renderSelectField,
    renderOutlinedTextField,
    renderOutlinedSelectField,
    renderFileField,
    renderOutlinedMultipleSelectField, renderCountryContact, renderCheckbox
} from '../../../../libs/redux-material.utils';
import EventEmitter from "../../../../libs/Events.utils";
import WaitingComponent from '../../../../components/Waiting.component';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import {bindActionCreators} from "redux";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from '../../../../libs/history.utils'
import countries from "../../../../countries.json";
import BusinessForm from "./components/BusinessForm";
import AccountsForm from "./components/AccountsForm";
import IncludeForm from './components/includes/Includes.component';
import AdditionalForm from "./components/AdditionalForm";
import LeadAssignedUser from "../AssignedDialog/LeadAssignedUser.component";
import EmailDialog from "./components/EmailDialog";
import parsePhoneNumber from "libphonenumber-js";
import ResetPasswordDialog from "../../../ForgotPassword/ResetPassword.view";
import {serviceGetLeadUserDetails, serviceOnboardVendorData} from "../../../../services/Lead.service";
import {actionGetLeadDetails} from "../../../../actions/Lead.action";
import classnames from "classnames";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let requiredFields = [];
const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field] || values[field] == ' ') {
            errors[field] = 'Required'
        } else if (values[field] && typeof values[field] == 'string' && !(values[field]).trim()) {
            errors[field] = 'Required'
        }
    });
    // if (values.name && !/^[A-Z &]*$/i.test(values.name)) {
    //     errors.name = 'Only alphabets are allowed';
    // }
    if (values.website && !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/igm.test(values.website)) {
        errors.website = 'URL should start with http/https'
    }
    if (values.contact) {
        const phoneNumber = parsePhoneNumber(values.contact)
        // console.log('phoneNumber', phoneNumber, (phoneNumber && phoneNumber.isValid()));
        if (phoneNumber) {
            if (phoneNumber.isValid() === false) {
                errors.contact = 'Invalid Number';
            }
        } else {
            errors.contact = 'Invalid Number';
        }
    }
    return errors
};

const nameNormalize = (value, prevValue) => {
    if ((value.length) > 50) {
        return prevValue
    } else {
        return value
        // ? value.toLowerCase() : value;
    }
}

const negativeNormalize = (value, prevValue) => {
    if (value < 0 || value.length > 7) {
        return prevValue
    } return value;
};

class OnBoard extends Component {
    constructor(props) {
        super(props);
        this.serviceVariant = null;
        this.state = {
            variants: null,
            open: false,
            users: null,
            vendors: null,
            isLoading: true,
            show_customer: false,
            pwd: '',
            share_credentials: false,
            isCalling: false,
            is_checked: false,
        };
        this.submitBtn = null;
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handlePassword = this._handlePassword.bind(this)
        this._handleTerms = this._handleTerms.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        const { id } = this.props.match.params;
        this.props.actionGetLeadDetails(id);
        const req = serviceGetLeadUserDetails({lead_id:id});
        req.then((data) => {
            if(!data.error) {
                const { user, vendor } = data.data;
                if (user || vendor) {
                    requiredFields=['name','job_title','contact','business_name','website','vendor_industry','billing_address',
                        'billing_country','billing_state','billing_city','account_number','currency_id','tax_treatment','opening_balance_debit','opening_balance_credit']//'user_image','business_logo'
                    if (user) {
                        Object.keys(user).forEach((val) => {
                            if (['name', 'country','job_title',].indexOf(val) >= 0) {
                                const temp = user[val];
                                this.props.change(val, temp);
                            }
                        });
                        this.props.change('contact', user.contact_string);
                    }
                    if (vendor) {
                        Object.keys(vendor).forEach((val) => {
                            if (['business_name','website','vendor_industry',].indexOf(val) >= 0) {
                                const temp = vendor[val];
                                this.props.change(val, temp);
                            }
                        });
                    }
                } else {
                    requiredFields = ['name','notes'];
                }
                this.setState({
                    users: data.data.user,
                    vendors: data.data.vendor,
                    isLoading: false
                })
            } else {

            }
        })
        this.props.change('opening_balance_date', new Date());
    }

    _handleSubmit(tData) {
        const { id } = this.props.match.params;
        const {lead_detail} = this.props;
        console.log(lead_detail)
        const {users,vendors,show_customer,pwd,share_credentials, isCalling} = this.state;
        const user_id = users._id
        const vendor_id = vendors._id
        if (!this.serviceVariant.isValid()) {
            EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please Enter Services And Countries',type:'error'});
            return true;
        } else if (show_customer && pwd == ''){
            EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please Enter Password',type:'error'});
            return true;
        } else if (lead_detail.assigned_to == null) {
            EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please Assign the lead to manager',type:'error'});
            return true;
        }
        console.log(tData)
       if(!isCalling) {
           this.setState({
               isCalling: true,
           });
           const fd = new FormData();
           Object.keys(tData).forEach((key) => {
               fd.append(key, tData[key]);
           });
           fd.append('user_id',user_id);
           fd.append('vendor_id', vendor_id);
           fd.append('lead_id', id)
           fd.append('account_manager',lead_detail.assigned_to)
           if (this.serviceVariant) {
               fd.append('services', JSON.stringify(this.serviceVariant.getState()));
           }
           if(show_customer){
               fd.append('password', pwd);
               fd.append('share_credentials', share_credentials);
           } else {
               fd.append('skip_email', false)
           }

           const req = serviceOnboardVendorData(fd);
           req.then((data) => {
               if(!data.error) {
                   this.setState({
                       users: data.data.user,
                       vendors: data.data.vendor
                   })
                   history.push('/lead')
               }
               this.setState({
                   isCalling: false,
               });
           })
       }

    }

    _handlePassword(data){
        this.setState({
            pwd: data.password,
            share_credentials: data.share_credentials == true ? true : false
        }, () => {
            if (this.submitBtn) {
                this.submitBtn.click();
            }
        });
    }

    _handleClose() {
        this.setState({open: !this.state.open});
    }

    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
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
        }
        return null;
    }

    _handleChange(e) {
        this.setState({
            show_customer: !this.state.show_customer
        },() => {
            if(this.state.show_customer) {
                this.setState({
                    open: !this.state.open,
                })
            }
        });
    }

    _handleTerms(){
        this.setState({
            is_checked: !this.state.is_checked
        })
    }

    render() {
        const { id } = this.props.match.params;
        const {handleSubmit, data,classes} = this.props;
        const {isLoading,variants,show_customer,users,isCalling,is_checked} = this.state;
        // console.log(show_customer)

        if (isLoading) {
            return (<WaitingComponent/>);
        }
        return (
            <div>
                <div className={styles.plainPaper}>

                    <div className={styles.outerFlex}>
                        <ButtonBase onClick={() => (history.goBack())}>
                            <ArrowBackIosIcon fontSize={'medium'}/>
                        </ButtonBase>

                        <Button variant={'contained'} color={'primary'}>
                            Save as Draft
                        </Button>
                    </div>

                    <div className={styles.onboardFlex}>
                        <div>
                            <h5 className={styles.boardTxt}>Onboard Customer</h5>
                            <div className={styles.confirmTxt}>Confirm the details to on-board customer and provide access <br/> to platform</div>
                        </div>

                        <div className={styles.leadDialog}>
                            <LeadAssignedUser leadId={id}/>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(this._handleSubmit)}>
                        <div className={styles.plainPaper}>
                            <div className={styles.userFlex}>
                                <h5 style={{marginTop: '0px'}}>Personal Profile</h5>
                                <h5  style={{marginTop: '0px'}}>{users.email}</h5>
                            </div>
                            <div className={'formFlex'} style={{alignItems: 'center'}}>
                                <div>
                                    <Field
                                        max_size={2 * 1024 * 1024}
                                        type={['jpg', 'png', 'jpeg']}
                                        fullWidth={true}
                                        name="user_image"
                                        component={renderFileField}
                                        circular={true}
                                        default_image={data ? data.user_image : ''}
                                        link={data ? data.user_image : ''}
                                    />
                                </div>

                                <div style={{flex: 1}}>
                                    <div className={'formFlex'}>
                                        <div className={'formGroup'}>
                                            <Field fullWidth={true} name="name" component={renderOutlinedTextField}
                                                   margin={'dense'}
                                                   normalize={nameNormalize}
                                                // normalize={titleNormalize}
                                                   label="Contact Person Name"/>
                                        </div>
                                        <div className={'formGroup'}>
                                            <Field fullWidth={true} name="job_title" component={renderOutlinedTextField}
                                                   margin={'dense'}
                                                   normalize={nameNormalize}
                                                   label="Job Title"/>
                                        </div>
                                    </div>
                                    <div className={'formFlex'}>
                                        <div className={'formGroup'}>
                                            <Field fullWidth={true}
                                                   name="country"
                                                   component={renderOutlinedSelectField}
                                                   margin={'dense'}
                                                   label="Country">
                                                {countries.map(val => {
                                                    return <MenuItem value={val.name}>{val.name}</MenuItem>
                                                })}
                                            </Field>
                                        </div>
                                        <div className={'formGroup'}>
                                            <Field fullWidth={true}
                                                   name="contact"
                                                   type={'number'}
                                                   component={renderCountryContact}
                                                   margin={'dense'}
                                                   label="Phone No"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <BusinessForm/>

                        <AccountsForm negativeNormalize={negativeNormalize}/>


                        <IncludeForm
                            data={variants}
                            ref={(ref) => {
                                this.serviceVariant = ref
                            }}></IncludeForm>


                        <AdditionalForm/>


                        <div className={'smallCheckbox'}>
                                <div className={'formGroup'}>
                                    <Field
                                        name="skip_email"
                                        // checked={this.state.open}
                                        component={renderCheckbox}
                                        onChange={this._handleChange}
                                        label={"Skip sending email to customer, directly set password and share with customer "}
                                    />
                                </div>
                        </div>

                        <div className={'smallCheckbox'}>
                                <div className={'formGroup'}>
                                    <Field
                                        name="share_email"
                                        component={renderCheckbox}
                                        onChange={this._handleTerms}
                                        label={"Above information is verified. Share the on-boarding email to the customer on primary email"}
                                    />
                                </div>
                        </div>

                        <div>
                            <ButtonBase disabled={isCalling || !is_checked}
                                        className={classnames((isCalling ? '' :styles.btmBtn),(!is_checked ? styles.disabled : ''))}
                                        type={'submit'} ref={input => this.submitBtn = input}>
                                {isCalling ? (<WaitingComponent/>) : 'On-Board Customer'}
                            </ButtonBase>
                        </div>
                    </form>
                </div>
                <EmailDialog open={this.state.open} user={users} handleClose={this._handleClose} handlePassword={this._handlePassword}/>
            </div>
        )
    }
}

const useStyle = theme => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            color: 'white',
            backgroundColor: 'red',
        }
    },
    colorButton: {
        color: 'white',
        backgroundColor: '#F7A728',
        padding: '15px 70px',
        // minWidth: '185px',
        // borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        '&:hover': {
            color: 'white',
            backgroundColor: '#F7A728',
        }
    },
});


const ReduxForm = reduxForm({
    form: 'on_board',  // a unique identifier for this form
    validate,
    enableReinitialize: true,
    // onSubmitFail: errors => {
    //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
    // }
})(withStyles(useStyle, {withTheme: true})(OnBoard));


function mapStateToProps(state) {
    return {
        lead_detail: state.lead.lead_detail,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionGetLeadDetails: actionGetLeadDetails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);
