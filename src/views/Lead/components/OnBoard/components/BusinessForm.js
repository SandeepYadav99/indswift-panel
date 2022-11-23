import React from 'react';
import styles from "./Style.module.css";
import {Field} from "redux-form";
import {
    renderFileField,
    renderOutlinedSelectField,
    renderOutlinedTextField
} from "../../../../../libs/redux-material.utils";
import constants from "../../../../../config/constants";
import {MenuItem} from "@material-ui/core";
import countries from "../../../../../countries.json";


class BusinessForm extends React.Component {
    render() {
        const {negativeNormalize,hsnNormalize,data} = this.props;
        return (
            <div className={styles.plainPaper}>
                <h5 style={{marginTop: '0px'}}>Business Profile</h5>

                <div className={'formFlex'} style={{alignItems:'center'}}>
                    <div>
                        <Field
                            max_size={2 * 1024 * 1024}
                            type={['jpg', 'png', 'jpeg']}
                            fullWidth={true}
                            name="business_logo"
                            component={renderFileField}
                            show_image
                            default_image={data ? data.business_logo : ''}
                            link={data ? data.business_logo : ''}
                        />
                    </div>

                    <div style={{flex: 1,marginLeft:'10px'}}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="business_name" component={renderOutlinedTextField}
                                   margin={'dense'}
                                // normalize={titleNormalize}
                                   label="Business Name"/>
                        </div>

                        <div className={'formFlex'}>
                            <div className={'formGroup'}>
                                <Field fullWidth={true}
                                       type={'text'} name="website"
                                       component={renderOutlinedTextField}
                                       margin={'dense'}
                                       label="Website"/>
                            </div>
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
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="billing_address" component={renderOutlinedTextField}
                               margin={'dense'}
                               // normalize={nameNormalize}
                               label="Billing Address"/>
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="billing_country" component={renderOutlinedSelectField}
                               margin={'dense'}
                               label="Billing Country">
                            {countries.map(val => {
                                return <MenuItem value={val.name}>{val.name}</MenuItem>
                            })}
                        </Field>
                    </div>
                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="billing_state" component={renderOutlinedTextField}
                               margin={'dense'}
                               label="Billing State"/>
                    </div>
                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="billing_city" component={renderOutlinedTextField}
                               margin={'dense'}
                               label="Billing City"/>
                    </div>
                </div>

            </div>
        )
    }
};

export default BusinessForm;
