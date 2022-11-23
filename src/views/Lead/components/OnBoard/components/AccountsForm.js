import React from 'react';
import styles from "./Style.module.css";
import {Field} from "redux-form";
import {
    renderFileField,
    renderOutlinedSelectField,
    renderDatePicker,
    renderOutlinedTextField
} from "../../../../../libs/redux-material.utils";
import constants from "../../../../../config/constants";
import {MenuItem} from "@material-ui/core";
import {serviceGetCustomList} from "../../../../../services/Common.service";


class AccountsForm extends React.Component {

    constructor() {
        super();
        this.state = {
            currencies: []
        }
    }

    componentDidMount() {
        const request = serviceGetCustomList(['CURRENCY']);
        request.then((data)=> {
            if(!data.error){
                this.setState({
                    isListFetching: false,
                    currencies: data.data.currencies
                })
            }
        })
    }

    render() {
        const {currencies} = this.state;
        const {negativeNormalize,hsnNormalize,data} = this.props;
        return (
            <div className={styles.plainPaper}>
                <h5 style={{marginTop: '0px'}}>Accounts</h5>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="account_number" component={renderOutlinedTextField}
                               margin={'dense'}
                               label="Account Ref No."/>
                    </div>
                    <div className={'formGroup'}>
                        <Field fullWidth={true}
                               name="currency_id"
                               component={renderOutlinedSelectField}
                               margin={'dense'}
                               label="Currency">
                            {currencies.map(val => {
                                return <MenuItem value={val.id}>{val.name}</MenuItem>
                            })}
                        </Field>
                    </div>
                    <div className={'formGroup'}>
                        <Field fullWidth={true}
                               name="tax_treatment"
                               component={renderOutlinedSelectField}
                               margin={'dense'}
                               label="Tax Treatment">
                            <MenuItem value={'TAXABLE'}>Taxable</MenuItem>
                            <MenuItem value={'NON_TAXABLE'}>Non-Taxable</MenuItem>
                            <MenuItem value={'OTHERS'}>Others</MenuItem>
                        </Field>
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <Field fullWidth={true}
                               name="opening_balance_date"
                               component={renderDatePicker}
                               margin={'dense'}
                               label="Opening Balance Date"
                               ampm={false}
                               maxDate={new Date()}
                        />
                    </div>
                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="opening_balance_debit" component={renderOutlinedTextField}
                               margin={'dense'}
                               type={'number'}
                               normalize={negativeNormalize}
                               label="Opening Balance Debit"/>
                    </div>
                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="opening_balance_credit" component={renderOutlinedTextField}
                               margin={'dense'}
                               type={'number'}
                               normalize={negativeNormalize}
                               label="Opening Balance Credit"/>
                    </div>
                </div>

            </div>
        )
    }
};

export default AccountsForm;
