/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, MenuItem, withStyles, FormControlLabel, Switch, IconButton} from '@material-ui/core';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {
    renderTextField,
    renderSelectField,
    renderOutlinedTextField,
    renderOutlinedSelectField,
    renderFileField,
    renderOutlinedMultipleSelectField,
    renderCheckbox, renderCountryContact,
} from '../../../../libs/redux-material.utils';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import styles from "./Style.module.css";
import {Delete as DeleteIcon} from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import MuiStyle from "../../../../libs/MuiStyle";
import countries from '../../../../countries.json'
import constants from "../../../../config/constants";
import parsePhoneNumber from "libphonenumber-js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let requiredFields = []
const validate = (values) => {
    const errors = {};

    requiredFields.forEach(field => {
        if (!values[field] || (Array.isArray(values[field]) && (values[field]).length == 0)) {
            errors[field] = 'Required'
        } else if( values[field] && typeof values[field] == 'string' && !(values[field]).trim()) {
            errors[field] = 'Required'
        }
    });
    // if (values.name && !/^[A-Z ]*$/i.test(values.name)) {
    //     errors.name = 'Only alphabets are allowed';
    // }
    if (Array.isArray(values.service_countries) && values.service_countries.length === 0) {
        errors.service_countries = 'Required';
    }
    if (Array.isArray(values.services_interested) && values.services_interested.length === 0) {
        errors.services_interested = 'Required';
    }
    // if (values.url && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/igm.test(values.url)) {
    //     errors.url = 'Invalid URL'
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

let lastValue = '';
let isExists = false;

// const asyncValidate = (values, dispatch, props) => {
//     return new Promise((resolve, reject) => {
//         if (values.name) {
//             const value = values.name;
//             if (lastValue == value && isExists && false) {
//                 reject({name: 'Service Name already Taken'});
//             } else {
//                 const data = props.data;
//                 serviceServiceCheck({name: value, id: data ? data.id : null }).then((data) => {
//                     console.log(data);
//                     lastValue = value;
//                     if (!data.error) {
//                         if (data.data.is_exists) {
//                             reject({name: 'Service Name already Taken'});
//                         }
//                     }
//                     resolve({});
//                 })
//             }
//         } else {
//             resolve({});
//         }
//     });
// };


const nameNormalize = (value, prevValue) => {
    if ((value.length) > 50) {
        return prevValue
    } else {
        return value
        // ? value.toLowerCase() : value;
    }
}

const companyNormalize = (value, prevValue) => {
    if ((value.length) > 80) {
        return prevValue
    } else {
        return value
        // ? value.toLowerCase() : value;
    }
}

const inventoryNormalize = (value, prevValue) => {
    if (value > 10000000 ) {
        return prevValue
    } else {
        return value
        // ? value.toLowerCase() : value;
    }
}


class CreateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'INDIVIDUAL',
            is_active:true,
            show_confirm: false,
            subcategory: [],
            selectedIndustry: null
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleActive = this._handleActive.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
        this._handleTypeChange = this._handleTypeChange.bind(this);
    }

    componentDidMount() {
        const {users,vendors} = this.props;
        if (users || vendors) {
            // console.log(data)
            requiredFields=['name','contact','business_name']
            if (users) {
                Object.keys(users).forEach((val) => {
                    if (['name', 'email', 'country','user_type','job_title',].indexOf(val) >= 0) {
                        const temp = users[val];
                        this.props.change(val, temp);
                    }
                });
                this.props.change('contact', users.contact_string);
            }
            if (vendors) {
                Object.keys(vendors).forEach((val) => {
                    if (['business_name','website','address','vendor_industry','service_countries','services_interested','estimated_inventory','avg_monthly_order'].indexOf(val) >= 0) {
                        const temp = vendors[val];
                        this.props.change(val, temp);
                    }
                });
            }
        }
        else {
            requiredFields=[]
        }
    }

    _handleTypeChange(e) {
        this.changeIndustry(e.target.value);
    }


    _handleSubmit(tData) {
        const {users,vendors,lead_id} = this.props;
        const user_id = users._id
        const vendor_id = vendors._id

        this.props.handleDataSave({ ...tData,user_id:user_id, vendor_id:vendor_id, lead_id:lead_id});
    }

    _convertData(data) {
        const temp = {};
        data.forEach((val) => {
            temp[val.id] = val.name;
        });
        return temp;
    }

    // _handleReject() {
    //     const {data} = this.props;
    //     this.props.changeStatus(data, 'REJECT');
    // }

    _renderReject() {
        if (this.props.data) {
            return (<Button variant={'contained'}
                            className={this.props.classes.btnError}
                            onClick={this._handleReject}
                            type="button">
                Reject
            </Button>);
        }
        return null;
    }

    _renderMenuTypes(){
        return this.props.tour_types.map((val)=>{
            return (
                <MenuItem value={val.id}>{val.name}</MenuItem>
            )
        })
    }

    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }


    _renderStatus(){
        const {data} = this.props;
        // if (data) {
        return (<FormControlLabel
            control={
                <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                        value="is_active"/>
            }
            label="Active ?"
        />);
        // } else {
        //     return null;
        // }
    }

    _suspendItem() {
        const {data} = this.props;
        this.setState({
            show_confirm: false,
        });
        this.props.handleDelete(data.id);
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }


    _handleDelete() {
        this.setState({
            show_confirm: true
        });
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
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
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

    _renderIndustries(){
        const {industries} = this.props;
        return industries.map((val) => {
            return (<MenuItem value={val.id}>{val.name}</MenuItem>);
        });
    }

    render() {
        const {handleSubmit, data,service_countries,services_interested} = this.props;

        const {} = this.state
        return (
            <div>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                <div className={styles.headerFlex}>
                    <h4 className={styles.infoTitle}>
                        <div className={styles.leadFlex}>
                            <div className={styles.heading}>Lead Profiling</div>
                            <Button variant={'contained'} color={'primary'} type={'submit'}>
                                Save Changes
                            </Button>
                        </div>
                        {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
                        {/*    <InfoIcon fontSize={'small'}/>*/}
                        {/*</Tooltip>*/}

                    </h4>
                </div>



                    <div className={styles.emailFlex}>
                        <label className={styles.upperLabel}>Personal Info</label>
                        <div>
                            {data.user.email}
                        </div>
                    </div>

                    <div className={'formFlex'} style={{alignItems:'center'}}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="name" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   normalize={nameNormalize}
                                   label="Full Name"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="contact"
                                   type={'number'}
                                   component={renderCountryContact}
                                   margin={'dense'}
                                   label="Phone No"/>
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
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="user_type"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="User Type">
                                <MenuItem value={'NEW_LEAD'}>NEW LEAD</MenuItem>
                                <MenuItem value={'REPEAT_LEAD'}>REPEAT LEAD</MenuItem>
                                <MenuItem value={'VENDOR_TEAM'}>VENDOR TEAM</MenuItem>
                                <MenuItem value={'BLOCK'}>BLOCK</MenuItem>
                                <MenuItem value={'DUPLICATE'}>DUPLICATE</MenuItem>
                                <MenuItem value={'JUNK'}>JUNK</MenuItem>
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="job_title" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   normalize={nameNormalize}
                                   label="Job Title"/>
                        </div>
                    </div>


                    <label className={styles.upperLabel}>Business Info</label>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="business_name" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   normalize={companyNormalize}
                                   label="Company Name"/>
                        </div>
                    </div>

                    <div className="formFlex">
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   type={'text'} name="website"
                                   component={renderOutlinedTextField}
                                   margin={'dense'}
                                   label="Website"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="vendor_industry"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Industry">
                                {Object.keys(constants.INDUSTRY).map((key) => {
                                    return (<MenuItem key={key} value={key}>{constants.INDUSTRY[key]}</MenuItem>)
                                })}
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="address" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   normalize={nameNormalize}
                                   label="Address"/>
                        </div>
                    </div>

                    <label className={styles.upperLabel}>Service Interest</label>
                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                inputId={'service_countries'}
                                fullWidth={true}
                                name="service_countries"
                                //errorText={'Required'}
                                dataObj={this._convertData(service_countries)}
                                extract={{value: 'id', title: 'name'}}
                                data={service_countries}
                                component={renderOutlinedMultipleSelectField} margin={'dense'} label="Service Countries">
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                inputId={'service_interested'}
                                fullWidth={true}
                                name="services_interested"
                                //errorText={'Required'}
                                dataObj={this._convertData(services_interested)}
                                extract={{value: 'id', title: 'name'}}
                                data={services_interested}
                                component={renderOutlinedMultipleSelectField} margin={'dense'} label="Services Interested">
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="estimated_inventory"
                                   component={renderOutlinedTextField}
                                   margin={'dense'}
                                   type={'number'}
                                   normalize={inventoryNormalize}
                                   label="Estimated Inventory"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="avg_monthly_order" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   type={'number'}
                                   normalize={inventoryNormalize}
                                   label="Estimated Monthly Order"/>
                        </div>
                    </div>


                    <div className={styles.submitBtn}>
                        <Button variant={'contained'} color={'primary'} type={'submit'} style={{width:'100%'}}>
                            Save Changes
                        </Button>
                    </div>

                </form>
                {this._renderDialog()}
            </div>
        )
    }

}

const useStyle = MuiStyle;


const ReduxForm = reduxForm({
    form: 'lead_profile',  // a unique identifier for this form
    validate,
    // asyncValidate,
    // asyncBlurField: ['email'],
    // enableReinitialize: true,
    // onSubmitFail: errors => {
    //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, 'Rejected');
    // }
})(withStyles(useStyle, {withTheme: true})(CreateContainer));

const mapStateToProps = state => {
    //console.log(user_profile);
    return {}
};

export default connect(mapStateToProps, null)(ReduxForm);
