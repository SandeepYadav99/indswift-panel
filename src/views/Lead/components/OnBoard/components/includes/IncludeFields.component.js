/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React from 'react';
import {
    TextField,
    IconButton,
    ButtonBase,
    Checkbox,
    withStyles,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Input
} from '@material-ui/core';
import { RemoveCircleOutline as RemoveIcon, AddCircle as AddIcon } from '@material-ui/icons';
import styles from './style.module.css';

const useStyles = {
    toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
    },
    toggleLabel: {
        color: 'black',
        fontWeight: 100
    },
    buttons: {
        marginTop: 30,
        float: 'right'
    },
    saveButton: {
        marginLeft: 5
    }
};

class IncludeFields extends  React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
        this._handleChange = this._handleChange.bind(this);
        this._handleIsFeatured = this._handleIsFeatured.bind(this);
    }


    async handleSubmit(data) {

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    _handleChange(e) {
        const temp = this.props.index;
        this.props.changeData(temp, { [e.target.name]: e.target.value } );
    }
    _handleIsFeatured(e) {
        // console.log()
        this.props.changeData(this.props.index, { [e.target.name]: !this.props.data.is_included } );
    }
    _handleServiceChange(e) {
        const { value } = e.target;
        console.log('options', value);
        // const value = [];
        // for (let i = 0, l = options.length; i < l; i += 1) {
        //     if (options[i].selected) {
        //         value.push(options[i].value);
        //     }
        // }
        console.log('handleServiceChange', value);
    }
    render() {
        const {countries,services, errors} = this.props;
        return (
            <div>
                <div className={styles.flexContainer}>
                    <div className={styles.countryField}>
                        <FormControl variant="outlined" margin={'dense'} fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label"  margin={'dense'}>Country</InputLabel>
                            <Select
                                error={errors ? errors.country_id : false}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={this._handleChange}
                                value={this.props.data.country_id}
                                fullWidth={true}
                                // floatingLabelText="Title"
                                name={'country_id'}
                                margin={'dense'}
                                // variant={'outlined'}
                                label={'Country'}
                            >
                                {countries.map((val) => {
                                    return (<MenuItem value={val.id}>{val.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.flex1} style={{overflow:'hidden'}}>
                        <FormControl variant="outlined" margin={'dense'} fullWidth>
                            <InputLabel id="demo-mutiple-name-label"  margin={'dense'}>Services</InputLabel>
                            <Select
                                error={errors ? errors.services : false}
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                onChange={this._handleChange}
                                value={this.props.data.services}
                                fullWidth={true}
                                multiple={true}
                                // input={<Input />}                                // floatingLabelText="Title"
                                name={'services'}
                                margin={'dense'}
                                // variant={'outlined'}
                                label={'Services'}
                            >
                                {services.map((val) => {
                                    return (<MenuItem value={val.id}>{val.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={'textCenter'}>
                        <IconButton
                            label={this.props.index == 0 ? "+" : '-'}
                            onClick={() => {
                                this.props.handlePress(this.props.index == 0 ? "ADDITION" : 'DELETE', this.props.index);
                            }}
                        >
                            {this.props.index == 0 ? (<AddIcon />) : (<RemoveIcon />) }
                        </IconButton>
                        {/*<RaisedButton*/}
                        {/*    onClick={() => {*/}
                        {/*        this.props.handlePress(this.props.index == 0 ? "ADDITION" : 'DELETE', this.props.index);*/}
                        {/*    }}*/}
                        {/*    label={this.props.index == 0 ? "+" : '-'}*/}
                        {/*    style={styles.saveButton}*/}
                        {/*    secondary={true}/>*/}
                    </div>
                </div>

            </div>
        );
    };
};

export default withStyles(useStyles)(IncludeFields)
