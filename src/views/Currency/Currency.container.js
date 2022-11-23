/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, IconButton, MenuItem, withStyles} from '@material-ui/core';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {
    renderTextField,
    renderSelectField,
    renderOutlinedTextField,
    renderOutlinedSelectField,
    renderFileField,
    renderOutlinedMultipleSelectField
} from '../../libs/redux-material.utils';
import {serviceCurrencyExists} from "../../services/Currency.service";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import styles from "./styles.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import {Delete as DeleteIcon} from "@material-ui/icons";


let requiredFields = [];
const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors
};
let lastValue = '';
let isValueExists = false;

const asyncValidate = (values, dispatch, props) => {
    return new Promise((resolve, reject) => {
        if (values.currency_shortcode) {
            const value = values.currency_shortcode;
            if (lastValue == value && isValueExists && false) {
                reject({currency_shortcode: 'Name Already Registered'});
            } else {
                const tempQuery = {currency_shortcode: value};
                const {data} = props;
                if (data) {
                    tempQuery['id'] = data.id;
                }
                serviceCurrencyExists(tempQuery).then((data) => {
                    console.log(data);
                    lastValue = value;
                    if (!data.error) {
                        const error = {};
                        let isError = false;
                        if (data.data.is_exists) {
                            error['currency_shortcode'] = 'Currency Shortcode Already Registered';
                            isError = true;
                        }
                        if (isError) {
                            reject(error);
                        } else {
                            resolve({});
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
            requiredFields = [ 'currency', 'currency_shortcode', 'symbol' ];
            Object.keys(data).forEach((val) => {
                if (['image','status'].indexOf(val) == -1) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            this.setState({
                is_active: data.status == 'ACTIVE'
            })
        } else {
            requiredFields = [ 'currency', 'currency_shortcode', 'symbol' ];
            // this.props.change('type', 'INDIVIDUAL');
        }
    }

    // _handleTypeChange(e) {
    //     this.setState({
    //         type: e.target.value
    //     });
    // }

    _handleSubmit(tData) {
        // const status = this.state.is_active ? 'ACTIVE' : 'INACTIVE';
        const {data} = this.props;
        if (data) {
            this.props.handleDataSave({ ...tData, id: data.id }, 'UPDATE') //status: status,
        } else {
            this.props.handleDataSave({...tData}, 'CREATE')
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

    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }

    _renderStatus() {
        const {data} = this.props;
        if (data) {
            return (<FormControlLabel
                control={
                    <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                            value="is_active"/>
                }
                label="Active ?"
            />);
        } else {
            return null;
        }
    }

    render() {
        const {handleSubmit, data} = this.props;
        return (
            <div>
                <div className={styles.headerFlex}>
                    <h4 className={styles.infoTitle}>
                        <div className={styles.heading}>Currency</div>
                        <Tooltip title="Info" aria-label="info" placement="right">
                            <InfoIcon fontSize={'small'}/>
                        </Tooltip>

                    </h4>
                    {/*{data && <IconButton variant={'contained'} className={this.props.classes.iconBtnError}*/}
                    {/*                     onClick={this._handleDelete}*/}
                    {/*                     type="button">*/}
                    {/*    <DeleteIcon />*/}
                    {/*</IconButton> }*/}
                </div>

                <form onSubmit={handleSubmit(this._handleSubmit)}>

                    <div className={'formFlex'} style={{alignItems: 'center'}}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="currency"
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                label="Currency Name"
                            />
                        </div>
                        <div className="formGroup">
                            <Field
                                fullWidth={true}
                                name="currency_shortcode"
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                label="Currency Shortcode"
                            />
                        </div>

                    </div>

                    <div className={'formFlex'}>
                        {/*<div className={'formGroup'}>*/}
                        {/*    <Field fullWidth={true} name="conversion_rate"*/}
                        {/*           component={renderOutlinedTextField}*/}
                        {/*           type={'number'}*/}
                        {/*           margin={'dense'}*/}
                        {/*           label="Conversion Rate WRT INR"/>*/}
                        {/*</div>*/}

                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="symbol"
                                   component={renderOutlinedTextField}
                                   margin={'dense'}
                                   label="Symbol"/>
                        </div>

                    </div>

                    <br/>
                    {/*{this._renderStatus()}*/}
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
    form: 'createprovider',  // a unique identifier for this form
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
