/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */
import React, {Component} from 'react';
import IncludeFields from './IncludeFields.component';
import styles from './style.module.css'
import {serviceGetCustomList} from "../../../../../../services/Common.service";

const TEMP_OBJ = {
    country_id: '',
    services: []
};

class IncludeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [JSON.parse(JSON.stringify(TEMP_OBJ))],
            isListFetching: true,
            countries: [],
            services: [],
            errors: {},
        };
        this._changeData = this._changeData.bind(this);
        this._handlePress = this._handlePress.bind(this);
        this.getState = this.getState.bind(this);
        this._validateData = this._validateData.bind(this);
    }

    getState() {
        return this.state.fields;
    }

    _validateData(index, type) {
        console.log('index', index, type);
        const {fields, errors: propErr} = this.state;
        const errors = {};
        if (type) {
            if (propErr[index]) {
                propErr[index][type] = false;
            }
            this.setState({
                errors: propErr
            })
            return false;
        }
        fields.forEach((val, index) => {
            const err = {}
            const required = ['country_id', 'services'];
            required.forEach((key) => {
                if (!val[key]) {
                    err[key] = true;
                }
            })
            if (Array.isArray(val.services) && val.services.length == 0) {
                err.services = true;
            }

            console.log('err', err);
            if (Object.keys(err).length > 0) {
                errors[index] = err;
            }
        });
        this.setState({
            errors: errors,
        });
        console.log('spinData error', errors);
        return !(Object.keys(errors).length > 0);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newData = this.props.data;
        const oldData = prevProps.data;
        if (oldData == null && newData && newData.length > 0) {
            this.setState({
                fields: newData
            })
        }
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.setState({
                fields: data
            })
        }
        const request = serviceGetCustomList(['COUNTRY','SERVICES']);
        request.then((data)=> {
            if(!data.error){
                this.setState({
                    isListFetching: false,
                    countries: data.data.countries,
                    services: data.data.services
                })
            }
        })
    }

    isValid() {
        return this._validateData();
    }


    _changeData(index, data) {
        const tempData = this.state.fields;
        tempData[index] = {...tempData[index], ...data};
        this.setState({
            fields: tempData
        });
    }

    _handlePress(type, index = 0) {
        const oldState = this.state.fields;
        if (type == 'ADDITION') {
            oldState.push(JSON.parse(JSON.stringify(TEMP_OBJ)));
        } else {
            oldState.splice(index, 1);
        }
        this.setState({
            fields: oldState
        }, () => {
            this._validateData();
        });
    }

    _renderFields() {
        const {countries,services,errors} = this.state;
        return this.state.fields.map((val, index) => {
            return (
                <IncludeFields validateData={this._validateData}
                               errors={index in errors ? errors[index] : null} changeData={this._changeData} handlePress={this._handlePress}
                               data={val} index={index} countries={countries} services={services}/>
            )
        });
    }

    render() {
        return (
            <>
                <div className={styles.plainPaper}>
                    <h5 style={{marginTop: '0px'}}>Services And Countries</h5>
                    {this._renderFields()}
                </div>
            </>
        )
    }
}

export default IncludeForm;
