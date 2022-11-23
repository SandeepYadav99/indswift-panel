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
    renderCheckbox,
    renderOutlinedMultipleSelectField
} from '../../libs/redux-material.utils';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import styles from "./styles.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import EventEmitter from "../../libs/Events.utils";
import {serviceCityExists} from "../../services/Cities.service";

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
    return errors
};


let lastEmail = '';
let isEmailExists = false;

const asyncValidate = (values, dispatch, props) => {
    return new Promise((resolve, reject) => {
        if (values.name) {
            if (lastEmail == values.name && isEmailExists) {
                reject({name: 'State Already Registered'});
            } else {
                const data = props.data;
                const countryId = props.country_id;
                serviceCityExists({name: values.name,  id: data ? data.id : null, country_id: countryId}).then((data) => {
                    lastEmail = values.name;
                    if (!data.error) {
                        if (data.data.is_exists) {
                            // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
                            //     error: 'Email Already Taken',
                            //     type: 'error'
                            // });
                            reject({name: 'State Already Registered'});
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

const nameNormalize = (value, prevValue) => {
    if ((value.length) > 25) {
        return prevValue
    } else {
        return value
        //? value.toLowerCase() : value;
    }
}

const descNormalize = (value, prevValue) => {
    if ((value.length) > 200) {
        return prevValue
    } else {
        return value ? value.toLowerCase() : value;
    }
}

class CreateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'INDIVIDUAL',
            is_checked: false,
            is_active: false,
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleActive = this._handleActive.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            requiredFields = ['name', 'postalcode',];
            Object.keys(data).forEach((val) => {
                if (['image', 'status'].indexOf(val) == -1) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            // if (!('image' in data) || data.image == null) {
            //     requiredFields.push('image');
            // }
            this.setState({
                is_active: data.status == 'ACTIVE'
            })
        } else {
            requiredFields = ['name', 'postalcode'];
            // this.props.change('type', 'INDIVIDUAL');
        }
    }

    // _handleTypeChange(e) {
    //     this.setState({
    //         type: e.target.value
    //     });
    // }

    _handleSubmit(tData) {
        console.log(tData);
        const fd = new FormData();
        const { region_id } = this.props;
        if(region_id) {
            fd.append('region_id', region_id);
        }
        Object.keys(tData).forEach((key) => {
            if (['region_id'].indexOf(key) < 0) {
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

    _handleChange() {
        this.setState({
            is_checked: !this.state.is_checked
        }, () => {
            if (this.state.is_checked) {
                const {data} = this.props;
                if (data) {

                } else {
                    requiredFields.push('image');
                }
            } else {
                const tempIndex = requiredFields.indexOf('image');
                if (tempIndex >= 0) {
                    requiredFields.splice(tempIndex, 1);
                }
            }
        })
    }

    _renderCities() {
        return this.props.countries.map((val) => {
            return (
                <MenuItem value={val.id}>{val.title}</MenuItem>
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
        const {handleSubmit, data} = this.props;
        return (
            <div>
                <div className={styles.headerFlex}>
                    <h4 className={styles.infoTitle}>
                        <div className={styles.heading}>City</div>
                        <Tooltip title="Info" aria-label="info" placement="right">
                            <InfoIcon fontSize={'small'}/>
                        </Tooltip>
                    </h4>
                </div>
                {/*<Snackbar*/}
                {/*    open={this.state.open}*/}
                {/*    message="Data Saved!"*/}
                {/*    autoHideDuration={4000}*/}
                {/*    onRequestClose={this.handleRequestClose}*/}
                {/*/>*/}

                <form onSubmit={handleSubmit(this._handleSubmit)}>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="name" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   normalize={nameNormalize}
                                   label="Name"/>
                        </div>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="postalcode"
                                type={'number'}
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                // normalize={shortCode}
                                label="Postal Code"
                            />
                        </div>
                    </div>


                    {/*<div className={'formFlex'}>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field*/}
                    {/*            max_size={2*1024*1024}*/}
                    {/*            type={['jpg', 'png', 'jpeg']}*/}
                    {/*            fullWidth={true}*/}
                    {/*            name="image"*/}
                    {/*            errorText={'2Mb size & jpg, png, jpeg formats allowed'}*/}
                    {/*            component={renderFileField}*/}
                    {/*            label="State Image"*/}
                    {/*            // link={data ? data.image : ''}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={'formFlex'}>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field*/}
                    {/*            fullWidth={true}*/}
                    {/*            name="lat"*/}
                    {/*            component={renderOutlinedTextField}*/}
                    {/*            margin={'dense'}*/}
                    {/*            type={'number'}*/}
                    {/*            label="Latitude"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field*/}
                    {/*            fullWidth={true}*/}
                    {/*            name="lng"*/}
                    {/*            type={'number'}*/}
                    {/*            component={renderOutlinedTextField}*/}
                    {/*            margin={'dense'}*/}
                    {/*            label="Longitude"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={'formFlex'}>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field*/}
                    {/*            fullWidth={true}*/}
                    {/*            name="timezone"*/}
                    {/*            type={'number'}*/}
                    {/*            component={renderOutlinedTextField}*/}
                    {/*            margin={'dense'}*/}
                    {/*            label="Timezone"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    {/*<div className={'formFlex'}>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field*/}
                    {/*            name="is_featured"*/}
                    {/*            component={renderCheckbox}*/}
                    {/*            label={"Is Featured"}*/}
                    {/*            // onChange={this._handleChange}*/}
                    {/*        />*/}
                    {/*    </div>*/}

                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field*/}
                    {/*            name="show_on_home"*/}
                    {/*            component={renderCheckbox}*/}
                    {/*            label={"Show On Homepage?"}*/}
                    {/*        />*/}
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
