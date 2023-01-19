/**
 * Created by charnjeetelectrovese@gmail.com on 12/13/2018.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames'
import styles from './Forgot.module.css';
import {renderOutlinedTextField, renderTextField} from '../../libs/redux-material.utils';
import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import {Button, withStyles,ButtonBase} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons'
import {serviceForgotPassword } from "../../services/index.services";
import DashboardSnackbar from "../../components/Snackbar.component";
import { Link } from 'react-router-dom';

import EventEmitter from "../../libs/Events.utils";
import {updateTitle} from "../../libs/general.utils";

const validate = (values) => {
    const errors = {}
    const requiredFields = ['emp_id'];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const useStyles = {
    btnColor: {
        backgroundColor: 'white',
        marginTop: '20px',
        paddingLeft: '20px',
        color:'#2196F3',
        marginRight:'15px',
        paddingRight: '20px',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    btnBottom: {
        backgroundColor: 'white',
        paddingLeft: '20px',
        color:'#2196F3',
        marginRight:'10px',
        marginLeft:'15px',
        paddingRight: '20px',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    dialog: {
        padding: '10px 25px'
    }
};


class ForgotPasswordView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: false,
            open: false,
            is_sent: false,
            is_calling: false
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleLoginClick = this._handleLoginClick.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._handleReturn = this._handleReturn.bind(this);
        this._handleBack = this._handleBack.bind(this)
        this._handleforgetHelp=this._handleforgetHelp.bind(this)
    }

    async componentDidMount() {
        updateTitle('Forgot Password');
    }


    _handleLoginClick() {
        this.props.history.push('/login');
    }

    _handleBack() {
        this.props.history.goBack();
    }

    _handleSubmit(data) {
        if (!this.state.is_calling) {
            this.setState({
                is_calling: true,
            });
            serviceForgotPassword(data).then((val) => {
                if (!val.error) {
                    EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
                        error: 'Password Reset Email Sent',
                        type: 'success'
                    });
                    this.setState({
                        is_sent: true,
                        is_calling: false,
                    });
                } else {
                    this.setState({
                        is_calling: false,
                    })
                    EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Invalid Email Address', type: 'error'});
                }
            });
        }
    }

    _handleClose(){
        this.setState({
            open: !this.state.open
        })
    }

    _handleReturn() {
        this.props.history.push('/login');
    }
    _handleforgetHelp() {
        this.props.history.push('/forget/help');
    }


    _renderForm() {
        const {handleSubmit} = this.props;
        const { is_sent } = this.state;
        if (is_sent) {
            return (
                <>
                    <div></div>
                    <div className={styles.signContainer}>
                        <div>
                            <div className={styles.loginSignupText} style={{fontWeight:'700',fontSize:'24px'}}>Reset Email Sent.</div>
                            <p className={styles.bottomLine} style={{ lineHeight: '18px' }}>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
                            <div>
                                <br/>
                                <ButtonBase className={styles.login} onClick={this._handleReturn}>
                                    Return to sign in
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </>
            )
        } else {
            return (
                <>
                    <div></div>
                    <div className={styles.signContainer}>
                        <div className={styles.logoImg}>
                            <img src={require('../../assets/img/login logo@2x.png')} className={styles.sky}/>
                        </div>
                        <form onSubmit={handleSubmit(this._handleSubmit)}>
                            <div className={styles.loginSignupText}>
                                <h1 className={styles.headingText}>Forgot Password</h1>
                                <div className={styles.newLine}/>
                            </div>
                            <p className={styles.bottomLine}>
                                Enter your Employee ID and we will send the reset link to your registered email id.</p>
                            <div>
                                <br/>
                                <div>
                                    <Field fullWidth={true}
                                           margin={'dense'}
                                           name="emp_id"
                                           component={renderOutlinedTextField}
                                           label="Employee ID"/>
                                </div>
                                <span className={styles.bottomSignup}><ButtonBase onClick={this._handleBack}
                                                                                  className={styles.back}>Resend Link</ButtonBase></span>
                                {/*<span style={{float:'right',marginTop:'5px'}}><Link to='/login'>Back To Login</Link></span>*/}
                                <br/>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <ButtonBase disabled={this.state.is_calling} variant={'contained'} type="submit"
                                            className={styles.login}>
                                        {this.state.is_calling ? (
                                            <div style={{padding: '5px 20px', display: 'flex'}}><CircularProgress
                                                size={'18px'} color={'primary'}/></div>) : 'Send Link'}
                                    </ButtonBase>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',color:'#2896e9',fontSize:'14px',cursor:'pointer'}}>
                                            <p onClick={this._handleforgetHelp}>Need Help with Password? Contact Admin</p>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div></div>
                </>
            );
        }
    }

    render() {
        const {handleSubmit,classes} = this.props;
        return (
            <div className={styles.mainLoginView}>
                <div className={styles.loginFlex1}>
                    <div className={styles.heading}>
                       Human Resourse Management  <br/>
                        Made Easy
                    </div>
                    <p>A powerful software to cater all HR needs.</p>

                </div>
                <div className={styles.loginFlex2}>
                    {this._renderForm()}
                </div>
                <DashboardSnackbar/>
            </div>
        );
    }
}

ForgotPasswordView = reduxForm({
    form: 'LoginPage',  // a unique identifier for this form
    validate,
    onSubmitFail: errors => {
        if (errors) {
            const tempErrors = Object.keys(errors);
            if (tempErrors.length > 1) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please Enter Required Parameters', type: 'error' });
            } else if (tempErrors.length == 1) {
                console.log(errors[tempErrors[0]])
                const temp = errors[tempErrors[0]];
                // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: temp, type: 'error' });
            } else {

            }
        } else {

        }
    }
})(ForgotPasswordView);

function mapDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}


export  default  connect(null, mapDispatchToProps)(withStyles(useStyles)(ForgotPasswordView));
