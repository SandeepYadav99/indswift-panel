import React, {Component} from 'react';
import styles from './Style.module.css'
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonBase, MenuItem} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import {
    renderCheckbox,
    renderOutlinedPasswordField,
    renderOutlinedSelectField,
    renderOutlinedTextField
} from "../../../../../libs/redux-material.utils";


const validate = (values) => {
    const errors = {};
    const requiredFields = ['email','password'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors;
};


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class EmailDialog extends Component{
    constructor(props){
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidMount() {
         this.props.change('email',this.props.user.email)
    }

    _handleSubmit(data){
        this.props.handlePassword(data);
        this.props.handleClose();
        // this.props.change('password', '');
    }


    _renderReasons(){
        const {handleSubmit, lead_requests} = this.props;
        return(
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div className={'formGroup'}>
                        <Field fullWidth={true}
                               type={'email'}
                               name="email"
                               disabled={true}
                               component={renderOutlinedTextField}
                               margin={'dense'}
                               label="Email"/>
                    </div>

                    <div className={'formGroup'}>
                        <Field fullWidth={true}
                               name="password"
                               component={renderOutlinedPasswordField}
                               label="Password*"/>
                    </div>

                    <div className={'smallCheckbox'}>
                        <div className={'formGroup'}>
                            <Field
                                name="share_credentials"
                                component={renderCheckbox}
                                label={"Send access credentials on email to client directly"}
                            />
                        </div>
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
        const { data,user_details } = this.props;
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth={true}
                    // maxWidth={'sm'}
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    {this._renderReasons()}
                </Dialog>
            </div>

        )
    }
}

const email = reduxForm({
    form:'email',
    validate
})(EmailDialog);

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(email)
