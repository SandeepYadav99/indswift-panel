/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, MenuItem, withStyles} from '@material-ui/core';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {
    renderTextField,
    renderSelectField,
    renderOutlinedTextField,
    renderOutlinedSelectField,
    renderFileField,
    renderOutlinedMultipleSelectField, renderAutoComplete
} from '../../libs/redux-material.utils';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {serviceCheckCountry} from "../../services/Countries.service";
import styles from "./styles.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

let requiredFields = [];
const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        } else if( values[field] && typeof values[field] == 'string' && !(values[field]).trim()) {
            errors[field] = 'Required'
        }
    });
    if (values.name && !/^[A-Z ]*$/i.test(values.name)) {
        errors.name = 'Only alphabets are allowed';
    }
    // if (values.country_shortcode && !/^[A-Z ]*$/i.test(values.country_shortcode)) {
    //     errors.country_shortcode = 'Only alphabets are allowed';
    // }

    return errors
};



let lastValue = '';
let isExists = false;

const asyncValidate = (values, dispatch, props) => {
    return new Promise((resolve, reject) => {
        if (values.name) {
            const value = values.name;
            if (lastValue == value && isExists) {
                reject({name: 'Country Already Registered'});
            } else {
                const data = props.data;
                serviceCheckCountry({name: value, id: data ? data.id : null }).then((data) => {
                    console.log(data);
                    lastValue = value;
                    if (!data.error) {
                        if (data.data.exists) {
                            reject({name: 'Country Already Registered'});
                        }
                    }
                    resolve({});
                })
            }
        } else {
            resolve({});
        }
    });
};


const percentageNormalize = (value, prevValue) => {
    if (parseFloat(value) > 100) {
        return prevValue
    } else {
        return value;
    }
}

const nameNormalize = (value, prevValue) => {
    // return value ? value.toLowerCase() : value;
    if ((value.length) > 25) {
        return prevValue
    } else {
        return value;
    }
}

const shortCode = (value, prevValue) => {
    // return value ? value.toLowerCase() : value;
    if ((value.length) > 6) {
        return prevValue
    } else {
        return value;
    }
}

const negativeNormalize = (value, prevValue) => {
    if (value < 0 || value.length > 5) {
        return prevValue
    } return value;
};

class CreateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'INDIVIDUAL',
            is_active: false,
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleActive = this._handleActive.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            requiredFields = ['name', 'country_shortcode'];
            Object.keys(data).forEach((val) => {
                if (['image', 'status'].indexOf(val) == -1) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            this.setState({
                is_active: data.status == 'ACTIVE'
            })
        } else {
            requiredFields = ['name', 'region_shortcode'];
            // this.props.change('type', 'INDIVIDUAL');
        }
    }

    // _handleTypeChange(e) {
    //     this.setState({
    //         type: e.target.value
    //     });
    // }

    _handleSubmit(tData) {
        console.log(tData)
        const fd = new FormData();
        const { country_id } = this.props;
        if (country_id) {
            fd.append('country_id', country_id);
        }
        Object.keys(tData).forEach((key) => {
            if (['country_id'].indexOf(key) < 0) {
                fd.append(key, tData[key]);
            }
        });
        fd.append('status', (this.state.is_active ? 'ACTIVE' : 'INACTIVE'));
        const {data} = this.props;
        if (data) {
            this.props.handleDataSave(fd, 'UPDATE')
        } else {
            this.props.handleDataSave(fd, 'CREATE')
        }
    }

    // _handleReject() {
    //     const {data} = this.props;
    //     this.props.changeStatus(data, 'REJECT');
    // }

    _renderReject() {
        if (this.props.data) {
            return (<Button variant={'contained'} className={this.props.classes.btnError} onClick={this._handleReject}
                            type="button">
                Reject
            </Button>);
        }
        return null;
    }

    _renderMenuTypes() {
        return this.props.tour_types.map((val) => {
            return (
                <MenuItem value={val.id}>{val.name}</MenuItem>
            )
        })
    }

    _convertData(data) {
        const temp = {};
        data.forEach((val) => {
            temp[val.id] = val.name;
        });
        return temp;
    }
    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }
    _renderStatus() {
        // const {data} = this.props;
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

    render() {
        const {handleSubmit, data, currencies} = this.props;
        return (
            <div>
                <div className={styles.headerFlex}>
                    <h4 className={styles.infoTitle}>
                        <div className={styles.heading}>Region</div>
                        <Tooltip title="Info" aria-label="info" placement="right">
                            <InfoIcon fontSize={'small'}/>
                        </Tooltip>
                    </h4>
                </div>

                <form onSubmit={handleSubmit(this._handleSubmit)}>

                    <div className={'formFlex'} style={{alignItems: 'center'}}>
                        {/*<div className={''} style={{marginLeft: '10px', marginRight: '10px'}}>*/}
                        {/*<Field*/}
                        {/*    max_size={2 * 1024 * 1024}*/}
                        {/*    type={['jpg', 'png']}*/}
                        {/*    fullWidth={true}*/}
                        {/*    name="image"*/}
                        {/*    component={renderFileField}*/}
                        {/*    errorText={'2Mb size & jpg, png, jpeg formats allowed'}*/}
                        {/*    label="Country Image"*/}
                        {/*    show_image={true}*/}
                        {/*    link={data ? data.image : ''}*/}
                        {/*    default_image={data ? data.image : ''}*/}
                        {/*/>*/}
                        {/*</div>*/}
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="name"
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                label="Name"
                                normalize={nameNormalize}
                            />
                        </div>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="shortcode"
                                // type={'number'}
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                normalize={shortCode}
                                label="Region Shortcode"
                            />
                        </div>
                    </div>

                    {/*<div className={'formFlex'}>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field fullWidth={true} name="language" component={renderOutlinedTextField}*/}
                    {/*               margin={'dense'}*/}
                    {/*               normalize={nameNormalize}*/}
                    {/*               label="Language"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field fullWidth={true} name="language_shortcode" component={renderOutlinedTextField}*/}
                    {/*               margin={'dense'}*/}
                    {/*               normalize={shortCode}*/}
                    {/*               label="Language Shortcode"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={'formFlex'}>*/}

                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field fullWidth={true} name="tax" component={renderOutlinedTextField}*/}
                    {/*               margin={'dense'}*/}
                    {/*               type={'number'}*/}
                    {/*               normalize={negativeNormalize}*/}
                    {/*               label="Tax %"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field fullWidth={true} name="timezone" component={renderOutlinedTextField}*/}
                    {/*               margin={'dense'}*/}
                    {/*               type={'number'}*/}
                    {/*               label="Timezone"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            {this._renderStatus()}
                        </div>
                    </div>

                    <div style={{float: 'right'}}>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Submit
                        </Button>
                    </div>


                    {/*<div style={{textAlign: 'right'}}>*/}
                    {/*<Button variant={'contained'} className={this.props.classes.btnSuccess} type="submit">*/}
                    {/*Approve*/}
                    {/*</Button>*/}
                    {/*{this._renderReject()}*/}
                    {/*</div>*/}
                </form>
            </div>
        )
    }

}

const useStyle = theme => ({
    btnSuccess: {
        backgroundColor: theme.palette.success.dark,
        color: 'white',
        marginRight: 5,
        marginLeft: 5,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
    btnError: {
        backgroundColor: theme.palette.error.dark,
        color: 'white',
        marginLeft: 5,
        marginRight: 5,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
        }
    }
});


const ReduxForm = reduxForm({
    form: 'region',  // a unique identifier for this form
    validate,
    asyncValidate,
    // asyncBlurField: ['email'],
    enableReinitialize: true,
    // onSubmitFail: errors => {
    //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, 'Rejected');
    // }
})(withStyles(useStyle, {withTheme: true})(CreateContainer));

const mapStateToProps = state => {
    //console.log(user_profile);
    return {}
};

export default connect(mapStateToProps, null)(ReduxForm);
